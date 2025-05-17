
import AnalysisForm from "@/components/forms/AnalysisForm";
import AdminPageLayout from "@/components/AdminPageLayout";

export default function CreateAnalysisPage() {
  return (
    <AdminPageLayout title="Create New Market Analysis">
      <AnalysisForm />
    </AdminPageLayout>
  );
}
