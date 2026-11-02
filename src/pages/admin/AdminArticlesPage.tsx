import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  Save,
  X,
  History,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export const AdminArticlesPage: React.FC = () => {
  const { token, adminUser } = useAdminAuth();

  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [viewingHistory, setViewingHistory] = useState<any | null>(null);

  const [changeNote, setChangeNote] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/cms/articles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setArticles(json);
      }
    } catch (e) {
      console.warn('Failed to load articles:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedArticle) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    const isNew = isCreating;
    const url = isNew ? '/api/admin/cms/articles' : `/api/admin/cms/articles/${selectedArticle.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...selectedArticle, changeNote }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save article.');

      setSuccessMsg(isNew ? 'New article created.' : 'Article updated and revision logged.');
      setIsCreating(false);
      setSelectedArticle(null);
      setChangeNote('');
      fetchArticles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/cms/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSuccessMsg(`Article "${title}" deleted.`);
        fetchArticles();
      }
    } catch {
      setErrorMsg('Failed to delete article.');
    }
  };

  const openNewForm = () => {
    setIsCreating(true);
    setSelectedArticle({
      title: '',
      subjectSlug: 'cell-biology',
      topicSlug: '',
      summary: '',
      content: '<h2>Introduction</h2><p>Provide evidence-based scientific overview...</p>',
      status: 'draft',
      sourceUrl: '',
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Articles & Literature CMS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Peer-reviewed curriculum articles with revision histories, source verification, and publication workflows.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
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

      {/* Editor Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-5 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {isCreating ? 'Create New Scientific Article' : 'Edit Article & Revision'}
              </h2>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  setIsCreating(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={selectedArticle.title}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Subject</label>
                  <select
                    value={selectedArticle.subjectSlug}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, subjectSlug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="cell-biology">Cell Biology</option>
                    <option value="molecular-biology">Molecular Biology</option>
                    <option value="biochemistry">Biochemistry</option>
                    <option value="genetics">Genetics</option>
                    <option value="microbiology">Microbiology</option>
                    <option value="immunology">Immunology</option>
                    <option value="recombinant-dna-technology">Recombinant DNA Technology</option>
                    <option value="bioprocess-engineering">Bioprocess Engineering</option>
                    <option value="bioinformatics">Bioinformatics</option>
                    <option value="plant-biotechnology">Plant Biotechnology</option>
                    <option value="animal-biotechnology">Animal Biotechnology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Publication Status</label>
                  <select
                    value={selectedArticle.status}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Authoritative Source URL / DOI</label>
                <input
                  type="url"
                  value={selectedArticle.sourceUrl || ''}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, sourceUrl: e.target.value })}
                  placeholder="https://doi.org/10.1126/science..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  value={selectedArticle.summary || ''}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Content (HTML / Markdown)</label>
                <textarea
                  rows={8}
                  required
                  value={selectedArticle.content || ''}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono leading-relaxed"
                />
              </div>

              {!isCreating && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Revision Change Note</label>
                  <input
                    type="text"
                    value={changeNote}
                    onChange={(e) => setChangeNote(e.target.value)}
                    placeholder="e.g. Updated kinetic parameters for Cas9 PAM binding"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
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
                  <span>Save Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revision History Viewer Dialog */}
      {viewingHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-bold text-white text-sm">Revision History for {viewingHistory.title}</span>
              <button onClick={() => setViewingHistory(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {viewingHistory.revisions?.length > 0 ? (
                viewingHistory.revisions.map((rev: any, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-cyan-400">
                      <span>Edited by: {rev.editedBy}</span>
                      <span>{new Date(rev.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-slate-300">Note: {rev.changeNote}</div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-4">No revisions logged yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
              <th className="p-3.5">Title</th>
              <th className="p-3.5">Subject</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Verified By</th>
              <th className="p-3.5">Updated</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-3.5 font-bold text-white max-w-sm line-clamp-1">{art.title}</td>
                <td className="p-3.5 font-mono text-cyan-400">{art.subjectSlug}</td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    art.status === 'published' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {art.status}
                  </span>
                </td>
                <td className="p-3.5 text-slate-400">{art.verifiedBy || 'Editorial'}</td>
                <td className="p-3.5 font-mono text-slate-400">{new Date(art.updatedAt).toLocaleDateString()}</td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => setViewingHistory(art)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                    title="View Revision History"
                  >
                    <History className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArticle({ ...art });
                      setIsCreating(false);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(art.id, art.title)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
