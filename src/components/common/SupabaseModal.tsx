import React, { useState } from 'react';
import { getSupabaseCredentials, saveSupabaseCredentials, clearSupabaseCredentials } from '../../services/supabaseClient.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { Database, CheckCircle2, AlertCircle, X, Key, ExternalLink } from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { refreshConnectionStatus } = useAuth();
  const creds = getSupabaseCredentials();

  const [url, setUrl] = useState(creds.url);
  const [anonKey, setAnonKey] = useState(creds.anonKey);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!url.startsWith('https://')) {
      setStatusMsg({ type: 'error', text: 'Supabase URL must start with https://' });
      return;
    }
    if (!anonKey || anonKey.length < 20) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid Supabase Anon / Public Key.' });
      return;
    }

    saveSupabaseCredentials(url, anonKey);
    refreshConnectionStatus();
    setStatusMsg({ type: 'success', text: 'Supabase credentials saved successfully! Reloading client.' });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleResetToLocal = () => {
    clearSupabaseCredentials();
    refreshConnectionStatus();
    setUrl('');
    setAnonKey('');
    setStatusMsg({ type: 'success', text: 'Switched to Local Storage persistence mode.' });
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-sm">Supabase Database Connection</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="mt-0.5">
              {creds.isConfigured ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-cyan-600" />
              )}
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">
                Current Mode: {creds.isConfigured ? 'Connected to Remote Supabase' : 'Local Storage Mode'}
              </span>
              <p className="mt-0.5">
                {creds.isConfigured
                  ? 'All auth, student bookmarks, and progress records sync directly with your PostgreSQL database.'
                  : 'Operating in self-contained local mode with browser persistence. Enter your project keys below to connect real Supabase Auth and PostgreSQL.'}
              </p>
            </div>
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              <span>{statusMsg.text}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Supabase Anon / Public Key
            </label>
            <input
              type="password"
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
            <span>Find keys in your Supabase Dashboard → Settings → API</span>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-700 hover:underline"
            >
              Supabase Dashboard <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleResetToLocal}
            className="text-xs text-slate-600 hover:text-slate-900 underline"
          >
            Reset to Local Mode
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Save & Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
