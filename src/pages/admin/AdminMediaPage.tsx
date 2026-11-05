import React, { useState, useEffect } from 'react';
import { FolderOpen, Upload, Trash2, FileText, Image as ImageIcon, ExternalLink, Copy, Check } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';

export const AdminMediaPage: React.FC = () => {
  const { token } = useAdminAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('documents');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    const res = await safeFetchJson<any[]>('/api/admin/cms/media');
    if (res.ok && res.data) {
      setFiles(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, [token]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', fileList[0]);
    formData.append('category', selectedCategory);
    formData.append('description', description);

    const res = await safeFetchJson<{ success: boolean; file: any }>('/api/admin/cms/media', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      setErrorMsg(res.error || 'File upload failed.');
      setUploading(false);
      return;
    }

    setSuccessMsg(`File "${fileList[0].name}" uploaded successfully.`);
    setDescription('');
    e.target.value = '';
    fetchFiles();
    setUploading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete media file "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/cms/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setSuccessMsg(`File "${name}" removed.`);
        fetchFiles();
      }
    } catch {
      setErrorMsg('Failed to delete file.');
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-serif">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">Media & Resource Library</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Secure asset repository for official exam bulletins, PDFs, laboratory flowcharts, and diagrams.
          </p>
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

      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs font-sans">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Upload New Asset</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Resource Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            >
              <option value="documents">Official Documents / PDFs</option>
              <option value="exam_bulletins">Official Examination Bulletins</option>
              <option value="syllabus">Syllabus PDFs</option>
              <option value="images">Diagrams & Images (JPG, PNG, SVG)</option>
              <option value="other">Other Resources</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 font-semibold mb-1">Asset Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. NTA Official GAT-B 2026 Information Bulletin"
              className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
            />
          </div>
        </div>

        {/* Drag/Drop Input */}
        <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center cursor-pointer transition-colors relative bg-slate-800/40">
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            accept=".pdf,.png,.jpg,.jpeg,.webp,.svg,.txt,.csv"
          />
          <div className="space-y-2 pointer-events-none">
            <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
            <div className="text-white font-bold text-xs">
              {uploading ? 'Uploading and validating file...' : 'Click or drop file to upload to secure media store'}
            </div>
            <div className="text-[11px] text-slate-400">
              Allowed: PDF, PNG, JPG, WEBP, SVG, CSV, TXT (Maximum: 25MB)
            </div>
          </div>
        </div>
      </div>

      {/* Files List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-800 font-mono">
              <th className="p-3.5">Asset</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Size</th>
              <th className="p-3.5">Uploaded By</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 font-sans">
            {files.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  No uploaded files in the media library yet.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white flex items-center gap-2">
                    {file.mimeType.startsWith('image/') ? (
                      <ImageIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                    <div>
                      <div>{file.originalName}</div>
                      {file.description && (
                        <div className="text-[11px] text-slate-400 font-normal">{file.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-cyan-400">{file.category}</td>
                  <td className="p-3.5 font-mono text-slate-400">{formatBytes(file.size)}</td>
                  <td className="p-3.5 text-slate-400">{file.uploadedBy}</td>
                  <td className="p-3.5 font-mono text-slate-400">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => copyUrl(file.id, file.url)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Copy Public Link"
                    >
                      {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white inline-block"
                      title="Open file"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(file.id, file.originalName)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400"
                      title="Delete file"
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
    </div>
  );
};
