
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignalForm from "@/components/forms/SignalForm";
import { fetchSignalById, updateSignal } from "@/services/signalService";
import AdminPageLayout from "@/components/AdminPageLayout";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function EditSignalPage() {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const signal = await fetchSignalById(id);
      if (!signal) {
        toast({ title: "Could not load signal", variant: "destructive" });
        navigate("/signals");
        return;
      }
      setInitialData(signal);
      setLoading(false);
    }
    load();
  }, [id, navigate]);

  if (!user || !isAdmin) return null;

  return (
    <AdminPageLayout title="Edit Signal">
      {loading || !initialData ? (
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      ) : (
        <SignalForm
          defaultValues={initialData}
          onSubmit={async (values) => {
            const result = await updateSignal(id!, values);
            if (result) {
              toast({ title: "Signal updated" });
              navigate("/signals");
            }
          }}
          submitLabel="Update Signal"
        />
      )}
    </AdminPageLayout>
  );
}
