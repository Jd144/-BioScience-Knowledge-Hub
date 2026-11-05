/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Academic Subjects & Syllabus CMS
 * Full persistent CMS for all 11 Core Subjects, Units, Chapters, and Bilingual Notes.
 */

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  XCircle,
  ChevronRight,
  Layers,
  FileText,
  ExternalLink,
  MoveUp,
  MoveDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Languages,
  BookMarked,
  FolderPlus,
  FilePlus,
  Globe,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export interface TopicItem {
  id: string;
  slug: string;
  title: { en: string; hinglish: string };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMin: number;
  orderIndex: number;
  isPublished: boolean;
  contentEn?: string;
  contentHinglish?: string;
  keyPoints?: string[];
  references?: string[];
}

export interface ChapterItem {
  id: string;
  chapterNumber: number;
  title: { en: string; hinglish: string };
  topics: TopicItem[];
}

export interface UnitItem {
  id: string;
  unitNumber: number;
  title: { en: string; hinglish: string };
  chapters: ChapterItem[];
}

export interface SubjectItem {
  id: string;
  slug: string;
  name: { en: string; hinglish: string };
  description: { en: string; hinglish: string };
  icon: string;
  unitsCount: number;
  topicsCount: number;
  orderIndex: number;
  isPublished: boolean;
  overview: { en: string; hinglish: string };
  learningObjectives: { en: string[]; hinglish: string[] };
  keyFormulas?: { name: string; formula: string; description: { en: string; hinglish: string } }[];
  references: { citation: string; type: string; year?: number }[];
  units: UnitItem[];
  updatedAt?: string;
}

