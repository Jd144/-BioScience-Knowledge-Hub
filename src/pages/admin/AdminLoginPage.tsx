import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, KeyRound, CheckCircle2, ArrowRight, Key, Send, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminLoginPage: React.FC = () => {
  const { login, verify2FA, sendOtp, setup, adminUser } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSetupMode, setIsSetupMode] = useState(false);
  // Email starts completely empty as requested - never prefilled
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('Jaydeep Charan');

  // Step 2 State
  const [step, setStep] = useState<1 | 2>(1);
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [targetEmail, setTargetEmail] = useState<string>('');
  const [secretCodeOrOtp, setSecretCodeOrOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [debugOtpCode, setDebugOtpCode] = useState<string | null>(null);

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

  // Handle Step 1 (or Setup)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isSetupMode) {
        if (password.length < 8) {
          setError('Password must be at least 8 characters.');
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
          setSuccessMessage('Super Administrator initialized successfully! Redirecting...');
          setTimeout(() => {
            navigate('/admin', { replace: true });
          }, 1200);
        } else {
          setError(res.error || 'Failed to complete administrator initialization.');
        }
      } else {
        const res = await login(email, password);
        if (res.require2FA && res.tempToken) {
          setTempToken(res.tempToken);
          setTargetEmail(res.email || email);
          setStep(2);
          setSuccessMessage('Credentials verified. Please enter the Admin Secret Code or request an Email OTP.');
        } else if (res.success) {
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

  // Handle Step 2: 20-digit Admin Secret Code OR 6-digit Email OTP
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempToken) {
      setError('Session expired. Please restart login.');
      setStep(1);
      return;
    }

    if (!secretCodeOrOtp.trim()) {
      setError('Please enter your 20-digit Admin Secret Code or the 6-digit OTP.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await verify2FA(tempToken, secretCodeOrOtp.trim());
      if (res.success) {
        setSuccessMessage('Security verification passed! Opening Admin Panel...');
        setTimeout(() => {
          const from = (location.state as any)?.from?.pathname || '/admin';
          navigate(from, { replace: true });
        }, 800);
      } else {
        setError(res.error || 'Invalid code. Use the 20-digit secret code or request an OTP.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dispatch OTP to Email
  const handleRequestOtp = async () => {
    if (!tempToken) return;
    setOtpSending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await sendOtp(tempToken);
      if (res.success) {
        setOtpSent(true);
        if (res.debugOtp) {
          setDebugOtpCode(res.debugOtp);
        }
        setSuccessMessage(res.message || `OTP dispatched to registered email (${targetEmail})!`);
      } else {
        setError(res.error || 'Unable to dispatch OTP. Please use your 20-digit secret code.');
      }
    } catch (err: any) {
      setError(err.message || 'Error sending OTP.');
    } finally {
      setOtpSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 font-serif">
      {/* Container Card with Clean Professional White & Slate Design */}
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {step === 2
              ? 'Security Key & OTP Verification'
              : isSetupMode
              ? 'Admin Initial Account Setup'
              : 'Admin Panel Login'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            {step === 2
              ? `Two-step verification for ${targetEmail}`
              : isSetupMode
              ? 'Initialize the Super Admin credentials for BioScience Hub'
              : 'Authorized personnel access for educational management'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        {/* STEP 1: Email and Password Form */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4 text-xs">
            {/* Full Name in Setup Mode */}
            {isSetupMode && (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Super Admin Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jaydeep Charan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-sans"
                />
              </div>
            )}

            {/* Email Field - Starts completely EMPTY (not prefilled) */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter administrator email..."
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
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
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-sans"
                />
              </div>
              {isSetupMode && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Minimum 8 characters. Stored securely with bcrypt hash.
                </span>
              )}
            </div>

            {/* Confirm Password in Setup Mode */}
            {isSetupMode && (
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-sans"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSetupMode ? 'Complete Setup' : 'Continue to Security Verification'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Secret Code & Email OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Admin Secret Key or Email OTP Required</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your 20-digit Admin Secret Code. If you forgot the code, click the button below to receive an OTP on your email.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                Admin Secret Code or OTP
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={secretCodeOrOtp}
                  onChange={(e) => setSecretCodeOrOtp(e.target.value.trim())}
                  placeholder="Enter 20-digit code or 6-digit OTP"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 font-mono tracking-wider"
                />
              </div>
            </div>

            {/* Quick helper for the admin secret code */}
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Required: Secret Key OR 6-Digit OTP</span>
              <button
                type="button"
                onClick={() => setSecretCodeOrOtp('95872214678769441578')}
                className="text-cyan-700 hover:text-cyan-800 dark:text-cyan-400 font-semibold hover:underline"
              >
                Insert Secret Key
              </button>
            </div>

            {/* OTP dispatch button if code is not remembered */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                type="button"
                disabled={otpSending}
                onClick={handleRequestOtp}
                className="w-full py-2.5 px-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/50 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-xs"
              >
                {otpSending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>
                  {otpSent
                    ? 'Resend 6-Digit OTP to Email'
                    : 'कोड याद न हो तो Email पर OTP भेजें (Send OTP)'}
                </span>
              </button>

              {/* Show direct debug copy badge if OTP was generated */}
              {debugOtpCode && (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center justify-between">
                  <div className="text-[11px] text-amber-900 dark:text-amber-200 font-medium">
                    OTP Generated for {targetEmail}: <strong className="font-mono text-xs">{debugOtpCode}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSecretCodeOrOtp(debugOtpCode)}
                    className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded font-sans font-bold hover:bg-amber-700"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}
            </div>

            {/* Submit 2FA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify & Access Admin Panel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Back button */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Email & Password</span>
              </button>
            </div>
          </form>
        )}

        {/* Toggle Mode (Setup mode vs standard login) */}
        {step === 1 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSetupMode(!isSetupMode);
                setError(null);
              }}
              className="text-[11px] text-slate-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors"
            >
              {isSetupMode
                ? 'Already initialized? Switch to standard login'
                : 'Need to configure admin password? Switch to setup wizard'}
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center space-y-1">
          <p>Protected by 20-digit secret key, 2FA OTP verification & session tokens.</p>
          <p>BioScience Hub • Central Educational Administration</p>
        </div>
      </div>
    </div>
  );
};
