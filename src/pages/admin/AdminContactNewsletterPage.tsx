import React, { useState, useEffect } from 'react';
import { Mail, Download, Trash2, CheckCircle2, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminContactNewsletterPage: React.FC = () => {
  const { token } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'contacts' | 'newsletter'>('contacts');
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cRes, sRes] = await Promise.all([
        fetch('/api/admin/contacts', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/newsletter', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (cRes.ok) setContacts(await cRes.json());
      if (sRes.ok) setSubscribers(await sRes.json());
    } catch (e) {
      console.warn('Failed to load contact/newsletter data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setSuccessMsg(`Status updated to "${status}".`);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!window.confirm('Delete this contact message?')) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSuccessMsg('Submission removed.');
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const downloadCsv = () => {
    window.open(`/api/admin/newsletter/export-csv?auth=${token}`, '_blank');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Contact & Newsletter Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Student and faculty editorial inquiries, spam management, and subscriber list CSV exports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'newsletter' && (
            <button
              onClick={downloadCsv}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export Subscribers CSV</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'contacts' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Inquiries ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'newsletter' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Subscribers ({subscribers.length})
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)}>✕</button>
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
                <th className="p-3.5">Sender</th>
                <th className="p-3.5">Subject & Message</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Submitted</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No contact submissions recorded.
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      <div>{item.name}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">{item.email}</div>
                    </td>
                    <td className="p-3.5 max-w-md">
                      <div className="font-bold text-white">{item.subject}</div>
                      <div className="text-slate-400 text-xs line-clamp-2 mt-0.5">{item.message}</div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-mono text-cyan-300"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="spam">Spam</option>
                      </select>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white inline-block text-[11px]"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={() => deleteSubmission(item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Newsletter Subscribers Tab */}
      {activeTab === 'newsletter' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
                <th className="p-3.5">Subscriber Email</th>
                <th className="p-3.5">Subscribed Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Topic Preferences</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold text-white font-mono">{sub.email}</td>
                  <td className="p-3.5 font-mono text-slate-400">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300">
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">
                    {(sub.preferredCategories || []).join(', ') || 'All Biotechnology Updates'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
