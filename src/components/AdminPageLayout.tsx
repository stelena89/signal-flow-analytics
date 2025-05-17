
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface AdminPageLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminPageLayout = ({ children, title }: AdminPageLayoutProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Only perform redirects after auth state is fully loaded
    if (!isLoading) {
      if (!user) {
        console.log("No user, redirecting to login");
        toast({
          title: "Authentication required",
          description: "Please log in to access admin functions",
          variant: "destructive",
        });
        navigate("/login");
      } else if (!isAdmin) {
        console.log("User is not admin, redirecting to home");
        toast({
          title: "Unauthorized",
          description: "Admin privileges required",
          variant: "destructive",
        });
        navigate("/");
      } else {
        // Mark auth as checked when user is admin
        setAuthChecked(true);
      }
    }
  }, [user, isAdmin, isLoading, navigate]);

  // Show loading state while checking auth
  if (isLoading || (!authChecked && (user && !isAdmin))) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  // Only render admin content when auth is checked and user is admin
  if (!authChecked) {
    return null;
  }

  // Render the admin content
  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AdminPageLayout;
