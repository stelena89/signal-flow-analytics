
import AnalysisForm from "@/components/forms/AnalysisForm";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function CreateAnalysisPage() {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Create Market Analysis</h1>
        <p className="mb-4">Please log in to create market analysis.</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
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
