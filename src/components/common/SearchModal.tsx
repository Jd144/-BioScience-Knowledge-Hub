import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { COMPETITIVE_EXAMINATIONS } from '../../data/examsData.ts';
import { LAB_INSTRUMENTS } from '../../data/labInstrumentsData.ts';
import { LAB_PROTOCOLS } from '../../data/labProtocolsData.ts';
import { SCIENTIFIC_CALCULATORS } from '../../data/calculatorsConfig.ts';
import { BIOTECH_JOBS } from '../../data/jobsData.ts';
import { INTERNSHIP_OPPORTUNITIES } from '../../data/internshipsData.ts';
import { SCHOLARSHIPS_ADMISSIONS } from '../../data/scholarshipsAdmissionsData.ts';
import { BIOTECH_NEWS } from '../../data/newsData.ts';
import { RESEARCH_PROPOSAL_SCHEMES } from '../../data/researchCommunityData.ts';
import {
  Search,
  X,
  BookOpen,
  GraduationCap,
  Wrench,
  FileText,
  Calculator,
  Briefcase,
  Award,
  Newspaper,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  type: 'subject' | 'exam' | 'instrument' | 'protocol' | 'calculator' | 'job' | 'internship' | 'scholarship' | 'news' | 'proposal';
  title: string;
  subtitle: string;
  url: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile search indices across all platform domains
  const allItems: SearchItem[] = [
    // Subjects
    ...CORE_SUBJECTS.map((s) => ({
      id: s.id,
      type: 'subject' as const,
      title: language === 'hinglish' ? s.name.hinglish : s.name.en,
      subtitle: s.description.en,
      url: `/subjects/${s.slug}`,
    })),
    // Exams
    ...COMPETITIVE_EXAMINATIONS.map((e) => ({
      id: e.code,
      type: 'exam' as const,
      title: `${e.code} — ${e.fullName.en}`,
      subtitle: e.conductingBody,
      url: `/exams/${e.code.toLowerCase()}`,
    })),
    // Jobs
    ...BIOTECH_JOBS.map((j) => ({
      id: j.id,
      type: 'job' as const,
      title: j.title,
      subtitle: `${j.organization} · ${j.location} · ${j.salaryOrStipend}`,
      url: `/jobs`,
    })),
    // Internships
    ...INTERNSHIP_OPPORTUNITIES.map((i) => ({
      id: i.id,
      type: 'internship' as const,
      title: i.title,
      subtitle: `${i.institution} · ${i.duration} · ${i.stipendAmount}`,
      url: `/internships`,
    })),
    // Scholarships & Admissions
    ...SCHOLARSHIPS_ADMISSIONS.map((sa) => ({
      id: sa.id,
      type: 'scholarship' as const,
      title: sa.title,
      subtitle: `${sa.issuingBody} · ${sa.fundingAmount}`,
      url: `/scholarships`,
    })),
    // Biotech News
    ...BIOTECH_NEWS.map((n) => ({
      id: n.id,
      type: 'news' as const,
      title: n.title,
      subtitle: `${n.category} · ${n.sourceOutlet}`,
      url: `/news`,
    })),
    // Research Proposals
    ...RESEARCH_PROPOSAL_SCHEMES.map((rp) => ({
      id: rp.id,
      type: 'proposal' as const,
      title: rp.schemeName,
      subtitle: `${rp.fundingAgency} · ${rp.grantBudgetRange}`,
      url: `/research-proposals`,
    })),
    // Instruments
    ...LAB_INSTRUMENTS.map((inst) => ({
      id: inst.slug,
      type: 'instrument' as const,
      title: inst.name.en,
      subtitle: `${inst.category} · ${inst.principle.en.slice(0, 80)}...`,
      url: `/lab-zone/instruments#${inst.slug}`,
    })),
    // Protocols
    ...LAB_PROTOCOLS.map((p) => ({
      id: p.slug,
      type: 'protocol' as const,
      title: p.title.en,
      subtitle: `${p.category} Protocol · ${p.objective.en}`,
      url: `/lab-zone/protocols#${p.slug}`,
    })),
    // Calculators
    ...SCIENTIFIC_CALCULATORS.map((c) => ({
      id: c.id,
      type: 'calculator' as const,
      title: c.name.en,
      subtitle: `${c.category} · ${c.formulaDisplay}`,
      url: `/lab-zone/calculators?calc=${c.id}`,
    })),
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = allItems.filter((item) => {
    if (categoryFilter !== 'all' && item.type !== categoryFilter) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
  });

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'subject':
        return <BookOpen className="w-4 h-4 text-cyan-600" />;
      case 'exam':
        return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'internship':
        return <Award className="w-4 h-4 text-indigo-600" />;
      case 'scholarship':
        return <GraduationCap className="w-4 h-4 text-teal-600" />;
      case 'news':
        return <Newspaper className="w-4 h-4 text-rose-600" />;
      case 'proposal':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'instrument':
        return <Wrench className="w-4 h-4 text-purple-600" />;
      case 'protocol':
        return <FileText className="w-4 h-4 text-pink-600" />;
      case 'calculator':
        return <Calculator className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'Search subjects, jobs, exams, internships, news, instruments, calculators...',
              'Subjects, jobs, exams, internships, news ya tools search karein...'
            )}
            className="w-full text-sm placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Filter buttons */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'subject', label: 'Subjects' },
            { id: 'job', label: 'Jobs' },
            { id: 'internship', label: 'Internships' },
            { id: 'exam', label: 'Exams' },
            { id: 'news', label: 'News' },
            { id: 'proposal', label: 'Grants' },
            { id: 'calculator', label: 'Calculators' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded-md capitalize font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-slate-400 ml-auto hidden sm:inline text-[11px] shrink-0 pl-2">
            {filtered.length} found
          </span>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              {t('No matching scientific records found.', 'Koi record match nahi hua.')}
            </div>
          ) : (
            filtered.slice(0, 25).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.url)}
                className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex items-center justify-between gap-3 group transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 p-1.5 bg-slate-100 rounded-md shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-cyan-700 truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-cyan-600 shrink-0 transition-colors" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
