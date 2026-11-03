/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Public Maintenance Page
 * Clean white, serene, and warm educational maintenance experience.
 * Features live IST countdown, warm bilingual personal message, and
 * the 4 Mind-Refresh Mini Games.
 */

import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw, Heart, Calendar, Gamepad2 } from 'lucide-react';
import { useMaintenance } from '../../context/MaintenanceContext.tsx';
import { MemoryMatchGame } from '../../components/maintenance/MemoryMatchGame.tsx';
import { NumberPuzzleGame } from '../../components/maintenance/NumberPuzzleGame.tsx';
import { QuickMathGame } from '../../components/maintenance/QuickMathGame.tsx';
import { WordScrambleGame } from '../../components/maintenance/WordScrambleGame.tsx';

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

  // Active Mini Game Tab
  const [activeGameTab, setActiveGameTab] = useState<'memory' | 'puzzle' | 'math' | 'scramble'>('memory');

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

  const currentMessage =
    lang === 'hi'
      ? data?.message_hi ||
        'BioScience Hub पर आपके अध्ययन अनुभव को और बेहतर बनाने के लिए निर्धारित सिस्टम रखरखाव और डेटाबेस अनुकूलन का कार्य प्रगति पर है।'
      : data?.message_en ||
        'BioScience Hub is temporarily under scheduled system maintenance and database optimization to provide an enhanced academic learning experience.';

  const currentPersonalMessage =
    lang === 'hi'
      ? data?.personal_message_hi ||
        '⏳ जब तक BioScience Hub दोबारा शुरू होता है, तब तक अपना यह कीमती समय अपने परिवार और प्रियजनों के साथ बिताइए। ❤️👨👩👧👦\n\nअपनों के साथ कुछ खूबसूरत पल बिताइए, खुश रहिए और मुस्कुराते रहिए। 🌸✨\n\nहम जल्द ही आपके लिए एक बेहतर Learning Experience के साथ वापस आएंगे! 🚀'
      : data?.personal_message_en ||
        "⏳ While BioScience Hub is getting ready to welcome you back, take this opportunity to spend some precious time with your family and loved ones. ❤️👨👩👧👦\n\nMake beautiful memories, share a smile, and enjoy the little moments of life. 🌸✨\n\nWe'll be back soon with a better learning experience for you! 🚀";

  // Check which mini games are enabled
  const miniGamesConfig = data?.mini_games || {
    memory_match: true,
    number_puzzle: true,
    quick_math: true,
    word_scramble: true,
  };

  const hasAnyGameEnabled =
    miniGamesConfig.memory_match ||
    miniGamesConfig.number_puzzle ||
    miniGamesConfig.quick_math ||
    miniGamesConfig.word_scramble;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 font-serif">
      {/* Top Header Row with BioScience Hub Branding & Language Switcher */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg shadow-xs">
            B
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight block leading-tight">
              BioScience Hub
            </span>
            <span className="text-[11px] font-semibold text-cyan-700 tracking-wider uppercase leading-none">
              Scheduled System Upkeep
            </span>
          </div>
        </div>

        {/* Bilingual Selector & Live Refresh */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1 text-xs font-semibold shadow-2xs">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                lang === 'en'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                lang === 'hi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          <button
            onClick={() => refresh()}
            title="Check if website is back online"
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-2xs transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Educational Maintenance Announcement */}
      <main className="max-w-4xl mx-auto w-full my-8 space-y-8">
        {/* Card 1: Official Status & Live Countdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse" />
            <span>Scheduled Database & System Upgrade</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {data?.title || "We'll Be Back Soon!"}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {currentMessage}
            </p>
          </div>

          {/* Live Countdown Grid */}
          <div className="pt-2">
            <div className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold mb-3">
              Estimated Reopening Countdown
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
              {/* Days */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-4xl font-mono font-extrabold text-slate-900">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase font-semibold text-slate-500 mt-1">
                  Days
                </div>
              </div>

              {/* Hours */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-4xl font-mono font-extrabold text-slate-900">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase font-semibold text-slate-500 mt-1">
                  Hours
                </div>
              </div>

              {/* Minutes */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-4xl font-mono font-extrabold text-slate-900">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase font-semibold text-slate-500 mt-1">
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="bg-cyan-50/70 border border-cyan-200 rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-2xl sm:text-4xl font-mono font-extrabold text-cyan-900">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs uppercase font-semibold text-cyan-700 mt-1">
                  Seconds
                </div>
              </div>
            </div>

            {/* Expected Reopening Time in IST */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Target Reopening: {formatExpectedDateTime(targetIso)}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Warm Personal Family Message */}
        <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/60 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>A Gentle Reminder from BioScience Hub</span>
          </div>

          <div className="text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line italic">
            &quot;{currentPersonalMessage}&quot;
          </div>
        </div>

        {/* Section 3: Take a Little Mind Break! (Mini Games) */}
        {hasAnyGameEnabled && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Gamepad2 className="w-5 h-5 text-cyan-700" />
                <span>Take a Little Mind Break! 🧠✨</span>
              </h2>
              <p className="text-xs text-slate-500">
                While our servers complete optimization, refresh your focus with a quick in-browser brain break.
              </p>
            </div>

            {/* Mini Game Selector Tabs */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {miniGamesConfig.memory_match && (
                <button
                  onClick={() => setActiveGameTab('memory')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                    activeGameTab === 'memory'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🃏 Memory Match
                </button>
              )}

              {miniGamesConfig.number_puzzle && (
                <button
                  onClick={() => setActiveGameTab('puzzle')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                    activeGameTab === 'puzzle'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🔢 Number Puzzle
                </button>
              )}

              {miniGamesConfig.quick_math && (
                <button
                  onClick={() => setActiveGameTab('math')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                    activeGameTab === 'math'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  ⚡ Quick Math
                </button>
              )}

              {miniGamesConfig.word_scramble && (
                <button
                  onClick={() => setActiveGameTab('scramble')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                    activeGameTab === 'scramble'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  🧬 Word Scramble
                </button>
              )}
            </div>

            {/* Active Mini Game Container */}
            <div className="max-w-md mx-auto">
              {activeGameTab === 'memory' && miniGamesConfig.memory_match && <MemoryMatchGame />}
              {activeGameTab === 'puzzle' && miniGamesConfig.number_puzzle && <NumberPuzzleGame />}
              {activeGameTab === 'math' && miniGamesConfig.quick_math && <QuickMathGame />}
              {activeGameTab === 'scramble' && miniGamesConfig.word_scramble && <WordScrambleGame />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-6 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
        <div>BioScience Hub Educational Platform &copy; {new Date().getFullYear()}</div>
        <div className="text-[11px] text-slate-400">
          Independent academic initiative. Seamlessly connects with BioScience Mastery for national examination prep.
        </div>
      </footer>
    </div>
  );
};
