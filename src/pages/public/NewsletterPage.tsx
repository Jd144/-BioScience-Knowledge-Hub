import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  Mail,
  CheckCircle2,
  ShieldCheck,
  Send,
  BellRing,
  AlertCircle,
  Info,
  RotateCcw
} from 'lucide-react';

export const NewsletterPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Jobs & JRF Openings',
    'Exam Notifications',
    'Research Grants & Proposals'
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const availableTopics = [
    'Jobs & JRF Openings',
    'Internships & Fellowships',
    'Exam Notifications (GAT-B, GATE, CSIR-NET)',
    'Scholarships & Admissions',
    'Research Grants & Proposals',
    'Biotech News & Regulatory Dispatches'
  ];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bioscience_newsletter_email');
      if (stored) {
        setEmail(stored);
        setAlreadySubscribed(true);
        const storedTopics = localStorage.getItem('bioscience_newsletter_topics');
        if (storedTopics) {
          setSelectedTopics(JSON.parse(storedTopics));
        }
      }
    } catch {
      // Safe storage access fallback
    }
  }, []);

  const toggleTopic = (topic: string) => {
    setErrorMessage(null);
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Strict Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage('Please provide a valid academic or professional email address (e.g. scholar@university.ac.in).');
      return;
    }

    if (selectedTopics.length === 0) {
      setErrorMessage('Please select at least one topic of interest for your weekly digest.');
      return;
    }

    // Check duplicate submission
    try {
      const currentStored = localStorage.getItem('bioscience_newsletter_email');
      if (currentStored && currentStored.toLowerCase() === cleanEmail && alreadySubscribed) {
        setErrorMessage('This email is already registered for the weekly dispatch. Your topic preferences have been refreshed.');
        localStorage.setItem('bioscience_newsletter_topics', JSON.stringify(selectedTopics));
        setIsSubmitted(true);
        return;
      }

      localStorage.setItem('bioscience_newsletter_email', cleanEmail);
      localStorage.setItem('bioscience_newsletter_topics', JSON.stringify(selectedTopics));
      localStorage.setItem('bioscience_newsletter_date', new Date().toISOString().slice(0, 10));
      setAlreadySubscribed(true);
      setIsSubmitted(true);
    } catch {
      setErrorMessage('Browser storage is restricted. Preferences could not be cached locally.');
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('bioscience_newsletter_email');
      localStorage.removeItem('bioscience_newsletter_topics');
    } catch {}
    setEmail('');
    setIsSubmitted(false);
    setAlreadySubscribed(false);
    setSelectedTopics(['Jobs & JRF Openings', 'Exam Notifications', 'Research Grants & Proposals']);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-100">
          <BellRing className="w-3.5 h-3.5" />
          Weekly Scientific Digest
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('BioScience Weekly Dispatch', 'BioScience Weekly Dispatch')}
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {t(
            'Receive curated, verified biotech job openings, urgent exam alerts, and scientific grant circulars directly in your inbox every Monday.',
            'Har Monday verified biotech jobs, urgent exam deadlines aur research grant circulars prapt karein.'
          )}
        </p>
      </div>

      {/* Honest Operational Notice */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900">Subscription Status & Transparency:</span>{' '}
          Our dispatch operates as a curated Monday summary without marketing spam. Preferences are securely registered in your local scholar profile. We never share subscriber records with coaching centers or commercial recruiters.
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-emerald-900">
            {alreadySubscribed ? 'Subscription Preferences Updated' : 'Subscription Registered'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            Your preferences have been saved for <span className="font-semibold text-emerald-950 font-mono">{email}</span>. You will receive dispatches focused on:
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center pt-2">
            {selectedTopics.map((top) => (
              <span key={top} className="px-2.5 py-1 bg-white border border-emerald-300 rounded text-xs font-medium text-emerald-900">
                {top}
              </span>
            ))}
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Modify Selected Topics
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-rose-700 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Unsubscribe / Reset</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Academic or Institutional Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="e.g. researcher@iisc.ac.in or scholar@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Select Curated Focus Areas ({selectedTopics.length} selected)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableTopics.map((topic) => {
                const isChecked = selectedTopics.includes(topic);
                return (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      isChecked
                        ? 'border-cyan-600 bg-cyan-50/50 text-cyan-950 font-medium'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span>{topic}</span>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isChecked && <span className="text-[10px] leading-none">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{alreadySubscribed ? 'Update Dispatch Preferences' : 'Register for Weekly Dispatch'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
