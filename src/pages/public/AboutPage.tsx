import React from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { ShieldCheck, BookOpen, GraduationCap, Wrench, Globe, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Academic Identity & Ethics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About BioScience Hub
        </h1>
        <p className="text-base text-slate-600 mt-3 leading-relaxed">
          {t(
            'BioScience Hub is an independent, non-commercial biotechnology academic encyclopedia and competitive examination preparation platform created to deliver uncompromising scientific rigor and dual-language comprehension to undergraduate and postgraduate scholars across India.',
            'BioScience Hub ek independent academic platform hai jo B.Sc., M.Sc., aur B.Tech biotechnology scholars ko authentic scientific concepts aur entrance exam preparation provide karta hai.'
          )}
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <ShieldCheck className="w-6 h-6 text-cyan-600 mb-3" />
          <h2 className="text-sm font-bold text-slate-900">Evidence-Based Source Verification</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Our editorial priority is to ground academic content, examination patterns, and opportunities directly in official bulletins, university circulars, and standard peer-reviewed literature. While human oversight is continuous and ongoing audits correct ambiguities, we do not claim infallible perfection; unverified or tentative notices are explicitly flagged to preserve academic integrity.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <Globe className="w-6 h-6 text-emerald-600 mb-3" />
          <h2 className="text-sm font-bold text-slate-900">Bilingual English & Roman Hinglish</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Science should never be gated by language barriers. Our dual-language engine renders high-level molecular mechanisms in conversational Roman-script Hinglish (no Devanagari), clarifying difficult steps for scholars whose conceptual reasoning outpaces textbook English.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <BookOpen className="w-6 h-6 text-indigo-600 mb-3" />
          <h2 className="text-sm font-bold text-slate-900">11 Canonical Subjects</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            From Cell Biology and Molecular Genetics to Bioprocess Engineering and IPR/Biosafety, each subject follows a structured hierarchy of Units, Chapters, and Subtopics cross-referenced with peer-reviewed literature.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <GraduationCap className="w-6 h-6 text-purple-600 mb-3" />
          <h2 className="text-sm font-bold text-slate-900">6 National Examination Portals</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Dedicated preparation blueprints for GAT-B (DBT NTA), DBT-JRF / BET, GATE Biotechnology, IIT JAM Biotechnology, CUET-PG Life Sciences, and CSIR-NET Life Sciences.
          </p>
        </div>
      </div>

      {/* Textbooks & Citations */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
          Authoritative Reference Works Referenced in Curriculum
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Lehninger Principles of Biochemistry</div>
            <div className="text-[11px] text-slate-400">Nelson & Cox (8th Edition)</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Molecular Biology of the Cell</div>
            <div className="text-[11px] text-slate-400">Alberts et al. (7th Edition)</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Kuby Immunology</div>
            <div className="text-[11px] text-slate-400">Punt, Stranford, Jones & Owen (8th Edition)</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Bioprocess Engineering Principles</div>
            <div className="text-[11px] text-slate-400">Pauline M. Doran (2nd Edition)</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Brock Biology of Microorganisms</div>
            <div className="text-[11px] text-slate-400">Madigan et al. (16th Edition)</div>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg">
            <div className="font-semibold text-white">Gene Cloning and DNA Analysis</div>
            <div className="text-[11px] text-slate-400">T.A. Brown (8th Edition)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
