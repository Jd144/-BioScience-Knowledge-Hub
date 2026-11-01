import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { COMPETITIVE_EXAMINATIONS } from '../../data/examsData.ts';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  AlertTriangle,
  Calendar,
  FileCheck2,
  Info,
} from 'lucide-react';

export const ExamDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { language, t } = useLanguage();

  const exam = COMPETITIVE_EXAMINATIONS.find(
    (e) => e.code.toLowerCase() === code?.toLowerCase()
  );

  if (!exam) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Examination Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested examination portal is not supported or does not exist.</p>
        <Link to="/exams" className="mt-4 inline-block text-xs text-cyan-700 underline font-medium">
          ← Return to Competitive Examinations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/exams" className="hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> All Examinations
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{exam.code}</span>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-700">
              {exam.code}
            </span>
            {exam.officialNotificationStatus && (
              <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                exam.officialNotificationStatus === 'ACTIVE_NOTIFICATION'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : exam.officialNotificationStatus === 'BIANNUAL_CYCLE'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {exam.officialNotificationStatus === 'ACTIVE_NOTIFICATION'
                  ? 'Active Cycle'
                  : exam.officialNotificationStatus === 'BIANNUAL_CYCLE'
                  ? 'Biannual Cycle'
                  : '2026 Completed • 2027 Awaited'}
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audit Date: {exam.lastVerifiedDate}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {exam.fullName.en}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Conducted by: <span className="text-slate-700 font-semibold">{exam.conductingBody}</span>
        </p>

        {exam.bulletinEdition && (
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-lg w-fit">
            <FileCheck2 className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
            <span>Bulletin Source: <strong>{exam.bulletinEdition}</strong></span>
          </div>
        )}

        <p className="text-sm text-slate-600 mt-4 leading-relaxed max-w-4xl">
          {language === 'hinglish' ? exam.overview.hinglish : exam.overview.en}
        </p>

        {/* Schedule & Cycle Ribbon */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
              <Calendar className="w-4 h-4 text-cyan-700" />
              <span>Application Window & Status:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{exam.applicationWindow || 'Announced via official gazette notifications.'}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-1">
              <Clock className="w-4 h-4 text-cyan-700" />
              <span>Verified Examination Schedule:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{exam.examDate || 'Scheduled per official conducting agency calendar.'}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href={exam.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <span>Visit Official Examination Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Outdated / Discontinued Notices Warning Box */}
      {exam.outdatedOrDiscontinuedNotices && exam.outdatedOrDiscontinuedNotices.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-300 p-6 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-xs uppercase tracking-wider font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Audit Alert: Outdated Patterns & Common Misconceptions to Avoid</span>
          </div>
          <ul className="space-y-2 text-xs text-amber-900/90 leading-relaxed list-disc list-inside">
            {exam.outdatedOrDiscontinuedNotices.map((notice, nIdx) => (
              <li key={nIdx} className="font-medium">
                {notice}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Zero Speculative Dates Policy Box */}
      {exam.speculativeDateDisclaimer && (
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex items-start gap-3">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white uppercase tracking-wider font-mono text-[11px] block mb-1 text-cyan-300">
              Zero Speculation Policy:
            </span>
            {exam.speculativeDateDisclaimer}
          </div>
        </div>
      )}

      {/* Exam Pattern Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">
            01. Verified Examination Pattern & Marking Scheme
          </h2>
          <span className="text-xs text-slate-700 font-mono font-semibold bg-slate-100 px-2.5 py-1 rounded">
            {exam.examPattern.durationMinutes} min ({exam.examPattern.durationMinutes / 60} hours) • {exam.examPattern.totalMarks} Marks
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 mb-4 border border-slate-200">
          <span className="font-semibold text-slate-900">Marking Rule:</span> {exam.examPattern.markingScheme}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Section Name</th>
                <th className="py-2.5 px-3 font-semibold">Questions</th>
                <th className="py-2.5 px-3 font-semibold">Total Marks</th>
                <th className="py-2.5 px-3 font-semibold">Syllabus Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {exam.examPattern.sections.map((sec, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-medium text-slate-900">{sec.name}</td>
                  <td className="py-3 px-3 font-mono">{sec.questions}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-cyan-800">{sec.marks}</td>
                  <td className="py-3 px-3 text-slate-600 max-w-md">{sec.syllabusScope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono mb-4">
          02. Verified Eligibility & Academic Criteria
        </h2>
        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs font-semibold text-slate-900 mb-1.5">Qualifying Degree Requirements:</div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
              {exam.eligibility.degree.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">Minimum Qualifying Marks:</span>
              <p className="text-slate-700 leading-relaxed">{exam.eligibility.minimumMarks}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-900 block mb-1">Age Limit & Statutory Relaxations:</span>
              <p className="text-slate-700 leading-relaxed">{exam.eligibility.ageLimit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Syllabus Topics */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono mb-4">
          03. Core Syllabus & Subject Mapping
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exam.coreSyllabusTopics.map((top, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <span className="text-xs text-slate-700 leading-relaxed">{top}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Source Links Table */}
      {exam.officialSourceUrls && exam.officialSourceUrls.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono mb-4">
            04. Official Source Verification Links
          </h2>
          <div className="divide-y divide-slate-100">
            {exam.officialSourceUrls.map((src, sIdx) => (
              <div key={sIdx} className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-medium text-slate-900">{src.label}</span>
                  <span className="ml-2 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono">
                    Session: {src.verifiedYear}
                  </span>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:text-cyan-900 inline-flex items-center gap-1 font-mono break-all font-medium"
                >
                  <span>{src.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preparation Strategy (Bilingual) */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-sm">
        <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
          05. Recommended Strategic Preparation Blueprint
        </h2>
        <div className="space-y-3">
          {exam.preparationStrategy[language === 'hinglish' ? 'hinglish' : 'en'].map((strat, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-lg border border-slate-700/60">
              <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{strat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
