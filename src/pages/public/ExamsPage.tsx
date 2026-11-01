import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { COMPETITIVE_EXAMINATIONS } from '../../data/examsData.ts';
import { GraduationCap, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export const ExamsPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          National Entrance & Fellowship Portals
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Competitive Examination Preparation', 'Competitive Examination Preparation (6 Portals)')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Official syllabus, verified exam patterns, marking schemes, and preparation strategies for the 6 national biotechnology and life-sciences competitive examinations.',
            'India ke 6 major biotechnology aur life science examinations ka complete verified guide. Exam dates, syllabus mapping, aur preparation blueprints.'
          )}
        </p>
      </div>

      {/* Grid of 6 Examinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPETITIVE_EXAMINATIONS.map((exam) => (
          <div
            key={exam.code}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-sm transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-mono font-bold text-slate-900">
                  {exam.code}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified {exam.lastVerifiedDate}
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {exam.fullName.en}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Conducted by: {exam.conductingBody}
              </p>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                {language === 'hinglish' ? exam.overview.hinglish : exam.overview.en}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Exam Duration:</span>
                  <span className="text-slate-800 font-mono font-medium">{exam.examPattern.durationMinutes} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Score:</span>
                  <span className="text-slate-800 font-mono font-medium">{exam.examPattern.totalMarks} Marks</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span className="text-slate-800 font-mono font-medium">{exam.examPattern.totalQuestions} Questions</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={exam.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                Official Link <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                to={`/exams/${exam.code.toLowerCase()}`}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View Full Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
