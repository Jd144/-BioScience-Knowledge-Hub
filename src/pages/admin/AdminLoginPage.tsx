import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminLoginPage: React.FC = () => {
  const { login, setup, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSetupMode, setIsSetupMode] = useState(false);
  const [email, setEmail] = useState('charanjaydeep712@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('Jaydeep Charan');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // If already logged in, redirect to /admin
  useEffect(() => {
    if (adminUser) {
      navigate('/admin', { replace: true });
    }
  }, [adminUser, navigate]);

  // Check setup status
  useEffect(() => {
    fetch('/api/admin/auth/setup-status')
      .then((res) => res.json())
      .then((data) => {
        if (data.setupPending) {
          setIsSetupMode(true);
        }
      })
      .catch((e) => console.warn('Setup status check error:', e));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isSetupMode) {
        if (password.length < 8) {
          setError('Password must be at least 8 characters with numbers and special symbols.');
          setLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match. Please re-enter your confirmation password.');
          setLoading(false);
          return;
        }

        const res = await setup(password, fullName);
        if (res.success) {
          setSuccessMessage('Super Administrator initialized successfully! Redirecting to Dashboard...');
          setTimeout(() => {
            navigate('/admin', { replace: true });
          }, 1200);
        } else {
          setError(res.error || 'Failed to complete administrator initialization.');
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          const from = (location.state as any)?.from?.pathname || '/admin';
          navigate(from, { replace: true });
        } else if (res.setupPending) {
          setIsSetupMode(true);
          setError('Account requires initial password configuration.');
        } else {
          setError(res.error || 'Authentication failed. Please verify your credentials.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Network communication error during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 font-serif">
      {/* Container Card */}
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isSetupMode ? 'Admin Initial Account Setup' : 'Central Admin Authentication'}
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {isSetupMode
              ? 'Initialize the Super Admin credentials for BioScience Hub'
              : 'Restricted administrative access for authorized academic editors & engineers'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name in Setup Mode */}
          {isSetupMode && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Super Admin Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jaydeep Charan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="charanjaydeep712@gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isSetupMode ? 'Create Strong Password' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>
            {isSetupMode && (
              <span className="text-[10px] text-slate-400 mt-1 block">
                Minimum 8 characters. Stored securely with bcrypt (12 rounds) and salted hash.
              </span>
            )}
          </div>

          {/* Confirm Password in Setup Mode */}
          {isSetupMode && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isSetupMode ? 'Complete Setup & Enter Dashboard' : 'Authenticate & Open Admin Panel'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-2 border-t border-slate-800/80 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSetupMode(!isSetupMode);
              setError(null);
            }}
            className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            {isSetupMode
              ? 'Already initialized? Switch to standard login'
              : 'Initial setup needed? Switch to password setup wizard'}
          </button>
        </div>

        {/* Security Notice */}
        <div className="text-[11px] text-slate-400 text-center space-y-1">
          <p>Protected by IP login rate limiting and server-side session authorization.</p>
          <p>BioScience Hub • Internal Educational Administration</p>
        </div>
      </div>
    </div>
  );
};
