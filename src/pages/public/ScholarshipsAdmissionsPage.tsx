import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SCHOLARSHIPS_ADMISSIONS } from '../../data/scholarshipsAdmissionsData.ts';
import {
  Award,
  Search,
  Calendar,
  Building,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ScholarshipsAdmissionsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'scholarships' | 'admissions'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = SCHOLARSHIPS_ADMISSIONS.filter((item) => {
    let matchesTab = true;
    if (activeTab === 'scholarships') {
      matchesTab = item.entityType === 'Scholarship' || item.entityType === 'Postdoc Fellowship';
    } else if (activeTab === 'admissions') {
      matchesTab = item.entityType === 'Ph.D. Admission' || item.entityType === 'Master Admission';
    }
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.issuingBody.toLowerCase().includes(q) ||
      item.eligibility.toLowerCase().includes(q) ||
      item.details.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          National Fellowships & Premier Admissions
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Scholarships & University Admissions', 'Scholarships aur University Admissions')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Official calls for national doctoral fellowships (DBT-JRF, DST-INSPIRE, ICMR-JRF) and postgraduate admissions at premier Indian life-science institutions (IISc Bengaluru, JNU SBT, TIFR / JGEEBILS).',
            'DBT-JRF, DST-INSPIRE, ICMR fellowships aur IISc, JNU, TIFR jaise institutes ke Ph.D. aur M.Sc. admissions ke authentic notifications.'
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
            placeholder={t('Search scholarships, issuing bodies, or degree level...', 'Scholarship ya admission notification search karein...')}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Calls ({SCHOLARSHIPS_ADMISSIONS.length})
          </button>
          <button
            onClick={() => setActiveTab('scholarships')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'scholarships'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Scholarships & Fellowships
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'admissions'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ph.D. & Master's Admissions
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredItems.length} active announcements</span>
          <span>Verified institutional bulletins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    {item.entityType}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Bulletin
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {item.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{item.issuingBody}</span>
                </div>

                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item.fundingAmount}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-600">
                  <strong className="text-slate-800">Eligibility:</strong> {item.eligibility}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Application Deadline</div>
                  <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.deadline}
                  </div>
                </div>

                <a
                  href={item.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>Official Circular</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
