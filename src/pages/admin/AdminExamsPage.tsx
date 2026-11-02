import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Save,
  CheckCircle2,
  ExternalLink,
  Clock,
  BookOpen,
  FileText,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminExamsPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/cms/examinations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setExams(json);
        if (json.length > 0 && !selectedExam) {
          setSelectedExam(json[0]);
        } else if (selectedExam) {
          const updated = json.find((e: any) => e.code === selectedExam.code);
          if (updated) setSelectedExam(updated);
        }
      }
    } catch (e) {
      console.warn('Failed to load examinations:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [token]);

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/cms/examinations/${selectedExam.code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedExam),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update examination details.');
      }

      setSuccessMsg(`Official syllabus and settings for ${selectedExam.code} updated successfully.`);
      fetchExams();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              6 Competitive Examination Portals
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official syllabus, eligibility criteria, exam patterns, marking schemes, and BioScience Mastery destination URLs.
          </p>
        </div>

        {selectedExam && (
          <button
            onClick={handleSaveExam}
            disabled={saving}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : `Save ${selectedExam.code} Updates`}</span>
          </button>
        )}
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)}>✕</button>
        </div>
      )}
      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)}>✕</button>
        </div>
      )}

      {/* 6 Tabs for examinations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {exams.map((exam) => {
          const isSelected = selectedExam?.code === exam.code;
          return (
            <button
              key={exam.code}
              onClick={() => setSelectedExam({ ...exam })}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-500/50 shadow-md'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${isSelected ? 'text-cyan-400' : 'text-white'}`}>
                  {exam.code}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[11px] text-slate-400 truncate mt-1">{exam.fullName}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Exam Editor */}
      {selectedExam && (
        <form onSubmit={handleSaveExam} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                Official Examination Configuration
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {selectedExam.code} — {selectedExam.fullName}
              </h2>
            </div>
            <div className="text-right text-[11px] text-slate-400 font-mono">
              Last Verified: {selectedExam.verificationDate || '2026-11-01'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Conducting Agency</label>
              <input
                type="text"
                value={selectedExam.conductingAgency || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, conductingAgency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Official Portal URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={selectedExam.officialPortalUrl || ''}
                  onChange={(e) => setSelectedExam({ ...selectedExam, officialPortalUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Syllabus Summary */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Official Syllabus Summary (English)
            </label>
            <textarea
              rows={3}
              value={selectedExam.syllabusSummary || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, syllabusSummary: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
            />
          </div>

          {/* Eligibility Summary */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Eligibility & Category Relaxation Norms
            </label>
            <textarea
              rows={3}
              value={selectedExam.eligibilitySummary || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, eligibilitySummary: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Exam Duration (Minutes)</label>
              <input
                type="number"
                value={selectedExam.durationMinutes || 180}
                onChange={(e) => setSelectedExam({ ...selectedExam, durationMinutes: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Marking Scheme Formula</label>
              <input
                type="text"
                value={selectedExam.markingScheme || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, markingScheme: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>
          </div>

          {/* BioScience Mastery Integration Section */}
          <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-bold text-white text-xs">BioScience Mastery Cross-Platform Destination</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={selectedExam.masteryActive ?? true}
                  onChange={(e) => setSelectedExam({ ...selectedExam, masteryActive: e.target.checked })}
                  className="rounded text-cyan-500"
                />
                <span>Active in UI</span>
              </label>
            </div>

            <div>
              <input
                type="url"
                value={selectedExam.masteryDestinationUrl || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, masteryDestinationUrl: e.target.value })}
                placeholder="https://biosciencemasterycom.vercel.app/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs"
              />
            </div>
          </div>

          {/* Status Note & Zero Speculation Policy */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Status Note & Public Disclaimer</label>
            <textarea
              rows={2}
              value={selectedExam.statusNote || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, statusNote: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-800">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 font-bold flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Changes...' : `Save ${selectedExam.code} Configuration`}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
