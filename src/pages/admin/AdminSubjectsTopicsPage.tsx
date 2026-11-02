import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle2, ChevronRight, Layers, FileText, ExternalLink } from 'lucide-react';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { Subject } from '../../types/index.ts';

export const AdminSubjectsTopicsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(CORE_SUBJECTS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = CORE_SUBJECTS.filter((s: Subject) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.en.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">11 Academic Subjects & Syllabus CMS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Curriculum mapping, unit structures, learning objectives, and bilingual Hindi/English topic notes.
          </p>
        </div>
      </div>

      {/* Grid: Left Subject Selector, Right Detailed Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-sans placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {filteredSubjects.map((sub: Subject) => {
              const active = selectedSubject.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    active
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-white">{sub.name.en}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {sub.topicsCount} Topics • {sub.unitsCount} Units
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs font-sans">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                Subject Blueprint
              </span>
              <h2 className="text-xl font-bold text-white mt-1">{selectedSubject.name.en}</h2>
              <p className="text-slate-400 text-xs mt-0.5">{selectedSubject.description.en}</p>
            </div>
            <a
              href={`/subjects/${selectedSubject.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live</span>
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-white text-sm">Learning Objectives & Rigor Standards</h3>
            <div className="space-y-1.5">
              {selectedSubject.learningObjectives.en.map((obj: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="font-bold text-white text-sm">Authoritative Reference Textbooks</h3>
            <div className="space-y-2">
              {selectedSubject.references.map((ref: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300">{ref.citation}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-700 text-cyan-300">
                    {ref.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
