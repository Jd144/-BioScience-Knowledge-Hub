import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  BookOpen,
  FileText,
  GraduationCap,
  Briefcase,
  Clock,
  AlertTriangle,
  Mail,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  FileCheck,
  RefreshCw,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';

export const AdminDashboardPage: React.FC = () => {
  const { adminUser, token } = useAdminAuth();
  const { data: maintenanceData } = useMaintenance();

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setStats(json);
      }
    } catch (e) {
      console.warn('Failed to load dashboard stats:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-serif">
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1">
            BioScience Hub Management Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {adminUser?.fullName?.split(' ')[0] || 'Administrator'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of academic content, 6 competitive exam portals, opportunities, and system health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchStats()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <Link
            to="/admin/maintenance"
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
              maintenanceData?.enabled
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>{maintenanceData?.enabled ? 'Maintenance Active' : 'Maintenance Settings'}</span>
          </Link>
        </div>
      </div>

      {/* ALERT CENTER */}
      {stats?.alerts && stats.alerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Priority Alert Center</span>
            </h2>
            <span className="text-[11px] text-slate-400">{stats.alerts.length} Action Items Pending</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stats.alerts.map((alert: any) => (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                  alert.type === 'warning' || alert.type === 'urgent'
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{alert.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>
                </div>
                {alert.link && (
                  <Link
                    to={alert.link}
                    className="shrink-0 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORE STATISTIC METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Total Subjects */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Academic Subjects</span>
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats?.counts?.totalSubjects ?? 11}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {stats?.counts?.totalTopics ?? 55} Syllabus Topics
          </div>
        </div>

        {/* Total Articles */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Published Articles</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats?.counts?.totalArticles ?? 1}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {stats?.counts?.draftContent ?? 0} Drafts in progress
          </div>
        </div>

        {/* Examinations */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>6 Exam Portals</span>
            <GraduationCap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            6
          </div>
          <div className="text-[11px] text-slate-400">
            GAT-B, DBT-JRF, GATE, JAM, CUET, NET
          </div>
        </div>

        {/* Active Opportunities */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Opportunities</span>
            <Briefcase className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
            {stats?.counts?.activeOpportunities ?? 2}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            {stats?.counts?.upcomingDeadlines ?? 1} closing in 14 days
          </div>
        </div>

        {/* Expired Opportunities */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Expired Opportunities</span>
            <Clock className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
            {stats?.counts?.expiredOpportunities ?? 1}
          </div>
          <div className="text-[11px] text-slate-400">
            Auto-marked via server date
          </div>
        </div>

        {/* Content Pending Verification */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Review Queue</span>
            <FileCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats?.counts?.contentPendingVerification ?? 0}
          </div>
          <div className="text-[11px] text-slate-400">
            Awaiting official citation audit
          </div>
        </div>

        {/* Contact Submissions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Contact Messages</span>
            <Mail className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats?.counts?.contactSubmissions ?? 1}
          </div>
          <div className="text-[11px] text-slate-400">
            {stats?.counts?.unreadContacts ?? 0} Unread inquiries
          </div>
        </div>

        {/* Newsletter Subscribers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Subscribers</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {stats?.counts?.newsletterSubscribers ?? 1}
          </div>
          <div className="text-[11px] text-slate-400">
            CSV Export available
          </div>
        </div>
      </div>

      {/* QUICK WORKSPACE LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Maintenance Card */}
        <Link
          to="/admin/maintenance"
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono">
              Control <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
            Maintenance Mode Control
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Configure expected reopening dates, manage countdown timer, and customize English & Hindi warm personal messages.
          </p>
        </Link>

        {/* 2. Opportunities Card */}
        <Link
          to="/admin/opportunities"
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </span>
            <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
            Opportunities & Jobs CMS
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Verify jobs, fellowships, and internships with zero fabricated data, automatic expiry detection, and official links.
          </p>
        </Link>

        {/* 3. Examinations Card */}
        <Link
          to="/admin/exams"
          className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-800 hover:border-cyan-500/50 transition-all group shadow-md"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono">
              Configure <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
            6 Competitive Exam Portals
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Audit syllabi, eligibility criteria, and BioScience Mastery destination deep links for GAT-B, GATE BT, and NET.
          </p>
        </Link>
      </div>

      {/* RECENT AUDIT ACTIVITY TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recent System & Security Audit Trail
            </h2>
          </div>
          <Link to="/admin/users" className="text-xs text-cyan-400 hover:underline">
            View Full Audit Log →
          </Link>
        </div>

        <div className="divide-y divide-slate-800 overflow-x-auto text-xs font-mono">
          {stats?.recentAuditLogs?.length > 0 ? (
            stats.recentAuditLogs.map((log: any) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                    {log.action}
                  </span>
                  <span className="text-slate-300">{log.resource}</span>
                  <span className="text-slate-400 truncate max-w-md hidden sm:inline">
                    {log.details ? JSON.stringify(log.details).substring(0, 70) : ''}
                  </span>
                </div>
                <div className="text-right text-slate-400 text-[11px] shrink-0">
                  <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                  <div className="text-slate-400">{log.actorEmail}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-slate-400">Loading audit events...</div>
          )}
        </div>
      </div>
    </div>
  );
};
