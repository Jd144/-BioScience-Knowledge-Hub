import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { FileText, Download, ExternalLink, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { language, t } = useLanguage();

  const resources = [
    {
      title: 'Bioprocess Engineering Formula Sheet & Kinetics Summary',
      type: 'Quick Revision Guide',
      subject: 'Bioprocess Engineering',
      description: 'Concise summary of Monod equation, oxygen mass transfer (kLa), Del factor sterilization kinetics, and continuous chemostat steady-state equations.',
      verified: true,
      link: '/subjects/bioprocess-engineering',
    },
    {
      title: 'Enzyme Kinetics & Lineweaver-Burk Diagnostic Cheat Sheet',
      type: 'Formula Sheet',
      subject: 'Biochemistry',
      description: 'Graphic comparisons of Competitive, Non-competitive, and Uncompetitive inhibition signatures on Michaelis-Menten and double-reciprocal Lineweaver-Burk plots.',
      verified: true,
      link: '/subjects/biochemistry',
    },
    {
      title: 'Standard Restriction Endonuclease & Recognition Sequence Index',
      type: 'Reference Table',
      subject: 'Genetic Engineering',
      description: 'Comprehensive table of Type II restriction enzymes (EcoRI, BamHI, HindIII, NotI), isoschizomers, cleavage patterns (sticky vs blunt), and heat-inactivation protocols.',
      verified: true,
      link: '/subjects/recombinant-dna-technology',
    },
    {
      title: 'GAT-B & DBT-JRF Official Syllabus Notification & Weightage Matrix',
      type: 'Exam Syllabus',
      subject: 'Competitive Exams',
      description: 'Official Section A and Section B syllabus mapping issued by Department of Biotechnology (DBT) and National Testing Agency (NTA).',
      verified: true,
      link: '/exams/gat-b',
    },
    {
      title: 'GATE-BT Engineering Mathematics & Bioprocess Formula Primer',
      type: 'Exam Guide',
      subject: 'GATE Biotechnology',
      description: 'Key linear algebra, differential calculus, probability distributions, and bio-thermodynamics review sheet for GATE-BT candidates.',
      verified: true,
      link: '/exams/gate-bt',
    },
    {
      title: 'Standard Laboratory Buffer Recipes & Preparation Protocols',
      type: 'Laboratory SOP',
      subject: 'Lab Zone',
      description: 'Preparation recipes for 1M Tris-HCl (pH 8.0), 50X TAE, 10X TBE, 10X PBS, and 4X Laemmli SDS-PAGE loading dye.',
      verified: true,
      link: '/lab-zone/protocols',
    },
    {
      title: 'Centrifugation Nomogram & RPM-to-RCF Conversion Chart',
      type: 'Nomogram & Tables',
      subject: 'Biophysical Chemistry',
      description: 'Radial conversion formulas (RCF = 1.118 × 10⁻⁵ × r × RPM²) across standard benchtop and high-speed fixed-angle rotors.',
      verified: true,
      link: '/lab-zone/calculators?calc=centrifuge-rcf',
    },
    {
      title: 'Nucleic Acid & Protein UV Spectrophotometric Purity Ratios (A260/A280/A230)',
      type: 'Quality Guide',
      subject: 'Molecular Biology',
      description: 'Diagnostic troubleshooting table for pure DNA (1.8), pure RNA (2.0), phenol contamination, and chaotropic salt carryover.',
      verified: true,
      link: '/lab-zone/calculators?calc=dna-purity',
    },
    {
      title: 'Biosafety Cabinet Classification & Airflow Filtration Standards (Class I, II, III)',
      type: 'Safety SOP',
      subject: 'Biosafety & GLP',
      description: 'HEPA exhaust air recirculating vs total-exhaust ducted specifications (Type A2 vs Type B2) per CDC-NIH BMBL standards.',
      verified: true,
      link: '/lab-zone/instruments#biosafety-cabinet-class-ii',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Academic Knowledge Library & Free Downloads
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Free Downloads & Study Resources', 'Free Downloads aur Study Resources')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'High-yield formula sheets, verified syllabus documents, reference tables, and laboratory recipes structured for competitive examination preparation and research reference. 100% public access with zero paywalls.',
            'Formula sheets, official examination syllabus documents, aur laboratory reference guides with zero fabricated download links.'
          )}
        </p>
      </div>

      {/* Grid of Verified Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
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
              <span className="text-[11px] text-slate-400">In-Hub Resource</span>
              <a
                href={res.link}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Access Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
