import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { FileText, Download, ExternalLink, ShieldCheck, BookOpen, Layers, Printer, Info } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { language, t } = useLanguage();

  const handlePrintPrimer = (title: string) => {
    window.print();
  };

  const studyResources = [
    {
      title: 'Bioprocess Engineering Formula Sheet & Kinetics Summary',
      type: 'Printable Primer',
      subject: 'Bioprocess Engineering',
      description: 'Comprehensive derivation summary of Monod equation, oxygen mass transfer (kLa), Del factor sterilization kinetics, and continuous chemostat steady-state equations.',
      verified: true,
      internalLink: '/subjects/bioprocess-engineering',
      isPrintable: true,
    },
    {
      title: 'Enzyme Kinetics & Lineweaver-Burk Diagnostic Cheat Sheet',
      type: 'Printable Primer',
      subject: 'Biochemistry',
      description: 'Graphic comparisons of Competitive, Non-competitive, and Uncompetitive inhibition signatures on Michaelis-Menten and double-reciprocal Lineweaver-Burk plots.',
      verified: true,
      internalLink: '/subjects/biochemistry',
      isPrintable: true,
    },
    {
      title: 'Standard Restriction Endonuclease & Recognition Sequence Index',
      type: 'Digital Reference Table',
      subject: 'Genetic Engineering',
      description: 'Comprehensive table of Type II restriction enzymes (EcoRI, BamHI, HindIII, NotI), isoschizomers, cleavage patterns (sticky vs blunt), and heat-inactivation protocols.',
      verified: true,
      internalLink: '/subjects/recombinant-dna-technology',
      isPrintable: false,
    },
    {
      title: 'GAT-B & DBT-JRF Official Syllabus Notification & Weightage Matrix',
      type: 'Official Syllabus Guide',
      subject: 'Competitive Exams',
      description: 'Official Section A and Section B syllabus mapping issued by Department of Biotechnology (DBT) and National Testing Agency (NTA).',
      verified: true,
      internalLink: '/exams/gat-b',
      isPrintable: false,
    },
    {
      title: 'GATE-BT Engineering Mathematics & Bioprocess Formula Primer',
      type: 'Printable Primer',
      subject: 'GATE Biotechnology',
      description: 'Key linear algebra, differential calculus, probability distributions, and bio-thermodynamics review sheet for GATE-BT candidates.',
      verified: true,
      internalLink: '/exams/gate-bt',
      isPrintable: true,
    },
    {
      title: 'Standard Laboratory Buffer Recipes & Preparation Protocols',
      type: 'Laboratory SOP Guide',
      subject: 'Lab Zone',
      description: 'Preparation recipes for 1M Tris-HCl (pH 8.0), 50X TAE, 10X TBE, 10X PBS, and 4X Laemmli SDS-PAGE loading dye.',
      verified: true,
      internalLink: '/lab-zone/protocols',
      isPrintable: true,
    },
    {
      title: 'Centrifugation Nomogram & RPM-to-RCF Conversion Module',
      type: 'Interactive Tool',
      subject: 'Biophysical Chemistry',
      description: 'Radial conversion formulas (RCF = 1.118 × 10⁻⁵ × r × RPM²) across standard benchtop and high-speed fixed-angle rotors.',
      verified: true,
      internalLink: '/lab-zone/calculators?calc=rpm-to-rcf',
      isPrintable: false,
    },
    {
      title: 'Nucleic Acid & Protein UV Spectrophotometric Purity Module (A260/A280)',
      type: 'Interactive Tool',
      subject: 'Molecular Biology',
      description: 'Diagnostic assessment table for pure DNA (1.8), pure RNA (2.0), phenol contamination, and chaotropic salt carryover.',
      verified: true,
      internalLink: '/lab-zone/calculators?calc=dna-concentration',
      isPrintable: false,
    },
    {
      title: 'Biosafety Cabinet Classification & Airflow Standards (Class I, II, III)',
      type: 'Laboratory Instrument Guide',
      subject: 'Biosafety & GLP',
      description: 'HEPA exhaust air recirculating vs total-exhaust ducted specifications (Type A2 vs Type B2) per CDC-NIH BMBL standards.',
      verified: true,
      internalLink: '/lab-zone/instruments#biosafety-cabinet',
      isPrintable: false,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Academic Knowledge Library & Study Resources
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Study Resources & Reference Primers', 'Study Resources aur Reference Primers')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'High-yield formula primers, verified syllabus blueprints, reference tables, and laboratory recipes structured for competitive examination preparation and research. All resources are directly accessible without paywalls.',
            'Formula sheets, official examination syllabus documents, aur laboratory reference guides with verified internal navigation.'
          )}
        </p>
      </div>

      {/* Honest Operational Notice on Downloads */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900">Format Transparency Notice:</span>{' '}
          In accordance with our zero-fabrication academic policy, internal curriculum modules are accessed directly through our web platform. For offline revision, use the <strong>Print / Save PDF</strong> action on formula primers to generate an instant, clean study document via your browser.
        </div>
      </div>

      {/* Grid of Verified Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyResources.map((res, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xs transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded font-semibold uppercase">
                  {res.type}
                </span>
                <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <h2 className="text-sm font-bold text-slate-900 leading-snug">
                {res.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Scope: {res.subject}
              </p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              {res.isPrintable ? (
                <button
                  onClick={() => handlePrintPrimer(res.title)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print / PDF</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400 font-mono">Interactive Hub</span>
              )}
              <Link
                to={res.internalLink}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Open Module</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
