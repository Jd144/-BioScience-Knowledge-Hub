import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { BIOTECH_JOBS } from '../../data/jobsData.ts';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Clock,
  Share2
} from 'lucide-react';

export const JobDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const job = BIOTECH_JOBS.find((j) => j.slug === slug);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900">Job Opportunity Not Found</h1>
        <p className="text-xs text-slate-500">
          The requested opportunity link may have been updated or moved to our historical archives.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to All Jobs</span>
        </Link>
      </div>
    );
  }

  const isExpired = job.applicationStatus === 'EXPIRED' || job.archivedStatus;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 hover:text-slate-900 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Jobs</span>
        </Link>
        <span className="font-mono text-[11px] text-slate-400">
          Ref: {job.id}
        </span>
      </div>

      {/* Expired / Archive Warning Banner */}
      {isExpired && (
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold">Archived Notice:</span> This application deadline ({job.applicationDeadline}) has passed. This record is preserved for educational reference, qualification benchmarking, and compensation research.
          </div>
        </div>
      )}

      {/* Main Opportunity Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded">
              {job.category}
            </span>
            <span>·</span>
            <span className="text-slate-600 font-medium">{job.experienceLevel}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
              job.applicationStatus === 'OPEN'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : job.applicationStatus === 'UPCOMING'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {job.applicationStatus}
            </span>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50/60 px-2 py-0.5 rounded border border-emerald-100">
              <ShieldCheck className="w-3 h-3" />
              Verified Call
            </span>
          </div>
        </div>

        {/* Title & Organization */}
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-700 font-medium pt-1">
            <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Building2 className="w-4 h-4 text-slate-400" />
              {job.organization}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              {job.salaryOrStipend}
            </span>
          </div>
        </div>

        {/* Overview Description */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Job Scope & Project Description
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {job.jobDescription}
          </p>
        </div>

        {/* Eligibility & Qualifications Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-cyan-700" />
            <span>Eligibility & Degree Requirement</span>
          </div>
          <div className="text-xs text-slate-700 space-y-1">
            <div><strong>Prescribed Qualification:</strong> {job.qualification}</div>
            <div className="pt-1"><strong>Detailed Criteria:</strong> {job.eligibility}</div>
          </div>
        </div>

        {/* Timeline & Important Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Application Opening Date
            </div>
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.applicationOpeningDate}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Application Deadline
            </div>
            <div className={`font-semibold flex items-center gap-1.5 ${isExpired ? 'text-rose-600' : 'text-slate-900'}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{job.applicationDeadline}</span>
            </div>
          </div>
        </div>

        {/* Official Portal CTAs */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            Source: <span className="text-slate-600 font-medium">{job.sourceCitation}</span>
            <br />
            Last Verified: <span className="font-mono text-slate-500">{job.lastVerifiedDate}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={job.officialNotificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Notification Bulletin</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={job.officialApplicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors shadow-xs ${
                isExpired
                  ? 'bg-slate-600 hover:bg-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              <span>{isExpired ? 'Archived Portal' : 'Apply on Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
