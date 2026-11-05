/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - 6 Competitive Examination Portals CMS
 * Complete management of official syllabus, patterns, dates, and BioScience Mastery destination links.
 */

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
  Calendar,
  CheckCircle,
  XCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export interface ExaminationConfig {
  code: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET';
  fullName: string;
  conductingAgency: string;
  officialPortalUrl: string;
  syllabusSummary: string;
  eligibilitySummary: string;
  examPattern: string;
  durationMinutes: number;
  markingScheme: string;
  importantDatesText: string;
  verificationDate: string;
  masteryDestinationUrl: string;
  masteryActive: boolean;
  statusNote: string;
  updatedAt?: string;
}

export const AdminExamsPage: React.FC = () => {
  const { token, hasRole } = useAdminAuth();

  const [exams, setExams] = useState<ExaminationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState<ExaminationConfig | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchExams = async () => {
    setLoading(true);
    const res = await safeFetchJson<ExaminationConfig[]>('/api/admin/cms/examinations');
    if (res.ok && res.data) {
      setExams(res.data);
      if (res.data.length > 0) {
        if (!selectedExam) {
          setSelectedExam(res.data[0]);
        } else {
          const updated = res.data.find((e) => e.code === selectedExam.code);
          if (updated) setSelectedExam(updated);
        }
      }
    } else {
      setStatusMessage({ text: res.error || 'Failed to load examinations', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExams();
  }, [token]);

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) return;
    setStatusMessage(null);
    setSaving(true);

    const res = await safeFetchJson<{ success: boolean; examination: ExaminationConfig }>(
      `/api/admin/cms/examinations/${selectedExam.code}`,
      {
        method: 'PUT',
        body: JSON.stringify(selectedExam),
      }
    );

    if (res.ok && res.data) {
      setStatusMessage({
        text: `Official syllabus, pattern, and destination settings for ${selectedExam.code} saved successfully!`,
        type: 'success',
      });
      fetchExams();
    } else {
      setStatusMessage({ text: res.error || 'Failed to update examination details.', type: 'error' });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-serif">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-700" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              6 Competitive Examination Portals
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official syllabus, eligibility criteria, exam patterns, marking schemes, important notification dates, and BioScience Mastery destination URLs.
          </p>
        </div>

        {selectedExam && hasRole(['superadmin', 'editor']) && (
          <button
            onClick={handleSaveExam}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : `Save ${selectedExam.code} Updates`}</span>
          </button>
        )}
      </div>

      {/* Alerts */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 6 Examination Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {exams.map((exam) => {
          const isSelected = selectedExam?.code === exam.code;
          return (
            <button
              key={exam.code}
              onClick={() => setSelectedExam({ ...exam })}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-50 border-cyan-500 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${isSelected ? 'text-cyan-800' : 'text-slate-900'}`}>
                  {exam.code}
                </span>
                <span className={`w-2 h-2 rounded-full ${exam.masteryActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-1 font-sans">{exam.fullName}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Exam Editor */}
      {selectedExam && (
        <form onSubmit={handleSaveExam} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 text-xs font-sans shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono text-cyan-700 font-bold uppercase tracking-wider block">
                Official Examination Configuration
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedExam.code} — {selectedExam.fullName}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={selectedExam.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
                <span>Official Portal</span>
              </a>
              <div className="text-right text-[11px] text-slate-400 font-mono">
                Verified: {selectedExam.verificationDate || '2026-11-01'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Conducting Agency</label>
              <input
                type="text"
                value={selectedExam.conductingAgency || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, conductingAgency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Official Portal URL</label>
              <input
                type="url"
                value={selectedExam.officialPortalUrl || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, officialPortalUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs"
              />
            </div>
          </div>

          {/* Syllabus Summary */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Official Syllabus Summary & Curriculum Coverage
            </label>
            <textarea
              rows={3}
              value={selectedExam.syllabusSummary || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, syllabusSummary: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 leading-relaxed font-serif text-xs"
            />
          </div>

          {/* Eligibility Summary */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Eligibility Criteria & Category Relaxation Norms
            </label>
            <textarea
              rows={3}
              value={selectedExam.eligibilitySummary || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, eligibilitySummary: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 leading-relaxed font-serif text-xs"
            />
          </div>

          {/* Exam Pattern & Important Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Exam Pattern & Sections</label>
              <textarea
                rows={3}
                value={selectedExam.examPattern || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, examPattern: e.target.value })}
                placeholder="e.g. CBT, 180 Minutes, Section A and Section B..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Important Dates & Notifications</label>
              <textarea
                rows={3}
                value={selectedExam.importantDatesText || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, importantDatesText: e.target.value })}
                placeholder="Official exam date, application window, admit card release..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={selectedExam.durationMinutes || 180}
                onChange={(e) => setSelectedExam({ ...selectedExam, durationMinutes: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Marking Scheme Formula</label>
              <input
                type="text"
                value={selectedExam.markingScheme || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, markingScheme: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          {/* BioScience Mastery Destination Integration */}
          <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                <span className="font-bold text-slate-900 text-xs">BioScience Mastery Integration Destination</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-semibold">
                <input
                  type="checkbox"
                  checked={selectedExam.masteryActive ?? true}
                  onChange={(e) => setSelectedExam({ ...selectedExam, masteryActive: e.target.checked })}
                  className="rounded text-cyan-600"
                />
                <span>Active Portal Link</span>
              </label>
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Target Mastery Course / Exam URL</label>
              <input
                type="url"
                value={selectedExam.masteryDestinationUrl || ''}
                onChange={(e) => setSelectedExam({ ...selectedExam, masteryDestinationUrl: e.target.value })}
                placeholder="https://bioscience-mastery-p-vdf1.bolt.host/en/exams..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-cyan-900 font-mono text-xs bg-white"
              />
            </div>
          </div>

          {/* Status Note & Zero Speculation Policy */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Status Note & Public Disclaimer</label>
            <textarea
              rows={2}
              value={selectedExam.statusNote || ''}
              onChange={(e) => setSelectedExam({ ...selectedExam, statusNote: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 disabled:bg-slate-300 text-white font-bold flex items-center gap-2 shadow-xs transition-colors"
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
