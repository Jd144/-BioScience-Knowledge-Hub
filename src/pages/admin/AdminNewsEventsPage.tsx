import React, { useState } from 'react';
import { Newspaper, Calendar, Megaphone, Plus, ExternalLink, ShieldCheck } from 'lucide-react';
import { BIOTECH_NEWS } from '../../data/newsData.ts';
import { BiotechNewsArticle } from '../../types/index.ts';

export const AdminNewsEventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'events' | 'announcements'>('news');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">News, Events & Banners</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verified biotechnology breakthroughs, academic workshops, conferences, and top-bar announcement alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'news' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            News ({BIOTECH_NEWS.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'events' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workshops & Conferences
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'announcements' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Homepage Banners
          </button>
        </div>
      </div>

      {/* News Articles List */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BIOTECH_NEWS.map((item: BiotechNewsArticle) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-cyan-500/40 transition-colors shadow-md text-xs font-sans"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{item.publishedDate}</span>
                </div>
                <h3 className="font-bold text-white text-sm leading-snug">{item.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">{item.summary}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Source: {item.sourceOutlet}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>Official Gazette</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Events & Workshops Tab */}
      {activeTab === 'events' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300 font-sans space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Calendar className="w-5 h-5" />
            <span>National Biotechnology Conferences & Hands-On Workshops</span>
          </div>
          <p className="text-slate-400">
            Conferences and workshops require verifiable academic circulars from organizing institutions (IISc, IITs, CSIR-IMTECH, RCB, or AIIMS).
          </p>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="font-bold text-white text-sm">
              National Symposium on Next-Generation Protein Engineering & Cryo-EM
            </div>
            <div className="text-slate-400">Organized by Regional Centre for Biotechnology • Faridabad, NCR</div>
            <div className="text-cyan-400 font-mono text-[11px]">Registration Deadline: 2026-11-20</div>
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300 font-sans space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Megaphone className="w-5 h-5" />
            <span>Active Homepage Top-Bar Announcement</span>
          </div>
          <p className="text-slate-400">
            This banner appears at the very top of all public pages when enabled.
          </p>
          <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-500/40 text-slate-200">
            Ecosystem Announcement: BioScience Hub is seamlessly integrated with BioScience Mastery for targeted national entrance examination preparation.
          </div>
        </div>
      )}
    </div>
  );
};
