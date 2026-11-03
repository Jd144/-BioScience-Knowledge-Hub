import express, { Response } from 'express';
import { db, AiOperatingMode } from './db.js';
import { AuthenticatedRequest, requireAdminAuth } from './adminRoutes.js';
import { aiEngine } from './ai/aiEngine.js';
import { webResearchEngine } from './ai/webResearchEngine.js';
import { verificationEngine } from './ai/verificationEngine.js';
import { examinationMonitorEngine } from './ai/monitorEngine.js';
import { weeklyDispatchEngine } from './ai/weeklyDispatchEngine.js';
import { schedulerEngine } from './ai/schedulerEngine.js';

export const aiRouter = express.Router();

// Require admin authentication for all AI routes
aiRouter.use(requireAdminAuth);

/**
 * 1. AI System Overview & Status
 */
aiRouter.get('/status', async (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const cfg = store.aiConfig;
  const schedulerStatus = schedulerEngine.getStatus();

  // Basic counters
  const totalResearched = store.aiResearchQueue.length;
  const pendingReview = store.aiResearchQueue.filter((r) => !r.isPublishedToLive && r.verificationStatus !== 'Expired').length;
  const verifiedCount = store.aiResearchQueue.filter((r) => r.verificationStatus === 'Verified Official').length;
  const pendingExamProposals = store.aiExamProposals.filter((p) => p.status === 'pending_review').length;

  res.json({
    config: cfg,
    scheduler: schedulerStatus,
    metrics: {
      totalResearched,
      pendingReview,
      verifiedCount,
      pendingExamProposals,
      monthlyUsageRequests: cfg.monthlyUsageRequests,
      monthlyBudgetINR: 0,
      zeroCostPolicyActive: true,
    },
    activeProvider: cfg.activeProvider,
    operatingMode: cfg.operatingMode,
  });
});

/**
 * 2. Provider Health Check Ping
 */
aiRouter.post('/health-check', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const report = await aiEngine.getHealthReport();
    res.json({
      success: true,
      report,
      testedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to ping AI providers' });
  }
});

/**
 * 3. Update AI Engine Configuration (Modes, Priorities, Settings)
 */
aiRouter.post('/config', (req: AuthenticatedRequest, res: Response) => {
  const { operatingMode, providerPriorities, providerSettings, autoScheduleEnabled, ollamaBaseUrl } = req.body;
  const store = db.getData();

  if (operatingMode && ['research_only', 'review_mode', 'controlled_autonomous'].includes(operatingMode)) {
    store.aiConfig.operatingMode = operatingMode as AiOperatingMode;
  }

  if (Array.isArray(providerPriorities) && providerPriorities.length > 0) {
    store.aiConfig.providerPriorities = providerPriorities;
  }

  if (providerSettings && typeof providerSettings === 'object') {
    for (const [key, val] of Object.entries(providerSettings)) {
      if ((store.aiConfig.providerSettings as any)[key]) {
        (store.aiConfig.providerSettings as any)[key] = {
          ...(store.aiConfig.providerSettings as any)[key],
          ...(val as any),
        };
      }
    }
  }

  if (typeof autoScheduleEnabled === 'boolean') {
    store.aiConfig.autoScheduleEnabled = autoScheduleEnabled;
  }

  if (ollamaBaseUrl && typeof ollamaBaseUrl === 'string') {
    store.aiConfig.ollamaBaseUrl = ollamaBaseUrl.trim();
  }

  db.addAuditLog(
    req.adminUser?.email || 'admin',
    req.adminUser?.role || 'superadmin',
    'AI_CONFIG_UPDATED',
    'AI_ENGINE',
    { operatingMode: store.aiConfig.operatingMode, autoScheduleEnabled }
  );

  db.save();
  res.json({ success: true, config: store.aiConfig });
});

/**
 * 4. Run Web Research Cycle
 */