export const AdminSubjectsTopicsPage: React.FC = () => {
  const { token, hasRole } = useAdminAuth();
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'topicEditor'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  // Modal State for New / Edit Subject
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [editingSubjectData, setEditingSubjectData] = useState<Partial<SubjectItem>>({});

  // Active Topic being edited in Topic Notes Editor
  const [activeEditingTopic, setActiveEditingTopic] = useState<TopicItem | null>(null);

  // Fetch all subjects from persistent API
  const fetchSubjects = async () => {
    setLoading(true);
    const res = await safeFetchJson<SubjectItem[]>('/api/admin/cms/subjects');
    if (res.ok && res.data) {
      const sorted = [...res.data].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
      setSubjects(sorted);
      if (sorted.length > 0) {
        if (!selectedSubject) {
          setSelectedSubject(sorted[0]);
        } else {
          const updatedCurrent = sorted.find((s) => s.id === selectedSubject.id || s.slug === selectedSubject.slug);
          if (updatedCurrent) setSelectedSubject(updatedCurrent);
        }
      }
    } else {
      setStatusMessage({ text: res.error || 'Failed to load academic subjects', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubjects();
  }, [token]);

  // Handle Save Subject Overview & Learning Objectives
  const handleSaveSelectedSubject = async () => {
    if (!selectedSubject) return;
    setSaving(true);
    setStatusMessage(null);

    const res = await safeFetchJson<{ success: boolean; subject: SubjectItem }>(
      `/api/admin/cms/subjects/${selectedSubject.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(selectedSubject),
      }
    );

    if (res.ok && res.data) {
      setStatusMessage({ text: `Subject "${selectedSubject.name.en}" saved successfully!`, type: 'success' });
      fetchSubjects();
    } else {
      setStatusMessage({ text: res.error || 'Failed to update subject', type: 'error' });
    }
    setSaving(false);
  };

  // Toggle Publish Status
  const handleTogglePublish = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await safeFetchJson<{ success: boolean; isPublished: boolean }>(
      `/api/admin/cms/subjects/${id}/toggle-publish`,
      { method: 'POST' }
    );
    if (res.ok && res.data) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isPublished: res.data!.isPublished } : s))
      );
      if (selectedSubject && selectedSubject.id === id) {
        setSelectedSubject({ ...selectedSubject, isPublished: res.data.isPublished });
      }
      setStatusMessage({
        text: `Subject publish status toggled to ${res.data.isPublished ? 'Published' : 'Draft'}.`,
        type: 'success',
      });
    } else {
      setStatusMessage({ text: res.error || 'Error toggling publish status', type: 'error' });
    }
  };

  // Delete Subject with confirmation
  const handleDeleteSubject = async (sub: SubjectItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete the subject "${sub.name.en}"? This action removes its syllabus and topic mapping.`)) {
      return;
    }

    const res = await safeFetchJson(`/api/admin/cms/subjects/${sub.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setStatusMessage({ text: `Subject "${sub.name.en}" deleted successfully.`, type: 'success' });
      fetchSubjects();
      if (selectedSubject?.id === sub.id) {
        setSelectedSubject(null);
      }
    } else {
      setStatusMessage({ text: res.error || 'Failed to delete subject', type: 'error' });
    }
  };

  // Open Subject Modal (Create)
  const handleOpenCreateSubject = () => {
    setEditingSubjectData({
      name: { en: '', hinglish: '' },
      slug: '',
      description: { en: '', hinglish: '' },
      icon: 'BookOpen',
      orderIndex: subjects.length + 1,
      isPublished: true,
      overview: { en: '', hinglish: '' },
      learningObjectives: { en: [], hinglish: [] },
      references: [],
      units: [],
    });
    setSubjectModalOpen(true);
  };

  // Save Modal Subject (Create)
  const handleSaveModalSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubjectData.name?.en || !editingSubjectData.slug) {
      alert('Please provide at least the English name and URL slug.');
      return;
    }

    const res = await safeFetchJson<{ success: boolean; subject: SubjectItem }>('/api/admin/cms/subjects', {
      method: 'POST',
      body: JSON.stringify(editingSubjectData),
    });

    if (res.ok && res.data) {
      setStatusMessage({ text: `Subject "${editingSubjectData.name.en}" created successfully!`, type: 'success' });
      setSubjectModalOpen(false);
      fetchSubjects();
    } else {
      alert(res.error || 'Failed to create subject.');
    }
  };

  // Unit & Chapter Actions
  const handleAddUnit = () => {
    if (!selectedSubject) return;
    const newUnitNumber = (selectedSubject.units?.length || 0) + 1;
    const newUnit: UnitItem = {
      id: `u-${selectedSubject.slug}-${Date.now()}`,
      unitNumber: newUnitNumber,
      title: {
        en: `Unit ${newUnitNumber}: New Curriculum Unit`,
        hinglish: `Unit ${newUnitNumber}: Naya Curriculum Unit`,
      },
      chapters: [
        {
          id: `c-${Date.now()}`,
          chapterNumber: 1,
          title: {
            en: 'Chapter 1: Foundational Principles',
            hinglish: 'Chapter 1: Buniyadi Siddhant',
          },
          topics: [
            {
              id: `top-${Date.now()}`,
              slug: `topic-${Date.now()}`,
              title: {
                en: 'Core Concept Introduction',
                hinglish: 'Mukhya Avadharna Parichay',
              },
              difficulty: 'Intermediate',
              readTimeMin: 10,
              orderIndex: 1,
              isPublished: true,
              contentEn: 'Comprehensive notes covering mechanism, formulas, and experimental context.',
              contentHinglish: 'Hindi me vyakhya aur mahatvapurna points.',
              keyPoints: ['Key principle 1', 'Key principle 2'],
            },
          ],
        },
      ],
    };

    const updatedUnits = [...(selectedSubject.units || []), newUnit];
    setSelectedSubject({
      ...selectedSubject,
      units: updatedUnits,
      unitsCount: updatedUnits.length,
    });
  };

  const handleAddTopicToChapter = (unitIndex: number, chapterIndex: number) => {
    if (!selectedSubject) return;
    const unitsCopy = JSON.parse(JSON.stringify(selectedSubject.units));
    const ch = unitsCopy[unitIndex].chapters[chapterIndex];
    const newTopic: TopicItem = {
      id: `top-${Date.now()}`,
      slug: `topic-${selectedSubject.slug}-${Date.now().toString(36)}`,
      title: {
        en: 'New Biotechnology Topic',
        hinglish: 'Naya Biotechnology Topic',
      },
      difficulty: 'Intermediate',
      readTimeMin: 12,
      orderIndex: (ch.topics?.length || 0) + 1,
      isPublished: true,
      contentEn: '',
      contentHinglish: '',
      keyPoints: [],
    };
    ch.topics = ch.topics || [];
    ch.topics.push(newTopic);
    setSelectedSubject({
      ...selectedSubject,
      units: unitsCopy,
    });
  };

  // Save Topic Notes in Topic Editor
  const handleSaveActiveTopic = async () => {
    if (!activeEditingTopic || !selectedSubject) return;
    setSaving(true);
    setStatusMessage(null);

    const res = await safeFetchJson(`/api/admin/cms/topics/${activeEditingTopic.slug}`, {
      method: 'PUT',
      body: JSON.stringify(activeEditingTopic),
    });

    if (res.ok) {
      setStatusMessage({ text: `Topic "${activeEditingTopic.title.en}" notes updated successfully!`, type: 'success' });
      // Update in selectedSubject in memory
      const unitsCopy = JSON.parse(JSON.stringify(selectedSubject.units));
      for (const u of unitsCopy) {
        for (const c of u.chapters) {
          const idx = (c.topics || []).findIndex((t: TopicItem) => t.slug === activeEditingTopic.slug || t.id === activeEditingTopic.id);
          if (idx !== -1) {
            c.topics[idx] = { ...activeEditingTopic };
            break;
          }
        }
      }
      setSelectedSubject({ ...selectedSubject, units: unitsCopy });
      fetchSubjects();
    } else {
      setStatusMessage({ text: res.error || 'Failed to update topic notes', type: 'error' });
    }
    setSaving(false);
  };

  // Filtered subjects based on search
  const filteredSubjects = subjects.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.en.toLowerCase().includes(q) ||
      s.name.hinglish.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-serif">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-700" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              11 Academic Subjects & Syllabus CMS
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete curriculum management: units, chapters, topics, learning objectives, and bilingual Hindi/English notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {hasRole(['superadmin', 'editor']) && (
            <button
              onClick={handleOpenCreateSubject}
              className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Subject</span>
            </button>
          )}
        </div>
      </div>

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

      {/* Main Grid: Left Subjects Column + Right Subject Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Subjects ({subjects.length})
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Click to manage</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or keyword..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-cyan-600 font-sans"
              />
            </div>

            {/* Subjects List */}
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">Loading subjects from database...</div>
            ) : filteredSubjects.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">No subjects found matching query.</div>
            ) : (
              <div className="space-y-1.5 max-h-[650px] overflow-y-auto pr-1">
                {filteredSubjects.map((sub, idx) => {
                  const isSelected = selectedSubject?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubject(sub);
                        setActiveEditingTopic(null);
                      }}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-cyan-50/80 border-cyan-400 text-cyan-950 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="space-y-0.5 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            #{idx + 1}
                          </span>
                          <span className="font-bold text-slate-900 line-clamp-1">{sub.name.en}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 font-sans">
                          {sub.name.hinglish}
                        </div>
                        <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-slate-400">
                          <span>{sub.units?.length || sub.unitsCount || 0} Units</span>
                          <span>•</span>
                          <span>{sub.topicsCount || 0} Topics</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={(e) => handleTogglePublish(sub.id, e)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.isPublished
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                          title="Toggle public visibility"
                        >
                          {sub.isPublished ? 'Active' : 'Draft'}
                        </button>

                        {hasRole(['superadmin']) && (
                          <button
                            onClick={(e) => handleDeleteSubject(sub, e)}
                            className="p-1 text-slate-300 hover:text-rose-600 rounded"
                            title="Delete subject"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Subject Details & Tabs (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedSubject ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Header of Selected Subject */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-700 font-bold uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded">
                      Subject #{selectedSubject.orderIndex || 1} • {selectedSubject.slug}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedSubject.isPublished
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {selectedSubject.isPublished ? 'Published on Site' : 'Draft Only'}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedSubject.name.en}</h2>
                  <div className="text-xs text-slate-500 font-sans">{selectedSubject.name.hinglish}</div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`/subjects/${selectedSubject.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-600" />
                    <span>View Public Page</span>
                  </a>

                  <button
                    onClick={handleSaveSelectedSubject}
                    disabled={saving}
                    className="px-4 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 disabled:bg-slate-300 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Saving...' : 'Save Subject Updates'}</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-100 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'overview'
                      ? 'border-cyan-700 text-cyan-800 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Overview & Objectives</span>
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'curriculum'
                      ? 'border-cyan-700 text-cyan-800 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Units & Chapters Curriculum ({selectedSubject.units?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTab('topicEditor')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'topicEditor'
                      ? 'border-cyan-700 text-cyan-800 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>Bilingual Notes & Topics</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW & LEARNING OBJECTIVES */}
              {activeTab === 'overview' && (
                <div className="space-y-5 text-xs font-sans">
                  {/* Subject Name & Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subject English Name</label>
                      <input
                        type="text"
                        value={selectedSubject.name.en}
                        onChange={(e) =>
                          setSelectedSubject({
                            ...selectedSubject,
                            name: { ...selectedSubject.name, en: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subject Hindi/Hinglish Name</label>
                      <input
                        type="text"
                        value={selectedSubject.name.hinglish}
                        onChange={(e) =>
                          setSelectedSubject({
                            ...selectedSubject,
                            name: { ...selectedSubject.name, hinglish: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Short Description (English)</label>
                    <textarea
                      rows={2}
                      value={selectedSubject.description?.en || ''}
                      onChange={(e) =>
                        setSelectedSubject({
                          ...selectedSubject,
                          description: { ...selectedSubject.description, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Detailed Academic Overview (English)</label>
                    <textarea
                      rows={3}
                      value={selectedSubject.overview?.en || ''}
                      onChange={(e) =>
                        setSelectedSubject({
                          ...selectedSubject,
                          overview: { ...selectedSubject.overview, en: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>

                  {/* Learning Objectives List */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-sm">
                        Learning Objectives & Rigor Standards ({selectedSubject.learningObjectives?.en?.length || 0})
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const current = selectedSubject.learningObjectives?.en || [];
                          setSelectedSubject({
                            ...selectedSubject,
                            learningObjectives: {
                              ...selectedSubject.learningObjectives,
                              en: [...current, 'New measurable learning objective'],
                            },
                          });
                        }}
                        className="text-cyan-700 hover:text-cyan-800 font-bold flex items-center gap-1 text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Objective</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(selectedSubject.learningObjectives?.en || []).map((obj, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                          <input
                            type="text"
                            value={obj}
                            onChange={(e) => {
                              const copy = [...selectedSubject.learningObjectives.en];
                              copy[i] = e.target.value;
                              setSelectedSubject({
                                ...selectedSubject,
                                learningObjectives: { ...selectedSubject.learningObjectives, en: copy },
                              });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = selectedSubject.learningObjectives.en.filter((_, idx) => idx !== i);
                              setSelectedSubject({
                                ...selectedSubject,
                                learningObjectives: { ...selectedSubject.learningObjectives, en: copy },
                              });
                            }}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* References */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-sm">Authoritative Reference Textbooks</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const refs = selectedSubject.references || [];
                          setSelectedSubject({
                            ...selectedSubject,
                            references: [...refs, { citation: 'Author et al. Title. Publisher.', type: 'Book', year: 2024 }],
                          });
                        }}
                        className="text-cyan-700 hover:text-cyan-800 font-bold flex items-center gap-1 text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Reference</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(selectedSubject.references || []).map((ref, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={ref.citation}
                            onChange={(e) => {
                              const copy = [...selectedSubject.references];
                              copy[idx].citation = e.target.value;
                              setSelectedSubject({ ...selectedSubject, references: copy });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = selectedSubject.references.filter((_, i) => i !== idx);
                              setSelectedSubject({ ...selectedSubject, references: copy });
                            }}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CURRICULUM UNITS & CHAPTERS */}
              {activeTab === 'curriculum' && (
                <div className="space-y-5 text-xs font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Curriculum Units Structure</h3>
                      <p className="text-slate-400 text-xs">Organize units, chapters, and subtopic hierarchies.</p>
                    </div>
                    <button
                      onClick={handleAddUnit}
                      className="px-3 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold flex items-center gap-1.5 text-xs shadow-xs"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>Add Curriculum Unit</span>
                    </button>
                  </div>

                  {(!selectedSubject.units || selectedSubject.units.length === 0) ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                      <div className="font-bold text-slate-700">No units defined yet for this subject.</div>
                      <p className="text-slate-500 text-xs">Click &quot;Add Curriculum Unit&quot; to initialize Unit 1.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedSubject.units.map((unit, uIdx) => (
                        <div key={unit.id || uIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 flex-1">
                              <span className="w-6 h-6 rounded-lg bg-cyan-700 text-white font-bold text-xs flex items-center justify-center">
                                U{unit.unitNumber || uIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={unit.title.en}
                                onChange={(e) => {
                                  const unitsCopy = JSON.parse(JSON.stringify(selectedSubject.units));
                                  unitsCopy[uIdx].title.en = e.target.value;
                                  setSelectedSubject({ ...selectedSubject, units: unitsCopy });
                                }}
                                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 font-bold text-slate-900 text-xs bg-white"
                                placeholder="Unit Title (English)"
                              />
                            </div>

                            <button
                              onClick={() => {
                                const unitsCopy = selectedSubject.units.filter((_, i) => i !== uIdx);
                                setSelectedSubject({ ...selectedSubject, units: unitsCopy, unitsCount: unitsCopy.length });
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete unit"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Chapters inside this unit */}
                          <div className="space-y-3 pl-4 border-l-2 border-cyan-200">
                            {(unit.chapters || []).map((ch, cIdx) => (
                              <div key={ch.id || cIdx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                                    <span className="text-[10px] text-cyan-700 font-mono">Chapter {ch.chapterNumber}:</span>
                                    <input
                                      type="text"
                                      value={ch.title.en}
                                      onChange={(e) => {
                                        const unitsCopy = JSON.parse(JSON.stringify(selectedSubject.units));
                                        unitsCopy[uIdx].chapters[cIdx].title.en = e.target.value;
                                        setSelectedSubject({ ...selectedSubject, units: unitsCopy });
                                      }}
                                      className="px-2 py-1 rounded border border-slate-200 text-xs text-slate-800"
                                      placeholder="Chapter Title"
                                    />
                                  </div>

                                  <button
                                    onClick={() => handleAddTopicToChapter(uIdx, cIdx)}
                                    className="text-cyan-700 hover:text-cyan-800 font-bold text-xs flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add Topic</span>
                                  </button>
                                </div>

                                {/* Topics list under chapter */}
                                <div className="space-y-1.5">
                                  {(ch.topics || []).map((top, tIdx) => (
                                    <div
                                      key={top.id || top.slug || tIdx}
                                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                                    >
                                      <div className="flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="font-semibold text-slate-900">{top.title.en}</span>
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
                                          {top.difficulty}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => {
                                            setActiveEditingTopic(top);
                                            setActiveTab('topicEditor');
                                          }}
                                          className="text-cyan-700 hover:text-cyan-800 font-bold text-[11px] flex items-center gap-1"
                                        >
                                          <Edit className="w-3 h-3" />
                                          <span>Edit Notes</span>
                                        </button>
                                        <button
                                          onClick={() => {
                                            const unitsCopy = JSON.parse(JSON.stringify(selectedSubject.units));
                                            unitsCopy[uIdx].chapters[cIdx].topics = unitsCopy[uIdx].chapters[cIdx].topics.filter(
                                              (_: any, i: number) => i !== tIdx
                                            );
                                            setSelectedSubject({ ...selectedSubject, units: unitsCopy });
                                          }}
                                          className="text-slate-400 hover:text-rose-600 p-1"
                                          title="Remove topic"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BILINGUAL NOTES & TOPIC EDITOR */}
              {activeTab === 'topicEditor' && (
                <div className="space-y-5 text-xs font-sans">
                  {activeEditingTopic ? (
                    <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-700 uppercase tracking-widest font-bold">
                            Topic Notes Editor
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-0.5">
                            {activeEditingTopic.title.en}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveEditingTopic(null)}
                            className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-200 text-xs font-semibold"
                          >
                            Back to List
                          </button>
                          <button
                            onClick={handleSaveActiveTopic}
                            disabled={saving}
                            className="px-4 py-1.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs"
                          >
                            {saving ? 'Saving Notes...' : 'Save Topic Notes'}
                          </button>
                        </div>
                      </div>

                      {/* Title & Metadata */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">Topic Title (English)</label>
                          <input
                            type="text"
                            value={activeEditingTopic.title.en}
                            onChange={(e) =>
                              setActiveEditingTopic({
                                ...activeEditingTopic,
                                title: { ...activeEditingTopic.title, en: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Difficulty Level</label>
                          <select
                            value={activeEditingTopic.difficulty}
                            onChange={(e) =>
                              setActiveEditingTopic({
                                ...activeEditingTopic,
                                difficulty: e.target.value as any,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      {/* Bilingual Notes: English + Hindi/Hinglish */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-600" />
                            <span>English Topic Notes & Mechanics</span>
                          </label>
                          <textarea
                            rows={8}
                            value={activeEditingTopic.contentEn || ''}
                            onChange={(e) =>
                              setActiveEditingTopic({ ...activeEditingTopic, contentEn: e.target.value })
                            }
                            placeholder="Detailed English academic notes, molecular mechanisms, equations, and experimental proofs..."
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white leading-relaxed font-serif text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-600" />
                            <span>Hindi / Hinglish Notes (सरल हिंदी व्याख्या)</span>
                          </label>
                          <textarea
                            rows={8}
                            value={activeEditingTopic.contentHinglish || ''}
                            onChange={(e) =>
                              setActiveEditingTopic({ ...activeEditingTopic, contentHinglish: e.target.value })
                            }
                            placeholder="हिंदी या हिंग्लिश में सरल एवं स्पष्ट व्याख्या, मुख्य परीक्षा बिंदु..."
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white leading-relaxed font-serif text-xs"
                          />
                        </div>
                      </div>

                      {/* Key Examination Points */}
                      <div className="space-y-2 pt-2">
                        <label className="block font-bold text-slate-700">
                          Key Exam Takeaways (One per line)
                        </label>
                        <textarea
                          rows={3}
                          value={(activeEditingTopic.keyPoints || []).join('\n')}
                          onChange={(e) =>
                            setActiveEditingTopic({
                              ...activeEditingTopic,
                              keyPoints: e.target.value.split('\n').filter((l) => l.trim()),
                            })
                          }
                          placeholder="Paste bullet points here, each on a new line..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto text-lg font-bold">
                        ✍️
                      </div>
                      <div className="text-sm font-bold text-slate-800">Select a topic to edit its notes</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Switch to the &quot;Units & Chapters Curriculum&quot; tab above and click &quot;Edit Notes&quot; on any topic to edit its bilingual Hindi/English explanations.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No subject selected</div>
              <p className="text-xs text-slate-400">Select a subject from the left panel to manage its syllabus.</p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT SUBJECT MODAL */}
      {subjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">Add Academic Subject</h2>
              <button
                onClick={() => setSubjectModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalSubject} className="p-6 space-y-4 overflow-y-auto text-xs font-sans">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name (English) *</label>
                <input
                  type="text"
                  required
                  value={editingSubjectData.name?.en || ''}
                  onChange={(e) =>
                    setEditingSubjectData({
                      ...editingSubjectData,
                      name: { en: e.target.value, hinglish: editingSubjectData.name?.hinglish || e.target.value },
                    })
                  }
                  placeholder="e.g. Structural Biology & Biophysics"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">URL Slug (e.g. structural-biology) *</label>
                <input
                  type="text"
                  required
                  value={editingSubjectData.slug || ''}
                  onChange={(e) =>
                    setEditingSubjectData({
                      ...editingSubjectData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
                    })
                  }
                  placeholder="structural-biology"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject Name (Hindi/Hinglish)</label>
                <input
                  type="text"
                  value={editingSubjectData.name?.hinglish || ''}
                  onChange={(e) =>
                    setEditingSubjectData({
                      ...editingSubjectData,
                      name: { en: editingSubjectData.name?.en || '', hinglish: e.target.value },
                    })
                  }
                  placeholder="e.g. Structural Biology (Sanrachnatmak Vigyan)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={editingSubjectData.description?.en || ''}
                  onChange={(e) =>
                    setEditingSubjectData({
                      ...editingSubjectData,
                      description: { en: e.target.value, hinglish: '' },
                    })
                  }
                  placeholder="Concise overview of domains and topics..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSubjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold shadow-xs"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
