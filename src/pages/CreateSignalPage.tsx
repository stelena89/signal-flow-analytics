
import SignalForm from "@/components/forms/SignalForm";
import AdminPageLayout from "@/components/AdminPageLayout";

export default function CreateSignalPage() {
  return (
    <AdminPageLayout title="Create New Trading Signal">
      <SignalForm />
    </AdminPageLayout>
  );
}
