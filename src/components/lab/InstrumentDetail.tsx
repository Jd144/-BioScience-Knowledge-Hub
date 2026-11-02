import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { LAB_INSTRUMENTS_DATA, DetailedLabInstrument } from '../../data/labData.ts';
import { InstrumentVisualWorkflow } from './InstrumentVisualWorkflow.tsx';
import {
  Activity,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
  ShieldAlert,
  Zap,
  Info,
  Calculator,
  Compass,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface InstrumentDetailProps {
  id: string;
  onSelectInstrument?: (id: string) => void;
}

export const InstrumentDetail: React.FC<InstrumentDetailProps> = ({ id, onSelectInstrument }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'diagram' | 'operating-sop' | 'specs'>('overview');
  const [selectedStage, setSelectedStage] = useState<number>(1);

  // Match by id or slug
  const instrument: DetailedLabInstrument | undefined = LAB_INSTRUMENTS_DATA.find(
    (inst) => inst.id === id || inst.slug === id
  ) || LAB_INSTRUMENTS_DATA[0];

  if (!instrument) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-slate-800">Instrument Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">Please select an instrument from the laboratory catalog.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-8 p-6 sm:p-8">
      {/* 1. HEADER SECTION */}
      <div className="border-b border-slate-100 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-800 font-bold bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200/60">
              {instrument.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ID: {instrument.id}
            </span>
          </div>

          <span className="text-[11px] font-mono text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ISO / SOP Standard Ready</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
          {language === 'hinglish' ? instrument.name.hinglish : instrument.name.en}
        </h1>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Model: {instrument.modelDesignation}
        </p>

        {/* Scientific Principle Highlight Box */}
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 font-mono uppercase text-xs block mb-1">
            Fundamental Operating Principle:
          </span>
          <p>
            {language === 'hinglish'
              ? instrument.workingPrincipleSummary.hinglish
              : instrument.workingPrincipleSummary.en}
          </p>
        </div>
      </div>

      {/* 2. TAB CONTROLLER */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Real Visuals & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('diagram')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'diagram'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>High-Res Working Diagram</span>
        </button>

        <button
          onClick={() => setActiveTab('operating-sop')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'operating-sop'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Step-by-Step SOP (5 Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab('specs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'specs'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>Specs & Hardware Parts</span>
        </button>
      </div>

      {/* TAB 1: REAL VISUAL WORKFLOW & BIOTECH APPLICATIONS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Authentic Structural Hardware Blueprint & 5-Stage Process Workflow */}
          <InstrumentVisualWorkflow
            slug={instrument.slug}
            name={instrument.name}
            category={instrument.category}
          />

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Applications Card */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-700" />
                <span>Primary Biotechnology Applications</span>
              </h3>
              <ul className="text-xs text-slate-600 space-y-2">
                {instrument.biotechApplications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-700 font-bold mt-0.5">·</span>
                    <span className="leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Safety Precautions */}
            <div className="p-5 bg-rose-50/70 rounded-xl border border-rose-200/80 space-y-3">
              <h3 className="text-xs font-bold text-rose-950 uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Critical Laboratory SOP Safety Precautions</span>
              </h3>
              <ul className="text-xs text-rose-900 space-y-2">
                {instrument.safetyPrecautions.map((prec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold mt-0.5">!</span>
                    <span className="leading-relaxed">{prec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mathematical & Biophysical Formulas */}
          {instrument.scientificFormulas && instrument.scientificFormulas.length > 0 && (
            <div className="p-5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-300">
                  Governing Quantitative Formula
                </span>
              </div>
              {instrument.scientificFormulas.map((f, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-sm font-mono font-bold text-amber-300 block">{f.equation}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{f.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: HIGH-RESOLUTION WORKING DIAGRAM */}
      {activeTab === 'diagram' && (
        <div className="space-y-6">
          <div className="p-6 bg-slate-950 text-white rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  {instrument.highResDiagram.diagramType}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {instrument.highResDiagram.title}
                </h3>
              </div>
              <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-1 rounded-md self-start sm:self-auto font-semibold">
                High-Resolution Optical/Mechanical Path
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'hinglish'
                ? instrument.highResDiagram.description.hinglish
                : instrument.highResDiagram.description.en}
            </p>

            {/* Interactive Sequential Optical/Mechanical Ray-Path Cards */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Sequential Component Transmission Flow:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {instrument.highResDiagram.opticalOrMechanicalPath.map((path) => {
                  const isSelected = selectedStage === path.stage;
                  return (
                    <div
                      key={path.stage}
                      onClick={() => setSelectedStage(path.stage)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[11px] flex items-center justify-center font-bold">
                          {path.stage}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {isSelected ? 'Active Focus' : 'Click to Inspect'}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white font-mono mb-1">
                        {path.component}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {path.action}
                      </p>
                      <div className="mt-2 text-[11px] text-emerald-400 font-mono">
                        ✓ {path.scientificSignificance}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEP-BY-STEP OPERATING PRINCIPLES (SOP) */}
      {activeTab === 'operating-sop' && (
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Standard Operating Procedure (SOP) — 5-Step Protocol</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Strict laboratory operation protocol from sample setup through calibration, run execution, and post-run cleanup.
            </p>
          </div>

          <div className="space-y-4">
            {instrument.stepByStepOperatingPrinciples.map((sop) => (
              <div
                key={sop.step}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                      {sop.step}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                      {language === 'hinglish' ? sop.title.hinglish : sop.title.en}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                    Stage {sop.step} of 5
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
                  {language === 'hinglish' ? sop.instruction.hinglish : sop.instruction.en}
                </p>

                {/* Critical SOP Safety Rule Callout */}
                <div className="ml-8 p-3 bg-amber-50 border border-amber-200/90 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono text-[11px] uppercase block text-amber-900">
                      Critical SOP Alert:
                    </span>
                    <span className="leading-relaxed">
                      {language === 'hinglish' ? sop.criticalSOP.hinglish : sop.criticalSOP.en}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HARDWARE COMPONENTS & SPECS */}
      {activeTab === 'specs' && (
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-700" />
              <span>Certified Hardware Assemblies & Technical Specifications</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Precision mechanical parts, optical elements, and sensors powering {instrument.name.en}.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-white font-mono uppercase text-[11px]">
                <tr>
                  <th className="px-4 py-3">Component Name</th>
                  <th className="px-4 py-3">Technical Specification</th>
                  <th className="px-4 py-3">Functional Role in Assay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {instrument.hardwareComponents.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 font-mono">
                      {comp.name}
                    </td>
                    <td className="px-4 py-3.5 text-cyan-800 font-medium font-mono text-[11px]">
                      {comp.specification}
                    </td>
                    <td className="px-4 py-3.5 leading-relaxed">
                      {comp.function}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
