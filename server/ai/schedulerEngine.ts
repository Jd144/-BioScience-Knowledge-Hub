import { db, TaskCheckpoint } from '../db.js';
import { webResearchEngine } from './webResearchEngine.js';
import { verificationEngine } from './verificationEngine.js';
import { examinationMonitorEngine } from './monitorEngine.js';
import { weeklyDispatchEngine } from './weeklyDispatchEngine.js';

export class SchedulerEngine {
  private isRunningTask = false;
  private intervalTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.startBackgroundTimer();
  }

  public getStatus(): { isRunning: boolean; checkpoints: TaskCheckpoint[] } {
    return {
      isRunning: this.isRunningTask,
      checkpoints: db.getData().aiTaskCheckpoints || [],
    };
  }

  public updateCheckpoint(taskType: string, step: string, status: 'running' | 'paused' | 'completed' | 'failed', error?: string): void {
    const store = db.getData();
    let cp = store.aiTaskCheckpoints.find((c) => c.taskType === taskType);
    if (!cp) {
      cp = {
        id: 'cp-' + taskType,
        taskType,
        lastStep: step,
        savedAt: new Date().toISOString(),
        state: {},
        status,
        error,
      };
      store.aiTaskCheckpoints.unshift(cp);
    } else {
      cp.lastStep = step;
      cp.savedAt = new Date().toISOString();
      cp.status = status;
      cp.error = error;
    }
    db.save();
  }

  /**
   * Run full daily research & verification cycle
   */
  public async runDailyCycle(): Promise<{ newOpportunities: number; expiredArchived: number; examProposals: number }> {
    if (this.isRunningTask) {
      throw new Error('Another AI background task is already executing. Please wait.');
    }

    this.isRunningTask = true;
    this.updateCheckpoint('daily_cycle', 'STARTED', 'running');

    try {
      // 1. Research jobs and fellowships
      this.updateCheckpoint('daily_cycle', 'RESEARCHING_JOBS', 'running');
      const jobs = await webResearchEngine.conductResearchCycle({ category: 'job', maxResults: 4 });

      // 2. Research internships
      this.updateCheckpoint('daily_cycle', 'RESEARCHING_INTERNSHIPS', 'running');
      const internships = await webResearchEngine.conductResearchCycle({ category: 'internship', maxResults: 3 });

      // 3. Monitor priority exams (e.g., GAT-B, CSIR-NET)
      this.updateCheckpoint('daily_cycle', 'MONITORING_EXAMS', 'running');
      let totalExamProposals = 0;
      try {
        const gatbProp = await examinationMonitorEngine.monitorExam('GAT-B');
        const csirProp = await examinationMonitorEngine.monitorExam('CSIR-NET');
        totalExamProposals = gatbProp.length + csirProp.length;
      } catch (e) {
        console.warn('[SchedulerEngine] Exam monitor step warning:', e);
      }

      // 4. Audit expired listings
      this.updateCheckpoint('daily_cycle', 'AUDITING_EXPIRY', 'running');
      const auditResult = await verificationEngine.auditExpiredOpportunities();

      this.updateCheckpoint('daily_cycle', 'COMPLETED', 'completed');
      this.isRunningTask = false;

      return {
        newOpportunities: jobs.length + internships.length,
        expiredArchived: auditResult.expiredArchived,
        examProposals: totalExamProposals,
      };
    } catch (err: any) {
      this.updateCheckpoint('daily_cycle', 'FAILED', 'failed', err.message);
      this.isRunningTask = false;
      throw err;
    }
  }

  /**
   * Run weekly digest cycle
   */
  public async runWeeklyDigestCycle(): Promise<any> {
    if (this.isRunningTask) {
      throw new Error('Another AI task is executing.');
    }
    this.isRunningTask = true;
    this.updateCheckpoint('weekly_digest', 'STARTED', 'running');

    try {
      const draft = await weeklyDispatchEngine.generateWeeklyDispatchDraft();
      this.updateCheckpoint('weekly_digest', 'COMPLETED', 'completed');
      this.isRunningTask = false;
      return draft;
    } catch (err: any) {
      this.updateCheckpoint('weekly_digest', 'FAILED', 'failed', err.message);
      this.isRunningTask = false;
      throw err;
    }
  }

  private startBackgroundTimer(): void {
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
    if (isServerless) return;

    // Periodic check every 15 minutes to trigger auto-tasks if scheduled and due
    this.intervalTimer = setInterval(() => {
      const store = db.getData();
      if (!store.aiConfig.autoScheduleEnabled) return;

      const now = new Date();
      // Check if it's the scheduled UTC hour (default 3 UTC = 8:30 AM IST) and hasn't run today
      const today = now.toISOString().substring(0, 10);
      const lastRun = store.aiTaskCheckpoints.find((c) => c.taskType === 'daily_cycle')?.savedAt?.substring(0, 10);

      if (now.getUTCHours() === (store.aiConfig.dailyCheckHourUtc || 3) && lastRun !== today && !this.isRunningTask) {
        console.log('[SchedulerEngine] Auto-triggering scheduled daily AI research cycle...');
        this.runDailyCycle().catch((e) => console.warn('[SchedulerEngine] Scheduled daily cycle error:', e.message));
      }
    }, 15 * 60 * 1000);

    if (this.intervalTimer && typeof this.intervalTimer.unref === 'function') {
      this.intervalTimer.unref();
    }
  }
}

export const schedulerEngine = new SchedulerEngine();
