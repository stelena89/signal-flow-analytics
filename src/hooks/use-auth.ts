
import { useAuth } from "@/contexts/AuthContext";

export const useSignIn = () => {
  const { signIn, isLoading } = useAuth();
  return { signIn, isLoading };
};

export const useSignUp = () => {
  const { signUp, isLoading } = useAuth();
  return { signUp, isLoading };
};

export const useSignOut = () => {
  const { signOut } = useAuth();
  return signOut;
};

export const useProfile = () => {
  const { user, updateProfile } = useAuth();
  return { user, updateProfile };
};

export const useAuthStatus = () => {
  const { user, isLoading, session } = useAuth();
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
    session
  };
};
