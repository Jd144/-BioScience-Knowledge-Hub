import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { RESEARCH_CLUBS } from '../../data/researchCommunityData.ts';
import {
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ResearchClubsPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Peer Discussion & Scientific Appraisal
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Scientific Research Clubs & Journal Circles', 'Scientific Research Clubs aur Journal Circles')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Open student-led and scholar-coordinated journal discussion circles. Cultivate critical scientific appraisal, decompose peer-reviewed publications, and explore in silico design frameworks together.',
            'Undergraduate, master’s aur research scholars ke liye open journal clubs. High-impact research papers ki critical reading aur collaborative scientific discussions.'
          )}
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RESEARCH_CLUBS.map((club) => (
          <div
            key={club.id}
            className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                  Active Club
                </span>
                <span className="text-xs font-mono text-slate-400">Bi-Weekly</span>
              </div>

              <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                {club.name}
              </h2>

              <div className="text-xs text-slate-500 font-medium">
                Focus: {club.focusArea}
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                <span>{club.meetingFormat}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {club.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-700">
                  Featured Discussion Topics:
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {club.discussionTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-600 mt-0.5 font-bold">·</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong className="text-slate-700">Guidelines:</strong> {club.participationGuidelines}
              </div>
              <div className="text-center">
                <span className="inline-block w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg">
                  Public Participation · Open to All Students
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Participation Charter */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base sm:text-lg font-bold tracking-tight">
          How to Join and Present a Paper
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Every session is open access. Prior registration is not required to observe. If you wish to present a preprint or published paper from Nature, Science, Cell, or specialized journals, simply prepare a 20-minute critique covering the experimental design, positive/negative controls, statistical validity, and methodological caveats.
        </p>
      </div>
    </div>
  );
};
