import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { COMPETITIVE_EXAMINATIONS } from '../../data/examsData.ts';
import { BIOTECH_JOBS } from '../../data/jobsData.ts';
import { INTERNSHIP_OPPORTUNITIES } from '../../data/internshipsData.ts';
import { SCHOLARSHIPS_ADMISSIONS } from '../../data/scholarshipsAdmissionsData.ts';
import { BIOTECH_NEWS } from '../../data/newsData.ts';
import { RESEARCH_PROPOSAL_SCHEMES, SCIENTIFIC_EVENTS_WORKSHOPS } from '../../data/researchCommunityData.ts';
import {
  Layers,
  Atom,
  GitFork,
  Dna,
  Bug,
  Shield,
  Cpu,
  FlaskConical,
  Binary,
  Sprout,
  Scale,
  Search,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Wrench,
  Calculator,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Briefcase,
  Zap,
  Award,
  Calendar,
  Building2,
  Newspaper,
  Compass,
  Download,
  Users,
  BellRing,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-600" />;
      case 'Atom': return <Atom className="w-5 h-5 text-indigo-600" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-emerald-600" />;
      case 'Dna': return <Dna className="w-5 h-5 text-blue-600" />;
      case 'Bug': return <Bug className="w-5 h-5 text-amber-600" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-teal-600" />;
      case 'Binary': return <Binary className="w-5 h-5 text-sky-600" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-slate-700" />;
      default: return <BookOpen className="w-5 h-5 text-cyan-600" />;
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/subjects?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const faqs = [
    {
      q: 'Which competitive examinations are covered on BioScience Knowledge Hub?',
      a: 'The platform strictly supports the 6 major Indian national examinations: GAT-B (DBT NTA), DBT-JRF / BET, GATE Biotechnology, IIT JAM Biotechnology, CUET-PG Life Sciences, and CSIR-NET Life Sciences. All syllabus details, exam patterns, and eligibility mappings are verified against official bulletins.',
    },
    {
      q: 'Are the biotechnology job vacancies and internship calls authentic?',
      a: 'Yes. Every opportunity listed is verified against primary notices issued by CSIR, DBT, ICMR, NII, Biocon, Serum Institute, or national academies. We maintain a zero-fabricated-data standard: every listing includes the issuing organization, official portal link, and real deadline.',
    },
    {
      q: 'How does the bilingual English and Hinglish learning system work?',
      a: 'Students can toggle between English and conversational Roman-script Hinglish at any moment using the top-bar switcher. Hinglish explains complex molecular pathways and biochemical reactions using natural Hindi-English terms in Roman script (no Devanagari), ideal for intuitive conceptual mastery.',
    },
    {
      q: 'Are the formulas and calculation tools experimentally accurate?',
      a: 'Yes. All 9 laboratory calculators (Molarity, Normality, Dilutions C1V1=C2V2, RPM-to-RCF, Beer-Lambert protein quantification, DNA A260/A280 purity, and Buffer preparation) are grounded in verified biophysical chemistry equations with full dimensional analysis and unit validation.',
    },
    {
      q: 'Is any login or payment required to access educational notes or opportunity listings?',
      a: 'No. BioScience Knowledge Hub is currently 100% public. Every subject chapter, exam syllabus guide, laboratory protocol, calculation engine, and job alert is openly accessible without requiring an account or registration.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 overflow-hidden border-b border-slate-200 bg-linear-to-b from-slate-100/70 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Academic Tagline Kicker */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>BioScience Knowledge Hub</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-700 font-semibold">Learn. Master. Prepare for Research.</span>
              <span aria-hidden="true">·</span>
              <span>100% Public Access</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t(
                'Learn Biotechnology. Master Concepts. Prepare for Research.',
                'Learn Biotechnology. Master Concepts. Prepare for Research.'
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t(
                'The unified knowledge and opportunity hub for life sciences scholars. Combining 11 core academic subjects, verified biotech jobs & JRF positions, summer fellowships, 6 competitive exam portals, and virtual lab instrumentation.',
                'Life sciences aur biotechnology students ke liye comprehensive platform. 11 core subjects, verified jobs, summer research fellowships, 6 competitive exam portals, aur laboratory instrumentation.'
              )}
            </p>

            {/* Search Bar in Hero */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="flex max-w-xl shadow-xs rounded-xl overflow-hidden border border-slate-300 bg-white focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-500/20">
                <div className="pl-4 flex items-center text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(
                    'Search subjects, jobs, exams, internships, news, or lab tools...',
                    'Subjects, jobs, exams, internships, ya lab tools search karein...'
                  )}
                  className="w-full px-3 py-3 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  Search Hub
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/subjects"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>Explore 11 Subjects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/jobs"
                className="px-5 py-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Biotech Jobs & JRF</span>
              </Link>
              <Link
                to="/internships"
                className="px-5 py-2.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Summer Fellowships</span>
              </Link>
              <Link
                to="/lab-zone"
                className="px-5 py-2.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-lg border border-cyan-200 transition-colors flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5 text-cyan-700" />
                <span>Virtual Lab Zone</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. URGENT DEADLINES & LIVE ALERTS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg shrink-0 text-amber-800">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                <span>Active National Alerts & Upcoming Deadlines</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-mono font-semibold">Live</span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                DBT-BET 2026 Registration closing soon · NII JRF Cancer Biology application active · BIRAC BIG 25th Call grant submissions open
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/exams"
              className="px-3.5 py-1.5 text-xs font-semibold text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
            >
              View Exam Alerts
            </Link>
            <Link
              to="/research-proposals"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-amber-300 rounded-lg transition-colors whitespace-nowrap"
            >
              View Grants
            </Link>
          </div>
        </div>
      </section>

      {/* 3. 4-QUADRANT OPPORTUNITY & ACADEMIC MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Biotechnology Opportunity Ecosystem
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('Explore Verified Opportunities', 'Verified Opportunities & Careers')}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t(
              'Real-time, source-verified career openings, summer research programs, national fellowships, and doctoral admissions.',
              'CSIR, DBT, ICMR aur industry ke verified jobs, fellowships, scholarships aur Ph.D. admissions.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quadrant 1: Jobs & JRF */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {BIOTECH_JOBS.length} Verified
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Biotech Jobs & JRF</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Vacancies at NII, CSIR-CDRI, Biocon, Serum Institute, and Dr. Reddy’s. Verified eligibility and pay scales.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>• JRF & Project Associates</div>
                <div>• QA/QC & Regulatory Executives</div>
                <div>• Bioinformatics Trainees</div>
              </div>
            </div>
            <Link
              to="/jobs"
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center justify-between pt-2 border-t border-slate-100"
            >
              <span>Browse Jobs Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quadrant 2: Internships */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {INTERNSHIP_OPPORTUNITIES.length} Programs
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Summer Internships</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Science Academies SRFP, CSIR-SRTP, IIT Bombay BSBE, and TIFR VSRP with real stipend details and deadlines.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>• IASc-INSA-NASI Fellowship</div>
                <div>• CSIR Laboratory Training</div>
                <div>• Industry Immersion Programs</div>
              </div>
            </div>
            <Link
              to="/internships"
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center justify-between pt-2 border-t border-slate-100"
            >
              <span>Explore Internships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quadrant 3: Exam Alerts */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  6 Portals
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Entrance Exam Alerts</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Authoritative syllabi and pattern guides for GAT-B, DBT-JRF, GATE BT, IIT JAM, CUET-PG, and CSIR-NET.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>• Exact marking schemes</div>
                <div>• Verified eligibility criteria</div>
                <div>• Direct NTA & agency links</div>
              </div>
            </div>
            <Link
              to="/exams"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center justify-between pt-2 border-t border-slate-100"
            >
              <span>Access Exam Portals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quadrant 4: Scholarships & Admissions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-teal-50 text-teal-700 rounded-lg border border-teal-100">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  {SCHOLARSHIPS_ADMISSIONS.length} Verified
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Scholarships & Ph.D.</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                DBT-JRF, DST-INSPIRE, ICMR Fellowships, and IISc / JNU / TIFR JGEEBILS doctoral admission announcements.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>• ₹37,000/mo + HRA Fellowships</div>
                <div>• Integrated Ph.D. calls</div>
                <div>• Master&apos;s degree stipends</div>
              </div>
            </div>
            <Link
              to="/scholarships"
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center justify-between pt-2 border-t border-slate-100"
            >
              <span>View Scholarships</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CORE SUBJECTS EXPLORER (11 SUBJECTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Curriculum Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {t('Explore 11 Foundational Subjects', '11 Core Biotechnology Subjects')}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {t(
                'Structured topic hierarchy: Subject → Units → Chapters → Verified Concepts with Bilingual Notes',
                'Subject → Units → Chapters → Verified Scientific Concepts with English & Roman Hinglish explanations'
              )}
            </p>
          </div>
          <Link
            to="/subjects"
            className="text-xs font-semibold text-cyan-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View Complete Subject Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SUBJECTS.map((subject) => (
            <Link
              key={subject.id}
              to={`/subjects/${subject.slug}`}
              className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                    {getSubjectIcon(subject.icon)}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {subject.unitsCount} Units · {subject.topicsCount} Topics
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {language === 'hinglish' ? subject.name.hinglish : subject.name.en}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                  {language === 'hinglish' ? subject.description.hinglish : subject.description.en}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] text-slate-400">Order 0{subject.orderIndex}</span>
                <span className="font-medium text-slate-700 group-hover:text-cyan-600 flex items-center gap-1">
                  Open Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. COMPETITIVE EXAMS MODULE (6 SUPPORTED EXAMS) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="text-xs text-cyan-400 uppercase tracking-wider font-mono font-medium mb-1">
              Examination Portals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t('Competitive Examination Preparation', 'Competitive Examination Portals (6 Exams)')}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              {t(
                'Comprehensive verified guides for the 6 national life science and biotechnology examinations. Exam patterns, syllabus mappings, eligibility, and preparation strategies.',
                'India ke 6 major entrance exams: official patterns, exact marking schemes, eligibility, aur syllabus mapping with zero fabricated updates.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETITIVE_EXAMINATIONS.map((exam) => (
              <div
                key={exam.code}
                className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 hover:border-slate-600 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-mono font-bold text-cyan-400">
                      {exam.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Verified {exam.lastVerifiedDate}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {exam.fullName.en}
                  </h3>
                  {exam.bulletinEdition && (
                    <div className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                      {exam.bulletinEdition}
                    </div>
                  )}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {language === 'hinglish' ? exam.overview.hinglish : exam.overview.en}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Exam Mode:</span>
                      <span className="text-slate-200 font-medium">{exam.examPattern.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Marks:</span>
                      <span className="text-slate-200 font-mono">{exam.examPattern.totalMarks} Marks ({exam.examPattern.durationMinutes} min)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                  >
                    Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                  <Link
                    to={`/exams/${exam.code.toLowerCase()}`}
                    className="font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    Full Syllabus <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LABORATORY KNOWLEDGE HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            Practical Biotechnology
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('Laboratory Knowledge Hub (Lab Zone)', 'Virtual Laboratory Hub (Lab Zone)')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t(
              'Bridge classroom theory with wet-lab mastery. 18 standard analytical instruments, peer-reviewed protocols, and 9 verified scientific calculators.',
              'Theoretical concepts ko practical laboratory execution ke sath link karein: 18 instruments, protocols, aur 9 accurate biophysical calculators.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Instruments */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">18 Laboratory Instruments</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                UV-Vis Spectrophotometers, Ultracentrifuges, qPCR machines, Biosafety Cabinets (Class II A2/B2), Electron Microscopes, Bioreactors, and CD Spectrometers with operating mechanisms and precautions.
              </p>
            </div>
            <Link
              to="/lab-zone/instruments"
              className="mt-6 text-xs font-semibold text-cyan-700 hover:underline flex items-center gap-1"
            >
              Explore Instruments Directory →
            </Link>
          </div>

          {/* Card 2: Protocols */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Validated Laboratory Protocols</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Alkaline lysis plasmid extraction, Laemmli SDS-PAGE protein electrophoresis, competent cell preparation, and Bradford assays with troubleshooting matrix and safety controls.
              </p>
            </div>
            <Link
              to="/lab-zone/protocols"
              className="mt-6 text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              Browse Protocols Library →
            </Link>
          </div>

          {/* Card 3: Calculators */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-4">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">9 Scientific Calculators</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Molarity, Normality, Dilutions (C1V1=C2V2), Centrifuge RPM-to-RCF, A260 DNA purity, Beer-Lambert protein concentration, and Henderson-Hasselbalch buffer preparation.
              </p>
            </div>
            <Link
              to="/lab-zone/calculators"
              className="mt-6 text-xs font-semibold text-indigo-700 hover:underline flex items-center gap-1"
            >
              Open Interactive Calculators →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BIOTECHNOLOGY NEWS & REGULATORY DISPATCHES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Scientific Journalism & Policy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Biotechnology News & Regulatory Dispatches
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Objective coverage of CDSCO/DCGI drug approvals, BIRAC bioeconomy metrics, and CRISPR clinical guidelines.
            </p>
          </div>
          <Link
            to="/news"
            className="text-xs font-semibold text-cyan-700 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All News Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BIOTECH_NEWS.slice(0, 2).map((news) => (
            <div
              key={news.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    {news.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {news.publishedDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {news.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  Source: {news.sourceOutlet}
                </span>
                <Link
                  to="/news"
                  className="font-medium text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
                >
                  <span>Read Dispatch</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. RESEARCH PROPOSALS & SCIENTIFIC GRANTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-2xl p-6 sm:p-10 border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-700 font-semibold">
                Extramural Research Funding
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                National Research Proposals & Grant Schemes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Track funding opportunities from BIRAC, DST-SERB, and DBT/Wellcome Trust India Alliance with budget ranges and portal guidelines.
              </p>
            </div>
            <Link
              to="/research-proposals"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Explore All Grants</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESEARCH_PROPOSAL_SCHEMES.slice(0, 3).map((grant) => (
              <div
                key={grant.id}
                className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-slate-800">{grant.fundingAgency}</span>
                    <span className="text-rose-600 font-medium">{grant.submissionDeadline}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {grant.schemeName}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                    {grant.grantBudgetRange}
                  </p>
                </div>
                <a
                  href={grant.officialCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-700 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Official Call</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREE DOWNLOADS & FORMULA SHEETS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-medium">
              Free Academic Resources
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Printable Biotechnology Formula Sheets & Lab Manuals
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Consolidated quick-reference PDFs covering Michaelis-Menten kinetics, Central Dogma equations, PCR master mix recipes, and centrifugation nomograms.
            </p>
          </div>
          <Link
            to="/resources"
            className="px-5 py-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4 text-slate-900" />
            <span>Access Free Downloads</span>
          </Link>
        </div>
      </section>

      {/* 10. SCIENTIFIC INTEGRITY & ETHICAL STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Ethical Standards & Integrity
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {t(
                'Built for Academic Rigor. Zero Fabricated Content.',
                'Academic Rigor ke sath design kiya gaya. Zero Fabricated Content.'
              )}
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Unlike commercial portals that invent jobs, inflate recruitment numbers, or summarize concepts with inaccurate simplifications, BioScience Knowledge Hub is built on three core academic principles:
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Verified Literature Citations</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Curriculum topics reference authoritative textbooks (Lehninger, Alberts, Lodish, Brock, Kuby) and peer-reviewed journals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Exact Examination & Opportunity Fidelity</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Every exam pattern (GAT-B, DBT-JRF, GATE BT, JAM, CUET, CSIR-NET) and job notification reflects actual official notifications with verified marking schemes and real links.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Empirical Laboratory Calculations</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Formulas use true dimensional analysis, standard molar extinction coefficients, and scientific bounds to safeguard experimental outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white border border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-4">
              Platform Verification Index
            </h3>
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">Supported Core Subjects</span>
                <span className="font-mono text-cyan-400 font-bold">11 Disciplines</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">National Competitive Examinations</span>
                <span className="font-mono text-cyan-400 font-bold">6 Portals</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">Laboratory Instruments Covered</span>
                <span className="font-mono text-cyan-400 font-bold">18 Instruments</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">Scientific Calculation Engines</span>
                <span className="font-mono text-cyan-400 font-bold">9 Modules</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">Bilingual Languages Supported</span>
                <span className="font-mono text-cyan-400 font-bold">English & Roman Hinglish</span>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <span className="text-slate-300">Public Access Status</span>
                <span className="font-mono text-emerald-400 font-bold">100% Free · No Login</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WEEKLY NEWSLETTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cyan-50/70 border border-cyan-200 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-800 uppercase tracking-wider">
              <BellRing className="w-4 h-4" />
              <span>BioScience Weekly Dispatch</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              Never Miss a Biotech JRF Call or National Exam Deadline
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Curated Monday morning bulletin containing verified government vacancies, summer fellowship releases, and research grant notifications.
            </p>
          </div>
          <Link
            to="/newsletter"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <span>Subscribe Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
            FAQ
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
