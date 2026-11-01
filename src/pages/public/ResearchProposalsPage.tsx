import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { RESEARCH_PROPOSAL_SCHEMES } from '../../data/researchCommunityData.ts';
import {
  FileText,
  Search,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export const ResearchProposalsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedAgency, setSelectedAgency] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const agencies = ['All', 'BIRAC', 'SERB', 'Wellcome-DBT', 'DBT'];

  const filteredSchemes = RESEARCH_PROPOSAL_SCHEMES.filter((scheme) => {
    const matchesAgency = selectedAgency === 'All' || scheme.fundingAgency === selectedAgency;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      scheme.schemeName.toLowerCase().includes(q) ||
      scheme.targetAudience.toLowerCase().includes(q) ||
      scheme.guidelinesSummary.toLowerCase().includes(q);
    return matchesAgency && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Extramural Research Funding & Grants
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Research Proposals & Grant Schemes', 'Research Proposals aur Grant Schemes')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Official extramural calls from national and bilateral agencies (BIRAC BIG, DST-SERB CRG, DBT/Wellcome Trust India Alliance). Detailed with grant ceilings, eligibility, and direct portal submission guidelines.',
            'BIRAC, SERB, DBT aur India Alliance ke research grant schemes. Budget range, eligibility criteria, aur proposal submission guidelines ke saath.'
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
            placeholder={t('Search grant schemes, target audience, or keywords...', 'Grant scheme ya funding agency search karein...')}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>

        {/* Agency Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {agencies.map((agency) => (
            <button
              key={agency}
              onClick={() => setSelectedAgency(agency)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedAgency === agency
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {agency}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredSchemes.length} funding schemes</span>
          <span>Verified national calls</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    Agency: {scheme.fundingAgency}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Call
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {scheme.schemeName}
                </h2>

                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Funding Range: {scheme.grantBudgetRange}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {scheme.guidelinesSummary}
                </p>

                <div className="text-[11px] text-slate-500">
                  <strong className="text-slate-700">Target Audience:</strong> {scheme.targetAudience}
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-700">
                    Mandatory Eligibility Requirements:
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {scheme.eligibilityCriteria.map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600 mt-0.5 shrink-0" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Proposal Deadline</div>
                  <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {scheme.submissionDeadline}
                  </div>
                </div>

                <a
                  href={scheme.officialCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>Grant Guidelines & Portal</span>
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
