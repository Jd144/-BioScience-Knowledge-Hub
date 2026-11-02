import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldAlert,
  BookOpen,
  FileText,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Newspaper,
  FolderOpen,
  ExternalLink,
  Mail,
  Search,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sliders,
  AlertTriangle,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';

export const AdminLayout: React.FC = () => {
  const { adminUser, logout } = useAdminAuth();
  const { data: maintenanceData } = useMaintenance();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      to: '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      to: '/admin/maintenance',
      label: 'Maintenance Control',
      icon: ShieldAlert,
      badge: maintenanceData?.enabled ? 'ACTIVE' : undefined,
      badgeColor: 'bg-rose-500 text-white animate-pulse',
    },
    {
      to: '/admin/subjects',
      label: 'Subjects & Topics',
      icon: BookOpen,
    },
    {
      to: '/admin/articles',
      label: 'Articles & Content CMS',
      icon: FileText,
    },
    {
      to: '/admin/exams',
      label: '6 Examinations',
      icon: GraduationCap,
    },
    {
      to: '/admin/opportunities',
      label: 'Opportunities & Jobs',
      icon: Briefcase,
    },
    {
      to: '/admin/lab-zone',
      label: 'Lab Zone & Calculators',
      icon: FlaskConical,
    },
    {
      to: '/admin/news-events',
      label: 'News, Events & Banners',
      icon: Newspaper,
    },
    {
      to: '/admin/media',
      label: 'Media & Resource Library',
      icon: FolderOpen,
    },
    {
      to: '/admin/ecosystem',
      label: 'BioScience Mastery Links',
      icon: ExternalLink,
    },
    {
      to: '/admin/contacts',
      label: 'Contacts & Subscribers',
      icon: Mail,
    },
    {
      to: '/admin/seo',
      label: 'SEO & Site Settings',
      icon: Sliders,
    },
    {
      to: '/admin/users',
      label: 'Admin Users & Audit Logs',
      icon: Users,
    },
  ];

  const isCurrent = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-serif">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold flex items-center justify-center text-sm shadow-sm">
              B
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block leading-none">
                BioScience Hub
              </span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Central Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Maintenance Status Pill & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Maintenance Live Status Indicator */}
          <Link
            to="/admin/maintenance"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border ${
              maintenanceData?.enabled
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                maintenanceData?.enabled ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'
              }`}
            />
            <span>{maintenanceData?.enabled ? 'MAINTENANCE MODE ACTIVE' : 'SYSTEM LIVE & PUBLIC'}</span>
          </Link>

          {/* Current Admin User */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
            <div className="text-right hidden md:block">
              <span className="font-bold text-white block leading-none">
                {adminUser?.fullName || 'Administrator'}
              </span>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                {adminUser?.role}
              </span>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Exit to Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-semibold flex items-center gap-1.5"
            title="Open public website in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Live Website</span>
          </a>
        </div>
      </header>

      {/* Main Admin Workspace Area with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0">
          <div className="p-4 border-b border-slate-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Management Modules
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const active = isCurrent(item.to, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor || 'bg-cyan-500 text-slate-950'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* System Footer Info */}
          <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between">
              <span>BioScience Hub Admin</span>
              <span className="font-mono text-cyan-400">v2.5.0</span>
            </div>
            <div>Asia/Kolkata (IST) Server Time</div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-10 p-4 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-white text-sm">Navigation Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto space-y-1">
                {navItems.map((item) => {
                  const active = isCurrent(item.to, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        active
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor || 'bg-cyan-500 text-slate-950'}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
