import { db, ExamChangeProposal, ExaminationConfig } from '../db.js';
import { aiEngine } from './aiEngine.js';

export class ExaminationMonitorEngine {
  public readonly SUPPORTED_EXAMS: {
    code: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET';
    name: string;
    portalUrl: string;
  }[] = [
    { code: 'GAT-B', name: 'Graduate Aptitude Test - Biotechnology', portalUrl: 'https://dbt.nta.ac.in' },
    { code: 'DBT-JRF', name: 'Biotechnology Eligibility Test (BET) / DBT-JRF', portalUrl: 'https://dbt.nta.ac.in' },
    { code: 'GATE-BT', name: 'GATE - Biotechnology', portalUrl: 'https://gate2026.iitr.ac.in' },
    { code: 'IIT-JAM', name: 'IIT JAM - Biotechnology', portalUrl: 'https://jam2026.iitd.ac.in' },
    { code: 'CUET-PG', name: 'CUET-PG - Life Sciences', portalUrl: 'https://pgcuet.samarth.ac.in' },
    { code: 'CSIR-NET', name: 'Joint CSIR-UGC NET - Life Sciences', portalUrl: 'https://csirnet.nta.ac.in' },
  ];

  /**
   * Monitor an official examination portal and detect proposed corrections
   */
  public async monitorExam(examCode: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET'): Promise<ExamChangeProposal[]> {
    const store = db.getData();
    const currentExam = store.examinations.find((e) => e.code === examCode);
    if (!currentExam) {
      throw new Error(`Examination ${examCode} not found in database.`);
    }

    const start = Date.now();
    const examMeta = this.SUPPORTED_EXAMS.find((e) => e.code === examCode)!;

    // Prompt AI engine to check current official updates for this exam
    const systemPrompt = `You are the Examination Monitor Engine for BioScience Hub.
You monitor official Indian National Examination bulletins strictly for: GAT-B, DBT-JRF, GATE-BT, IIT-JAM, CUET-PG, CSIR-NET.
Compare the current database information with recent official announcements.

RULES:
1. NEVER fabricate exam dates, patterns, or marking schemes.
2. If official changes are detected (e.g. 2026/2027 application dates, revised syllabus, new conducting IIT/agency), output a proposed correction.
3. If no official change has occurred, return an empty array [].
4. Output valid JSON array only.

Schema:
[
  {
    "field": "importantDatesText" | "officialPortalUrl" | "examPattern" | "markingScheme" | "eligibilitySummary" | "statusNote",
    "proposedValue": string,
    "officialSourceUrl": string,
    "evidence": string
  }
]`;

    const userPrompt = `Target Examination: ${examMeta.name} (${examCode})
Official Portal: ${examMeta.portalUrl}
Current Stored Data:
- Important Dates: "${currentExam.importantDatesText}"
- Portal: "${currentExam.officialPortalUrl}"
- Pattern: "${currentExam.examPattern}"
- Marking Scheme: "${currentExam.markingScheme}"
- Eligibility: "${currentExam.eligibilitySummary}"
- Status Note: "${currentExam.statusNote}"

Has any official bulletin update or schedule change been released? If yes, provide the proposed change. If not, return [].`;

    let proposals: ExamChangeProposal[] = [];

    try {
      const response = await aiEngine.executeWithFailover(
        {
          systemPrompt,
          userPrompt,
          responseMimeType: 'application/json',
        },
        { enableSearchGrounding: true }
      );

      const parsed = JSON.parse(response.text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        for (const item of parsed) {
          if (!item.field || !item.proposedValue) continue;

          const currentValue = String((currentExam as any)[item.field] || '');
          if (currentValue.trim() === String(item.proposedValue).trim()) {
            continue; // No difference
          }

          const proposal: ExamChangeProposal = {
            id: 'exam-prop-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            examCode,
            examName: examMeta.name,
            field: item.field,
            currentValue,
            proposedValue: item.proposedValue,
            officialSourceUrl: item.officialSourceUrl || examMeta.portalUrl,
            evidence: item.evidence || 'Official bulletin update detected.',
            status: 'pending_review',
            detectedAt: new Date().toISOString(),
          };

          store.aiExamProposals.unshift(proposal);
          proposals.push(proposal);
        }
      }
    } catch (e: any) {
      console.warn(`[ExaminationMonitorEngine] Check for ${examCode} completed with info:`, e.message);
    }

    db.addAiActivityLog('exam_monitor', 'EXAM_MONITOR_CHECK', 'EXAM_DIFF', [examMeta.portalUrl], proposals.length, 'success', {
      examCode,
      proposalsCount: proposals.length,
      durationMs: Date.now() - start,
    });

    db.save();
    return proposals;
  }

  /**
   * Apply approved exam change proposal to live store.examinations
   */
  public async applyProposal(proposalId: string, actorEmail: string): Promise<ExaminationConfig> {
    const store = db.getData();
    const proposal = store.aiExamProposals.find((p) => p.id === proposalId);
    if (!proposal) {
      throw new Error(`Proposal ${proposalId} not found`);
    }

    const exam = store.examinations.find((e) => e.code === proposal.examCode);
    if (!exam) {
      throw new Error(`Exam ${proposal.examCode} not found in database.`);
    }

    // Apply change
    (exam as any)[proposal.field] = proposal.proposedValue;
    exam.verificationDate = new Date().toISOString().substring(0, 10);
    exam.updatedAt = new Date().toISOString();

    proposal.status = 'approved';
    proposal.reviewedBy = actorEmail;
    proposal.reviewedAt = new Date().toISOString();

    db.addAuditLog(
      actorEmail,
      'superadmin',
      'EXAM_CHANGE_PROPOSAL_APPROVED',
      'EXAMINATIONS',
      { examCode: proposal.examCode, field: proposal.field, newValue: proposal.proposedValue }
    );

    db.save();
    return exam;
  }
}

export const examinationMonitorEngine = new ExaminationMonitorEngine();
