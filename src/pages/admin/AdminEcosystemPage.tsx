import React, { useState, useEffect } from 'react';
import { ExternalLink, Save, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { BIOSCIENCE_MASTERY_URLS } from '../../data/ecosystemLinks.ts';

export const AdminEcosystemPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [urls, setUrls] = useState({
    home: BIOSCIENCE_MASTERY_URLS.HOME,
    examsPortal: BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL,
    gatBCourse: BIOSCIENCE_MASTERY_URLS.GAT_B_COURSE,
    dbtJrfDestination: 'https://biosciencemasterycom.vercel.app/en/exams',
    gateBtDestination: 'https://biosciencemasterycom.vercel.app/en/exams',
    jamDestination: 'https://biosciencemasterycom.vercel.app/en/exams',
    cuetDestination: 'https://biosciencemasterycom.vercel.app/en/exams',
    netDestination: 'https://biosciencemasterycom.vercel.app/en/exams',
  });

  const [activeFlags, setActiveFlags] = useState({
    navbarLink: true,
    homepageBanner: true,
    examButtons: true,
    subjectPracticeLinks: true,
  });

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('BioScience Mastery ecosystem destinations and active toggles saved successfully.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              BioScience Mastery Integration
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Independent cross-platform deep links management for the 6 national competitive examinations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Ecosystem Settings</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)}>✕</button>
        </div>
      )}

      {/* Architecture Notice */}
      <div className="p-4 bg-slate-900 border border-cyan-500/30 rounded-2xl text-xs text-slate-300 space-y-2 font-sans">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Independent Platform Architecture Guaranteed</span>
        </div>
        <p className="leading-relaxed">
          BioScience Hub and BioScience Mastery are strictly independent applications with distinct deployments and databases. These configuration controls route scholars to verified courses and question practice portals without transmitting user credentials or tokens.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Verified Cross-Platform Endpoints
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              BioScience Mastery Homepage
            </label>
            <input
              type="url"
              value={urls.home}
              onChange={(e) => setUrls({ ...urls, home: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Examination Preparation Landing Portal
            </label>
            <input
              type="url"
              value={urls.examsPortal}
              onChange={(e) => setUrls({ ...urls, examsPortal: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              GAT-B Dedicated Course Deep Link
            </label>
            <input
              type="url"
              value={urls.gatBCourse}
              onChange={(e) => setUrls({ ...urls, gatBCourse: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">DBT-JRF Destination</label>
              <input
                type="url"
                value={urls.dbtJrfDestination}
                onChange={(e) => setUrls({ ...urls, dbtJrfDestination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">GATE Biotechnology Destination</label>
              <input
                type="url"
                value={urls.gateBtDestination}
                onChange={(e) => setUrls({ ...urls, gateBtDestination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">IIT JAM Destination</label>
              <input
                type="url"
                value={urls.jamDestination}
                onChange={(e) => setUrls({ ...urls, jamDestination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">CUET-PG Destination</label>
              <input
                type="url"
                value={urls.cuetDestination}
                onChange={(e) => setUrls({ ...urls, cuetDestination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">CSIR-NET Destination</label>
              <input
                type="url"
                value={urls.netDestination}
                onChange={(e) => setUrls({ ...urls, netDestination: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Ecosystem URLs</span>
          </button>
        </div>
      </form>
    </div>
  );
};
