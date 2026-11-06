import React, { useState, useEffect } from 'react';
import { Users, Shield, Plus, Trash2, Key, History, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export const AdminUsersAuditPage: React.FC = () => {
  const { token, adminUser, hasRole } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New user form state
  const [showAddUser, setShowAddUser] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newRole, setNewRole] = useState<'editor' | 'reviewer' | 'viewer'>('editor');
  const [newPassword, setNewPassword] = useState('');

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [uRes, aRes] = await Promise.all([
        safeFetchJson<any[]>('/api/admin/auth/users'),
        safeFetchJson<any[]>('/api/admin/audit-logs'),
      ]);
      if (uRes.ok && uRes.data) setUsers(uRes.data);
      if (aRes.ok && aRes.data) setAuditLogs(aRes.data);
    } catch (e) {
      console.warn('Failed to load users/audit data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasRole(['superadmin'])) {
      fetchData();
    }
  }, [token]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await safeFetchJson<{ success: boolean; user: any }>('/api/admin/auth/users', {
      method: 'POST',
      body: JSON.stringify({
        email: newEmail,
        fullName: newFullName,
        role: newRole,
        password: newPassword,
      }),
    });

    if (!res.ok) {
      setErrorMsg(res.error || 'Failed to create user.');
      return;
    }

    setSuccessMsg(`Administrator ${newEmail} created successfully.`);
    setShowAddUser(false);
    setNewEmail('');
    setNewFullName('');
    setNewPassword('');
    fetchData();
  };

  const handleDeleteUser = async (id: string, email: string) => {
    if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;
    const res = await safeFetchJson(`/api/admin/auth/users/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setErrorMsg(res.error || 'Failed to delete user.');
      return;
    }

    setSuccessMsg(`User ${email} removed.`);
    fetchData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Roles & Audit Trails</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Role-based access control (Super Admin, Editor, Reviewer, Viewer) and system audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'users' && hasRole(['superadmin']) && (
            <button
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Admin User</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'users' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'audit' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Audit Logs ({auditLogs.length})
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
      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center justify-between">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)}>✕</button>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-base">Add New Admin User</span>
              <button onClick={() => setShowAddUser(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Kumar"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@university.ac.in"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role & Permissions</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="editor">Editor (Create & edit articles, opportunities)</option>
                  <option value="reviewer">Reviewer (Review & verify curriculum)</option>
                  <option value="viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Temporary Initial Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Login</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40">
                  <td className="p-3.5">
                    <div className="font-bold text-white">{u.fullName}</div>
                    <div className="text-[11px] text-cyan-400 font-mono">{u.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-[11px] text-emerald-400">Active</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never logged in'}
                  </td>
                  <td className="p-3.5 text-right">
                    {u.email !== 'charanjaydeep712@gmail.com' && (
                      <button
                        onClick={() => handleDeleteUser(u.id, u.email)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                        title="Remove user"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Resource</th>
                <th className="p-3.5">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-3.5 text-slate-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-3.5 font-bold text-cyan-400">{log.action}</td>
                  <td className="p-3.5 text-slate-300">{log.actorEmail}</td>
                  <td className="p-3.5 text-slate-400">{log.resource}</td>
                  <td className="p-3.5 text-slate-500 text-[11px]">{log.ip || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
