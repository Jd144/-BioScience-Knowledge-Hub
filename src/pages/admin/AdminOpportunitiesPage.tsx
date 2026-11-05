import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Edit2,
  Trash2,
  Save,
  X,
  Building,
  MapPin,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export const AdminOpportunitiesPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchOpportunities = async () => {
    setLoading(true);
    const res = await safeFetchJson<any[]>('/api/admin/cms/opportunities');
    if (res.ok && res.data) {
      setOpportunities(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const isNew = isCreating;
    const url = isNew
      ? '/api/admin/cms/opportunities'
      : `/api/admin/cms/opportunities/${editingItem.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const res = await safeFetchJson<{ success: boolean; opportunity: any }>(url, {
      method,
      body: JSON.stringify(editingItem),
    });

    if (!res.ok) {
      setErrorMsg(res.error || 'Failed to save opportunity.');
      return;
    }

    setSuccessMsg(isNew ? 'New opportunity added.' : 'Opportunity updated.');
    setIsCreating(false);
    setEditingItem(null);
    fetchOpportunities();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/cms/opportunities/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSuccessMsg(`Deleted "${title}".`);
        fetchOpportunities();
      }
    } catch (e) {
      setErrorMsg('Failed to delete opportunity.');
    }
  };

  const openNewForm = () => {
    setIsCreating(true);
    setEditingItem({
      type: 'job',
      title: '',
      organization: '',
      description: '',
      eligibility: '',
      qualification: '',
      location: 'All India',
      stipendOrSalary: '',
      openingDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      officialNotificationUrl: '',
      applicationUrl: '',
      sourceUrl: '',
      verificationStatus: 'verified',
      publicationStatus: 'published',
    });
  };

  // Filtered list
  const filtered = opportunities.filter((opp) => {
    if (filterType !== 'all' && opp.type !== filterType) return false;
    if (filterStatus === 'active' && opp.isExpired) return false;
    if (filterStatus === 'expired' && !opp.isExpired) return false;
    if (filterStatus === 'unverified' && opp.verificationStatus === 'verified') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Opportunities CMS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Jobs, Fellowships, Admissions & Internships with zero fabricated data and automated deadline expiration.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Opportunity</span>
        </button>
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

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-sans"
          >
            <option value="all">All Categories</option>
            <option value="job">Jobs</option>
            <option value="internship">Internships</option>
            <option value="fellowship">Fellowships</option>
            <option value="scholarship">Scholarships</option>
            <option value="admission">Admissions</option>
            <option value="research">Research Opportunities</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-sans"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active & Open</option>
            <option value="expired">Expired Deadlines</option>
            <option value="unverified">Unverified Only</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, institute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
          />
        </div>
      </div>

      {/* Opportunity Creation / Edit Modal Dialog */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {isCreating ? 'Create Verified Opportunity' : 'Edit Opportunity Details'}
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Opportunity Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="job">Job / Project Post</option>
                    <option value="internship">Summer Internship</option>
                    <option value="fellowship">Junior / Senior Fellowship</option>
                    <option value="scholarship">Scholarship</option>
                    <option value="admission">Admissions / Ph.D.</option>
                    <option value="research">Research Proposal Call</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="e.g. Faridabad / Pan-India"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Junior Research Fellow (JRF) - Structural Biology"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Issuing Institute / Organization</label>
                <input
                  type="text"
                  required
                  value={editingItem.organization}
                  onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                  placeholder="e.g. Regional Centre for Biotechnology (RCB)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Scope</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Brief summary of research scope, sponsored funding agency..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={editingItem.eligibility}
                    onChange={(e) => setEditingItem({ ...editingItem, eligibility: e.target.value })}
                    placeholder="e.g. M.Sc. with CSIR-NET or GATE"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Stipend / Salary</label>
                  <input
                    type="text"
                    value={editingItem.stipendOrSalary || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, stipendOrSalary: e.target.value })}
                    placeholder="e.g. ₹37,000 + HRA (Only if official)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Application Deadline (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={editingItem.deadline}
                    onChange={(e) => setEditingItem({ ...editingItem, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Notification URL</label>
                  <input
                    type="url"
                    required
                    value={editingItem.officialNotificationUrl}
                    onChange={(e) => setEditingItem({ ...editingItem, officialNotificationUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Verification Status</label>
                  <select
                    value={editingItem.verificationStatus}
                    onChange={(e) => setEditingItem({ ...editingItem, verificationStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="verified">Verified against official gazette</option>
                    <option value="unverified">Unverified (Pending confirmation)</option>
                    <option value="pending_review">Under Editorial Review</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Publication Status</label>
                  <select
                    value={editingItem.publicationStatus}
                    onChange={(e) => setEditingItem({ ...editingItem, publicationStatus: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Internal only)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Opportunity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Opportunities List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Title & Organization</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Deadline</th>
                <th className="p-3.5">Verification</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No matching opportunities found.
                  </td>
                </tr>
              ) : (
                filtered.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                        {opp.type}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-white max-w-sm line-clamp-1">{opp.title}</div>
                      <div className="text-slate-400 text-[11px]">{opp.organization}</div>
                    </td>
                    <td className="p-3.5 text-slate-400">{opp.location}</td>
                    <td className="p-3.5 font-mono">
                      <div className={opp.isExpired ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                        {opp.deadline}
                      </div>
                      {opp.isExpired && (
                        <span className="text-[10px] text-rose-400 font-semibold block">Expired</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {opp.verificationStatus === 'verified' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          opp.publicationStatus === 'published'
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {opp.publicationStatus}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingItem({ ...opp });
                          setIsCreating(false);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white"
                        title="Edit Opportunity"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(opp.id, opp.title)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={opp.officialNotificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white inline-block"
                        title="View Official Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
