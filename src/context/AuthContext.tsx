import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Language } from '../types/index.ts';
import { getSupabase, getSupabaseCredentials } from '../services/supabaseClient.ts';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  supabaseConfigured: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, password: string, preferredLanguage: Language) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: (data: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  refreshConnectionStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'bioscience_local_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);

  const refreshConnectionStatus = () => {
    const creds = getSupabaseCredentials();
    setSupabaseConfigured(creds.isConfigured);
  };

  useEffect(() => {
    refreshConnectionStatus();
    const supabase = getSupabase();

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          // Fetch profile from supabase
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile, error }) => {
              if (profile && !error) {
                setUser({
                  id: profile.id,
                  fullName: profile.full_name,
                  email: profile.email,
                  preferredLanguage: profile.preferred_language || 'en',
                  state: profile.state,
                  city: profile.city,
                  educationLevel: profile.education_level,
                  college: profile.college,
                  currentYear: profile.current_year,
                  graduationYear: profile.graduation_year,
                  examGoals: [],
                  learningGoals: [],
                  onboardingCompleted: profile.onboarding_completed ?? false,
                  role: 'student',
                });
              } else {
                // Initialize default profile
                setUser({
                  id: session.user.id,
                  fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Student',
                  email: session.user.email || '',
                  preferredLanguage: 'en',
                  examGoals: [],
                  learningGoals: [],
                  onboardingCompleted: false,
                  role: 'student',
                });
              }
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });
    } else {
      // Local storage mode
      try {
        const stored = localStorage.getItem(LOCAL_USER_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }
      } catch (e) {
        console.warn('Failed to parse local user profile:', e);
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        const loadedUser: UserProfile = {
          id: data.user.id,
          fullName: profile?.full_name || data.user.email?.split('@')[0] || 'Student',
          email: data.user.email || '',
          preferredLanguage: profile?.preferred_language || 'en',
          state: profile?.state,
          city: profile?.city,
          educationLevel: profile?.education_level,
          college: profile?.college,
          currentYear: profile?.current_year,
          graduationYear: profile?.graduation_year,
          examGoals: [],
          learningGoals: [],
          onboardingCompleted: profile?.onboarding_completed ?? false,
          role: (profile?.role as any) || 'student',
        };
        setUser(loadedUser);
        return { success: true };
      }
    }

    // Local mode simulation
    if (email && password) {
      const existingStr = localStorage.getItem(LOCAL_USER_KEY);
      let localProfile: UserProfile;
      if (existingStr) {
        localProfile = JSON.parse(existingStr);
      } else {
        localProfile = {
          id: 'local-student-001',
          fullName: email.split('@')[0] || 'Biotech Scholar',
          email,
          preferredLanguage: 'en',
          examGoals: ['GAT-B', 'CSIR-NET'],
          learningGoals: ['Competitive examination preparation'],
          onboardingCompleted: false,
          role: 'student',
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localProfile));
      }
      setUser(localProfile);
      return { success: true };
    }

    return { success: false, error: 'Please enter a valid email and password' };
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    preferredLanguage: Language
  ): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, preferred_language: preferredLanguage },
        },
      });
      if (error) {
        return { success: false, error: error.message };
      }
      if (data.user) {
        // Create initial row in profiles
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            full_name: fullName,
            email,
            preferred_language: preferredLanguage,
            onboarding_completed: false,
          },
        ]);
        const newUser: UserProfile = {
          id: data.user.id,
          fullName,
          email,
          preferredLanguage,
          examGoals: [],
          learningGoals: [],
          onboardingCompleted: false,
          role: 'student',
        };
        setUser(newUser);
        return { success: true };
      }
    }

    // Local mode registration
    const newLocalUser: UserProfile = {
      id: 'local-usr-' + Date.now(),
      fullName,
      email,
      preferredLanguage,
      examGoals: [],
      learningGoals: [],
      onboardingCompleted: false,
      role: 'student',
    };
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newLocalUser));
    setUser(newLocalUser);
    return { success: true };
  };

  const completeOnboarding = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;

    const updatedUser: UserProfile = {
      ...user,
      ...data,
      onboardingCompleted: true,
    };

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('profiles').update({
        state: updatedUser.state,
        city: updatedUser.city,
        education_level: updatedUser.educationLevel,
        college: updatedUser.college,
        current_year: updatedUser.currentYear,
        graduation_year: updatedUser.graduationYear,
        preferred_language: updatedUser.preferredLanguage,
        onboarding_completed: true,
      }).eq('id', user.id);

      // Save student exam preferences
      if (updatedUser.examGoals?.length) {
        for (const code of updatedUser.examGoals) {
          await supabase.from('student_exam_preferences').upsert({
            user_id: user.id,
            exam_code: code,
          });
        }
      }
    } else {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updatedUser));
    }

    setUser(updatedUser);
    return true;
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    const updated = { ...user, ...data };
    const supabase = getSupabase();
    if (supabase) {
      await supabase.from('profiles').update({
        full_name: updated.fullName,
        state: updated.state,
        city: updated.city,
        education_level: updated.educationLevel,
        college: updated.college,
        current_year: updated.currentYear,
        graduation_year: updated.graduationYear,
        preferred_language: updated.preferredLanguage,
      }).eq('id', user.id);
    } else {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    }
    setUser(updated);
    return true;
  };

  const logout = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        supabaseConfigured,
        login,
        register,
        logout,
        completeOnboarding,
        updateProfile,
        refreshConnectionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
