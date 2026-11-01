import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { BIOTECH_JOBS } from '../../data/jobsData.ts';
import {
  Briefcase,
  Search,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  ShieldCheck,
  Filter,
  DollarSign
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');

  const categories = ['All', 'Government', 'Industry', 'JRF/SRF', 'Freshers', 'Bioinformatics', 'QC/QA'];
  const experienceLevels = ['All', 'Entry Level / Freshers', '1-3 Years', '3-5 Years'];

  const filteredJobs = BIOTECH_JOBS.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesExp = experienceFilter === 'All' || job.experienceLevel === experienceFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.organization.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.eligibility.toLowerCase().includes(q);
    return matchesCategory && matchesExp && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Career Opportunities Portal
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Biotechnology & Life Sciences Jobs', 'Biotechnology aur Life Sciences Jobs')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Verified employment notifications across premier government research institutes (CSIR, DBT, ICMR, NII) and leading biopharma enterprises (Biocon, Serum Institute, Dr. Reddy’s). Strictly source-referenced with direct application links.',
            'CSIR, DBT, ICMR, NII aur biopharma companies ki verified job vacancies. Official recruitment portal links aur exact eligibility criteria ke saath.'
          )}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search by role, institute, location or qualification...', 'Job role, institute, ya location search karein...')}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            >
              <option value="All">All Experience Levels</option>
              {experienceLevels.filter(x => x !== 'All').map((exp) => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Listing Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredJobs.length} active opportunities</span>
          <span>100% verified against official gazettes</span>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800">No matching jobs found</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or switching category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-xs transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                        {job.category}
                      </span>
                      <span>·</span>
                      <span className="text-slate-600">{job.experienceLevel}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Source
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 tracking-tight">
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5 font-medium text-slate-800">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {job.organization}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-700">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        {job.salaryOrStipend}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {job.jobDescription}
                    </p>

                    <div className="text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-600">
                      <strong className="text-slate-800">Eligibility:</strong> {job.eligibility}
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Source: {job.sourceCitation} · Published: {job.publishedDate}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Deadline</div>
                      <div className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.applicationDeadline}
                      </div>
                    </div>

                    <a
                      href={job.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