aiRouter.post('/research/run', async (req: AuthenticatedRequest, res: Response) => {
  const { category, targetInstitution, targetExam, customQuery, maxResults } = req.body;

  try {
    const records = await webResearchEngine.conductResearchCycle({
      category,
      targetInstitution,
      targetExam,
      customQuery,
      maxResults: maxResults ? parseInt(maxResults, 10) : 6,
    });

    res.json({
      success: true,
      recordsFound: records.length,
      records,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Research cycle execution failed' });
  }
});

/**
 * 5. Get Research Queue
 */
aiRouter.get('/research/queue', (req: AuthenticatedRequest, res: Response) => {
  const { status, category, search } = req.query;
  const store = db.getData();
  let items = [...store.aiResearchQueue];

  if (status && typeof status === 'string' && status !== 'all') {
    items = items.filter((i) => i.verificationStatus === status);
  }

  if (category && typeof category === 'string' && category !== 'all') {
    items = items.filter((i) => i.category === category);
  }

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    items = items.filter(
      (i) => i.title.toLowerCase().includes(s) || i.institution.toLowerCase().includes(s)
    );
  }

  res.json({
    total: items.length,
    items,
  });
});

/**
 * 6. Verify Record
 */
aiRouter.post('/research/verify/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const record = await verificationEngine.verifyRecord(req.params.id);
    res.json({ success: true, record });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

/**
 * 7. Approve & Publish Record to Live Site (store.opportunities)
 */
aiRouter.post('/research/publish/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const published = await verificationEngine.publishToLive(
      req.params.id,
      req.adminUser?.email || 'admin'
    );
    res.json({ success: true, opportunity: published });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * 8. Reject / Delete Research Item
 */
aiRouter.delete('/research/:id', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const index = store.aiResearchQueue.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  const removed = store.aiResearchQueue.splice(index, 1)[0];
  db.addAiActivityLog(
    req.adminUser?.email || 'admin',
    'RESEARCH_RECORD_REJECTED',
    'RESEARCH_QUEUE',
    [removed.originalSourceUrl],
    0,
    'warning',
    { id: removed.id, title: removed.title }
  );

  db.save();
  res.json({ success: true, message: 'Record rejected and removed from queue.' });
});

/**
 * 9. Examination Monitoring Proposals
 */
aiRouter.get('/exams/proposals', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  res.json(store.aiExamProposals || []);
});

aiRouter.post('/exams/monitor/:code', async (req: AuthenticatedRequest, res: Response) => {
  const code = req.params.code as any;
  if (!['GAT-B', 'DBT-JRF', 'GATE-BT', 'IIT-JAM', 'CUET-PG', 'CSIR-NET'].includes(code)) {
    return res.status(400).json({ error: 'Invalid exam code. Must be one of the 6 supported examinations.' });
  }

  try {
    const proposals = await examinationMonitorEngine.monitorExam(code);
    res.json({
      success: true,
      examCode: code,
      proposalsGenerated: proposals.length,
      proposals,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

aiRouter.post('/exams/proposals/:id/approve', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const updatedExam = await examinationMonitorEngine.applyProposal(
      req.params.id,
      req.adminUser?.email || 'admin'
    );
    res.json({ success: true, exam: updatedExam });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

aiRouter.post('/exams/proposals/:id/reject', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const proposal = store.aiExamProposals.find((p) => p.id === req.params.id);
  if (!proposal) {
    return res.status(404).json({ error: 'Proposal not found' });
  }

  proposal.status = 'rejected';
  proposal.reviewedBy = req.adminUser?.email || 'admin';
  proposal.reviewedAt = new Date().toISOString();
  db.save();

  res.json({ success: true, message: 'Proposal rejected.' });
});

/**
 * 10. Weekly Opportunity Dispatches
 */
aiRouter.get('/dispatches', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  res.json(store.aiWeeklyDispatches || []);
});

aiRouter.post('/dispatches/generate', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const draft = await weeklyDispatchEngine.generateWeeklyDispatchDraft();
    res.json({ success: true, draft });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

aiRouter.post('/dispatches/:id/publish', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const draft = store.aiWeeklyDispatches.find((d) => d.id === req.params.id);
  if (!draft) {
    return res.status(404).json({ error: 'Dispatch draft not found' });
  }

  draft.status = 'published';
  draft.publishedAt = new Date().toISOString();
  draft.updatedAt = new Date().toISOString();

  db.addAuditLog(
    req.adminUser?.email || 'admin',
    'superadmin',
    'WEEKLY_DISPATCH_PUBLISHED',
    'NEWSLETTER',
    { id: draft.id, weekNumber: draft.weekNumber, year: draft.year }
  );

  db.save();
  res.json({ success: true, draft });
});

/**
 * 11. Activity Logs
 */
aiRouter.get('/logs', (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const { provider, status, search, limit } = req.query;

  let logs = [...store.aiActivityLogs];

  if (provider && typeof provider === 'string' && provider !== 'all') {
    logs = logs.filter((l) => l.providerUsed === provider);
  }

  if (status && typeof status === 'string' && status !== 'all') {
    logs = logs.filter((l) => l.status === status);
  }

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    logs = logs.filter((l) => l.action.toLowerCase().includes(s) || l.taskType.toLowerCase().includes(s));
  }

  const max = limit ? parseInt(limit as string, 10) : 100;
  res.json({
    total: logs.length,
    logs: logs.slice(0, max),
  });
});

/**
 * 12. Manual Task Triggers (Daily Cycle / Expiry Audit)
 */
aiRouter.post('/tasks/run-daily', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await schedulerEngine.runDailyCycle();
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

aiRouter.post('/tasks/audit-expired', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await verificationEngine.auditExpiredOpportunities();
    res.json({ success: true, result });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
