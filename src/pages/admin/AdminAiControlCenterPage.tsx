import React, { useState, useEffect, useCallback } from 'react';
import {
  BrainCircuit,
  Cpu,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Clock,
  Play,
  Pause,
  Sliders,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  Database,
  ArrowRight,
  TrendingUp,
  Info,
  Server,
  Key,
  Calendar,
  Send,
  Trash2,
  ChevronRight,
  Check,
  X,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

interface ProviderHealth {
  provider: string;
  configured: boolean;
  operational: boolean;
  latencyMs?: number;
  model: string;
  message: string;
  error?: string;
}

interface AiStatusData {
  config: {
    operatingMode: 'research_only' | 'review_mode' | 'controlled_autonomous';
    activeProvider: string;
    providerPriorities: string[];
    providerSettings: Record<string, any>;
    monthlyBudgetINR: number;
    monthlyUsageRequests: number;
    monthlyTokensUsed: number;
    autoScheduleEnabled: boolean;
    ollamaBaseUrl: string;
  };
  metrics: {
    totalResearched: number;
    pendingReview: number;
    verifiedCount: number;
    pendingExamProposals: number;
    monthlyUsageRequests: number;
    monthlyBudgetINR: number;
    zeroCostPolicyActive: boolean;
  };
  scheduler: {
    isRunning: boolean;
    checkpoints: any[];
  };
}

interface ResearchItem {
  id: string;
  title: string;
  category: string;
  institution: string;
  originalSourceUrl: string;
  notificationUrlOrPdf: string;
  applicationDeadline?: string;
  eligibility?: string;
  stipendOrFunding?: string;
  location?: string;
  lastCheckedAt: string;
  verificationStatus: string;
  evidenceNotes: string;
  discoveredByProvider: string;
  isPublishedToLive: boolean;
}

interface ExamProposal {
  id: string;
  examCode: string;
  examName: string;
  field: string;
  currentValue: string;
  proposedValue: string;
  officialSourceUrl: string;
  evidence: string;
  status: 'pending_review' | 'approved' | 'rejected';
  detectedAt: string;
}

interface AiLog {
  id: string;
  timestamp: string;
  providerUsed: string;
  action: string;
  taskType: string;
  sourcesChecked: string[];
  recordsFound: number;
  status: 'success' | 'warning' | 'failed' | 'paused';
  details?: any;
}

export const AdminAiControlCenterPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'verification' | 'exams' | 'dispatches' | 'logs' | 'settings'>('overview');
  const [statusData, setStatusData] = useState<AiStatusData | null>(null);
  const [providerHealth, setProviderHealth] = useState<ProviderHealth[]>([]);
  const [researchItems, setResearchItems] = useState<ResearchItem[]>([]);
  const [examProposals, setExamProposals] = useState<ExamProposal[]>([]);
  const [activityLogs, setActivityLogs] = useState<AiLog[]>([]);
  const [weeklyDispatches, setWeeklyDispatches] = useState<any[]>([]);

  // Loading & Action states
  const [loading, setLoading] = useState(true);
  const [pingingProviders, setPingingProviders] = useState(false);
  const [researching, setResearching] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Research form controls
  const [researchCategory, setResearchCategory] = useState<string>('all');
  const [targetExam, setTargetExam] = useState<string>('');
  const [targetInstitution, setTargetInstitution] = useState<string>('');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [maxResults, setMaxResults] = useState<number>(6);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchStatus = useCallback(async () => {
    try {
      const res = await safeFetchJson<AiStatusData>('/api/admin/ai/status');
      if (res.ok && res.data) {
        setStatusData(res.data);
      }
    } catch (e) {
      console.warn('Failed to fetch AI status:', e);
    }
  }, []);

  const fetchResearchQueue = useCallback(async () => {
    try {
      const res = await safeFetchJson<{ items: ResearchItem[] }>('/api/admin/ai/research/queue');
      if (res.ok && res.data) {
        setResearchItems(res.data.items || []);
      }
    } catch (e) {
      console.warn('Failed to fetch research queue:', e);
    }
  }, []);

  const fetchExamProposals = useCallback(async () => {
    try {
      const res = await safeFetchJson<ExamProposal[]>('/api/admin/ai/exams/proposals');
      if (res.ok && res.data) {
        setExamProposals(res.data);
      }
    } catch (e) {
      console.warn('Failed to fetch exam proposals:', e);
    }
  }, []);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await safeFetchJson<{ logs: AiLog[] }>('/api/admin/ai/logs?limit=50');
      if (res.ok && res.data) {
        setActivityLogs(res.data.logs || []);
      }
    } catch (e) {
      console.warn('Failed to fetch activity logs:', e);
    }
  }, []);

  const fetchDispatches = useCallback(async () => {
    try {
      const res = await safeFetchJson<any[]>('/api/admin/ai/dispatches');
      if (res.ok && res.data) {
        setWeeklyDispatches(res.data);
      }
    } catch (e) {
      console.warn('Failed to fetch dispatches:', e);
    }
  }, []);

  // Initial load
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchStatus(),
      fetchResearchQueue(),
      fetchExamProposals(),
      fetchLogs(),
      fetchDispatches(),
    ]).finally(() => setLoading(false));
  }, [fetchStatus, fetchResearchQueue, fetchExamProposals, fetchLogs, fetchDispatches]);

  // Ping Providers Health
  const handlePingProviders = async () => {
    setPingingProviders(true);
    setActionError(null);
    setActionSuccess(null);
    const res = await safeFetchJson<{ success: boolean; report: ProviderHealth[] }>('/api/admin/ai/health-check', {
      method: 'POST',
    });
    if (res.ok && res.data) {
      setProviderHealth(res.data.report || []);
      setActionSuccess('Provider health check completed successfully.');
      fetchStatus();
    } else {
      setActionError(res.error || 'Health check failed.');
    }
    setPingingProviders(false);
  };

  // Run Research Cycle
  const handleStartResearch = async () => {
    setResearching(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await safeFetchJson<{ recordsFound?: number }>('/api/admin/ai/research/run', {
        method: 'POST',
        body: JSON.stringify({
          category: researchCategory !== 'all' ? researchCategory : undefined,
          targetInstitution: targetInstitution || undefined,
          targetExam: targetExam || undefined,
          customQuery: customQuery || undefined,
          maxResults,
        }),
      });

      if (res.ok) {
        setActionSuccess(`Research cycle completed! Discovered ${res.data?.recordsFound || 0} genuine opportunities.`);
        fetchResearchQueue();
        fetchStatus();
        fetchLogs();
      } else {
        setActionError(res.error || 'Research execution failed.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error executing research cycle.');
    } finally {
      setResearching(false);
    }
  };

  // Verify Record
  const handleVerifyRecord = async (id: string) => {
    try {
      const res = await safeFetchJson(`/api/admin/ai/research/verify/${id}`, {
        method: 'POST',
      });
      if (res.ok) {
        setActionSuccess('Record verified through official portal comparison pipeline.');
        fetchResearchQueue();
        fetchStatus();
      } else {
        setActionError(res.error || 'Verification error.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Verification error.');
    }
  };

  // Publish Record to Live Site
  const handlePublishRecord = async (id: string) => {
    try {
      const res = await safeFetchJson<{ opportunity: { title: string } }>(`/api/admin/ai/research/publish/${id}`, {
        method: 'POST',
      });
      if (res.ok && res.data) {
        setActionSuccess(`Published to live site: "${res.data.opportunity.title}"`);
        fetchResearchQueue();
        fetchStatus();
      } else {
        setActionError(res.error || 'Publish failed.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error publishing record.');
    }
  };

  // Batch Publish All Verified Records to Live Site
  const handlePublishAllVerified = async () => {
    try {
      const res = await safeFetchJson<{ publishedCount: number }>('/api/admin/ai/research/publish-all-verified', {
        method: 'POST',
      });
      if (res.ok && res.data) {
        setActionSuccess(`Successfully published ${res.data.publishedCount} verified opportunities to the live website!`);
        fetchResearchQueue();
        fetchStatus();
      } else {
        setActionError(res.error || 'Batch publish failed.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error publishing verified items.');
    }
  };

  // Reject / Remove Record
  const handleRejectRecord = async (id: string) => {
    if (!confirm('Are you sure you want to reject and remove this research lead?')) return;
    try {
      const res = await safeFetchJson(`/api/admin/ai/research/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setActionSuccess('Record removed from research queue.');
        fetchResearchQueue();
        fetchStatus();
      } else {
        setActionError(res.error || 'Error removing record.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error removing record.');
    }
  };

  // Monitor Exam
  const handleMonitorExam = async (code: string) => {
    setActionError(null);
    setActionSuccess(null);
    try {
      const res = await safeFetchJson<{ proposalsGenerated: number }>(`/api/admin/ai/exams/monitor/${code}`, {
        method: 'POST',
      });
      if (res.ok && res.data) {
        setActionSuccess(`Exam bulletin check for ${code} finished. Proposals generated: ${res.data.proposalsGenerated}`);
        fetchExamProposals();
        fetchStatus();
      } else {
        setActionError(res.error || 'Exam check failed.');
      }
    } catch (e: any) {
      setActionError(e.message || 'Error monitoring examination.');
    }
  };

  // Approve Exam Proposal
  const handleApproveExamProposal = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/ai/exams/proposals/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionSuccess('Examination correction approved and applied to live portal data.');
        fetchExamProposals();
        fetchStatus();
      }
    } catch (e: any) {
      setActionError(e.message || 'Error approving proposal.');
    }
  };

  // Generate Weekly Dispatch
  const handleGenerateDispatch = async () => {
    try {
      const res = await fetch('/api/admin/ai/dispatches/generate', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionSuccess('New Weekly Opportunity Dispatch draft prepared for review.');
        fetchDispatches();
        fetchStatus();
      }
    } catch (e: any) {
      setActionError(e.message || 'Error generating weekly dispatch.');
    }
  };

  // Update Operating Mode
  const handleUpdateMode = async (mode: 'research_only' | 'review_mode' | 'controlled_autonomous') => {
    try {
      const res = await fetch('/api/admin/ai/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operatingMode: mode }),
      });
      if (res.ok) {
        setActionSuccess(`Operating Mode updated to: ${mode.toUpperCase().replace('_', ' ')}`);
        fetchStatus();
      }
    } catch (e: any) {
      setActionError(e.message || 'Error updating mode.');
    }
  };

  const filteredResearchItems = researchItems.filter((item) => {
    if (statusFilter !== 'all' && item.verificationStatus !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.institution.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-serif">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Autonomous AI Research & Verification Engine
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Multi-Provider AI (Gemini, Groq, OpenRouter, Ollama) • ₹0 Monthly Budget Policy • Grounded in Official Portals
              </p>
            </div>
          </div>
        </div>

        {/* Global Controls & Status Pill */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Zero Cost Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>₹0 Budget • Paid Fallback Disabled</span>
          </div>

          {/* Health Check Button */}
          <button
            onClick={handlePingProviders}
            disabled={pingingProviders}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${pingingProviders ? 'animate-spin' : ''}`} />
            <span>{pingingProviders ? 'Pinging Providers...' : 'Test Providers'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError(null)} className="text-rose-600 hover:text-rose-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview & Providers', icon: Cpu },
          { id: 'research', label: 'Research Control', icon: Search },
          { id: 'verification', label: `Verification Queue (${statusData?.metrics.pendingReview || 0})`, icon: FileCheck2 },
          { id: 'exams', label: `Exam Monitor (${statusData?.metrics.pendingExamProposals || 0})`, icon: GraduationCap },
          { id: 'dispatches', label: 'Weekly Dispatches', icon: Send },
          { id: 'logs', label: 'Activity Logs', icon: FileText },
          { id: 'settings', label: 'Autonomy Settings', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 1: OVERVIEW & PROVIDERS */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Total Opportunities Researched</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                {statusData?.metrics.totalResearched || 0}
              </span>
              <span className="text-[10px] text-emerald-600 mt-1 block">
                {statusData?.metrics.verifiedCount || 0} Verified Official
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Pending Verification Review</span>
              <span className="text-2xl font-bold text-amber-600 mt-1 block">
                {statusData?.metrics.pendingReview || 0}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Awaiting admin publication</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Exam Bulletin Proposals</span>
              <span className="text-2xl font-bold text-indigo-600 mt-1 block">
                {statusData?.metrics.pendingExamProposals || 0}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Across 6 supported exams</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-semibold block">Current Monthly Cost</span>
              <span className="text-2xl font-bold text-emerald-600 mt-1 block">₹0.00</span>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {statusData?.config.monthlyUsageRequests || 0} requests this month
              </span>
            </div>
          </div>

          {/* Provider Matrix Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Multi-Provider AI Hierarchy</h2>
                <p className="text-xs text-slate-500">
                  Automatic failover order: Gemini (Primary) → Groq → OpenRouter (Free) → Ollama Gemma 3 → Ollama Qwen
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                Active Provider: {statusData?.config.activeProvider?.toUpperCase() || 'GEMINI'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {[
                {
                  id: 'gemini',
                  name: 'Google Gemini',
                  type: 'Cloud (Primary)',
                  defaultModel: 'gemini-3.8-flash',
                  envKey: 'GEMINI_API_KEY',
                  freeBadge: 'Free Tier Available',
                },
                {
                  id: 'groq',
                  name: 'Groq Cloud',
                  type: 'Cloud (Secondary)',
                  defaultModel: 'llama-3.3-70b-versatile',
                  envKey: 'GROQ_API_KEY',
                  freeBadge: 'Free Rate Limits',
                },
                {
                  id: 'openrouter',
                  name: 'OpenRouter',
                  type: 'Cloud (Third)',
                  defaultModel: 'llama-3.3-70b:free',
                  envKey: 'OPENROUTER_API_KEY',
                  freeBadge: 'Free Models Only',
                },
                {
                  id: 'ollama_gemma',
                  name: 'Ollama Gemma 3',
                  type: 'Local LLM (Gemma 3:4b)',
                  defaultModel: 'gemma3:4b',
                  envKey: 'OLLAMA_BASE_URL',
                  freeBadge: '100% Offline / Local',
                },
                {
                  id: 'ollama_qwen',
                  name: 'Ollama Qwen 2.5',
                  type: 'Local LLM (Qwen 1.5b)',
                  defaultModel: 'qwen2.5:1.5b',
                  envKey: 'OLLAMA_BASE_URL',
                  freeBadge: '100% Offline / Local',
                },
              ].map((prov, idx) => {
                const health = providerHealth.find((h) => h.provider === prov.id);
                const settings = statusData?.config.providerSettings?.[prov.id];
                return (
                  <div
                    key={prov.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {idx + 1}. {prov.name}
                        </span>
                        {health?.operational ? (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-400" title="Unchecked / Offline" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block">{prov.type}</span>
                      <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 block mt-1">
                        {settings?.model || prov.defaultModel}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] space-y-1">
                      <div className="text-slate-500">
                        Env: <code className="font-mono text-slate-700 dark:text-slate-300">{prov.envKey}</code>
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-semibold">{prov.freeBadge}</div>
                      {health && (
                        <div className="text-[9px] text-slate-500 truncate" title={health.message}>
                          {health.operational ? `Latency: ${health.latencyMs}ms` : health.message}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operating Mode Selector Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Autonomous Operating Modes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  id: 'research_only',
                  title: '1. Research Mode (Default)',
                  desc: 'AI gathers and logs official opportunities. No live publishing without explicit admin review.',
                  badge: 'Safest',
                },
                {
                  id: 'review_mode',
                  title: '2. Review Mode',
                  desc: 'AI prepares complete diffs, summaries, and verification reports. Admin must click Approve.',
                  badge: 'Recommended',
                },
                {
                  id: 'controlled_autonomous',
                  title: '3. Controlled Autonomous',
                  desc: 'AI automatically archives expired listings and verifies source timestamps. Major edits require approval.',
                  badge: 'Automated Routine',
                },
              ].map((mode) => {
                const active = statusData?.config.operatingMode === mode.id;
                return (
                  <div
                    key={mode.id}
                    onClick={() => handleUpdateMode(mode.id as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'border-cyan-600 bg-cyan-50/60 dark:bg-cyan-950/40 shadow-xs ring-1 ring-cyan-600'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{mode.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {mode.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{mode.desc}</p>
                    {active && (
                      <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold mt-2 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Active Mode
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 2: RESEARCH CONTROL */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Trigger Targeted Autonomous Research</h2>
              <p className="text-xs text-slate-500">
                Directs the AI Engine to query authoritative Indian scientific departments (DBT, DST, CSIR, ICMR, IISc, IITs, NTA) and extract verifiable opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Category */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Category</label>
                <select
                  value={researchCategory}
                  onChange={(e) => setResearchCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  <option value="job">Biotechnology & JRF Jobs</option>
                  <option value="internship">Summer Fellowships & Internships</option>
                  <option value="fellowship">Research Fellowships & Grants</option>
                  <option value="admission">PhD & University Admissions</option>
                  <option value="exam">National Examination Updates</option>
                </select>
              </div>

              {/* Target Institution */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Institution</label>
                <select
                  value={targetInstitution}
                  onChange={(e) => setTargetInstitution(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Any Institutional Portal</option>
                  <option value="DBT">Department of Biotechnology (DBT)</option>
                  <option value="DST-SERB">DST / ANRF / SERB</option>
                  <option value="CSIR">Council of Scientific & Industrial Research (CSIR)</option>
                  <option value="ICMR">Indian Council of Medical Research (ICMR)</option>
                  <option value="IISc Bengaluru">IISc Bengaluru</option>
                  <option value="RCB Faridabad">Regional Centre for Biotechnology (RCB)</option>
                  <option value="TIFR-NCBS">TIFR / NCBS Bengaluru</option>
                  <option value="IITs">Indian Institutes of Technology (IITs)</option>
                </select>
              </div>

              {/* Target Examination */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Examination</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">No Exam Specific</option>
                  <option value="GAT-B">GAT-B (RCB / NTA)</option>
                  <option value="DBT-JRF">DBT-JRF / BET</option>
                  <option value="GATE-BT">GATE Biotechnology</option>
                  <option value="IIT-JAM">IIT JAM Biotechnology</option>
                  <option value="CUET-PG">CUET-PG Life Sciences</option>
                  <option value="CSIR-NET">CSIR-NET Life Sciences</option>
                </select>
              </div>

              {/* Max Items */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Max Results</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={maxResults}
                  onChange={(e) => setMaxResults(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Custom Query Input */}
            <div className="text-xs">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Custom Research Topic / Official Lead (Optional)
              </label>
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="e.g., BIRAC BIG grant 2026 call for proposals or ICMR JRF biomedical"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
              <div className="text-[11px] text-slate-500">
                Operating under <strong className="text-slate-700 dark:text-slate-300">{statusData?.config.operatingMode}</strong>.
              </div>
              <button
                onClick={handleStartResearch}
                disabled={researching}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {researching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Researching Official Portals...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Start Research Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 3: VERIFICATION QUEUE */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <div className="relative w-full sm:w-72 text-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search research queue..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto text-xs flex-wrap sm:flex-nowrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Verification Statuses</option>
                <option value="Verified Official">Verified Official</option>
                <option value="Official Source Found – Further Review Needed">Needs Further Review</option>
                <option value="Expired">Expired</option>
                <option value="Unverified">Unverified</option>
              </select>

              <button
                onClick={handlePublishAllVerified}
                disabled={researchItems.filter((r) => r.verificationStatus === 'Verified Official' && !r.isPublishedToLive).length === 0}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 whitespace-nowrap"
                title="Promote all verified official opportunities to the live website"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  Publish All Verified (
                  {researchItems.filter((r) => r.verificationStatus === 'Verified Official' && !r.isPublishedToLive).length}
                  )
                </span>
              </button>
            </div>
          </div>

          {/* List of Researched Items */}
          {filteredResearchItems.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-semibold">No opportunities currently match the filter.</p>
              <p className="text-xs text-slate-400 mt-1">Use "Research Control" to discover new opportunities.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredResearchItems.map((item) => {
                const isVerified = item.verificationStatus === 'Verified Official';
                const isExpired = item.verificationStatus === 'Expired';
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-3 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              isVerified
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : isExpired
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {item.verificationStatus}
                          </span>
                          <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                            {item.category}
                          </span>
                          {item.isPublishedToLive && (
                            <span className="text-[10px] bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 px-2 py-0.5 rounded font-bold">
                              LIVE ON WEBSITE
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">{item.title}</h3>
                        <p className="text-xs text-cyan-700 dark:text-cyan-400 font-semibold">{item.institution}</p>
                      </div>

                      {/* Top Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {!item.isPublishedToLive && !isExpired && (
                          <button
                            onClick={() => handlePublishRecord(item.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Publish</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleVerifyRecord(item.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Re-run 9-step verification"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </button>
                        <button
                          onClick={() => handleRejectRecord(item.id)}
                          className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Reject and delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 block">Deadline:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.applicationDeadline || 'Refer to bulletin'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Stipend / Salary:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.stipendOrFunding || 'As per GOI / DST norms'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Location:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{item.location || 'India'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Provider Lead:</span>
                        <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                          {item.discoveredByProvider}
                        </span>
                      </div>
                    </div>

                    {/* Evidence and Source Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-slate-500 text-[11px]">
                        <strong>Evidence:</strong> {item.evidenceNotes}
                      </div>
                      {item.originalSourceUrl && item.originalSourceUrl.startsWith('http') && (
                        <a
                          href={item.originalSourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-700 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 shrink-0"
                        >
                          <span>Official Notification URL</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 4: EXAMINATION MONITOR */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'exams' && (
        <div className="space-y-6">
          {/* Quick Exam Check Grid */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                6 National Competitive Examinations Monitor
              </h2>
              <p className="text-xs text-slate-500">
                Monitors official bulletins strictly for: GAT-B, DBT-JRF / BET, GATE Biotechnology, IIT JAM, CUET-PG, CSIR-NET Life Sciences.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { code: 'GAT-B', name: 'GAT-B (RCB)' },
                { code: 'DBT-JRF', name: 'DBT-JRF / BET' },
                { code: 'GATE-BT', name: 'GATE Biotech' },
                { code: 'IIT-JAM', name: 'IIT JAM BT' },
                { code: 'CUET-PG', name: 'CUET-PG Life Sci' },
                { code: 'CSIR-NET', name: 'CSIR-NET Life Sci' },
              ].map((exam) => (
                <button
                  key={exam.code}
                  onClick={() => handleMonitorExam(exam.code)}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-cyan-500 text-left transition-colors cursor-pointer group"
                >
                  <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-cyan-600">
                    {exam.code}
                  </div>
                  <div className="text-[10px] text-slate-500">{exam.name}</div>
                  <div className="text-[10px] text-cyan-700 dark:text-cyan-400 mt-2 font-semibold flex items-center gap-1">
                    <span>Check Bulletin</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Proposals Diff List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Official Bulletin Diff & Proposed Corrections ({examProposals.filter((p) => p.status === 'pending_review').length} Pending)
            </h2>

            {examProposals.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No active exam change proposals. Click any of the 6 examinations above to scan official portals.
              </div>
            ) : (
              <div className="space-y-4">
                {examProposals.map((prop) => (
                  <div
                    key={prop.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded font-mono">
                          {prop.examCode}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          Field: <code className="font-mono text-cyan-700 dark:text-cyan-400">{prop.field}</code>
                        </span>
                      </div>

                      {prop.status === 'pending_review' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApproveExamProposal(prop.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Approve & Apply
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 uppercase">{prop.status}</span>
                      )}
                    </div>

                    {/* Diff View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl">
                        <span className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase block mb-1">
                          Current Stored Value:
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed">
                          {prop.currentValue || '(Empty)'}
                        </p>
                      </div>

                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-xl">
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block mb-1">
                          Proposed Official Update:
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 text-[11px] leading-relaxed">
                          {prop.proposedValue}
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span><strong>Evidence:</strong> {prop.evidence}</span>
                      <a href={prop.officialSourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline flex items-center gap-1">
                        <span>Source Bulletin</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 5: WEEKLY DISPATCHES */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'dispatches' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">BioScience Weekly Opportunity Digest</h2>
              <p className="text-xs text-slate-500">
                Compiles verified jobs, internships, fellowships, and examination updates into an editorial draft.
              </p>
            </div>
            <button
              onClick={handleGenerateDispatch}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Generate New Weekly Draft</span>
            </button>
          </div>

          <div className="space-y-4">
            {weeklyDispatches.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                No weekly digests generated yet. Click "Generate New Weekly Draft" above.
              </div>
            ) : (
              weeklyDispatches.map((dispatch) => (
                <div
                  key={dispatch.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{dispatch.title}</h3>
                      <span className="text-xs text-slate-500">Generated on: {new Date(dispatch.createdAt).toLocaleString()}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-cyan-50 text-cyan-800 border border-cyan-200">
                      STATUS: {dispatch.status.toUpperCase()}
                    </span>
                  </div>

                  {/* HTML Preview Box */}
                  <div
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-h-80 overflow-y-auto text-xs"
                    dangerouslySetInnerHTML={{ __html: dispatch.fullDraftHtml }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 6: ACTIVITY LOGS */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'logs' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Autonomous Activity Audit Trail</h2>
            <button
              onClick={fetchLogs}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              title="Refresh logs"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs flex items-start justify-between gap-4"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200">
                      {log.providerUsed}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({log.taskType})</span>
                  </div>
                  {log.details && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      {JSON.stringify(log.details)}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">₹0.00 Cost</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 7: SETTINGS & POLICIES */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">AI Engine Configuration & Policies</h2>
            <p className="text-xs text-slate-500">
              Configure local Ollama URL, scheduling, and view active ₹0 cost guarantees.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                Strict ₹0 Monthly AI Budget Guarantee
              </span>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
                The AI Engine strictly enforces free-tier operations. Paid fallback is permanently disabled at the code level.
                If all free providers are exhausted, background tasks are safely paused without incurring any charges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Local Ollama Base URL
                </label>
                <input
                  type="text"
                  value={statusData?.config.ollamaBaseUrl || 'http://localhost:11434'}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Configured via environment variable <code>OLLAMA_BASE_URL</code>.
                </span>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Daily Check Schedule
                </label>
                <input
                  type="text"
                  value="Every Day at 03:00 UTC (8:30 AM IST)"
                  readOnly
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Runs daily opportunity check and audits expired listings.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
