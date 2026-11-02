import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { BIOSCIENCE_MASTERY_URLS } from '../../data/ecosystemLinks.ts';
import { BookOpen, ArrowLeft, ArrowRight, CheckCircle2, Bookmark, ExternalLink, GraduationCap } from 'lucide-react';

export const SubjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();

  const subject = CORE_SUBJECTS.find((s) => s.slug === slug);

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900">Subject Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">The requested biotechnology subject does not exist.</p>
        <Link to="/subjects" className="mt-4 inline-block text-xs text-cyan-700 underline">
          ← Return to Subjects Directory
        </Link>
      </div>
    );
  }

  // Sample units structure for the 4 units in each subject
  const sampleUnits = [
    {
      unitNum: 1,
      title: 'Structural Architecture & Biochemical Foundations',
      topics: [
        { title: 'Membrane Fluidity and Lipid Bilayer Asymmetry', slug: 'membrane-fluidity' },
        { title: 'Transport Kinetics: Active vs Facilitated Diffusion', slug: 'transport-kinetics' },
        { title: 'Thermodynamics of Macromolecular Assemblies', slug: 'macromolecular-thermodynamics' },
      ],
    },
    {
      unitNum: 2,
      title: 'Catalytic Mechanics & Metabolic Networks',
      topics: [
        { title: 'Michaelis-Menten Kinetics and Bisubstrate Reactions', slug: 'enzyme-kinetics' },
        { title: 'Allosteric Regulation and Feedback Inhibition', slug: 'allosteric-regulation' },
        { title: 'Bioenergetic Flux in Respiratory Chains', slug: 'bioenergetic-flux' },
      ],
    },
    {
      unitNum: 3,
      title: 'Information Storage & Genetic Replication Fidelity',
      topics: [
        {
          title: subject.slug === 'molecular-biology'
            ? 'DNA Replication in Prokaryotes: Molecular Architecture and Fidelity'
            : 'Genetic Transmission and Semiconservative Replication',
          slug: subject.slug === 'molecular-biology' ? 'dna-replication-in-prokaryotes' : 'dna-replication',
        },
        { title: 'Topological Constraints: Supercoiling and Topoisomerases', slug: 'topological-constraints' },
        { title: 'Chromatin Remodeling and Epigenetic States', slug: 'chromatin-remodeling' },
      ],
    },
    {
      unitNum: 4,
      title: 'Biotechnological Applications & Industrial Frontiers',
      topics: [
        { title: 'Recombinant Expression Optimization in Microbial Hosts', slug: 'recombinant-expression' },
        { title: 'Scale-Up Considerations and Kinetic Modeling', slug: 'scale-up-considerations' },
        { title: 'Analytical Quality Control and Process Validation', slug: 'process-validation' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/subjects" className="hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Subjects
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{subject.name.en}</span>
      </div>

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 font-bold mb-2">
          <span>SUBJECT 0{subject.orderIndex}</span>
          <span>·</span>
          <span>{subject.unitsCount} UNITS</span>
          <span>·</span>
          <span>{subject.topicsCount} TOPICS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hinglish' ? subject.name.hinglish : subject.name.en}
        </h1>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-4xl">
          {language === 'hinglish' ? subject.overview.hinglish : subject.overview.en}
        </p>
      </div>

      {/* Learning Objectives Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Core Academic Learning Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subject.learningObjectives[language === 'hinglish' ? 'hinglish' : 'en'].map((obj, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Formulas Section */}
      {subject.keyFormulas && subject.keyFormulas.length > 0 && (
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
            Essential Quantitative Equations & Kinetics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subject.keyFormulas.map((form, i) => (
              <div key={i} className="p-4 bg-slate-800/80 rounded-lg border border-slate-700">
                <div className="text-xs font-semibold text-slate-200">{form.name}</div>
                <div className="font-mono text-cyan-400 text-sm font-bold my-2 p-2 bg-slate-950/60 rounded">
                  {form.formula}
                </div>
                <div className="text-[11px] text-slate-400">
                  {language === 'hinglish' ? form.description.hinglish : form.description.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Units & Topics Hierarchy */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Units & Chapter Syllabus Breakdown
          </h2>
          <span className="text-xs text-slate-500">
            A–Z Topic Hierarchy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleUnits.map((unit) => (
            <div key={unit.unitNum} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>UNIT 0{unit.unitNum}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                {unit.title}
              </h3>
              <ul className="divide-y divide-slate-100">
                {unit.topics.map((t, idx) => (
                  <li key={idx} className="py-2.5 flex items-center justify-between text-xs group">
                    <span className="text-slate-700 group-hover:text-cyan-700 transition-colors">
                      {t.title}
                    </span>
                    <Link
                      to={`/subjects/${subject.slug}/${t.slug}`}
                      className="text-cyan-700 font-medium group-hover:underline flex items-center gap-1 shrink-0 ml-2"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BioScience Mastery Practice Bridge */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Cross-Platform Learning Bridge
            </span>
          </div>
          <h3 className="text-base font-bold text-white">
            Practice {subject.name.en} for National Examinations
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Apply {subject.name.en} concepts to high-yield competitive question patterns, worked solutions, and mock exam assessments on BioScience Mastery.
          </p>
        </div>

        <a
          href={BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL}
          className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-xs"
        >
          <GraduationCap className="w-4 h-4 text-slate-950" />
          <span>Practice on BioScience Mastery →</span>
        </a>
      </div>

      {/* Academic References */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Verified Academic Literature & Textbooks
        </h3>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
          {subject.references.map((ref, idx) => (
            <li key={idx}>
              <span className="font-medium text-slate-800">{ref.citation}</span>
              {ref.year && <span className="text-slate-400 ml-1">({ref.year})</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
