import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { Search, ArrowRight, Layers, BookOpen } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);

  const filteredSubjects = CORE_SUBJECTS.filter((sub) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      sub.name.en.toLowerCase().includes(q) ||
      sub.name.hinglish.toLowerCase().includes(q) ||
      sub.description.en.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Knowledge Base Directory
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('11 Core Biotechnology Subjects', '11 Core Biotechnology Subjects')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Comprehensive academic curriculum designed for undergraduate and postgraduate life sciences scholars. Complete with unit breakdowns, mechanisms, equations, and verified references.',
            'B.Sc. aur M.Sc. students ke liye complete subject curriculum. Har subject me units, chapters, molecular mechanisms, aur standard textbook references included hain.'
          )}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('Filter subjects or terms...', 'Subjects filter karein...')}
          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
        />
      </div>

      {/* Grid of 11 Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-sm transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded">
                  Subject 0{sub.orderIndex}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {sub.unitsCount} Units · {sub.topicsCount} Topics
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900">
                {language === 'hinglish' ? sub.name.hinglish : sub.name.en}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                {language === 'hinglish' ? sub.description.hinglish : sub.description.en}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Key Focus Areas:
                </div>
                <ul className="text-xs text-slate-500 space-y-1">
                  {sub.learningObjectives[language === 'hinglish' ? 'hinglish' : 'en']
                    .slice(0, 2)
                    .map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-600 mt-0.5">·</span>
                        <span className="line-clamp-1">{obj}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {sub.references.length} Reference Works
              </span>
              <Link
                to={`/subjects/${sub.slug}`}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Enter Subject</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
