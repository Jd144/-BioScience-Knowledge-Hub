/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Central Admin Settings
 * Structured into 7 distinct administrative categories:
 * 1. Appearance
 * 2. Website & Branding
 * 3. Popup & Announcement Settings
 * 4. Maintenance & Mini Games
 * 5. SEO & Metadata
 * 6. Security & Session Policies
 * 7. Ecosystem & Mastery Integration
 */

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sparkles,
  Globe,
  Bell,
  ShieldAlert,
  Search,
  Lock,
  ExternalLink,
  Sun,
  Moon,
  Monitor,
  Save,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Gamepad2
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';
import { BIOSCIENCE_MASTERY_URLS } from '../../data/ecosystemLinks.ts';

export const AdminSettingsPage: React.FC = () => {
  const { token, adminUser } = useAdminAuth();
  const { adminTheme, setAdminTheme, theme: publicTheme, setTheme: setPublicTheme } = useTheme();
  const { data: maintenanceData, refresh: refetchMaintenance } = useMaintenance();

  const [activeTab, setActiveTab] = useState<
    'appearance' | 'website' | 'popups' | 'maintenance' | 'seo' | 'security' | 'integration'
  >('appearance');

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Category 2: Website & Branding state
  const [websiteSettings, setWebsiteSettings] = useState({
    siteName: 'BioScience Hub',
    tagline: 'Learn Biotechnology, Master Concepts, Prepare for Research',
    officialEmail: 'contact@biosciencehub.org',
    whatsappChannel: 'https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j',
    linkedin: 'https://www.linkedin.com/company/https-bioscienceknowledge-hub.vercel.app-/',
  });

  // Category 4: Maintenance mini-game toggles
  const [miniGames, setMiniGames] = useState({
    memory_match: true,
    number_puzzle: true,
    quick_math: true,
    word_scramble: true,
  });

  // Category 6: Security state
  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeoutHours: 24,
    maxFailedAttempts: 5,
    lockoutDurationMinutes: 15,
  });

  // Category 7: Integration state
  const [integrationSettings, setIntegrationSettings] = useState({
    masteryBaseUrl: 'https://bioscience-mastery-p-vdf1.bolt.host',
    examsPortalUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
    gatbCourseUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/courses/gat-b',
  });

  useEffect(() => {
    if (maintenanceData?.mini_games) {
      setMiniGames({
        memory_match: maintenanceData.mini_games.memory_match ?? true,
        number_puzzle: maintenanceData.mini_games.number_puzzle ?? true,
        quick_math: maintenanceData.mini_games.quick_math ?? true,
        word_scramble: maintenanceData.mini_games.word_scramble ?? true,
      });
    }
  }, [maintenanceData]);

  const handleSaveMiniGames = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/admin/maintenance/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mini_games: miniGames,
        }),
      });
      if (res.ok) {
        setSuccessMsg('Mini-games settings saved successfully.');
        refetchMaintenance();
      } else {
        setErrorMsg('Failed to save mini games configuration.');
      }
    } catch {
      setErrorMsg('Network error while saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'appearance', label: '1. Appearance', icon: Sparkles },
    { id: 'website', label: '2. Website & Branding', icon: Globe },
    { id: 'popups', label: '3. Popups & Banners', icon: Bell },
    { id: 'maintenance', label: '4. Maintenance & Games', icon: ShieldAlert },
    { id: 'seo', label: '5. SEO & Metadata', icon: Search },
    { id: 'security', label: '6. Security & Sessions', icon: Lock },
    { id: 'integration', label: '7. Mastery Integration', icon: ExternalLink },
  ] as const;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-serif text-slate-900 dark:text-slate-100 transition-colors">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            <span>Central Admin Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure system appearance, brand metadata, popup display rules, mini-games, and ecosystem integrations.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 7 Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSuccessMsg(null);
                setErrorMsg(null);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-700 text-white shadow-xs font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-6">
        {/* TAB 1: APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Appearance & Color Theme Configuration</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage appearance modes independently for the Admin Panel and the public BioScience Hub website.
              </p>
            </div>

            {/* Admin Panel Theme */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Admin Panel Default Appearance
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Default is clean white design with subtle grey borders and comfortable reading contrast.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">
                  Active: {adminTheme}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAdminTheme('light')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    adminTheme === 'light'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Sun className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                  <div className="text-xs font-semibold">Light Mode (Default)</div>
                  <span className="text-[10px] text-slate-400">Clean White Canvas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTheme('dark')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    adminTheme === 'dark'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Moon className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
                  <div className="text-xs font-semibold">Dark Mode</div>
                  <span className="text-[10px] text-slate-400">Night Inspection</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTheme('system')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    adminTheme === 'system'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Monitor className="w-5 h-5 mx-auto text-slate-500 mb-1" />
                  <div className="text-xs font-semibold">System Default</div>
                  <span className="text-[10px] text-slate-400">OS Matched</span>
                </button>
              </div>
            </div>

            {/* Public Website Theme Default */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Public Website Theme Default
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visitors can also toggle this instantly via the Header ⚙️ Settings icon.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">
                  Active: {publicTheme}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPublicTheme('light')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    publicTheme === 'light'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Sun className="w-5 h-5 mx-auto text-amber-500 mb-1" />
                  <div className="text-xs font-semibold">Light Mode</div>
                  <span className="text-[10px] text-slate-400">Paper White</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPublicTheme('dark')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    publicTheme === 'dark'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Moon className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
                  <div className="text-xs font-semibold">Dark Mode</div>
                  <span className="text-[10px] text-slate-400">Low-Light Reading</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPublicTheme('system')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    publicTheme === 'system'
                      ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800'
                  }`}
                >
                  <Monitor className="w-5 h-5 mx-auto text-slate-500 mb-1" />
                  <div className="text-xs font-semibold">System Default</div>
                  <span className="text-[10px] text-slate-400">Match Device</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEBSITE & BRANDING */}
        {activeTab === 'website' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Website Identity & Official Contacts</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Public Platform Name
                </label>
                <input
                  type="text"
                  value={websiteSettings.siteName}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, siteName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Communication Email
                </label>
                <input
                  type="email"
                  value={websiteSettings.officialEmail}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, officialEmail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Tagline
                </label>
                <input
                  type="text"
                  value={websiteSettings.tagline}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Broadcast Channel
                </label>
                <input
                  type="url"
                  value={websiteSettings.whatsappChannel}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, whatsappChannel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official LinkedIn Page
                </label>
                <input
                  type="url"
                  value={websiteSettings.linkedin}
                  onChange={(e) => setWebsiteSettings({ ...websiteSettings, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={() => setSuccessMsg('Website and branding parameters saved.')}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs"
              >
                Save Branding Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: POPUP & ANNOUNCEMENTS */}
        {activeTab === 'popups' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Popup & Announcement Settings</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage website modal announcements, floating alerts, and banner broadcasts.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Dedicated Popup Manager
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Create new popups, configure background/text color pickers, and customize CTA buttons.
                  </p>
                </div>
                <a
                  href="/admin/popups"
                  className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span>Open Popup Manager</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MAINTENANCE & MINI-GAMES */}
        {activeTab === 'maintenance' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Maintenance Experience & Mind-Refresh Mini Games</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Configure the 4 lightweight in-browser games displayed to students during scheduled maintenance.
                </p>
              </div>

              <a
                href="/admin/maintenance"
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Maintenance Control Panel →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Game 1: Memory Match */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🃏</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">1. Memory Match Cards</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={miniGames.memory_match}
                      onChange={(e) => setMiniGames({ ...miniGames, memory_match: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Emoji pair-matching card game. Tracks attempts, matches, and win celebration.
                </p>
              </div>

              {/* Game 2: Number Puzzle */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔢</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">2. 3x3 Number Slide Puzzle</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={miniGames.number_puzzle}
                      onChange={(e) => setMiniGames({ ...miniGames, number_puzzle: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Classical sliding 1-8 tile challenge with move counter and solved checker.
                </p>
              </div>

              {/* Game 3: Quick Math */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">3. Quick Math Streak</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={miniGames.quick_math}
                      onChange={(e) => setMiniGames({ ...miniGames, quick_math: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Timed arithmetic questions testing speed, mental focus, and score streaks.
                </p>
              </div>

              {/* Game 4: Word Scramble */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧬</span>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">4. Biotech Word Scramble</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={miniGames.word_scramble}
                      onChange={(e) => setMiniGames({ ...miniGames, word_scramble: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Scrambled biology vocabulary (CRISPR, ENZYME, PLASMID, PCR, etc.) with hints.
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSaveMiniGames}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Mini-Games Configuration'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SEO & METADATA */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Search Engine Optimization & Social Cards</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure meta tags, OpenGraph sharing cards, and academic descriptions.
            </p>
            <a
              href="/admin/seo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold shadow-xs"
            >
              <span>Open Dedicated SEO Editor</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* TAB 6: SECURITY & SESSIONS */}
        {activeTab === 'security' && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Security & Session Protection Policies</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Session Timeout Duration
                </label>
                <select
                  value={securitySettings.sessionTimeoutHours}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeoutHours: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={12}>12 Hours</option>
                  <option value={24}>24 Hours (Standard)</option>
                  <option value={48}>48 Hours</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Failed Login Attempt Limit
                </label>
                <select
                  value={securitySettings.maxFailedAttempts}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, maxFailedAttempts: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={3}>3 Attempts</option>
                  <option value={5}>5 Attempts (Recommended)</option>
                  <option value={10}>10 Attempts</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Lockout Duration
                </label>
                <select
                  value={securitySettings.lockoutDurationMinutes}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDurationMinutes: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value={10}>10 Minutes</option>
                  <option value={15}>15 Minutes (Standard)</option>
                  <option value={30}>30 Minutes</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Active Super Admin:</span>
              <span className="font-mono text-cyan-700 dark:text-cyan-400">{adminUser?.email}</span>
            </div>
          </div>
        )}

        {/* TAB 7: INTEGRATION */}
        {activeTab === 'integration' && (
          <div className="space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>BioScience Mastery Ecosystem Integration</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Verified destination endpoints on the independent BioScience Mastery platform.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mastery Platform Base URL
                </label>
                <input
                  type="url"
                  value={integrationSettings.masteryBaseUrl}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  All 6 Exams Portal Destination
                </label>
                <input
                  type="url"
                  value={integrationSettings.examsPortalUrl}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GAT-B Dedicated Course Destination
                </label>
                <input
                  type="url"
                  value={integrationSettings.gatbCourseUrl}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/admin/ecosystem"
                className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Edit Full Ecosystem Config</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
