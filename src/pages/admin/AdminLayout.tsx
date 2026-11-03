/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Admin Layout
 * Clean white, professional design with light grey secondary surfaces,
 * subtle borders, crisp serif typography, and optional Dark Mode toggle.
 */

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
  Users,
  LogOut,
  Menu,
  X,
  Sliders,
  Bell,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';

export const AdminLayout: React.FC = () => {
  const { adminUser, logout } = useAdminAuth();
  const { data: maintenanceData } = useMaintenance();
  const { adminTheme, setAdminTheme, effectiveAdminTheme } = useTheme();
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
      to: '/admin/popups',
      label: 'Popup & Announcements',
      icon: Bell,
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
      label: 'Media Library',
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
      label: 'SEO Metadata',
      icon: Sliders,
    },
    {
      to: '/admin/settings',
      label: 'Central Admin Settings',
      icon: Settings,
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

  const toggleAdminTheme = () => {
    if (effectiveAdminTheme === 'dark') {
      setAdminTheme('light');
    } else {
      setAdminTheme('dark');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-serif transition-colors">
      {/* Top Header Bar - Clean White Style */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-4 sm:px-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-cyan-950 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm shadow-xs border border-cyan-800/40">
              B
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight block leading-none">
                BioScience Hub
              </span>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                Central Admin Control
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Maintenance Status Pill, Theme Toggle & User Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Maintenance Live Status Indicator */}
          <Link
            to="/admin/maintenance"
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border shadow-2xs ${
              maintenanceData?.enabled
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                maintenanceData?.enabled ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
              }`}
            />
            <span>{maintenanceData?.enabled ? 'MAINTENANCE ACTIVE' : 'PUBLIC SITE LIVE'}</span>
          </Link>

          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleAdminTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            title={`Switch to ${effectiveAdminTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme mode"
          >
            {effectiveAdminTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Current Admin User */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <div className="text-right hidden md:block">
              <span className="font-bold text-slate-900 dark:text-white block leading-none">
                {adminUser?.fullName || 'Administrator'}
              </span>
              <span className="text-[10px] font-mono uppercase text-cyan-700 dark:text-cyan-400 font-semibold">
                {adminUser?.role}
              </span>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Exit to Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            title="Open public website in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden md:inline">Public Site</span>
          </a>
        </div>
      </header>

      {/* Main Admin Workspace Area with Clean Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Clean White / Soft Grey Surface */}
        <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
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
                      ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/60 shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor || 'bg-cyan-600 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* System Footer Info */}
          <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">BioScience Hub CMS</span>
              <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">v2.6.0</span>
            </div>
            <div>Asia/Kolkata (IST) Server Time</div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-10 p-4 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white text-sm">Navigation Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
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
                          ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${item.badgeColor || 'bg-cyan-600 text-white'}`}>
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
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Outlet - Clean Grey / White Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
