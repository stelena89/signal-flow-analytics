
import AnalysisForm from "@/components/forms/AnalysisForm";
import AdminRoute from "@/components/AdminRoute";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateAnalysisPage() {
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    console.log("CreateAnalysisPage rendered, isAdmin:", isAdmin);
  }, [isAdmin]);

  return (
    <AdminRoute>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Market Analysis</h1>
          <AnalysisForm />
        </div>
      </div>
    </AdminRoute>
  );
}
