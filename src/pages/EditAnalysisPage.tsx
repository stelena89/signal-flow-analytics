
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AnalysisForm from "@/components/forms/AnalysisForm";
import { fetchAnalysisById, updateAnalysis } from "@/services/analysisService";
import AdminPageLayout from "@/components/AdminPageLayout";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function EditAnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const analysis = await fetchAnalysisById(id);
      if (!analysis) {
        toast({ title: "Could not load analysis", variant: "destructive" });
        navigate("/analysis");
        return;
      }
      setInitialData(analysis);
      setLoading(false);
    }
    load();
  }, [id, navigate]);

  if (!user || !isAdmin) return null;

  return (
    <AdminPageLayout title="Edit Analysis">
      {loading || !initialData ? (
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      ) : (
        <AnalysisForm
          defaultValues={initialData}
          onSubmit={async (values) => {
            const result = await updateAnalysis(id!, values);
            if (result) {
              toast({ title: "Analysis updated" });
              navigate("/analysis");
            }
          }}
          submitLabel="Update Analysis"
        />
      )}
    </AdminPageLayout>
  );
}
