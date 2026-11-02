import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'superadmin' | 'editor' | 'reviewer' | 'viewer';
  lastLoginAt?: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; setupPending?: boolean }>;
  setup: (password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (roles: ('superadmin' | 'editor' | 'reviewer' | 'viewer')[]) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'bioscience_admin_session_token';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = useCallback(async (activeToken: string | null) => {
    if (!activeToken) {
      setAdminUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/admin/auth/me', {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      if (res.ok) {
        const user = await res.json();
        setAdminUser(user);
      } else {
        // Token expired or invalid
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setAdminUser(null);
      }
    } catch (e) {
      console.warn('Failed to verify admin authentication session:', e);
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser(token);
  }, [fetchCurrentUser, token]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; setupPending?: boolean }> => {
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Login failed. Please verify your credentials.',
          setupPending: data.setupPending,
        };
      }

      if (data.token && data.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setAdminUser(data.user);
        return { success: true };
      }

      return { success: false, error: 'Authentication payload was missing required token.' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error during admin login.' };
    }
  };

  const setup = async (password: string, fullName?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'charanjaydeep712@gmail.com',
          password,
          fullName: fullName || 'Super Administrator',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Initial setup failed.' };
      }

      if (data.token && data.user) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setAdminUser(data.user);
        return { success: true };
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Setup network error.' };
    }
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch('/api/admin/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.warn('Logout request warning:', e);
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setAdminUser(null);
  };

  const hasRole = (roles: ('superadmin' | 'editor' | 'reviewer' | 'viewer')[]): boolean => {
    if (!adminUser) return false;
    return roles.includes(adminUser.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        token,
        loading,
        login,
        setup,
        logout,
        refreshUser: () => fetchCurrentUser(token),
        hasRole,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
