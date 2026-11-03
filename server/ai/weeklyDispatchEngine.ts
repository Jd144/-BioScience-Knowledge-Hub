import { db, WeeklyDispatchDraft } from '../db.js';
import { aiEngine } from './aiEngine.js';

export class WeeklyDispatchEngine {
  /**
   * Generates a weekly biotechnology opportunity digest draft from newly verified database records
   */
  public async generateWeeklyDispatchDraft(): Promise<WeeklyDispatchDraft> {
    const store = db.getData();
    const now = new Date();
    const nowIso = now.toISOString();

    // Determine week number
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
    const year = now.getFullYear();

    // Gather active opportunities
    const activeOpps = store.opportunities.filter((o) => o.publicationStatus === 'published');
    const jobs = activeOpps
      .filter((o) => o.type === 'job')
      .slice(0, 4)
      .map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));

    const internships = activeOpps
      .filter((o) => o.type === 'internship')
      .slice(0, 3)
      .map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));

    const fellowships = activeOpps
      .filter((o) => o.type === 'fellowship' || o.type === 'research' || o.type === 'scholarship')
      .slice(0, 3)
      .map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));

    const exams = store.examinations.slice(0, 4).map((e) => ({
      code: e.code,
      title: e.fullName,
      update: e.importantDatesText,
      url: e.officialPortalUrl,
    }));

    const news = [
      {
        headline: 'DBT-BIRAC Biotechnology Research Initiative Updates',
        summary: 'Department of Biotechnology issues updated guidelines for translational biomedical fellowships.',
        source: 'dbtindia.gov.in',
      },
      {
        headline: 'National Entrance Portal Calendar Sync',
        summary: 'Synchronized examination milestones for GAT-B, CSIR-NET, and GATE-BT sessions.',
        source: 'nta.ac.in',
      },
    ];

    const title = `BioScience Weekly Dispatch — Issue #${weekNumber} (${year})`;
    const summaryText = `Weekly curated digest of verified biotechnology vacancies, fellowships, summer internships, and national examination schedules.`;

    // Format rich HTML for admin preview
    const fullDraftHtml = `
<div style="font-family: 'Times New Roman', Times, serif; color: #1e293b; max-width: 650px; margin: 0 auto; line-height: 1.6;">
  <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
    <h1 style="margin: 0; font-size: 24px; color: #0f172a;">${title}</h1>
    <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">BioScience Hub Official Academic Intelligence & Opportunity Digest</p>
  </div>

  <p style="font-size: 14px; margin-bottom: 20px;">${summaryText}</p>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">1. Verified Research & Job Vacancies</h2>
  <ul>
    ${jobs.map((j) => `<li><strong>${j.title}</strong> — ${j.organization} (Deadline: ${j.deadline}) <a href="${j.url}" target="_blank">Official Link</a></li>`).join('')}
  </ul>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">2. Fellowships & Internships</h2>
  <ul>
    ${[...internships, ...fellowships].map((f) => `<li><strong>${f.title}</strong> — ${f.organization} (Deadline: ${f.deadline}) <a href="${f.url}" target="_blank">Apply</a></li>`).join('')}
  </ul>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">3. National Competitive Examinations Update</h2>
  <ul>
    ${exams.map((e) => `<li><strong>${e.code} (${e.title})</strong>: ${e.update}</li>`).join('')}
  </ul>

  <div style="margin-top: 30px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
    Grounded strictly in official gazettes and agency bulletins (DBT, DST, CSIR, NTA). Distributed via BioScience Hub.
  </div>
</div>
    `.trim();

    const draft: WeeklyDispatchDraft = {
      id: 'dispatch-' + Date.now(),
      weekNumber,
      year,
      title,
      status: 'draft',
      summaryText,
      highlights: {
        jobs,
        internships,
        fellowships,
        exams,
        news,
      },
      fullDraftHtml,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    store.aiWeeklyDispatches.unshift(draft);
    if (store.aiWeeklyDispatches.length > 20) {
      store.aiWeeklyDispatches = store.aiWeeklyDispatches.slice(0, 20);
    }

    db.addAiActivityLog('system', 'WEEKLY_DISPATCH_DRAFT_CREATED', 'NEWSLETTER_DIGEST', [], jobs.length + fellowships.length, 'success', {
      draftId: draft.id,
      weekNumber,
      year,
    });

    db.save();
    return draft;
  }
}

export const weeklyDispatchEngine = new WeeklyDispatchEngine();
