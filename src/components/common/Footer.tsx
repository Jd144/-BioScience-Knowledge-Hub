import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & Academic Statement */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                B
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                BioScience Knowledge Hub
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t(
                'Comprehensive biotechnology knowledge ecosystem, employment portal, laboratory instrumentation guide, and competitive examination directory.',
                'Verified academic literature, biotechnology career vacancies, lab instrumentation, aur competitive exam portal.'
              )}
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              Grounded in official gazettes, NTA/DBT bulletins, and peer-reviewed reference texts (Lehninger, Alberts, Lodish, Brock).
            </div>
          </div>

          {/* Col 2: Core Subjects (11) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Learn (11 Subjects)
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/subjects/cell-biology" className="hover:text-slate-200 transition-colors">
                  Cell Biology
                </Link>
              </li>
              <li>
                <Link to="/subjects/biochemistry" className="hover:text-slate-200 transition-colors">
                  Biochemistry
                </Link>
              </li>
              <li>
                <Link to="/subjects/genetics" className="hover:text-slate-200 transition-colors">
                  Genetics
                </Link>
              </li>
              <li>
                <Link to="/subjects/molecular-biology" className="hover:text-slate-200 transition-colors">
                  Molecular Biology
                </Link>
              </li>
              <li>
                <Link to="/subjects/microbiology" className="hover:text-slate-200 transition-colors">
                  Microbiology
                </Link>
              </li>
              <li>
                <Link to="/subjects/immunology" className="hover:text-slate-200 transition-colors">
                  Immunology
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-cyan-400 hover:underline">
                  View all 11 subjects →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Jobs & Opportunities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Jobs & Opportunities
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/jobs" className="hover:text-slate-200 transition-colors">
                  Biotech Jobs & JRF
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-slate-200 transition-colors">
                  Summer Internships
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-slate-200 transition-colors">
                  Scholarships & Fellowships
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-slate-200 transition-colors">
                  Ph.D. & Master Admissions
                </Link>
              </li>
              <li>
                <Link to="/career-guidance" className="hover:text-slate-200 transition-colors">
                  Career Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-slate-200 transition-colors">
                  Biotechnology News
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-cyan-400 hover:underline">
                  Weekly Newsletter →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Examinations & Lab Zone */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Exams & Lab Zone
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/exams/gat-b" className="hover:text-slate-200 transition-colors">
                  GAT-B (DBT NTA)
                </Link>
              </li>
              <li>
                <Link to="/exams/dbt-jrf" className="hover:text-slate-200 transition-colors">
                  DBT-JRF / BET
                </Link>
              </li>
              <li>
                <Link to="/exams/gate-bt" className="hover:text-slate-200 transition-colors">
                  GATE Biotechnology
                </Link>
              </li>
              <li>
                <Link to="/exams/csir-net" className="hover:text-slate-200 transition-colors">
                  CSIR-NET Life Sciences
                </Link>
              </li>
              <li>
                <Link to="/lab-zone/instruments" className="hover:text-slate-200 transition-colors">
                  18 Lab Instruments
                </Link>
              </li>
              <li>
                <Link to="/lab-zone/calculators" className="hover:text-slate-200 transition-colors">
                  9 Scientific Calculators
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-slate-200 transition-colors">
                  Free Formula Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Research & Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Research & Platform
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/research-proposals" className="hover:text-slate-200 transition-colors">
                  Research Proposals & Grants
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-slate-200 transition-colors">
                  Conferences & Symposia
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-slate-200 transition-colors">
                  Hands-on Workshops
                </Link>
              </li>
              <li>
                <Link to="/research-clubs" className="hover:text-slate-200 transition-colors">
                  Research Clubs & Circles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-200 transition-colors">
                  About Us & Rigor
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-200 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BioScience Knowledge Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Bilingual Edition: English & Roman Hinglish</span>
            <span>·</span>
            <span>Zero Hallucinated Vacancies</span>
            <span>·</span>
            <span>Public Education Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
