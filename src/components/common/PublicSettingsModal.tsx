/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Public Settings Modal / Panel
 * Accessible directly via prominent Header Gear icon (⚙️) on desktop and mobile.
 */

import React from 'react';
import { X, Sun, Moon, Monitor, Globe, Shield, Sparkles } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';

export const PublicSettingsModal: React.FC = () => {
  const { theme, setTheme, isSettingsOpen, closeSettings } = useTheme();
  const { language, setLanguage } = useLanguage();

  if (!isSettingsOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold text-base">
              ⚙️
            </div>
            <div>
              <h2 id="settings-modal-title" className="text-base font-bold text-slate-900 dark:text-slate-100">
                Website Settings & Preferences
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize appearance, language, and reading experience
              </p>
            </div>
          </div>
          <button
            onClick={closeSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close settings modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Appearance (Theme Mode) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Appearance & Color Theme</span>
              </label>
              <span className="text-[11px] font-medium text-slate-400">Instant toggle</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Light Mode */}
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  theme === 'light'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold">Light Mode</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Clean white paper</span>
              </button>

              {/* Dark Mode */}
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  theme === 'dark'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-300 flex items-center justify-center border border-indigo-800">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold">Dark Mode</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Comfortable night</span>
              </button>

              {/* System Default */}
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                  theme === 'system'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-300 ring-2 ring-cyan-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold">System</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Match OS setting</span>
              </button>
            </div>
          </div>

          {/* Section 2: Bilingual Language */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Primary Language / भाषा</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  language === 'en'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold">English (Standard)</div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">Academic terminology & papers</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('hinglish')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  language === 'hinglish'
                    ? 'border-cyan-600 bg-cyan-50/70 dark:bg-cyan-950/30 text-cyan-900 dark:text-cyan-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-semibold">हिंदी (Hindi / Hinglish)</div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">सरल हिंदी में अवधारणाएँ</span>
              </button>
            </div>
          </div>

          {/* Section 3: Typography & Academic Standards Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <Shield className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200">Typography Standard</div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                BioScience Hub follows the classical academic serif font standard (Times New Roman) across all devices for rigorous scientific readability.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Preferences saved automatically in browser</span>
          <button
            type="button"
            onClick={closeSettings}
            className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
