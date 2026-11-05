/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Admin Popup & Announcement Manager
 * Professional clean white interface for configuring public website announcements.
 */

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  Palette,
  X
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

interface PopupButton {
  id: string;
  label: string;
  url: string;
  color: string;
  style: 'solid' | 'outline' | 'ghost';
  openInNewTab: boolean;
  enabled: boolean;
}

interface WebsitePopup {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  position: 'center_modal' | 'toast_bottom_right' | 'toast_bottom_left' | 'top_banner' | 'bottom_banner';
  size: 'small' | 'medium' | 'large' | 'full';
  borderRadius: 'none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  startDateTime?: string;
  expiryDateTime?: string;
  displayDuration: number;
  frequency: 'once_per_session' | 'once_per_visitor' | 'every_page';
  enabled: boolean;
  showCancelButton: boolean;
  cancelButtonText?: string;
  buttons: PopupButton[];
  createdAt: string;
  updatedAt: string;
}

export const AdminPopupsPage: React.FC = () => {
  const { token, adminUser } = useAdminAuth();
  const [popups, setPopups] = useState<WebsitePopup[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<WebsitePopup | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const defaultFormState: Omit<WebsitePopup, 'id' | 'createdAt' | 'updatedAt'> = {
    title: '',
    message: '',
    imageUrl: '',
    bgColor: '#ffffff',
    textColor: '#0f172a',
    position: 'center_modal',
    size: 'medium',
    borderRadius: 'rounded-2xl',
    startDateTime: '',
    expiryDateTime: '',
    displayDuration: 0,
    frequency: 'once_per_session',
    enabled: true,
    showCancelButton: true,
    cancelButtonText: 'Dismiss',
    buttons: [
      {
        id: 'btn-1',
        label: 'Learn More',
        url: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        color: '#0284c7',
        style: 'solid',
        openInNewTab: true,
        enabled: true,
      },
    ],
  };

  const [formData, setFormData] = useState(defaultFormState);

  const fetchPopups = async () => {
    setLoading(true);
    const res = await safeFetchJson<WebsitePopup[]>('/api/admin/popups');
    if (res.ok && res.data) {
      setPopups(res.data);
    } else {
      setStatusMessage({ text: res.error || 'Failed to load popups', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPopups();
  }, [token]);

  const handleOpenCreate = () => {
    setEditingPopup(null);
    setFormData(defaultFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (popup: WebsitePopup) => {
    setEditingPopup(popup);
    setFormData({
      title: popup.title,
      message: popup.message,
      imageUrl: popup.imageUrl || '',
      bgColor: popup.bgColor || '#ffffff',
      textColor: popup.textColor || '#0f172a',
      position: popup.position,
      size: popup.size,
      borderRadius: popup.borderRadius,
      startDateTime: popup.startDateTime ? popup.startDateTime.substring(0, 16) : '',
      expiryDateTime: popup.expiryDateTime ? popup.expiryDateTime.substring(0, 16) : '',
      displayDuration: popup.displayDuration || 0,
      frequency: popup.frequency,
      enabled: popup.enabled,
      showCancelButton: popup.showCancelButton,
      cancelButtonText: popup.cancelButtonText || 'Dismiss',
      buttons: popup.buttons || [],
    });
    setModalOpen(true);
  };

  const handleToggle = async (id: string) => {
    const res = await safeFetchJson<{ success: boolean; enabled: boolean }>(`/api/admin/popups/${id}/toggle`, {
      method: 'POST',
    });
    if (res.ok && res.data) {
      setPopups((prev) =>
        prev.map((p) => (p.id === id ? { ...p, enabled: res.data!.enabled } : p))
      );
      setStatusMessage({ text: `Popup ${res.data.enabled ? 'enabled' : 'disabled'} successfully.`, type: 'success' });
    } else {
      setStatusMessage({ text: res.error || 'Error toggling popup status', type: 'error' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    const res = await safeFetchJson(`/api/admin/popups/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setPopups((prev) => prev.filter((p) => p.id !== id));
      setStatusMessage({ text: 'Popup deleted successfully.', type: 'success' });
    } else {
      setStatusMessage({ text: res.error || 'Error deleting popup', type: 'error' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.message.trim()) {
      alert('Please provide both Title and Message.');
      return;
    }

    const url = editingPopup
      ? `/api/admin/popups/${editingPopup.id}`
      : '/api/admin/popups';
    const method = editingPopup ? 'PUT' : 'POST';

    const payload = {
      ...formData,
      startDateTime: formData.startDateTime ? new Date(formData.startDateTime).toISOString() : undefined,
      expiryDateTime: formData.expiryDateTime ? new Date(formData.expiryDateTime).toISOString() : undefined,
    };

    const res = await safeFetchJson<{ success: boolean; popup: WebsitePopup }>(url, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatusMessage({
        text: `Popup ${editingPopup ? 'updated' : 'created'} successfully!`,
        type: 'success',
      });
      setModalOpen(false);
      fetchPopups();
    } else {
      alert(res.error || 'Failed to save popup.');
    }
  };

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      buttons: [
        ...prev.buttons,
        {
          id: `btn-${Date.now()}`,
          label: 'Open Action',
          url: 'https://',
          color: '#0284c7',
          style: 'solid',
          openInNewTab: true,
          enabled: true,
        },
      ],
    }));
  };

  const updateButton = (index: number, updates: Partial<PopupButton>) => {
    setFormData((prev) => {
      const copy = [...prev.buttons];
      copy[index] = { ...copy[index], ...updates };
      return { ...prev, buttons: copy };
    });
  };

  const removeButton = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-cyan-600" />
            <span>Popup & Announcement Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, schedule, customize, and deploy temporary alert banners and popups on BioScience Hub.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Popup Announcement</span>
        </button>
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

      {/* Popups Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            All Website Popups ({popups.length})
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Active popups render automatically on public pages
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading popups...</div>
        ) : popups.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto text-xl font-bold">
              📢
            </div>
            <div className="text-sm font-bold text-slate-800">No popups configured yet</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click &quot;New Popup Announcement&quot; to configure your first modal or banner for students and visitors.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title & Preview</th>
                  <th className="px-4 py-3 font-semibold">Position & Format</th>
                  <th className="px-4 py-3 font-semibold">Duration / Freq</th>
                  <th className="px-4 py-3 font-semibold">Schedule</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-serif">
                {popups.map((p) => {
                  const isScheduled = p.startDateTime || p.expiryDateTime;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{p.title}</div>
                        <div className="text-slate-500 text-[11px] line-clamp-1 max-w-xs">{p.message}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="inline-block w-3.5 h-3.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: p.bgColor }}
                            title={`Background: ${p.bgColor}`}
                          />
                          <span className="text-[10px] text-slate-400">
                            {p.buttons?.length || 0} CTA button(s)
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="capitalize font-semibold text-slate-800">
                          {p.position.replace('_', ' ')}
                        </span>
                        <div className="text-[10px] text-slate-400">Size: {p.size}</div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div>{p.displayDuration > 0 ? `${p.displayDuration}s auto-close` : 'Manual close'}</div>
                        <span className="text-[10px] text-slate-400 capitalize">
                          {p.frequency.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-[11px]">
                        {isScheduled ? (
                          <div className="space-y-0.5">
                            {p.startDateTime && (
                              <div className="text-slate-600">Start: {new Date(p.startDateTime).toLocaleDateString()}</div>
                            )}
                            {p.expiryDateTime && (
                              <div className="text-slate-500">End: {new Date(p.expiryDateTime).toLocaleDateString()}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">Immediate</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <button
                          onClick={() => handleToggle(p.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                            p.enabled
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {p.enabled ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{p.enabled ? 'Active' : 'Disabled'}</span>
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-slate-500 hover:text-cyan-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-3xl my-8 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {editingPopup ? 'Edit Announcement Popup' : 'Create New Website Announcement'}
                </h2>
                <p className="text-xs text-slate-500">Configure visual style, positioning, buttons, and display policies.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {/* 1. Basic Content */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-1">1. Announcement Content</h3>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Popup Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. BioScience Mastery Mock Test Series Live Now!"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detailed announcement text for visitors..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Banner Image URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              {/* 2. Style & Colors */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-1">2. Visual Style & Palette</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.bgColor}
                        onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                        className="w-9 h-9 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.bgColor}
                        onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.textColor}
                        onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                        className="w-9 h-9 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.textColor}
                        onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Position</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value="center_modal">Center Modal</option>
                      <option value="toast_bottom_right">Toast (Bottom Right)</option>
                      <option value="toast_bottom_left">Toast (Bottom Left)</option>
                      <option value="top_banner">Top Fixed Banner</option>
                      <option value="bottom_banner">Bottom Fixed Banner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Popup Width</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value="small">Small (Compact)</option>
                      <option value="medium">Medium (Standard)</option>
                      <option value="large">Large (Expanded)</option>
                      <option value="full">Full Width</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Border Radius</label>
                    <select
                      value={formData.borderRadius}
                      onChange={(e) => setFormData({ ...formData, borderRadius: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value="rounded-2xl">Rounded 2XL (Modern)</option>
                      <option value="rounded-xl">Rounded XL</option>
                      <option value="rounded-lg">Rounded LG</option>
                      <option value="none">Sharp / None</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Display Duration & Scheduling */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b pb-1">3. Display & Frequency Rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Display Duration</label>
                    <select
                      value={formData.displayDuration}
                      onChange={(e) => setFormData({ ...formData, displayDuration: parseInt(e.target.value, 10) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value={0}>Manual Close Only (Until user dismisses)</option>
                      <option value={5}>5 Seconds (Auto-close)</option>
                      <option value={10}>10 Seconds (Auto-close)</option>
                      <option value={15}>15 Seconds (Auto-close)</option>
                      <option value={30}>30 Seconds (Auto-close)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Frequency Rule</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value="once_per_session">Once Per Session (Recommended)</option>
                      <option value="once_per_visitor">Once Per Visitor (Permanent)</option>
                      <option value="every_page">On Every Page Load</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Initial Status</label>
                    <select
                      value={formData.enabled ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, enabled: e.target.value === 'true' })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white"
                    >
                      <option value="true">Active Immediately</option>
                      <option value="false">Disabled / Draft</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Schedule Start Time (Optional)</label>
                    <input
                      type="datetime-local"
                      value={formData.startDateTime}
                      onChange={(e) => setFormData({ ...formData, startDateTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Auto Expiry Time (Optional)</label>
                    <input
                      type="datetime-local"
                      value={formData.expiryDateTime}
                      onChange={(e) => setFormData({ ...formData, expiryDateTime: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Action Buttons & Links */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-1">
                  <h3 className="font-bold text-slate-800 text-sm">4. Action Buttons (CTA)</h3>
                  <button
                    type="button"
                    onClick={addButton}
                    className="text-cyan-700 hover:text-cyan-800 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Button</span>
                  </button>
                </div>

                {formData.buttons.map((btn, idx) => (
                  <div key={btn.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-700">Button #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeButton(idx)}
                        className="text-rose-500 hover:text-rose-700"
                        title="Remove button"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-0.5">Button Label</label>
                        <input
                          type="text"
                          value={btn.label}
                          onChange={(e) => updateButton(idx, { label: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-600 mb-0.5">Destination URL</label>
                        <input
                          type="url"
                          value={btn.url}
                          onChange={(e) => updateButton(idx, { url: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-0.5">Button Color</label>
                        <input
                          type="color"
                          value={btn.color}
                          onChange={(e) => updateButton(idx, { color: e.target.value })}
                          className="w-full h-8 p-0.5 rounded-lg border border-slate-300 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-600 mb-0.5">Button Style</label>
                        <select
                          value={btn.style}
                          onChange={(e) => updateButton(idx, { style: e.target.value as any })}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white"
                        >
                          <option value="solid">Solid Fill</option>
                          <option value="outline">Outlined Border</option>
                          <option value="ghost">Ghost / Text</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={btn.openInNewTab}
                            onChange={(e) => updateButton(idx, { openInNewTab: e.target.checked })}
                            className="rounded border-slate-300 text-cyan-600"
                          />
                          <span className="text-slate-700">Open in New Tab</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showCancelButton}
                      onChange={(e) => setFormData({ ...formData, showCancelButton: e.target.checked })}
                      className="rounded border-slate-300 text-cyan-600"
                    />
                    <span className="font-semibold text-slate-700">Include Dismiss / Cancel Button</span>
                  </label>
                  {formData.showCancelButton && (
                    <input
                      type="text"
                      value={formData.cancelButtonText}
                      onChange={(e) => setFormData({ ...formData, cancelButtonText: e.target.value })}
                      placeholder="Button text (e.g. Dismiss)"
                      className="px-2.5 py-1 rounded-lg border border-slate-300 text-slate-900 w-32"
                    />
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold shadow-xs transition-colors"
                >
                  {editingPopup ? 'Save Changes' : 'Publish Popup'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
