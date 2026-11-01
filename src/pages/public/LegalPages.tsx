import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { Shield, FileText, Mail, CheckCircle2, AlertCircle, ExternalLink, Info } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Audit Reference Date: 1 November 2026</p>
      </div>

      <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <p>
          At BioScience Knowledge Hub, we respect the privacy of students, scholars, and researchers accessing our platform. This Privacy Policy provides an accurate and transparent description of how data is handled on our public educational platform.
        </p>

        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          1. Public Access & Account-Free Architecture
        </h2>
        <p>
          BioScience Knowledge Hub is an open, completely public educational resource. Browsing educational subjects, examination portals, laboratory instruments, and scientific calculators does not require registration, login, or personal profile creation. We do not collect or store user passwords.
        </p>

        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          2. Active Forms & Data Collection
        </h2>
        <div className="space-y-2">
          <p>
            <strong>Newsletter Registration:</strong> When you voluntarily register for the BioScience Weekly Dispatch, your email address and selected topic preferences are cached in your browser’s local storage (<code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono">bioscience_newsletter_*</code>) so your preferences persist across visits. We do not sell subscriber addresses to third-party commercial marketing or coaching agencies.
          </p>
          <p>
            <strong>Editorial Inquiries:</strong> When submitting corrections, peer-review queries, or institutional feedback, messages are routed directly via email to our editorial desk.
          </p>
        </div>

        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          3. Local Storage & Client Cookies
        </h2>
        <p>
          Our application utilizes client-side local storage strictly for essential user preferences:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
          <li><code className="bg-slate-100 px-1 py-0.5 rounded font-mono">bioscience_language</code>: Saves your preferred study language (English or Roman Hinglish).</li>
          <li><code className="bg-slate-100 px-1 py-0.5 rounded font-mono">bioscience_newsletter_*</code>: Stores local newsletter digest topics and subscription status.</li>
        </ul>
        <p>
          We do not deploy third-party advertising trackers, cross-site behavioral cookies, or invasive telemetry scripts.
        </p>

        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          4. Hosting & Infrastructure
        </h2>
        <p>
          The application is served via modern content delivery infrastructure (Google Cloud Run / Vercel Edge). Standard, non-identifying server access logs (HTTP request headers, client IP, response status codes) may be collected by hosting providers solely for network security, DDoS prevention, and service reliability.
        </p>

        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          5. Privacy Rights & Contact
        </h2>
        <p>
          If you have questions regarding our data practices or wish to request removal of an editorial citation or email inquiry, contact our editorial team directly at{' '}
          <a href="mailto:privacy@biosciencehub.org" className="text-cyan-700 underline font-medium">
            privacy@biosciencehub.org
          </a>.
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
        <p className="text-xs text-slate-500 mt-1">Audit Reference Date: 1 November 2026</p>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          1. Academic Fair Use & Educational Purpose
        </h2>
        <p>
          All educational materials, molecular mechanisms, and calculation tools provided on BioScience Knowledge Hub are designed solely for personal non-commercial educational study, academic reference, and national examination preparation.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          2. Official Notices & Accuracy
        </h2>
        <p>
          While every effort is made to maintain verified data against official bulletins (NTA, IITs, CSIR, DBT), examination candidates must always confirm critical eligibility criteria, fee structures, and application closing dates on respective official examination portals.
        </p>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono pt-2">
          3. Intellectual Property
        </h2>
        <p>
          All scientific references, examination question patterns, and institutional trademarks referenced on this platform remain the intellectual property of their respective issuing bodies. Content is synthesized in accordance with fair academic reporting standards.
        </p>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!emailRegex.test(form.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!form.subject.trim()) {
      setErrorMessage('Please specify the subject of your inquiry.');
      return;
    }
    if (form.message.trim().length < 10) {
      setErrorMessage('Please provide a descriptive message (at least 10 characters).');
      return;
    }

    // Direct mailto link generation for authentic delivery
    const mailtoLink = `mailto:editorial@biosciencehub.org?subject=${encodeURIComponent(
      `[BioScience Hub Inquiry] ${form.subject.trim()}`
    )}&body=${encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Contact Academic Editorial Desk</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
          Submit curriculum feedback, errata, institution notices, or partnership inquiries to the BioScience Knowledge Hub editorial board.
        </p>
      </div>

      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900">Direct Editorial Email:</span> You can also reach our editorial desk directly at{' '}
          <a href="mailto:editorial@biosciencehub.org" className="text-cyan-700 underline font-medium">
            editorial@biosciencehub.org
          </a>. Filling this form generates a formatted email in your default mail application.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrorMessage(null);
            }}
            placeholder="Dr. / Prof. / Scholar Name"
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Academic or Contact Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              setErrorMessage(null);
            }}
            placeholder="scholar@university.ac.in"
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Subject</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => {
              setForm({ ...form, subject: e.target.value });
              setErrorMessage(null);
            }}
            placeholder="e.g. Question Errata / Syllabus Update / Instrument Query"
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wider">Message</label>
          <textarea
            rows={4}
            required
            value={form.message}
            onChange={(e) => {
              setForm({ ...form, message: e.target.value });
              setErrorMessage(null);
            }}
            placeholder="Provide context, references, or specific questions..."
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Format & Open in Mail Client</span>
        </button>
      </form>
    </div>
  );
};
