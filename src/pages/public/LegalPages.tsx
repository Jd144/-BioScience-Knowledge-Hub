import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { Shield, FileText, Mail, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          At BioScience Knowledge Hub, we hold student and academic privacy with utmost seriousness. This Privacy Policy details our practices concerning data collection, storage, and access.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          1. Information We Collect
        </h2>
        <p>
          When you register or complete student onboarding, we collect your full name, email address, preferred study language, educational degree level, and targeted competitive examinations. Passwords are never stored in plain text and are hashed using cryptographic salt via Supabase Authentication.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          2. Row Level Security & Data Isolation
        </h2>
        <p>
          Your learning progress, bookmarks, and mock test scores are secured through PostgreSQL Row Level Security (RLS) policies. Other students or third parties cannot access or alter your private learning records.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          3. Zero Commercial Exploitation
        </h2>
        <p>
          We do not sell, rent, or lease student information to coaching centers, advertising networks, or external commercial entities.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          1. Academic Fair Use & Educational Purpose
        </h2>
        <p>
          All educational materials, molecular mechanisms, and calculation tools provided on BioScience Knowledge Hub are designed solely for personal non-commercial educational study and examination preparation.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          2. Intellectual Property & Citation
        </h2>
        <p>
          All scientific references, syllabus notifications, and textbook citations remain the property of their respective authors and conducting institutions (NTA, IITs, DBT, CSIR). Content is synthesized in accordance with fair academic synthesis standards.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          3. Scientific Laboratory Disclaimer
        </h2>
        <p>
          Calculators and protocol guidelines are educational tools designed to build theoretical understanding. Laboratory personnel must adhere to institutional SOPs, chemical safety data sheets (MSDS), and certified laboratory containment protocols before conducting wet-lab experiments.
        </p>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!emailRegex.test(form.email.trim())) {
      setErrorMessage('Please provide a valid academic email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Contact Academic Support</h1>
        <p className="text-xs text-slate-500 mt-1">
          Have an inquiry, correction, or scientific suggestion? Reach out to the editorial board.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
          <h2 className="text-sm font-bold text-emerald-950">Inquiry Dispatched</h2>
          <p className="text-xs text-emerald-800">
            Thank you for reaching out. The BioScience Knowledge Hub editorial board reviews academic feedback and correction suggestions.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', email: '', subject: '', message: '' });
            }}
            className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-xs">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Academic Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Subject</label>
            <input
              type="text"
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Message</label>
            <textarea
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Academic Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
};
