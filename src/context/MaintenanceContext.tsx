import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface MaintenanceData {
  enabled: boolean;
  title: string;
  message_en: string;
  message_hi: string;
  personal_message_en: string;
  personal_message_hi: string;
  expected_reopening_iso: string;
  timezone: string;
  mini_games?: {
    memory_match: boolean;
    number_puzzle: boolean;
    quick_math: boolean;
    word_scramble: boolean;
  };
  server_time_iso: string;
}

interface MaintenanceContextType {
  data: MaintenanceData | null;
  loading: boolean;
  isMaintenanceActive: boolean;
  refresh: () => Promise<void>;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export const MaintenanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MaintenanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/maintenance/status');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.warn('Failed to fetch maintenance status:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    // Poll maintenance status every 15 seconds
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Maintenance is active if enabled (or in preview mode) and the user is NOT on an admin route
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isAdminRoute = currentPath.startsWith('/admin');
  const isMaintenanceActive = !isAdminRoute && (Boolean(data?.enabled) || previewMode);

  return (
    <MaintenanceContext.Provider
      value={{
        data,
        loading,
        isMaintenanceActive,
        refresh: fetchStatus,
        previewMode,
        setPreviewMode,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = (): MaintenanceContextType => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};
