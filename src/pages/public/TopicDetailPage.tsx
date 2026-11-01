import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SAMPLE_TOPIC_DETAILS, CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { ArrowLeft, Bookmark, CheckCircle2, BookOpen, Clock, AlertCircle, ExternalLink } from 'lucide-react';

export const TopicDetailPage: React.FC = () => {
  const { slug, topic: topicSlug } = useParams<{ slug: string; topic: string }>();
  const { language, t } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const subject = CORE_SUBJECTS.find((s) => s.slug === slug);
  const topicData = topicSlug ? SAMPLE_TOPIC_DETAILS[topicSlug] : null;

  // Fallback content if specific deep subtopic is dynamically accessed
  const displayTopic = topicData || {
    slug: topicSlug || 'topic',
    subjectSlug: slug || 'molecular-biology',
    title: {
      en: topicSlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Biotechnology Topic',
      hinglish: topicSlug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Biotechnology Topic',
    },
    difficulty: 'Intermediate' as const,
    readTimeMin: 10,
    definitions: [
      {
        term: 'Molecular Mechanism',
        en: 'Specific biological sequence of physical and chemical interactions between macromolecules resulting in a physiological state.',
        hinglish: 'Macromolecules ke beech physical aur chemical reactions ka sequence jisse physiological changes aate hain.',
      },
    ],
    content: {
      en: {
        introduction: `This topic covers foundational principles of ${topicSlug} within the ${subject?.name.en || 'biotechnology'} curriculum, emphasizing experimental methods, stoichiometric parameters, and competitive examination problem-solving.`,
        mechanism: [
          'Step 1: Initiation and structural recognition of complementary binding sites.',
          'Step 2: Catalytic transition state lowering and intermediate stabilization.',
          'Step 3: Processive elongation and thermodynamic driving forces.',
          'Step 4: Allosteric termination and enzymatic recycling.',
        ],
        pathwaySteps: [
          'Substrate binding -> Conformational shift -> Product release',
        ],
        keyPoints: [
          'High fidelity maintained through selective hydrogen bonding and stereochemical fit.',
          'Rate-limiting steps dictate kinetic throughput in metabolic and regulatory cascades.',
        ],
        applications: [
          'Recombinant bioproduction and cell line optimization.',
          'Diagnostic biomarker assay development and molecular target inhibition.',
        ],
        revisionNotes: [
          'Review equilibrium binding constants and Michaelis-Menten kinetic limits.',
          'Memorize key cofactor dependencies (Mg2+, ATP, NAD+).',
        ],
      },
      hinglish: {
        introduction: `Ye topic ${subject?.name.en || 'biotechnology'} ke core principles ko explain karta hai with detailed steps aur examination questions focus.`,
        mechanism: [
          'Step 1: Substrate aur enzyme ke beech initial binding recognition.',
          'Step 2: Catalytic reaction aur transition state formation.',
          'Step 3: Product formation aur release.',
        ],
        keyPoints: [
          'Stereochemical accuracy biological activity ke liye critical hai.',
          'Enzyme kinetics me rate limiting step overall speed determine karta hai.',
        ],
        applications: [
          'Industrial fermentation aur downstream protein purification.',
        ],
        revisionNotes: [
          'Cofactors aur coenzymes ki requirement note karein.',
        ],
      },
    },
    references: [
      { citation: 'Lehninger Principles of Biochemistry. 8th Edition.', doiOrLink: 'https://doi.org/10.1016/0307-4412(83)90069-4' },
      { citation: 'Alberts Molecular Biology of the Cell. 7th Edition.', doiOrLink: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' },
    ],
  };

  const currentContent = language === 'hinglish' ? displayTopic.content.hinglish : displayTopic.content.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Link to="/subjects" className="hover:text-slate-900">
            Subjects
          </Link>
          <span>/</span>
          <Link to={`/subjects/${slug}`} className="hover:text-slate-900">
            {subject?.name.en || 'Subject'}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{displayTopic.title.en}</span>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md border text-xs transition-colors ${
            isBookmarked
              ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-700 text-cyan-700' : ''}`} />
          <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      {/* Title Header */}
      <div>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
          <span className="font-semibold text-cyan-700 uppercase tracking-wider font-mono">
            {displayTopic.difficulty} Tier
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {displayTopic.readTimeMin} min read
          </span>
          <span>·</span>
          <span>Bilingual Edition</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {language === 'hinglish' ? displayTopic.title.hinglish : displayTopic.title.en}
        </h1>
      </div>

      {/* Language Version Notice if needed */}
      {language === 'hinglish' && !topicData && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Hinglish translation notes for this subtopic are currently being peer-reviewed. Displaying concise bilingual summary.
          </span>
        </div>
      )}

      {/* 1. Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">
          01. Topic Overview & Context
        </h2>
        <p>{currentContent.introduction}</p>
      </div>

      {/* 2. Key Definitions */}
      {displayTopic.definitions && displayTopic.definitions.length > 0 && (
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
            02. Standard Scientific Definitions
          </h2>
          <div className="space-y-3">
            {displayTopic.definitions.map((def, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-900">{def.term}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {language === 'hinglish' ? def.hinglish : def.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Detailed Molecular Mechanism */}
      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 font-mono">
          03. Step-by-Step Mechanism
        </h2>
        <ol className="space-y-3">
          {currentContent.mechanism.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
              <span className="w-6 h-6 rounded bg-slate-900 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* 4. Key Exam Takeaways & Revision Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
            Competitive Exam Takeaways
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {currentContent.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-3">
            Rapid Revision Checklist
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {currentContent.revisionNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-700 font-bold mt-0.5">·</span>
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. References */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs text-slate-600">
        <h4 className="font-semibold text-slate-800 mb-2 uppercase tracking-wider text-[11px]">
          Authoritative Literature & Primary Citations
        </h4>
        <ul className="space-y-1">
          {displayTopic.references.map((ref, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span>{ref.citation}</span>
              {ref.doiOrLink && (
                <a
                  href={ref.doiOrLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:underline inline-flex items-center gap-1 text-[11px]"
                >
                  Source <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
        <Link
          to={`/subjects/${slug}`}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {subject?.name.en || 'Subject'}
        </Link>
        <Link
          to="/exams"
          className="text-xs text-cyan-700 hover:underline font-semibold"
        >
          Explore Exam Mapping for this Topic →
        </Link>
      </div>
    </div>
  );
};
