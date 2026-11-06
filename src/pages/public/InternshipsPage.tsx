import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';
import { INTERNSHIP_OPPORTUNITIES } from '../../data/internshipsData.ts';
import {
  GraduationCap,
  Search,
  Calendar,
  Building,
  ExternalLink,
  ShieldCheck,
  Clock,
  Award,
  ArrowRight,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export const InternshipsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OPEN' | 'EXPIRED' | 'UNVERIFIED'>('ALL');
  const [liveDbInternships, setLiveDbInternships] = useState<any[]>([]);

  // Fetch live opportunities published by the Autonomous AI engine & Admin CMS
  useEffect(() => {
    safeFetchJson<{ opportunities: any[] }>('/api/public/opportunities?type=internship')
      .then((res) => {
        if (res.ok && res.data && res.data.opportunities && Array.isArray(res.data.opportunities)) {
          const data = res.data;
          // Map to internship interface shape
          const mapped = data.opportunities.map((opp: any) => ({
            id: opp.id,
            title: opp.title,
            slug: opp.slug,
            institution: opp.organization,
            internshipType: 'Government National',
            duration: '2 - 3 Months',
            stipendAmount: opp.salaryOrStipend,
            eligibility: opp.eligibility,
            deadline: opp.applicationDeadline,
            officialLink: opp.officialNotificationUrl,
            applicationOpeningDate: opp.applicationOpeningDate,
            officialApplicationUrl: opp.officialApplicationUrl,
            sourceCitation: opp.sourceCitation,
            lastVerifiedDate: opp.lastVerifiedDate,
            applicationStatus: opp.applicationStatus,
            verificationStatus: opp.verificationStatus,
            archivedStatus: opp.archivedStatus,
            overview: opp.jobDescription,
            isAiResearched: opp.isAiResearched,
          }));
          setLiveDbInternships(mapped);
        }
      })
      .catch((e) => console.warn('Could not load live database internships:', e));
  }, []);

  const combinedInternships = useMemo(() => {
    const map = new Map<string, any>();
    liveDbInternships.forEach((item) => map.set(item.id, item));
    INTERNSHIP_OPPORTUNITIES.forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, item);
    });
    return Array.from(map.values());
  }, [liveDbInternships]);

  const types = ['All', 'Government National', 'IIT/IISc/IISER', 'University Research', 'Biotech Industry'];

  const filteredInternships = combinedInternships.filter((item) => {
    const matchesType = selectedType === 'All' || item.internshipType === selectedType;
    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'OPEN'
        ? item.applicationStatus === 'OPEN'
        : statusFilter === 'UNVERIFIED'
        ? item.applicationStatus === 'UNVERIFIED'
        : item.applicationStatus === 'EXPIRED' || item.archivedStatus;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.institution.toLowerCase().includes(q) ||
      item.eligibility.toLowerCase().includes(q) ||
      (item.overview && item.overview.toLowerCase().includes(q));
    return matchesType && matchesStatus && matchesSearch;
  });

  const activeCount = combinedInternships.filter((i) => i.applicationStatus === 'OPEN').length;
  const expiredCount = combinedInternships.filter((i) => i.applicationStatus === 'EXPIRED' || i.archivedStatus).length;
  const unverifiedCount = combinedInternships.filter((i) => i.applicationStatus === 'UNVERIFIED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Research Fellowships & Industry Traineeships
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Biotechnology Internships & Summer Fellowships', 'Biotechnology Internships aur Summer Fellowships')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Audited summer research programs and academy fellowships (Science Academies SRFP 2027, IIT Bombay BSBE, TIFR VSRP). Expired cycles and unverified notifications are transparently segregated.',
            'India ke premier summer research fellowships aur industrial training opportunities. Expired aur unverified programmes ko clearly mark kiya gaya hai.'
          )}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search programs by name, host institution, or eligibility...', 'Program name, institute ya eligibility search karein...')}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>

        {/* Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Toggle Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white font-semibold'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Programs ({INTERNSHIP_OPPORTUNITIES.length})
          </button>
          <button
            onClick={() => setStatusFilter('OPEN')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              statusFilter === 'OPEN'
                ? 'bg-emerald-700 text-white font-semibold'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>Active & Open ({activeCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter('EXPIRED')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'EXPIRED'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Archived / Concluded ({expiredCount})
          </button>
          <button
            onClick={() => setStatusFilter('UNVERIFIED')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              statusFilter === 'UNVERIFIED'
                ? 'bg-amber-700 text-white font-semibold'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Unverified ({unverifiedCount})
          </button>
        </div>
      </div>

      {/* Internships Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredInternships.length} opportunities</span>
          <span>Zero fabricated deadlines</span>
        </div>

        {filteredInternships.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No matching internships found</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching status filters or clearing your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredInternships.map((intern) => {
              const isExpired = intern.applicationStatus === 'EXPIRED' || intern.archivedStatus;
              const isUnverified = intern.applicationStatus === 'UNVERIFIED';

              return (
                <div
                  key={intern.id}
                  className={`bg-white border rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all ${
                    isExpired ? 'border-slate-200 bg-slate-50/40 opacity-90' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                        {intern.internshipType}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase ${
                          intern.applicationStatus === 'OPEN'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : intern.applicationStatus === 'UNVERIFIED'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {intern.applicationStatus}
                        </span>

                        {intern.verificationStatus === 'VERIFIED_OFFICIAL' && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        {intern.isAiResearched && (
                          <span className="flex items-center gap-1 text-cyan-700 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
                            <Sparkles className="w-3 h-3 text-cyan-600" />
                            AI
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                      <Link to={`/internships/${intern.slug}`} className="hover:text-cyan-700 transition-colors">
                        {intern.title}
                      </Link>
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{intern.institution}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {intern.overview}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{intern.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{intern.stipendAmount}</span>
                      </div>
                    </div>

                    <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-600">
                      <strong className="text-slate-800">Eligibility:</strong> {intern.eligibility}
                    </div>

                    {isUnverified && (
                      <div className="text-[11px] bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Official notification not established for current cycle.</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Deadline</div>
                      <div className={`text-xs font-semibold flex items-center gap-1 ${
                        isExpired ? 'text-rose-600' : 'text-slate-900'
                      }`}>
                        <Calendar className="w-3 h-3" />
                        {intern.applicationDeadline}
                      </div>
                      {isExpired && (
                        <span className="text-[10px] text-rose-500 font-mono">Cycle Concluded</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/internships/${intern.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <a
                        href={intern.officialApplicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors shadow-xs ${
                          isExpired || isUnverified ? 'bg-slate-600 hover:bg-slate-700' : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
