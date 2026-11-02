import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS, SAMPLE_TOPIC_DETAILS } from '../../data/subjectsData.ts';
import { TOPICS_COMPREHENSIVE_KNOWLEDGE, MultiLevelTopicData } from '../../data/topicsKnowledgeBase.ts';
import { GroundedSearchAssistant } from '../../components/common/GroundedSearchAssistant.tsx';
import { BIOSCIENCE_MASTERY_URLS } from '../../data/ecosystemLinks.ts';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Award,
  AlertTriangle,
  HelpCircle,
  Database,
  Calculator,
  Compass,
  Check,
  X,
  GraduationCap
} from 'lucide-react';

export const TopicDetailPage: React.FC = () => {
  const { slug, topic: topicSlug } = useParams<{ slug: string; topic: string }>();
  const { language } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [learningTier, setLearningTier] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const subject = CORE_SUBJECTS.find((s) => s.slug === slug);
  const curatedTopic: MultiLevelTopicData | undefined = topicSlug ? TOPICS_COMPREHENSIVE_KNOWLEDGE[topicSlug] : undefined;
  const legacySample = topicSlug ? SAMPLE_TOPIC_DETAILS[topicSlug] : undefined;

  // Synthesize rich topic details whether predefined or dynamically generated for any topic in the 11 subjects
  const formattedTitle = topicSlug
    ? topicSlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Biotechnology Topic';

  const topicData: MultiLevelTopicData = curatedTopic || {
    slug: topicSlug || 'topic',
    subjectSlug: slug || 'molecular-biology',
    title: {
      en: legacySample?.title.en || `${formattedTitle}: Foundational to Advanced Mechanisms`,
      hinglish: legacySample?.title.hinglish || `${formattedTitle}: Basic se Advanced Concepts`,
    },
    difficulty: legacySample?.difficulty || 'Intermediate',
    readTimeMin: legacySample?.readTimeMin || 14,
    basicLevel: {
      overview: {
        en: legacySample?.content.en.introduction || `Comprehensive study of ${formattedTitle} within the ${subject?.name.en || 'Biotechnology'} syllabus, bridging molecular foundations, enzymatic cascades, and competitive examination requirements.`,
        hinglish: legacySample?.content.hinglish.introduction || `${formattedTitle} ke core concepts, molecular pathways, aur competitive exams ke important rules ka detailed study.`,
      },
      analogy: {
        en: `Consider ${formattedTitle} like a high-precision factory assembly line where each macromolecule fulfills an exact kinetic role, strictly regulated by allosteric feedback and energy thresholds.`,
        hinglish: `${formattedTitle} ko ek high-tech automated factory samjhein jahan har protein aur enzyme ka specific kaam hota hai aur feedback loops se reaction rate control hoti hai.`,
      },
      corePrinciples: [
        {
          en: 'Thermodynamic driving forces: Reactions proceed spontaneously only when Gibbs free energy change (ΔG) is negative.',
          hinglish: 'Thermodynamic rule: Reaction tabhi spontaneous hoti hai jab Gibbs free energy change (ΔG) negative ho.',
        },
        {
          en: 'Stereochemical specificity: Molecular recognition relies on complementary non-covalent bonding geometries.',
          hinglish: 'Stereochemical fit: Molecules specific non-covalent bonds (H-bonds, ionic bonds) se interact karte hain.',
        },
      ],
      basicVocabulary: legacySample?.definitions || [
        {
          term: 'Macromolecular Complex',
          en: 'Stable assembly of proteins, nucleic acids, or lipids coordinating a cellular process.',
          hinglish: 'Proteins aur nucleic acids ka stable group jo specific biological function execute karta hai.',
        },
        {
          term: 'Rate-Limiting Step',
          en: 'The slowest elementary step in a metabolic or signaling pathway determining overall throughput.',
          hinglish: 'Poore pathway ka sabse slow step jo overall reaction speed ko control karta hai.',
        },
      ],
    },
    intermediateLevel: {
      biochemicalMechanism: legacySample?.content.en.mechanism.map((m) => ({ en: m, hinglish: m })) || [
        {
          en: 'Initiation: High-affinity binding to target recognition sites triggered by allosteric conformational shifts.',
          hinglish: 'Initiation: Target sequence par specific proteins bind karke active complex banate hain.',
        },
        {
          en: 'Catalytic Propagation: Enzyme stabilizes transition state through acid-base catalysis and nucleophilic attack.',
          hinglish: 'Elongation: Transition state stabilize karke continuous reaction execute hoti hai.',
        },
        {
          en: 'Termination & Dissociation: Hydrolysis of high-energy phosphate bonds (GTP/ATP) resets the catalytic cycle.',
          hinglish: 'Termination: High-energy bond hydrolysis se complex release ho jata hai.',
        },
      ],
      reactionSteps: [
        {
          step: 1,
          title: 'Molecular Recognition & Substrate Binding',
          en: 'Specific docking of reactant molecules into hydrophobic catalytic clefts.',
          hinglish: 'Substrate active site me dock hota hai through hydrogen bonding aur electrostatic forces.',
        },
        {
          step: 2,
          title: 'Transition State Lowering',
          en: 'Catalytic residues lower the free activation energy barrier (ΔG‡).',
          hinglish: 'Enzyme activation energy barrier ko reduce karta hai.',
        },
        {
          step: 3,
          title: 'Product Release & Regeneration',
          en: 'Formed products dissociate, restoring enzyme to native ground state.',
          hinglish: 'Product release hota hai aur enzyme wapas ready ho jata hai.',
        },
      ],
      laboratoryTechniques: [
        {
          en: 'High-Resolution SDS-PAGE & Western Blotting for protein expression and molecular weight validation.',
          hinglish: 'SDS-PAGE aur Western Blotting se protein size aur presence verify ki jaati hai.',
        },
        {
          en: 'Surface Plasmon Resonance (SPR) to determine real-time association (ka) and dissociation (kd) binding constants.',
          hinglish: 'SPR technique se real-time binding kinetics aur Kd value calculate karte hain.',
        },
      ],
      stoichiometryAndCofactors: [
        {
          en: 'Divalent cation cofactor (Mg2+ / Mn2+) coordination stabilizes negatively charged polyphosphate backbones.',
          hinglish: 'Mg2+ ions phosphate charges ko neutralize karke enzymatic catalysis me help karte hain.',
        },
      ],
    },
    advancedLevel: {
      biophysicalThermodynamics: {
        en: 'The standard Gibbs free energy change relates to the equilibrium constant via ΔG° = -RT ln(K_eq). In living non-equilibrium steady states, flux is driven by the actual free energy change ΔG = ΔG° + RT ln(Q), where Q is the mass-action ratio.',
        hinglish: 'Actual intracellular state me reaction equilibrium me nahi hoti, balki steady-state me rehti hai: ΔG = ΔG° + RT ln(Q). Negative ΔG reaction ko forward drive karta hai.',
      },
      mathematicalEquations: [
        {
          name: 'Free Energy of Reaction',
          formula: 'ΔG = ΔG° + RT * ln([Products] / [Reactants])',
          description: 'Calculates the driving force under non-standard cellular concentration ratios.',
        },
        {
          name: 'Arrhenius Rate Constant',
          formula: 'k = A * e^(-Ea / (R * T))',
          description: 'Relates reaction rate constant exponentially to activation energy (Ea) and absolute temperature (T).',
        },
      ],
      modernInVivoRealities: [
        {
          en: 'Liquid-Liquid Phase Separation (LLPS): Membraneless organelles (nucleoli, stress granules) form via multivalent weak interactions between intrinsically disordered protein regions (IDRs).',
          hinglish: 'Living cells me bina membrane wale compartments (LLPS) bante hain jisse local concentration 100 times increase ho jaati hai.',
        },
      ],
      examPitfallsAndTraps: [
        {
          exam: 'GATE Biotechnology',
          pitfall: 'Assuming enzymes change the equilibrium constant Keq.',
          correction: 'Enzymes only accelerate the rate of reaching equilibrium by lowering activation energy; Keq is purely thermodynamic and remains unchanged.',
        },
        {
          exam: 'CSIR-NET Life Sciences',
          pitfall: 'Confusing ΔG (actual driving force) with ΔG° (standard condition constant at 1M concentrations).',
          correction: 'A reaction with positive ΔG° can readily proceed forward in vivo if products are rapidly removed, driving Q low and ΔG negative.',
        },
      ],
      scienceDatabases: {
        pdbId: '1BNA',
        pdbTitle: 'Crystal structure of a B-DNA dodecamer at 1.9 Angstrom resolution',
        alphaFoldUniProt: 'P04637',
        alphaFoldProtein: 'Cellular tumor antigen p53',
        pubchemCid: 5957,
        pubchemName: 'Adenosine Triphosphate (ATP)',
        uniprotId: 'P04637',
      },
    },
    practiceQuestions: [
      {
        question: {
          en: `For a biochemical reaction catalyzed by an enzyme in ${subject?.name.en || 'Life Sciences'}, which of the following parameters is altered by the catalyst?`,
          hinglish: `Enzyme dwara catalyze hone wali reaction me kaun sa parameter change hota hai?`,
        },
        options: [
          'Standard Gibbs free energy change (ΔG°)',
          'Equilibrium constant (Keq)',
          'Activation energy barrier (ΔG‡)',
          'Enthalpy of reaction (ΔH°)'
        ],
        correctIndex: 2,
        explanation: {
          en: 'Enzymes exclusively lower the activation energy barrier (ΔG‡) by stabilizing the transition state. State functions (ΔG°, ΔH°, Keq) depend only on initial and final states and are completely unaltered.',
          hinglish: 'Enzyme sirf activation energy (ΔG‡) ko reduce karta hai; ΔG°, ΔH°, aur Keq ko change nahi kar sakta.',
        },
        examSource: 'GATE Biotechnology Core',
      },
    ],
    references: legacySample?.references.map((r) => ({ citation: r.citation, doiOrLink: r.doiOrLink, type: 'Textbook' as const })) || [
      { citation: 'Lehninger Principles of Biochemistry. 8th Edition, W. H. Freeman.', type: 'Textbook' },
      { citation: 'Alberts B. et al. Molecular Biology of the Cell. 7th Edition, Garland Science.', doiOrLink: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/', type: 'Textbook' },
    ],
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setRevealedSolutions((prev) => ({ ...prev, [qIdx]: true }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Navigation Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/subjects" className="hover:text-slate-900 font-medium">
            Subjects
          </Link>
          <span>/</span>
          <Link to={`/subjects/${slug}`} className="hover:text-slate-900 font-medium">
            {subject?.name.en || 'Subject'}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-sm">
            {language === 'hinglish' ? topicData.title.hinglish : topicData.title.en}
          </span>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors self-start sm:self-auto ${
            isBookmarked
              ? 'bg-cyan-50 text-cyan-800 border-cyan-300 font-bold'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-700 text-cyan-700' : ''}`} />
          <span>{isBookmarked ? 'Bookmarked' : 'Save for Revision'}</span>
        </button>
      </div>

      {/* Main Title & Metadata */}
      <div>
        <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2 flex-wrap">
          <span className="font-bold text-cyan-700 uppercase tracking-wider font-mono bg-cyan-50 px-2 py-0.5 rounded">
            {topicData.difficulty} Tier
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {topicData.readTimeMin} min read
          </span>
          <span>·</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Basic to Advanced Masterclass
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {language === 'hinglish' ? topicData.title.hinglish : topicData.title.en}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          {language === 'hinglish' ? topicData.basicLevel.overview.hinglish : topicData.basicLevel.overview.en}
        </p>
      </div>

      {/* MULTI-LEVEL LEARNING TIER SELECTOR */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-3 py-1 mb-1">
          Select Learning Depth Level:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setLearningTier('all')}
            className={`p-3 rounded-xl text-left border transition-all ${
              learningTier === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>All Levels</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${learningTier === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
              Complete In-Depth Syllabus
            </div>
          </button>

          <button
            onClick={() => setLearningTier('basic')}
            className={`p-3 rounded-xl text-left border transition-all ${
              learningTier === 'basic'
                ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>⭐</span>
              <span>Level 1: Basic</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${learningTier === 'basic' ? 'text-cyan-100' : 'text-slate-500'}`}>
              Foundations & Analogies
            </div>
          </button>

          <button
            onClick={() => setLearningTier('intermediate')}
            className={`p-3 rounded-xl text-left border transition-all ${
              learningTier === 'intermediate'
                ? 'bg-indigo-700 text-white border-indigo-700 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>⚡</span>
              <span>Level 2: Mechanisms</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${learningTier === 'intermediate' ? 'text-indigo-100' : 'text-slate-500'}`}>
              Steps, Assays & Pathways
            </div>
          </button>

          <button
            onClick={() => setLearningTier('advanced')}
            className={`p-3 rounded-xl text-left border transition-all ${
              learningTier === 'advanced'
                ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>🔬</span>
              <span>Level 3: Advanced</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${learningTier === 'advanced' ? 'text-purple-100' : 'text-slate-500'}`}>
              Biophysics & Exam Traps
            </div>
          </button>
        </div>
      </div>

      {/* SECTION 1: LEVEL 1 BASIC FOUNDATIONS */}
      {(learningTier === 'all' || learningTier === 'basic') && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-800 font-mono flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-cyan-100 text-cyan-800 flex items-center justify-center text-xs">
                01
              </span>
              <span>Level 1: Basic Foundations & Conceptual Analogies</span>
            </h2>
            <span className="text-[11px] font-mono text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded">
              Beginner Friendly
            </span>
          </div>

          {/* Intuitive Real-World Analogy */}
          <div className="p-4 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-1.5">
            <div className="text-xs font-bold text-cyan-900 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Real-World Intuitive Analogy:</span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-950 leading-relaxed italic">
              {language === 'hinglish' ? topicData.basicLevel.analogy.hinglish : topicData.basicLevel.analogy.en}
            </p>
          </div>

          {/* Core Principles */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Core Foundational Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topicData.basicLevel.corePrinciples.map((cp, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mb-1.5" />
                  <span>{language === 'hinglish' ? cp.hinglish : cp.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Vocabulary */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Essential Scientific Terminology
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topicData.basicLevel.basicVocabulary.map((voc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-bold text-xs text-slate-900 font-mono block">{voc.term}</span>
                  <span className="text-xs text-slate-600 mt-1 block leading-relaxed">
                    {language === 'hinglish' ? voc.hinglish : voc.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: LEVEL 2 INTERMEDIATE MECHANISMS */}
      {(learningTier === 'all' || learningTier === 'intermediate') && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-800 font-mono flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs">
                02
              </span>
              <span>Level 2: Intermediate Molecular Mechanisms & Reaction Steps</span>
            </h2>
            <span className="text-[11px] font-mono text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
              Molecular Detail
            </span>
          </div>

          {/* Sequential Reaction Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Step-by-Step Reaction Cascade
            </h3>
            <div className="space-y-3">
              {topicData.intermediateLevel.reactionSteps.map((s) => (
                <div key={s.step} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-slate-900 block font-mono">{s.title}</span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {language === 'hinglish' ? s.hinglish : s.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Laboratory Assays & Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2 font-mono uppercase">
                Laboratory Experimental Techniques
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                {topicData.intermediateLevel.laboratoryTechniques.map((lt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{language === 'hinglish' ? lt.hinglish : lt.en}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2 font-mono uppercase">
                Stoichiometry, Cofactors & ATP Budget
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                {topicData.intermediateLevel.stoichiometryAndCofactors.map((sc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{language === 'hinglish' ? sc.hinglish : sc.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: LEVEL 3 ADVANCED & RESEARCH FRONTIER */}
      {(learningTier === 'all' || learningTier === 'advanced') && (
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-purple-900 font-mono flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-900 flex items-center justify-center text-xs">
                03
              </span>
              <span>Level 3: Advanced Biophysics & Competitive Exam Traps</span>
            </h2>
            <span className="text-[11px] font-mono text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded">
              Research & Exam Frontier
            </span>
          </div>

          {/* Biophysical Thermodynamics */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-900 font-mono uppercase flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5 text-purple-700" />
              <span>Biophysical Thermodynamics & Mathematical Derivation:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {language === 'hinglish'
                ? topicData.advancedLevel.biophysicalThermodynamics.hinglish
                : topicData.advancedLevel.biophysicalThermodynamics.en}
            </p>
          </div>

          {/* Mathematical Formulations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topicData.advancedLevel.mathematicalEquations.map((eq, idx) => (
              <div key={idx} className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  {eq.name}
                </span>
                <span className="text-sm font-mono font-bold text-amber-300 block">{eq.formula}</span>
                <span className="text-xs text-slate-300 block leading-relaxed">{eq.description}</span>
              </div>
            ))}
          </div>

          {/* Exam Pitfalls & Tricky Traps */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Competitive Examination Pitfalls (CSIR-NET / GATE / GAT-B)</span>
            </h3>
            <div className="space-y-2.5">
              {topicData.advancedLevel.examPitfallsAndTraps.map((ep, idx) => (
                <div key={idx} className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900 font-mono">{ep.exam} Trapping Point:</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">Common Error</span>
                  </div>
                  <p className="text-rose-900 font-medium">❌ Mistake: {ep.pitfall}</p>
                  <p className="text-emerald-900 font-semibold">✓ Official Correction: {ep.correction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SCIENCE SKILLS DATABASE INTEGRATION HUB */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300">
                  Science Skills Data Cross-References (PDB · AlphaFold · PubChem)
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">DeepMind Science Skills</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {topicData.advancedLevel.scienceDatabases.pdbId && (
                <a
                  href={`https://www.rcsb.org/structure/${topicData.advancedLevel.scienceDatabases.pdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 block transition-colors group"
                >
                  <span className="text-[10px] font-mono text-cyan-400 block font-bold">RCSB PDB 3D STRUCTURE</span>
                  <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-cyan-300">
                    PDB ID: {topicData.advancedLevel.scienceDatabases.pdbId}
                  </span>
                  <span className="text-[11px] text-slate-400 block truncate mt-1">
                    {topicData.advancedLevel.scienceDatabases.pdbTitle || 'View Experimental Coordinates'}
                  </span>
                </a>
              )}

              {topicData.advancedLevel.scienceDatabases.alphaFoldUniProt && (
                <a
                  href={`https://alphafold.ebi.ac.uk/entry/${topicData.advancedLevel.scienceDatabases.alphaFoldUniProt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 block transition-colors group"
                >
                  <span className="text-[10px] font-mono text-emerald-400 block font-bold">ALPHAFOLD DB PREDICTION</span>
                  <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-emerald-300">
                    UniProt: {topicData.advancedLevel.scienceDatabases.alphaFoldUniProt}
                  </span>
                  <span className="text-[11px] text-slate-400 block truncate mt-1">
                    {topicData.advancedLevel.scienceDatabases.alphaFoldProtein || 'AlphaFold pLDDT Structure'}
                  </span>
                </a>
              )}

              {topicData.advancedLevel.scienceDatabases.pubchemCid && (
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/compound/${topicData.advancedLevel.scienceDatabases.pubchemCid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 block transition-colors group"
                >
                  <span className="text-[10px] font-mono text-amber-400 block font-bold">PUBCHEM CHEMICAL ENTITY</span>
                  <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-amber-300">
                    CID: {topicData.advancedLevel.scienceDatabases.pubchemCid}
                  </span>
                  <span className="text-[11px] text-slate-400 block truncate mt-1">
                    {topicData.advancedLevel.scienceDatabases.pubchemName || 'Chemical Properties & 2D/3D'}
                  </span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: INTERACTIVE PRACTICE QUIZ */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-700" />
            <span>Interactive Exam Practice Questions</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-500 font-semibold">Immediate Assessment</span>
        </div>

        <div className="space-y-6">
          {topicData.practiceQuestions.map((q, qIdx) => {
            const hasAnswered = quizAnswers[qIdx] !== undefined;
            const selectedOpt = quizAnswers[qIdx];
            const isCorrect = selectedOpt === q.correctIndex;

            return (
              <div key={qIdx} className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">
                    {q.examSource}
                  </span>
                  {hasAnswered && (
                    <span
                      className={`text-xs font-bold flex items-center gap-1 font-mono ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  {qIdx + 1}. {language === 'hinglish' ? q.question.hinglish : q.question.en}
                </p>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isPicked = selectedOpt === optIdx;
                    let optClass = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';

                    if (hasAnswered) {
                      if (optIdx === q.correctIndex) {
                        optClass = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                      } else if (isPicked) {
                        optClass = 'bg-rose-50 text-rose-900 border-rose-400 font-semibold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center gap-2 ${optClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-100 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {revealedSolutions[qIdx] && (
                  <div className="p-3.5 bg-cyan-50/70 border border-cyan-200 rounded-lg text-xs space-y-1">
                    <span className="font-bold text-cyan-900 font-mono block">In-Depth Official Explanation:</span>
                    <p className="text-cyan-950 leading-relaxed">
                      {language === 'hinglish' ? q.explanation.hinglish : q.explanation.en}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: GOOGLE SEARCH GROUNDED RESEARCH ASSISTANT */}
      <GroundedSearchAssistant
        initialTopicTitle={topicData.title.en}
        subjectName={subject?.name.en}
      />

      {/* SECTION 6: PRIMARY REFERENCES */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs text-slate-600">
        <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wider text-[11px] font-mono">
          Authoritative Literature & Standard References
        </h4>
        <ul className="space-y-1.5">
          {topicData.references.map((ref, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{ref.citation}</span>
              {ref.doiOrLink && (
                <a
                  href={ref.doiOrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:underline inline-flex items-center gap-1 text-[11px] font-medium"
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Cross-Platform Exam Practice Bridge */}
      <div className="bg-slate-900 rounded-xl p-5 text-white border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              BioScience Mastery Exam Practice
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">
            Practice competitive exam questions for this topic
          </h4>
          <p className="text-xs text-slate-300">
            Apply your conceptual learning from this chapter to GAT-B, GATE & CSIR-NET practice assessments.
          </p>
        </div>

        <a
          href={BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL}
          className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-xs"
        >
          <GraduationCap className="w-3.5 h-3.5 text-slate-950" />
          <span>Practice on Mastery →</span>
        </a>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <Link
          to={`/subjects/${slug}`}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {subject?.name.en || 'Subject Units'}
        </Link>
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link to="/exams" className="text-slate-600 hover:text-slate-900">
            Exam Syllabus Directory
          </Link>
          <span className="text-slate-300">·</span>
          <a
            href={BIOSCIENCE_MASTERY_URLS.EXAMS_PORTAL}
            className="text-cyan-700 hover:text-cyan-900 flex items-center gap-1"
          >
            <span>Mastery Practice Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
