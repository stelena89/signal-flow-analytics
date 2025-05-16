
import SignalForm from "@/components/forms/SignalForm";
import AdminRoute from "@/components/AdminRoute";

export default function CreateSignalPage() {
  return (
    <AdminRoute>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <SignalForm />
        </div>
      </div>
    </AdminRoute>
  );
}
