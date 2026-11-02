import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CORE_SUBJECTS } from '../../data/subjectsData.ts';
import { COMPETITIVE_EXAMINATIONS } from '../../data/examsData.ts';
import {
  User,
  GraduationCap,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calculator,
  Compass,
  Settings,
  HelpCircle,
  LogOut,
  Target,
  Layers,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'exams' | 'bookmarks' | 'settings'>('overview');

  // If user is not logged in, redirect to login page
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const selectedExams = COMPETITIVE_EXAMINATIONS.filter((e) =>
    user?.examGoals?.includes(e.code)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
              {user?.fullName?.charAt(0) || 'S'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{user?.fullName || 'Student'}</div>
              <div className="text-[11px] text-slate-400 font-mono truncate">{user?.educationLevel || 'Biotech Scholar'}</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-cyan-500" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'subjects' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>My Subjects</span>
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'exams' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4 text-cyan-500" />
              <span>My Exam Goals</span>
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'bookmarks' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-4 h-4 text-cyan-500" />
              <span>Saved Bookmarks</span>
            </button>
            <Link
              to="/lab-zone"
              className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Calculator className="w-4 h-4 text-cyan-500" />
              <span>Lab Zone Tools</span>
            </Link>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-cyan-500" />
              <span>Settings</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Right Dashboard Workspace */}
        <main className="lg:col-span-9 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Personalized Learning Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-bold mt-1">
                  Welcome back, {user?.fullName || 'Scholar'}
                </h1>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {user?.college ? `${user.college} · ` : ''}
                  {user?.educationLevel || 'Biotechnology'} ({user?.currentYear || 'Enrolled'})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/subjects"
                  className="px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Selected Exam Goals Card */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                    Target Competitive Examinations
                  </h2>
                  <Link to="/exams" className="text-xs text-cyan-700 hover:underline">
                    Explore all 6 exams →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedExams.length > 0 ? (
                    selectedExams.map((exam) => (
                      <div
                        key={exam.code}
                        className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-mono font-bold text-slate-900">{exam.code}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{exam.examPattern.mode}</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-700 mt-1">{exam.fullName.en}</div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            {exam.examPattern.totalMarks} Marks · {exam.examPattern.durationMinutes} min
                          </div>
                        </div>
                        <Link
                          to={`/exams/${exam.code.toLowerCase()}`}
                          className="mt-3 text-xs text-cyan-700 font-semibold hover:underline flex items-center gap-1"
                        >
                          View Syllabus & Strategy <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-xs text-slate-500 py-4 text-center">
                      No examinations selected in profile preferences.
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Core Topics */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-4">
                  High-Yield Curriculum Modules
                </h2>
                <div className="divide-y divide-slate-100">
                  <div className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">
                        DNA Replication in Prokaryotes: Molecular Architecture and Fidelity
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Molecular Biology · DnaA, DnaB, DNA Pol III & Okazaki Maturation
                      </div>
                    </div>
                    <Link
                      to="/subjects/molecular-biology/dna-replication-in-prokaryotes"
                      className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap ml-4"
                    >
                      Study Notes →
                    </Link>
                  </div>

                  <div className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">
                        Michaelis-Menten Steady-State Enzyme Kinetics
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Biochemistry · Km, Vmax, Turnover Number (kcat) & Lineweaver-Burk
                      </div>
                    </div>
                    <Link
                      to="/subjects/biochemistry"
                      className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap ml-4"
                    >
                      Study Notes →
                    </Link>
                  </div>

                  <div className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">
                        Oxygen Mass Transfer Rate (OTR) and Volumetric Coefficient (kLa)
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Bioprocess Engineering · Bioreactor Aeration & Dynamic Gassing-Out
                      </div>
                    </div>
                    <Link
                      to="/subjects/bioprocess-engineering"
                      className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap ml-4"
                    >
                      Study Notes →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUBJECTS */}
          {activeTab === 'subjects' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Your Enrolled Biotechnology Subjects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORE_SUBJECTS.map((sub) => (
                  <div key={sub.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-cyan-700 font-semibold">Subject 0{sub.orderIndex}</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">{sub.name.en}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{sub.unitsCount} Units · {sub.topicsCount} Topics</div>
                    </div>
                    <Link
                      to={`/subjects/${sub.slug}`}
                      className="mt-3 text-xs text-cyan-700 font-semibold hover:underline"
                    >
                      Access Syllabus →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EXAMS */}
          {activeTab === 'exams' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">All 6 Supported Examination Portals</h2>
              <div className="space-y-3">
                {COMPETITIVE_EXAMINATIONS.map((e) => (
                  <div key={e.code} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-900">{e.code}</div>
                      <div className="text-xs text-slate-700 font-semibold">{e.fullName.en}</div>
                      <div className="text-[11px] text-slate-500">{e.conductingBody}</div>
                    </div>
                    <Link
                      to={`/exams/${e.code.toLowerCase()}`}
                      className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Open Guide →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BOOKMARKS */}
          {activeTab === 'bookmarks' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Saved Study Bookmarks</h2>
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg">
                <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>No topics bookmarked yet.</p>
                <p className="mt-1 text-slate-400">Click the bookmark icon on any topic or instrument page to save it for quick revision.</p>
                <Link to="/subjects" className="mt-3 inline-block text-cyan-700 font-semibold hover:underline">
                  Browse Subjects Now
                </Link>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-slate-900">Student Account & Preferences</h2>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Registered Email:</span> {user?.email}
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Preferred Language:</span> {user?.preferredLanguage?.toUpperCase()}
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Target Graduation:</span> {user?.graduationYear || '2027'}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
