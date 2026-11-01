import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  Mail,
  CheckCircle2,
  ShieldCheck,
  Send,
  BellRing,
  AlertCircle,
  Loader2
} from 'lucide-react';

export const NewsletterPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Jobs & JRF Openings',
    'Exam Notifications',
    'Research Grants & Proposals'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableTopics = [
    'Jobs & JRF Openings',
    'Internships & Fellowships',
    'Exam Notifications (GAT-B, GATE, CSIR-NET)',
    'Scholarships & Admissions',
    'Research Grants & Proposals',
    'Biotech News & Regulatory Dispatches'
  ];

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

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address (e.g. scholar@university.ac.in).');
      return;
    }

    if (selectedTopics.length === 0) {
      setErrorMessage('Please select at least one topic of interest for your weekly digest.');
      return;
    }

    setIsSubmitting(true);
    // Simulate real network request and client registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        localStorage.setItem('bioscience_newsletter_email', email.trim());
        localStorage.setItem('bioscience_newsletter_topics', JSON.stringify(selectedTopics));
      } catch (err) {
        // Safe localStorage failure fallback
      }
    }, 600);
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
            'Receive curated, verified biotech job openings, urgent exam alerts, and scientific grant updates delivered directly to your inbox every Monday morning.',
            'Har Monday verified biotech jobs, urgent exam deadlines aur research grant circulars sidhe apne inbox me prapt karein.'
          )}
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-emerald-900">
            Subscription Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
            You have successfully subscribed with <span className="font-semibold text-emerald-900">{email}</span>. You will receive the Monday Digest covering {selectedTopics.join(', ')}.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Manage Preferences
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="scholar@university.ac.in"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Select Your Interests (Custom Frequency)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableTopics.map((topic) => {
                const checked = selectedTopics.includes(topic);
                return (
                  <label
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'border-cyan-500 bg-cyan-50/50 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="font-medium">{topic}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span>Subscribe to Weekly Dispatch</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Strict privacy. No sponsored spam. Unsubscribe in 1 click at any time.</span>
          </div>
        </form>
      )}
    </div>
  );
};
