
import AnalysisForm from "@/components/forms/AnalysisForm";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreateAnalysisPage() {
  const { session, isAdmin } = useAuth();

  if (!session) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Create Market Analysis</h1>
        <p className="mb-4">Please log in to access this page.</p>
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="py-8 px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-6">
            You need administrator privileges to create market analyses. 
            Please contact an administrator for assistance.
          </p>
          <Button asChild>
            <Link to="/analysis">Back to Analyses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <AnalysisForm />
      </div>
    </div>
  );
}
