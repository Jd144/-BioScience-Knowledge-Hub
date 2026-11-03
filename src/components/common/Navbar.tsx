import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { SearchModal } from './SearchModal.tsx';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Zap,
  Briefcase,
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  FlaskConical,
  Newspaper,
  Compass,
  Download,
  Users,
  Mail,
  User,
  LogIn,
  LogOut,
  ExternalLink,
  Settings
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const { openSettings } = useTheme();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global search shortcut listener (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const quickRibbonItems = [
    { label: '🎓 Exam Preparation (Mastery)', path: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams', isExternal: true, highlight: true },
    { label: '⚡ Live Alerts', path: '/exams', highlight: false },
    { label: 'Govt Jobs', path: '/jobs' },
    { label: 'Summer Internships', path: '/internships' },
    { label: 'Scholarships', path: '/scholarships' },
    { label: 'Admissions', path: '/admissions' },
    { label: 'Research Grants', path: '/research-proposals' },
    { label: 'Conferences & Events', path: '/events' },
    { label: 'Workshops', path: '/workshops' },
    { label: 'Career Roadmaps', path: '/career-guidance' },
    { label: 'Lab Instruments', path: '/lab-zone/instruments' },
    { label: 'Scientific Calculators', path: '/lab-zone/calculators' },
    { label: 'Free Downloads', path: '/resources' },
    { label: 'Research Clubs', path: '/research-clubs' },
    { label: 'Newsletter', path: '/newsletter' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800">
        {/* Primary Header Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Text Element) */}
          <Link
            to="/"
            className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-cyan-950 flex items-center justify-center text-cyan-400 font-mono text-sm font-bold shadow-xs border border-cyan-800/40">
              B
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold text-slate-900 dark:text-white text-base">BioScience Hub</span>
              <span className="text-[10px] font-semibold text-cyan-700 dark:text-cyan-400 tracking-wider uppercase leading-none">Educational Platform</span>
            </div>
          </Link>

          {/* Zone 2: 6 Core Single-Line Navigation Pillars */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <Link
              to="/subjects"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/subjects') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Learn
            </Link>
            <Link
              to="/jobs"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/jobs') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/internships"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/internships') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Internships
            </Link>
            <Link
              to="/exams"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/exams') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Exam Alerts
            </Link>
            <a
              href="https://bioscience-mastery-p-vdf1.bolt.host/en/exams"
              className="hover:text-cyan-950 dark:hover:text-cyan-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300 font-bold bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 px-2.5 py-1 rounded-lg border border-cyan-200/80 dark:border-cyan-800 shadow-2xs"
              title="Indian National Exam Preparation on BioScience Mastery"
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-700" />
              <span>Exam Preparation</span>
            </a>
            <Link
              to="/lab-zone"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/lab-zone') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Lab Zone
            </Link>
            <Link
              to="/news"
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                isActive('/news') ? 'text-slate-900 font-bold border-b-2 border-cyan-600 pb-0.5' : ''
              }`}
            >
              Biotech News
            </Link>
          </nav>

          {/* Zone 3: Clean Search and Bilingual Language Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search knowledge hub"
              className="px-3 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 text-xs border border-slate-200"
              title="Search database (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden xl:inline-block px-1 py-0.2 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Language Switcher Button */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hinglish')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  language === 'hinglish'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Roman Hinglish"
              >
                HI-EN
              </button>
            </div>

            {/* Official WhatsApp Channel Link */}
            <a
              href="https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200/80 transition-colors"
              title="Follow BioScience Mastery ™ on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>WhatsApp</span>
            </a>

            {/* User Login / Member Portal */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors"
                  title="My Student Dashboard"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <span className="hidden md:inline font-mono text-xs">{user.fullName?.split(' ')[0] || 'Scholar'}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  title="Sign Out"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
                title="Sign In to Student Hub"
              >
                <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                <span>Log In</span>
              </Link>
            )}

            {/* Prominent Settings Button with Gear Icon (Visible on Desktop and Mobile) */}
            <button
              onClick={openSettings}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
              title="Website Settings & Appearance"
              aria-label="Open website settings"
            >
              <Settings className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Quick Ribbon (Horizontal Scroll Strip across all 19 sections) */}
        <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 overflow-x-auto scrollbar-none py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            {quickRibbonItems.map((item, idx) =>
              item.isExternal ? (
                <a
                  key={idx}
                  href={item.path}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors shrink-0 flex items-center gap-1 ${
                    item.highlight
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-bold hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300/80 dark:border-amber-800 shadow-2xs'
                      : 'hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  to={item.path}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors shrink-0 ${
                    item.highlight
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-200 dark:hover:bg-amber-900'
                      : isActive(item.path)
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                      : 'hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 max-h-[80vh] overflow-y-auto">
            {/* Prominent Cross-Platform Mastery CTA in Mobile Menu */}
            <a
              href="https://bioscience-mastery-p-vdf1.bolt.host/en/exams"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-cyan-900 to-slate-900 text-white border border-cyan-500/40 shadow-sm mb-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                  🎓
                </div>
                <div>
                  <span className="text-xs font-bold block leading-tight">Exam Preparation (Mastery)</span>
                  <span className="text-[10px] text-cyan-300">GAT-B, CSIR-NET & GATE Practice</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-cyan-300">Open →</span>
            </a>

            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-1">
              Primary Knowledge Hub
            </div>
            <Link
              to="/subjects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <BookOpen className="w-4 h-4 text-cyan-600" />
              <span>Learn (11 Core Subjects)</span>
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Biotech Jobs & JRF Openings</span>
            </Link>
            <Link
              to="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Summer Internships & Fellowships</span>
            </Link>
            <Link
              to="/exams"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Exam Alerts (GAT-B, GATE, CSIR-NET)</span>
            </Link>
            <Link
              to="/lab-zone"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <FlaskConical className="w-4 h-4 text-purple-600" />
              <span>Lab Zone (18 Instruments & 9 Calculators)</span>
            </Link>
            <Link
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Newspaper className="w-4 h-4 text-rose-600" />
              <span>Biotechnology News & Dispatches</span>
            </Link>

            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-3">
              Opportunities & Research
            </div>
            <Link
              to="/scholarships"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Award className="w-4 h-4 text-teal-600" />
              <span>Scholarships</span>
            </Link>
            <Link
              to="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <GraduationCap className="w-4 h-4 text-cyan-600" />
              <span>Ph.D. & M.Sc. Admissions</span>
            </Link>
            <Link
              to="/research-proposals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Research Proposals & Grants</span>
            </Link>
            <Link
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Calendar className="w-4 h-4 text-slate-600" />
              <span>Conferences & Events</span>
            </Link>
            <Link
              to="/workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Awards & Workshops</span>
            </Link>
            <Link
              to="/career-guidance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Career Guidance & Roadmaps</span>
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Free Downloads & Formula Sheets</span>
            </Link>
            <Link
              to="/research-clubs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Users className="w-4 h-4 text-pink-600" />
              <span>Research Clubs</span>
            </Link>
            <Link
              to="/newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              <Mail className="w-4 h-4 text-cyan-600" />
              <span>Weekly Newsletter</span>
            </Link>

            {/* Official Community Channels */}
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-3 pt-3">
              Official Channels & Community
            </div>
            <a
              href="https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>BioScience Mastery ™ WhatsApp</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>
            <a
              href="https://www.linkedin.com/company/https-bioscienceknowledge-hub.vercel.app-/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200"
            >
              <span>BioScience Hub LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
            </a>

            {/* User Account & Login */}
            <div className="pt-3 border-t border-slate-100">
              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    <User className="w-4 h-4 text-cyan-600" />
                    <span>My Student Dashboard ({user.fullName?.split(' ')[0] || 'Scholar'})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-cyan-400" />
                  <span>Log In to Student Hub</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
