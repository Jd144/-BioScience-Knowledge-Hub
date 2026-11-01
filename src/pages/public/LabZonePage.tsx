import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { LAB_INSTRUMENTS } from '../../data/labInstrumentsData.ts';
import { LAB_PROTOCOLS } from '../../data/labProtocolsData.ts';
import { ScientificCalculator } from '../../components/lab/ScientificCalculator.tsx';
import { Wrench, BookOpen, Calculator, Search, ShieldAlert, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const LabZonePage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  // Determine active tab from route
  const getTabFromPath = () => {
    if (location.pathname.includes('/calculators')) return 'calculators';
    if (location.pathname.includes('/protocols')) return 'protocols';
    if (location.pathname.includes('/instruments')) return 'instruments';
    return 'instruments';
  };

  const [activeTab, setActiveTab] = useState<'instruments' | 'protocols' | 'calculators'>(getTabFromPath());
  const [instrumentSearch, setInstrumentSearch] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState<string>(LAB_INSTRUMENTS[0].slug);
  const [selectedProtocol, setSelectedProtocol] = useState<string>(LAB_PROTOCOLS[0].slug);

  // Deep-link hash & parameter resolver
  useEffect(() => {
    const tab = getTabFromPath();
    setActiveTab(tab);

    // Hash navigation (e.g. #biosafety-cabinet or #biosafety-cabinet-class-ii)
    if (location.hash) {
      let rawSlug = location.hash.replace(/^#/, '');
      // Handle known alias #biosafety-cabinet-class-ii -> biosafety-cabinet
      if (rawSlug === 'biosafety-cabinet-class-ii') {
        rawSlug = 'biosafety-cabinet';
      }

      const matchedInst = LAB_INSTRUMENTS.find((i) => i.slug === rawSlug);
      if (matchedInst) {
        setSelectedInstrument(matchedInst.slug);
        setActiveTab('instruments');
        return;
      }

      const matchedProt = LAB_PROTOCOLS.find((p) => p.slug === rawSlug);
      if (matchedProt) {
        setSelectedProtocol(matchedProt.slug);
        setActiveTab('protocols');
        return;
      }
    }
  }, [location.pathname, location.hash]);

  const activeInstData = LAB_INSTRUMENTS.find((i) => i.slug === selectedInstrument) || LAB_INSTRUMENTS[0];
  const activeProtData = LAB_PROTOCOLS.find((p) => p.slug === selectedProtocol) || LAB_PROTOCOLS[0];

  const filteredInstruments = LAB_INSTRUMENTS.filter((i) => {
    if (!instrumentSearch.trim()) return true;
    const q = instrumentSearch.toLowerCase();
    return i.name.en.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Practical Biotechnology & Empirical Instrumentation
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Laboratory Knowledge Hub (Lab Zone)', 'Virtual Laboratory Knowledge Hub')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'In-depth operational principles, component blueprints, and precautions for 18 analytical instruments, standard molecular biology protocols, and 9 validated biophysical calculators.',
            'Biotechnology laboratory ke 18 essential instruments, molecular protocols, aur 9 validated scientific calculators with dimensional verification.'
          )}
        </p>
      </div>

      {/* Navigation Tabs (Single line segmented control) */}
      <div className="border-b border-slate-200">
        <div className="flex gap-2">
          <Link
            to="/lab-zone/instruments"
            onClick={() => setActiveTab('instruments')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'instruments'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4 text-cyan-600" />
            <span>18 Lab Instruments</span>
          </Link>
          <Link
            to="/lab-zone/protocols"
            onClick={() => setActiveTab('protocols')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'protocols'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Standard Protocols</span>
          </Link>
          <Link
            to="/lab-zone/calculators"
            onClick={() => setActiveTab('calculators')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'calculators'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>9 Scientific Calculators</span>
          </Link>
        </div>
      </div>

      {/* TAB 1: 18 INSTRUMENTS */}
      {activeTab === 'instruments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Instruments Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={instrumentSearch}
                onChange={(e) => setInstrumentSearch(e.target.value)}
                placeholder="Search instruments..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="max-h-[600px] overflow-y-auto space-y-1 pr-1 divide-y divide-slate-100">
              {filteredInstruments.map((inst) => {
                const isSelected = inst.slug === selectedInstrument;
                return (
                  <button
                    key={inst.slug}
                    onClick={() => setSelectedInstrument(inst.slug)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div>{inst.name.en}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {inst.category}
                      </div>
                    </div>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instrument Detail View */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded uppercase">
                {activeInstData.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                {activeInstData.name.en}
              </h2>
            </div>

            {/* Principle */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-1.5">
                Scientific Principle
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'hinglish' ? activeInstData.principle.hinglish : activeInstData.principle.en}
              </p>
            </div>

            {/* Components */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                Major Hardware Components & Optics
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5">
                {activeInstData.components.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Mechanism */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                Operational Working Mechanism
              </h3>
              <ol className="text-xs text-slate-600 space-y-2">
                {activeInstData.workingMechanism[language === 'hinglish' ? 'hinglish' : 'en'].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Applications & Precautions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-lg">
                <h4 className="text-xs font-bold text-slate-900 mb-2">Biotech Applications</h4>
                <ul className="text-xs text-slate-600 space-y-1">
                  {activeInstData.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-700">·</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-lg">
                <h4 className="text-xs font-bold text-rose-950 mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Critical SOP Precautions
                </h4>
                <ul className="text-xs text-rose-900 space-y-1">
                  {activeInstData.precautions.map((prec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600">·</span>
                      <span>{prec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STANDARD PROTOCOLS */}
      {activeTab === 'protocols' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Standard Protocols Library
            </h3>
            {LAB_PROTOCOLS.map((prot) => {
              const isSelected = prot.slug === selectedProtocol;
              return (
                <button
                  key={prot.slug}
                  onClick={() => setSelectedProtocol(prot.slug)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition-colors ${
                    isSelected ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>{prot.title.en}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {prot.category}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase font-medium">
                {activeProtData.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                {activeProtData.title.en}
              </h2>
            </div>

            {/* Objective & Principle */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900 block mb-1">Principle:</span>
              <p>{language === 'hinglish' ? activeProtData.principle.hinglish : activeProtData.principle.en}</p>
            </div>

            {/* Reagents & Materials */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                Reagents & Buffers
              </h3>
              <ul className="text-xs text-slate-600 space-y-1">
                {activeProtData.reagents.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600">·</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Procedure */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-3">
                Laboratory Bench Procedure
              </h3>
              <div className="space-y-3">
                {activeProtData.procedure.map((step) => (
                  <div key={step.step} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                        {step.step}
                      </span>
                      <div>
                        <p className="text-slate-800 leading-relaxed">
                          {language === 'hinglish' ? step.instruction.hinglish : step.instruction.en}
                        </p>
                        {step.criticalNote && (
                          <p className="text-[11px] text-amber-800 font-medium mt-1">
                            ⚠️ Critical: {step.criticalNote}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Troubleshooting Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">
                Troubleshooting Matrix
              </h3>
              <div className="space-y-2 text-xs">
                {activeProtData.troubleshooting.map((item, i) => (
                  <div key={i} className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-lg">
                    <div className="font-semibold text-amber-950">Problem: {item.problem}</div>
                    <div className="text-slate-600 mt-0.5">Probable Cause: {item.probableCause}</div>
                    <div className="text-emerald-800 font-medium mt-0.5">Solution: {item.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 9 SCIENTIFIC CALCULATORS */}
      {activeTab === 'calculators' && (
        <div>
          <ScientificCalculator />
        </div>
      )}
    </div>
  );
};
