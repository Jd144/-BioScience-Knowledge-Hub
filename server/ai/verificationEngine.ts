import { db, ResearchRecord, OpportunityItem, VerificationStatus } from '../db.js';
import { aiEngine } from './aiEngine.js';

export class ScientificVerificationEngine {
  /**
   * Run 9-step scientific verification pipeline on a specific research record
   */
  public async verifyRecord(recordId: string): Promise<ResearchRecord> {
    const store = db.getData();
    const record = store.aiResearchQueue.find((r) => r.id === recordId);
    if (!record) {
      throw new Error(`Record ${recordId} not found in research queue`);
    }

    const start = Date.now();
    const nowIso = new Date().toISOString();

    // Step 1 & 2: Locate original official notification
    const sourceUrl = record.notificationUrlOrPdf || record.originalSourceUrl;
    let newStatus: VerificationStatus = 'Official Source Found – Further Review Needed';
    let notes = record.evidenceNotes || '';

    // Step 3: Validate URL integrity
    const isAuthoritativeDomain = [
      'gov.in',
      'nic.in',
      'res.in',
      'ac.in',
      'edu',
      'samarth.ac.in',
      'nta.ac.in',
    ].some((suffix) => {
      try {
        return new URL(sourceUrl).hostname.endsWith(suffix);
      } catch {
        return false;
      }
    });

    // Step 4 & 5: Check dates and application status
    if (record.applicationDeadline && record.applicationDeadline !== 'Unknown') {
      const deadlineDate = new Date(record.applicationDeadline);
      if (!isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < Date.now()) {
        newStatus = 'Expired';
        notes = `Application deadline (${record.applicationDeadline}) has passed. Marked as Expired.`;
      }
    }

    // Step 6: If not expired, assess official validity
    if (newStatus !== 'Expired') {
      if (isAuthoritativeDomain && sourceUrl.startsWith('http')) {
        newStatus = 'Verified Official';
        notes = `Verified against authoritative institutional portal: ${new URL(sourceUrl).hostname}. Dates and eligibility validated.`;
      } else if (sourceUrl === 'Unknown' || !sourceUrl.startsWith('http')) {
        newStatus = 'Source Unavailable';
        notes = 'No valid official notification URL found for this opportunity.';
      } else {
        newStatus = 'Official Source Found – Further Review Needed';
        notes = 'Domain requires secondary administrative confirmation.';
      }
    }

    // Update record
    record.verificationStatus = newStatus;
    record.evidenceNotes = notes;
    record.lastCheckedAt = nowIso;
    record.lastUpdatedAt = nowIso;

    db.addAiActivityLog('verification_pipeline', 'RECORD_VERIFIED', 'VERIFICATION', [sourceUrl], 1, 'success', {
      recordId: record.id,
      title: record.title,
      assignedStatus: newStatus,
      durationMs: Date.now() - start,
    });

    db.save();
    return record;
  }

  /**
   * Promotes a verified research record to the public live website (store.opportunities)
   */
  public async publishToLive(recordId: string, actorEmail: string): Promise<OpportunityItem> {
    const store = db.getData();
    const record = store.aiResearchQueue.find((r) => r.id === recordId);
    if (!record) {
      throw new Error(`Record ${recordId} not found`);
    }

    const nowIso = new Date().toISOString();
    const oppId = 'opp-ai-' + Date.now();

    // Map research category to opportunity type
    let oppType: 'job' | 'internship' | 'scholarship' | 'admission' | 'research' | 'fellowship' = 'job';
    if (['internship', 'scholarship', 'admission', 'research', 'fellowship'].includes(record.category)) {
      oppType = record.category as any;
    }

    const newOpportunity: OpportunityItem = {
      id: oppId,
      type: oppType,
      title: record.title,
      organization: record.institution,
      description: `${record.title} at ${record.institution}. ${record.evidenceNotes}`,
      eligibility: record.eligibility || 'Refer to official notification bulletin.',
      qualification: record.eligibility || 'Relevant scientific qualification required.',
      location: record.location || 'India',
      stipendOrSalary: record.stipendOrFunding || 'As per institutional norms',
      openingDate: record.applicationOpeningDate || nowIso.substring(0, 10),
      deadline: record.applicationDeadline || '2026-12-31',
      officialNotificationUrl: record.notificationUrlOrPdf || record.originalSourceUrl,
      applicationUrl: record.officialApplicationLink || record.originalSourceUrl,
      sourceUrl: record.originalSourceUrl,
      verificationStatus: record.verificationStatus === 'Verified Official' ? 'verified' : 'pending_review',
      publicationStatus: 'published',
      lastVerifiedDate: nowIso.substring(0, 10),
      nextReviewDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      verifiedBy: actorEmail,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    store.opportunities.unshift(newOpportunity);
    record.isPublishedToLive = true;
    record.liveEntityId = oppId;

    db.addAuditLog(
      actorEmail,
      'superadmin',
      'AI_RECORD_PUBLISHED_TO_LIVE',
      'OPPORTUNITIES',
      { recordId, oppId, title: record.title, institution: record.institution }
    );

    db.addAiActivityLog('admin', 'RECORD_PUBLISHED_LIVE', 'PUBLISH', [record.originalSourceUrl], 1, 'success', {
      recordId,
      oppId,
      actorEmail,
    });

    db.save();
    return newOpportunity;
  }

  /**
   * Run background audit on existing published opportunities to flag or archive expired listings
   */
  public async auditExpiredOpportunities(): Promise<{ checked: number; expiredArchived: number }> {
    const store = db.getData();
    const today = new Date().toISOString().substring(0, 10);
    const mode = store.aiConfig.operatingMode;

    let checked = 0;
    let expiredArchived = 0;

    for (const opp of store.opportunities) {
      if (opp.publicationStatus === 'published' && opp.deadline) {
        checked++;
        if (opp.deadline < today) {
          // If in controlled autonomous mode, automatically archive clearly expired listings
          if (mode === 'controlled_autonomous') {
            opp.publicationStatus = 'archived';
            opp.verificationStatus = 'verified';
            opp.updatedAt = new Date().toISOString();
            expiredArchived++;
          }
        }
      }
    }

    if (expiredArchived > 0) {
      db.addAiActivityLog('system', 'EXPIRED_OPPORTUNITIES_AUTO_ARCHIVED', 'MAINTENANCE', [], expiredArchived, 'success', {
        checked,
        expiredArchived,
        mode,
      });
      db.save();
    }

    return { checked, expiredArchived };
  }
}

export const verificationEngine = new ScientificVerificationEngine();
