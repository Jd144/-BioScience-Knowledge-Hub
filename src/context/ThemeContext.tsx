/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Theme Context (Light, Dark, System Default)
 * Provides persistent theme control for both Public Site and Admin Panel.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  // Public website theme
  theme: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  setTheme: (mode: ThemeMode) => void;

  // Admin panel theme
  adminTheme: ThemeMode;
  effectiveAdminTheme: 'light' | 'dark';
  setAdminTheme: (mode: ThemeMode) => void;

  // Settings Modal / Panel visibility
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PUBLIC_THEME_KEY = 'bioscience_hub_public_theme';
const ADMIN_THEME_KEY = 'bioscience_hub_admin_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(PUBLIC_THEME_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // fallback
    }
    return 'light'; // Default clean light mode
  });

  const [adminTheme, setAdminThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_THEME_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // fallback
    }
    return 'light'; // Clean white default for Admin Panel
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Monitor system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem(PUBLIC_THEME_KEY, mode);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  };

  const setAdminTheme = (mode: ThemeMode) => {
    setAdminThemeState(mode);
    try {
      localStorage.setItem(ADMIN_THEME_KEY, mode);
    } catch (e) {
      console.warn('Could not save admin theme preference:', e);
    }
  };

  const effectiveTheme: 'light' | 'dark' =
    theme === 'system' ? (systemIsDark ? 'dark' : 'light') : theme;

  const effectiveAdminTheme: 'light' | 'dark' =
    adminTheme === 'system' ? (systemIsDark ? 'dark' : 'light') : adminTheme;

  // Apply dark class to document root based on current route
  useEffect(() => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const isDark = isAdminRoute ? effectiveAdminTheme === 'dark' : effectiveTheme === 'dark';

    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [effectiveTheme, effectiveAdminTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        effectiveTheme,
        setTheme,
        adminTheme,
        effectiveAdminTheme,
        setAdminTheme,
        isSettingsOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
