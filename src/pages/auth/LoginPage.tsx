import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { Lock, Mail, ArrowRight, AlertCircle, Database } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, supabaseConfigured } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-cyan-400 font-mono font-bold flex items-center justify-center mx-auto mb-3 shadow-xs">
            B
          </div>
          <h1 className="text-xl font-bold text-center text-slate-900">
            {t('Student Sign In', 'Student Sign In')}
          </h1>
          <p className="text-xs text-center text-slate-500 mt-1">
            Access your personalized learning portal, saved topics, and exam goals.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-700">Password</label>
              <Link to="/auth/forgot-password" className="text-[11px] text-cyan-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In with Email'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* 1-Click Quick Scholar Sign-In (For Instant Testing) */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 absolute">
            Or Instant Access
          </span>
        </div>

        <button
          type="button"
          onClick={async () => {
            setLoading(true);
            const res = await login('scholar@biosciencehub.edu', 'demo1234');
            setLoading(false);
            if (res.success) {
              navigate('/dashboard');
            }
          }}
          className="w-full py-2 px-3 text-xs font-bold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>⚡ 1-Click Scholar Sign-In (Test Session)</span>
        </button>

        {/* Member Benefits Preview Notice */}
        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
          <span className="font-bold block text-amber-900">
            ℹ️ Member Benefits (Preview Mode):
          </span>
          <p className="leading-relaxed">
            Login is active for student session persistence. Personalized syllabus bookmarks, study planner, and verified mock test reports will be unlocked in upcoming releases.
          </p>
        </div>

        {/* Official Channels */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block text-center">
            Connect with Official Channels
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href="https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-center gap-1.5 text-center text-[11px]"
            >
              <span>WhatsApp Channel</span>
            </a>
            <a
              href="https://www.linkedin.com/company/https-bioscienceknowledge-hub.vercel.app-/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-semibold flex items-center justify-center gap-1.5 text-center text-[11px]"
            >
              <span>LinkedIn Page</span>
            </a>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-600">
          <span>Don't have an account yet? </span>
          <Link to="/auth/register" className="text-cyan-700 font-semibold hover:underline">
            Register as a Student
          </Link>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-center justify-center gap-1.5 border border-slate-100">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>{supabaseConfigured ? 'Secured by Supabase Auth (PostgreSQL)' : 'Local Offline-First Session Active'}</span>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { register, supabaseConfigured } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState<'en' | 'hinglish'>(language);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(fullName, email, password, preferredLang);
    setLoading(false);

    if (res.success) {
      navigate('/onboarding');
    } else {
      setError(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-cyan-400 font-mono font-bold flex items-center justify-center mx-auto mb-3 shadow-xs">
            B
          </div>
          <h1 className="text-xl font-bold text-center text-slate-900">
            {t('Student Registration', 'Create Student Account')}
          </h1>
          <p className="text-xs text-center text-slate-500 mt-1">
            Join the BioScience Hub for verified biotechnology education.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 chars"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Initial Preferred Language
            </label>
            <select
              value={preferredLang}
              onChange={(e) => setPreferredLang(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="en">English (Standard Academic)</option>
              <option value="hinglish">Hinglish (Roman Script Conceptual)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Continue to Student Onboarding'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Already registered? </span>
          <Link to="/auth/login" className="text-cyan-700 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
