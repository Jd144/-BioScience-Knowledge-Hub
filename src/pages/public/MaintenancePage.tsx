import React, { useState, useEffect } from 'react';
import { Clock, ShieldAlert, Sparkles, RefreshCw, Heart, Calendar } from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalRemainingMs: number;
}

export const MaintenancePage: React.FC = () => {
  const { data, refresh, previewMode, setPreviewMode } = useMaintenance();
  
  // Language toggle for personal message: 'en' | 'hi'
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bioscience_maint_lang');
      if (stored === 'en' || stored === 'hi') return stored;
    }
    return 'en';
  });

  const handleLanguageChange = (newLang: 'en' | 'hi') => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bioscience_maint_lang', newLang);
    }
  };

  // Reopening ISO
  const targetIso = data?.expected_reopening_iso || new Date(Date.now() + 2 * 3600 * 1000).toISOString();

  const calculateTimeLeft = (): TimeLeft => {
    const diff = new Date(targetIso).getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalRemainingMs: 0 };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      totalRemainingMs: diff,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // When countdown reaches 0, trigger refresh to check if server auto-reopened
      if (remaining.totalRemainingMs <= 0) {
        refresh();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetIso, refresh]);

  // Format expected reopening date in Asia/Kolkata (IST)
  const formatExpectedDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: data?.timezone || 'Asia/Kolkata',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const currentMessage = lang === 'hi'
    ? (data?.message_hi || "BioScience Hub पर आपके अध्ययन अनुभव को और बेहतर बनाने के लिए निर्धारित सिस्टम रखरखाव और डेटाबेस अनुकूलन का कार्य प्रगति पर है।")
    : (data?.message_en || "BioScience Hub is temporarily under scheduled system maintenance and database optimization to provide an enhanced academic learning experience.");

  const currentPersonalMessage = lang === 'hi'
    ? (data?.personal_message_hi || "⏳ जब तक BioScience Hub दोबारा शुरू होता है, तब तक अपना यह कीमती समय अपने परिवार और प्रियजनों के साथ बिताइए। ❤️👨👩👧👦\n\nअपनों के साथ कुछ खूबसूरत पल बिताइए, खुश रहिए और मुस्कुराते रहिए। 🌸✨\n\nहम जल्द ही आपके लिए एक बेहतर Learning Experience के साथ वापस आएंगे! 🚀")
    : (data?.personal_message_en || "⏳ While BioScience Hub is getting ready to welcome you back, take this opportunity to spend some precious time with your family and loved ones. ❤️👨👩👧👦\n\nMake beautiful memories, share a smile, and enjoy the little moments of life. 🌸✨\n\nWe'll be back soon with a better learning experience for you! 🚀");

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-100 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-white">
      {/* Top Header Row with BioScience Hub Branding & Language Switcher */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between gap-4 pb-8 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg shadow-md">
            B
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-tight leading-tight">BioScience Hub</div>
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
              Biotechnology Knowledge Ecosystem
            </div>
          </div>
        </div>

        {/* Language Selection Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 shadow-inner">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              lang === 'en'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              lang === 'hi'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            🇮🇳 हिंदी
          </button>
        </div>
      </header>

      {/* Preview Mode Alert Banner if triggered by Administrator */}
      {previewMode && (
        <div className="max-w-3xl mx-auto w-full my-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-center justify-between">
          <span>⚠️ <strong>Admin Preview Mode Active:</strong> You are viewing the public maintenance screen.</span>
          <button
            onClick={() => setPreviewMode(false)}
            className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400"
          >
            Exit Preview
          </button>
        </div>
      )}

      {/* Main Maintenance Section */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8 text-center space-y-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Scheduled System Optimization & Upgrades in Progress</span>
        </div>

        {/* Central Maintenance Title & Primary Description */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {data?.title || "We'll Be Back Soon!"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {currentMessage}
          </p>
        </div>

        {/* Reverse Countdown Timer */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-6 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Estimated Reopening Countdown</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
            {/* Days */}
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-3 sm:p-4 text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1 block">
                {lang === 'hi' ? 'दिन' : 'Days'}
              </span>
            </div>

            {/* Hours */}
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-3 sm:p-4 text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1 block">
                {lang === 'hi' ? 'घंटे' : 'Hours'}
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-3 sm:p-4 text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1 block">
                {lang === 'hi' ? 'मिनट' : 'Minutes'}
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-slate-900/90 border border-slate-700/70 rounded-xl p-3 sm:p-4 text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-mono block animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1 block">
                {lang === 'hi' ? 'सेकंड' : 'Seconds'}
              </span>
            </div>
          </div>

          {/* Expected Reopening Date Display */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-center gap-2 text-xs text-slate-300">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>
              <strong>{lang === 'hi' ? 'अपेक्षित पुनः प्रारंभ समय:' : 'Expected Reopening:'}</strong>{' '}
              {formatExpectedDateTime(targetIso)}
            </span>
          </div>
        </div>

        {/* ADDITIONAL FEATURE: A Warm Personal Message Directly Below the Countdown */}
        <div className="bg-gradient-to-r from-cyan-950/60 via-slate-800/90 to-cyan-950/60 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 text-center shadow-xl space-y-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/40 animate-bounce" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            {currentPersonalMessage.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-cyan-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>BioScience Hub Editorial & Academic Team</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
        </div>

        {/* Manual Refresh Button */}
        <div>
          <button
            onClick={() => refresh()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 text-xs font-medium transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Check If Live Now</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full pt-8 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
        <p>© {new Date().getFullYear()} BioScience Hub. All rights reserved. Public Educational Resource.</p>
        <p className="text-[11px] text-slate-400">
          Grounded in official NTA, IIT, and CSIR examination gazettes and peer-reviewed scientific literature.
        </p>
      </footer>
    </div>
  );
};
