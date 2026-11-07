/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Admin Maintenance Control Page
 * Clean white, professional design with light grey secondary surfaces,
 * subtle borders, countdown schedule, personal messages, and mini-game controls.
 */

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Power,
  Clock,
  Calendar,
  Globe,
  Save,
  CheckCircle2,
  AlertTriangle,
  History,
  Heart,
  RefreshCw,
  Gamepad2,
  HelpCircle
} from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export const AdminMaintenancePage: React.FC = () => {
  const { data, refresh } = useMaintenance();
  const { token } = useAdminAuth();

  const [enabled, setEnabled] = useState(false);
  const [title, setTitle] = useState("We'll Be Back Soon!");
  const [messageEn, setMessageEn] = useState('');
  const [messageHi, setMessageHi] = useState('');
  const [personalMessageEn, setPersonalMessageEn] = useState('');
  const [personalMessageHi, setPersonalMessageHi] = useState('');
  const [reopeningDate, setReopeningDate] = useState('');
  const [reopeningTime, setReopeningTime] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

  // Mini-games toggles
  const [miniGames, setMiniGames] = useState({
    memory_match: true,
    number_puzzle: true,
    quick_math: true,
    word_scramble: true,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [historyList, setHistoryList] = useState<any[]>([]);

  // Populate from current server data
  useEffect(() => {
    if (data) {
      setEnabled(data.enabled);
      setTitle(data.title || "We'll Be Back Soon!");
      setMessageEn(data.message_en || '');
      setMessageHi(data.message_hi || '');
      setPersonalMessageEn(data.personal_message_en || '');
      setPersonalMessageHi(data.personal_message_hi || '');
      setTimezone(data.timezone || 'Asia/Kolkata');

      if (data.mini_games) {
        setMiniGames({
          memory_match: data.mini_games.memory_match ?? true,
          number_puzzle: data.mini_games.number_puzzle ?? true,
          quick_math: data.mini_games.quick_math ?? true,
          word_scramble: data.mini_games.word_scramble ?? true,
        });
      }

      if (data.expected_reopening_iso) {
        const d = new Date(data.expected_reopening_iso);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setReopeningDate(`${year}-${month}-${day}`);

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        setReopeningTime(`${hours}:${minutes}`);
      }
    }
  }, [data]);

  // Load history
  const fetchFullConfig = async () => {
    const res = await safeFetchJson<{ history?: any[] }>('/api/admin/maintenance');
    if (res.ok && res.data) {
      setHistoryList(res.data.history || []);
    }
  };

  useEffect(() => {
    fetchFullConfig();
  }, [token]);

  // Quick extension buttons (+1 hr, +2 hr, +24 hr)
  const handleQuickExtend = (hoursToAdd: number) => {
    const baseDate = reopeningDate && reopeningTime
      ? new Date(`${reopeningDate}T${reopeningTime}:00`)
      : new Date();
    const newDate = new Date(baseDate.getTime() + hoursToAdd * 60 * 60 * 1000);

    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    setReopeningDate(`${year}-${month}-${day}`);

    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    setReopeningTime(`${hours}:${minutes}`);

    setSuccessMsg(`Reopening schedule extended by +${hoursToAdd} hour(s). Remember to click 'Save Maintenance Settings' to apply.`);
  };

  const handleSave = async (forceEnabled?: boolean) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const isModeEnabled = forceEnabled !== undefined ? forceEnabled : enabled;

      let expectedIso = data?.expected_reopening_iso || new Date().toISOString();
      if (reopeningDate && reopeningTime) {
        expectedIso = new Date(`${reopeningDate}T${reopeningTime}:00`).toISOString();
      }

      const res = await safeFetchJson<{ success: boolean; error?: string }>('/api/admin/maintenance', {
        method: 'POST',
        body: JSON.stringify({
          enabled: isModeEnabled,
          title,
          message_en: messageEn,
          message_hi: messageHi,
          personal_message_en: personalMessageEn,
          personal_message_hi: personalMessageHi,
          expected_reopening_iso: expectedIso,
          timezone,
          mini_games: miniGames,
        }),
      });

      const updatedConfig = {
        enabled: isModeEnabled,
        title,
        message_en: messageEn,
        message_hi: messageHi,
        personal_message_en: personalMessageEn,
        personal_message_hi: personalMessageHi,
        expected_reopening_iso: expectedIso,
        timezone,
        mini_games: miniGames,
        server_time_iso: new Date().toISOString(),
      };

      try {
        localStorage.setItem('bsh_maintenance_cache', JSON.stringify(updatedConfig));
      } catch {}

      setEnabled(isModeEnabled);
      setSuccessMsg(
        isModeEnabled
          ? 'Maintenance Mode is now ENABLED. Public visitors will see the countdown, personal message, and active mini-games.'
          : 'Maintenance Mode is now DISABLED. Full public website access has been restored.'
      );
      await refresh();
      await fetchFullConfig();
    } catch (err: any) {
      setErrorMsg('Settings updated locally. (Note: Cloud sync status: ' + (err.message || 'offline') + ')');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPersonalMessages = () => {
    setPersonalMessageEn(
      "⏳ While BioScience Hub is getting ready to welcome you back, take this opportunity to spend some precious time with your family and loved ones. ❤️👨👩👧👦\n\nMake beautiful memories, share a smile, and enjoy the little moments of life. 🌸✨\n\nWe'll be back soon with a better learning experience for you! 🚀"
    );
    setPersonalMessageHi(
      "⏳ जब तक BioScience Hub दोबारा शुरू होता है, तब तक अपना यह कीमती समय अपने परिवार और प्रियजनों के साथ बिताइए। ❤️👨👩👧👦\n\nअपनों के साथ कुछ खूबसूरत पल बिताइए, खुश रहिए और मुस्कुराते रहिए। 🌸✨\n\nहम जल्द ही आपके लिए एक बेहतर Learning Experience के साथ वापस आएंगे! 🚀"
    );
    setSuccessMsg('Restored standard warm family messages in English & Hindi.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-serif text-slate-900 dark:text-slate-100 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            <span>Maintenance Mode & Mini Games Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Control public platform gating, expected reopening countdown in IST, and mind-refresh mini games.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleSave()}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-800 text-xs">
            ✕
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:text-rose-800 text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Primary Toggle Card - Clean White Style */}
      <div className={`p-6 rounded-2xl border transition-all ${
        enabled
          ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${enabled ? 'bg-rose-500 animate-ping' : 'bg-slate-400'}`} />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Maintenance Gate Status:{' '}
                <span className={enabled ? 'text-rose-700 dark:text-rose-400' : 'text-slate-600 dark:text-slate-400'}>
                  {enabled ? 'ACTIVE (Public Gated with Countdown)' : 'INACTIVE (Website Live & Public)'}
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              When activated, public visitors see the clean white maintenance countdown and mind-break games. All <code>/admin/*</code> routes remain 100% accessible to administrators.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {enabled ? (
              <button
                onClick={() => handleSave(false)}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Power className="w-4 h-4" />
                <span>Reopen Website (Deactivate)</span>
              </button>
            ) : (
              <button
                onClick={() => handleSave(true)}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <Power className="w-4 h-4" />
                <span>Activate Maintenance Gate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Scheduled Reopening & Automatic Expiration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Expected Reopening Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={reopeningDate}
                onChange={(e) => setReopeningDate(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Expected Reopening Time</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="time"
                value={reopeningTime}
                onChange={(e) => setReopeningTime(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Timezone</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST - Indian Standard Time)</option>
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Extend Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-medium">Quick Extend:</span>
          <button
            type="button"
            onClick={() => handleQuickExtend(1)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
          >
            +1 Hour
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(2)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
          >
            +2 Hours
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(6)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
          >
            +6 Hours
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(24)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-[11px]"
          >
            +24 Hours (1 Day)
          </button>
        </div>

        <div className="p-3 bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl text-xs text-cyan-900 dark:text-cyan-300 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Automatic 10-Second Expiration:</strong> When the countdown reaches zero, the background timer turns OFF Maintenance Mode automatically without needing any open browser tab.
          </span>
        </div>
      </div>

      {/* MINI-GAMES TOGGLE SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Gamepad2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Mind-Break Mini Games (Displayed on Maintenance Page)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Toggle which games visitors can play while waiting for system reopening.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Game 1 */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">🃏 1. Memory Match Cards</span>
              <span className="text-[11px] text-slate-500">8 science emoji pairs matching game</span>
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

          {/* Game 2 */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">🔢 2. Number Slide Puzzle</span>
              <span className="text-[11px] text-slate-500">3x3 sliding tile puzzle from 1 to 8</span>
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

          {/* Game 3 */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">⚡ 3. Quick Math Streak</span>
              <span className="text-[11px] text-slate-500">Fast arithmetic multiple choice challenge</span>
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

          {/* Game 4 */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 dark:text-slate-200 block">🧬 4. Biotech Word Scramble</span>
              <span className="text-[11px] text-slate-500">Unscramble molecular biology terms</span>
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
        </div>
      </div>

      {/* Notices & Warm Personal Messages */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Warm Personal Message (English & Hindi)
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetPersonalMessages}
            className="text-[11px] text-cyan-700 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Messages</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              🇬🇧 English Warm Message
            </label>
            <textarea
              rows={5}
              value={personalMessageEn}
              onChange={(e) => setPersonalMessageEn(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              🇮🇳 Hindi Warm Message (हिंदी)
            </label>
            <textarea
              rows={5}
              value={personalMessageHi}
              onChange={(e) => setPersonalMessageHi(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Audit History */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Maintenance Audit Trail
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">{historyList.length} Events</span>
        </div>

        {historyList.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">No maintenance events recorded yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 overflow-x-auto text-xs font-mono">
            {historyList.slice(0, 10).map((hist) => (
              <div key={hist.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      hist.action === 'enabled'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : hist.action === 'disabled'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300'
                    }`}
                  >
                    {hist.action}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{hist.note || 'Action performed.'}</span>
                </div>
                <div className="text-right text-slate-500 shrink-0 text-[11px]">
                  <div>{new Date(hist.timestamp).toLocaleTimeString()}</div>
                  <div className="text-slate-400">{hist.triggered_by}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
