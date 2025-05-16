
import AnalysisForm from "@/components/forms/AnalysisForm";
import AdminRoute from "@/components/AdminRoute";

export default function CreateAnalysisPage() {
  return (
    <AdminRoute>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <AnalysisForm />
        </div>
      </div>
    </AdminRoute>
  );
}
