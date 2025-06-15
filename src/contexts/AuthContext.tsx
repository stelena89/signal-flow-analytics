import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile?: (data: any) => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
      
      if (error) {
        console.error("Error checking user role:", error);
        setIsAdmin(false);
        return;
      }
      
      // Explicitly check if data exists and has is_admin property that is true
      setIsAdmin(!!data?.is_admin);
      console.log("Admin status:", !!data?.is_admin);
    } catch (error) {
      console.error("Error checking user role:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Check for admin status
          await checkUserRole(currentSession.user.id);
        } else {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Setup auth state change handler
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      console.log("Auth state changed:", _event, newSession?.user?.id);
      
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        await checkUserRole(newSession.user.id);
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    });

    getCurrentUser();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || "Error signing in");
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      console.log("[signUp] Called with:", email, password, fullName);
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });
      if (error) {
        console.error("[signUp] Supabase error:", error);
        throw new Error(error.message || "Error signing up");
      }
    } catch (error: any) {
      console.error("[signUp] Caught error:", error);
      throw new Error(error.message || "Error signing up");
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      throw new Error(error.message || "Error signing out");
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
    } catch (error: any) {
      throw new Error(error.message || "Error updating profile");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      signIn, 
      signUp,
      signOut, 
      updateProfile,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
