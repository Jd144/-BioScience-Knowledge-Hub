import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { ShieldAlert } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  allowedRoles?: ('superadmin' | 'editor' | 'reviewer' | 'viewer')[];
}

export const AdminProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const { adminUser, loading, hasRole } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-mono">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs text-slate-400">Verifying Administrator Session...</span>
      </div>
    );
  }

  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-mono">
        <div className="max-w-md w-full bg-slate-800 border border-rose-500/40 rounded-2xl p-6 text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-white">Access Restricted</h2>
          <p className="text-xs text-slate-400">
            Your role (<strong className="text-cyan-400 uppercase">{adminUser.role}</strong>) does not have sufficient permissions to access this admin module. Required roles: {allowedRoles.join(', ')}.
          </p>
          <a
            href="/admin"
            className="inline-block px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
