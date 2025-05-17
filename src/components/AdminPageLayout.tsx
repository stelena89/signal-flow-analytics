
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminPageLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminPageLayout = ({ children, title }: AdminPageLayoutProps) => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      console.log("No user, redirecting to login");
      navigate("/login");
    } else if (!isLoading && user && !isAdmin) {
      console.log("User is not admin, redirecting to home");
      navigate("/");
    }
  }, [user, isAdmin, isLoading, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-muted"></div>
          <div className="h-4 w-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  // Don't render anything while checking admin status
  if (!isAdmin) {
    return null;
  }

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
