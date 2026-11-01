import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { BIOTECH_NEWS } from '../../data/newsData.ts';
import {
  Newspaper,
  Search,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

export const BiotechNewsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Regulatory & DCGI/FDA', 'Industry & Biopharma', 'Agri-Biotech'];

  const filteredNews = BIOTECH_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.sourceOutlet.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Scientific Journalism & Regulatory Updates
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Biotechnology News & Regulatory Dispatches', 'Biotechnology News aur Regulatory Dispatches')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Objective reporting on CDSCO/DCGI regulatory clearances, biosimilar clinical milestones, CRISPR ethical guidelines, and national bioeconomy developments.',
            'CDSCO regulatory approvals, biosimilars, CRISPR guidelines aur national biotechnology policies par authentic aur verified news reports.'
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
            placeholder={t('Search scientific news dispatches...', 'Biotech news search karein...')}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
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

      {/* News Articles List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredNews.length} verified dispatches</span>
          <span>Zero sensationalism · Primary source backed</span>
        </div>

        {filteredNews.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {article.category}
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {article.publishedDate}
                </span>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3 h-3" />
                Verified Agency Dispatch
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {article.summary}
            </p>

            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              {article.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 space-y-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-700">
                Key Scientific & Regulatory Takeaways
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 mt-0.5 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-400">
              <div>
                Primary Source: <span className="text-slate-600 font-medium">{article.sourceOutlet}</span>
              </div>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-800 font-medium"
              >
                <span>Read Official Press Release</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
