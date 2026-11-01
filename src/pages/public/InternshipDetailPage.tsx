import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { INTERNSHIP_OPPORTUNITIES } from '../../data/internshipsData.ts';
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  GraduationCap
} from 'lucide-react';

export const InternshipDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const internship = INTERNSHIP_OPPORTUNITIES.find((i) => i.slug === slug);

  if (!internship) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <GraduationCap className="w-12 h-12 text-slate-300 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900">Internship Programme Not Found</h1>
        <p className="text-xs text-slate-500">
          The requested fellowship or training program could not be located in our current directory.
        </p>
        <Link
          to="/internships"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All Internships</span>
        </Link>
      </div>
    );
  }

  const isExpired = internship.applicationStatus === 'EXPIRED' || internship.archivedStatus;
  const isUnverified = internship.applicationStatus === 'UNVERIFIED';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          to="/internships"
          className="inline-flex items-center gap-1.5 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Internships</span>
        </Link>
        <span className="font-mono text-[11px] text-slate-400">
          Ref: {internship.id}
        </span>
      </div>

      {/* Warning Banners */}
      {isUnverified && (
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold">Unverified Notification Notice:</span> An official circular for the 2026/2027 program cycle has not been formally released by the host agency. This listing is provided strictly as historical informational reference.
          </div>
        </div>
      )}

      {isExpired && !isUnverified && (
        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex items-start gap-3 text-xs text-slate-700">
          <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold">Completed Application Cycle:</span> The deadline ({internship.applicationDeadline}) for this summer research session has passed. Preserved for academic planning and upcoming cycle preparation.
          </div>
        </div>
      )}

      {/* Main Internship Details Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded">
              {internship.internshipType}
            </span>
            <span>·</span>
            <span className="text-slate-600 font-medium">{internship.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
              internship.applicationStatus === 'OPEN'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : internship.applicationStatus === 'UNVERIFIED'
                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {internship.applicationStatus}
            </span>

            {internship.verificationStatus === 'VERIFIED_OFFICIAL' && (
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100">
                <ShieldCheck className="w-3 h-3" />
                Verified Bulletin
              </span>
            )}
          </div>
        </div>

        {/* Title & Host Institution */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {internship.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-700 font-medium pt-1">
            <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Building className="w-4 h-4 text-slate-400" />
              {internship.institution}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {internship.location}
            </span>
            <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
              <Award className="w-4 h-4 text-indigo-500" />
              {internship.stipendAmount}
            </span>
          </div>
        </div>

        {/* Programme Overview */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Programme Scope & Mentorship Structure
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {internship.overview}
          </p>
        </div>

        {/* Eligibility Details Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-700" />
            <span>Candidate Eligibility Requirements</span>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <div><strong>Target Cohort:</strong> {internship.qualification}</div>
            <div className="pt-1"><strong>Detailed Criteria:</strong> {internship.eligibility}</div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Application Opening Date
            </div>
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{internship.applicationOpeningDate}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Application Deadline
            </div>
            <div className={`font-semibold flex items-center gap-1.5 ${isExpired ? 'text-rose-600' : 'text-slate-900'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{internship.applicationDeadline}</span>
            </div>
          </div>
        </div>

        {/* Portal CTAs */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            Source: <span className="text-slate-600 font-medium">{internship.sourceCitation}</span>
            <br />
            Last Verified: <span className="font-mono text-slate-500">{internship.lastVerifiedDate}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={internship.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Programme Circular</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={internship.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors shadow-xs ${
                isExpired || isUnverified
                  ? 'bg-slate-600 hover:bg-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              <span>{isExpired ? 'Official Portal (Archived)' : isUnverified ? 'Host Website' : 'Apply on Official Portal'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
