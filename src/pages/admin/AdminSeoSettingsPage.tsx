import React, { useState, useEffect } from 'react';
import { Sliders, Save, CheckCircle2, Globe, Share2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export const AdminSeoSettingsPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [settings, setSettings] = useState<any>({
    websiteTitle: '',
    metaDescription: '',
    ogTitle: '',
    ogDescription: '',
    socialLinks: { whatsappChannel: '', linkedin: '' },
    announcementBanner: { enabled: true, text: '', linkUrl: '' },
    footerNotice: '',
  });

  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    safeFetchJson('/api/admin/seo').then((res) => {
      if (res.ok && res.data) {
        setSettings(res.data);
      }
      setLoading(false);
    });
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);

    const res = await safeFetchJson('/api/admin/seo', {
      method: 'POST',
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      setSuccessMsg('SEO metadata, announcement banner, and social links saved.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">SEO & Website Settings</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Meta tags, OpenGraph sharing cards, announcement banners, and social channels.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)}>✕</button>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Search Engine Optimization (SEO) & Meta Tags
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">HTML Browser Title</label>
            <input
              type="text"
              value={settings.websiteTitle || ''}
              onChange={(e) => setSettings({ ...settings, websiteTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Search Engine Meta Description</label>
            <textarea
              rows={3}
              value={settings.metaDescription || ''}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">OpenGraph Social Title</label>
              <input
                type="text"
                value={settings.ogTitle || ''}
                onChange={(e) => setSettings({ ...settings, ogTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">OpenGraph Description</label>
              <input
                type="text"
                value={settings.ogDescription || ''}
                onChange={(e) => setSettings({ ...settings, ogDescription: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>
        </div>

        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono pt-4 border-t border-slate-800">
          Official Community & Social Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Official WhatsApp Channel</label>
            <input
              type="url"
              value={settings.socialLinks?.whatsappChannel || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, whatsappChannel: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Official LinkedIn Company Page</label>
            <input
              type="url"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
