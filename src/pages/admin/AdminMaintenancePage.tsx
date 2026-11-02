import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Power,
  Clock,
  Calendar,
  Globe,
  Save,
  Eye,
  CheckCircle2,
  AlertTriangle,
  History,
  Heart,
  Sparkles,
  RefreshCw,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import { useMaintenance, MaintenanceData } from '../../context/MaintenanceContext.tsx';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminMaintenancePage: React.FC = () => {
  const { data, refresh, setPreviewMode } = useMaintenance();
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

      if (data.expected_reopening_iso) {
        const d = new Date(data.expected_reopening_iso);
        // Format YYYY-MM-DD
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setReopeningDate(`${year}-${month}-${day}`);

        // Format HH:mm
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        setReopeningTime(`${hours}:${minutes}`);
      }
    }
  }, [data]);

  // Load history
  const fetchFullConfig = async () => {
    try {
      const res = await fetch('/api/admin/maintenance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setHistoryList(json.history || []);
      }
    } catch (e) {
      console.warn('Failed to fetch maintenance history:', e);
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

      const res = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          enabled: isModeEnabled,
          title,
          message_en: messageEn,
          message_hi: messageHi,
          personal_message_en: personalMessageEn,
          personal_message_hi: personalMessageHi,
          expected_reopening_iso: expectedIso,
          timezone,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to update maintenance configuration.');
      }

      setEnabled(isModeEnabled);
      setSuccessMsg(
        isModeEnabled
          ? 'Maintenance Mode is now ENABLED. Public visitors will see the countdown and warm personal message.'
          : 'Maintenance Mode is now DISABLED. Full public website access has been restored.'
      );
      await refresh();
      await fetchFullConfig();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred while saving settings.');
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
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-serif">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance Control System</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Server-authoritative maintenance scheduler with reverse countdown and automatic expiration.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setPreviewMode(true);
              window.open('/?preview_maintenance=true', '_blank');
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Preview how normal public visitors see the maintenance page"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Preview Public Page</span>
          </button>

          <button
            onClick={() => handleSave()}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium">{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-emerald-200 text-xs">
            ✕
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/40 rounded-2xl text-rose-300 text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="font-medium">{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-rose-200 text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Primary Toggle Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        enabled
          ? 'bg-rose-950/40 border-rose-500/60 shadow-rose-950/50 shadow-xl'
          : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className={`w-3 h-3 rounded-full ${enabled ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
              <h2 className="text-lg font-bold text-white">
                Maintenance Mode Status:{' '}
                <span className={enabled ? 'text-rose-400' : 'text-slate-400'}>
                  {enabled ? 'ENABLED (PUBLIC GATE ACTIVE)' : 'DISABLED (PUBLIC LIVE)'}
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              When enabled, general public visitors accessing any public route are shown the responsive maintenance screen with the reverse countdown. Authenticated administrators and <code>/admin/*</code> routes remain 100% accessible.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {enabled ? (
              <button
                onClick={() => handleSave(false)}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Power className="w-4 h-4" />
                <span>Reopen Website (Disable Mode)</span>
              </button>
            ) : (
              <button
                onClick={() => handleSave(true)}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Power className="w-4 h-4" />
                <span>Activate Maintenance Mode</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reopening Schedule & Auto-Expiration Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Scheduled Reopening & Automatic Expiration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Date */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Expected Reopening Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={reopeningDate}
                onChange={(e) => setReopeningDate(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Expected Reopening Time</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="time"
                value={reopeningTime}
                onChange={(e) => setReopeningTime(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Timezone</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans"
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
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Extend Reopening:</span>
          <button
            type="button"
            onClick={() => handleQuickExtend(1)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
          >
            +1 Hour
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(2)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
          >
            +2 Hours
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(6)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
          >
            +6 Hours
          </button>
          <button
            type="button"
            onClick={() => handleQuickExtend(24)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
          >
            +24 Hours (1 Day)
          </button>
        </div>

        <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Automatic Server-Side Reopening:</strong> The server checks expiration on every request and via background process every 10 seconds. When the countdown reaches zero, Maintenance Mode turns OFF automatically without requiring any admin browser tab to be open.
          </span>
        </div>
      </div>

      {/* Custom Maintenance Message Editors */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Maintenance Title & Primary Notices
          </h2>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Maintenance Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="We'll Be Back Soon!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                🇬🇧 Primary Notice (English)
              </label>
              <textarea
                rows={4}
                value={messageEn}
                onChange={(e) => setMessageEn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                🇮🇳 Primary Notice (हिंदी / Hindi)
              </label>
              <textarea
                rows={4}
                value={messageHi}
                onChange={(e) => setMessageHi(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL FEATURE: Personal Warm Family Message Editor */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 space-y-6 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Warm Personal Message Below Countdown (English & Hindi)
            </h2>
          </div>
          <button
            type="button"
            onClick={handleResetPersonalMessages}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Default Friendly Messages</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* English Message Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold">🇬🇧 English Version</label>
              <span className="text-[10px] text-slate-400">Default Selection</span>
            </div>
            <textarea
              rows={6}
              value={personalMessageEn}
              onChange={(e) => setPersonalMessageEn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
            />
          </div>

          {/* Hindi Message Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold">🇮🇳 Hindi Version (हिंदी)</label>
              <span className="text-[10px] text-slate-400">Instant Toggle on Public Page</span>
            </div>
            <textarea
              rows={6}
              value={personalMessageHi}
              onChange={(e) => setPersonalMessageHi(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Maintenance History & Audit Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-slate-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Maintenance Audit Trail & History
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">{historyList.length} Events Recorded</span>
        </div>

        {historyList.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No previous maintenance history recorded.</p>
        ) : (
          <div className="divide-y divide-slate-800 overflow-x-auto text-xs font-mono">
            {historyList.slice(0, 10).map((hist) => (
              <div key={hist.id} className="py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      hist.action === 'enabled'
                        ? 'bg-rose-500/20 text-rose-300'
                        : hist.action === 'disabled'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {hist.action}
                  </span>
                  <span className="text-slate-300">{hist.note || 'Action performed.'}</span>
                </div>
                <div className="text-right text-slate-400 shrink-0 text-[11px]">
                  <div>{new Date(hist.timestamp).toLocaleString()}</div>
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
