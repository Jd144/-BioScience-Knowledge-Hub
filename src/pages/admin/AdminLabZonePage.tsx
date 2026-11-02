import React, { useState } from 'react';
import { FlaskConical, Calculator, BookOpen, Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { LAB_INSTRUMENTS_DATA, DetailedLabInstrument } from '../../data/labData.ts';
import { LAB_PROTOCOLS } from '../../data/labProtocolsData.ts';
import { SCIENTIFIC_CALCULATORS, CalculatorConfig } from '../../data/calculatorsConfig.ts';

export const AdminLabZonePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'instruments' | 'protocols' | 'calculators'>('instruments');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Lab Zone Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Laboratory instrumentation, experimental protocols, and verified biophysical calculation engines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('instruments')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'instruments'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Instruments ({LAB_INSTRUMENTS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'protocols'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Protocols ({LAB_PROTOCOLS.length})
          </button>
          <button
            onClick={() => setActiveTab('calculators')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeTab === 'calculators'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Calculators ({SCIENTIFIC_CALCULATORS.length})
          </button>
        </div>
      </div>

      {/* Instruments Tab */}
      {activeTab === 'instruments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LAB_INSTRUMENTS_DATA.map((inst: DetailedLabInstrument) => (
              <div
                key={inst.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-cyan-500/40 transition-colors shadow-md text-xs font-sans"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-white text-sm">{inst.name.en}</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {inst.category}
                  </span>
                </div>
                <p className="text-slate-400 line-clamp-2 text-xs leading-relaxed">
                  {inst.workingPrincipleSummary.en}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{inst.stepByStepOperatingPrinciples?.length || 0} Operating Steps</span>
                  <a
                    href={`/lab-zone/instruments`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View in Hub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Protocols Tab */}
      {activeTab === 'protocols' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LAB_PROTOCOLS.map((proto: any) => (
            <div
              key={proto.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs font-sans"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-white text-sm">{proto.title.en}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                  {proto.difficulty}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{proto.principle.en}</p>
              <div className="text-[11px] text-cyan-400 font-mono">
                Duration: {proto.durationMinutes} mins • {proto.steps.length} Steps
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Calculators Tab */}
      {activeTab === 'calculators' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCIENTIFIC_CALCULATORS.map((calc: CalculatorConfig) => (
            <div
              key={calc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs font-sans"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{calc.name.en}</span>
                <Calculator className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{calc.description.en}</p>
              <div className="p-2 bg-slate-800/80 rounded-lg text-cyan-300 font-mono text-[11px]">
                {calc.formulaDisplay}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
