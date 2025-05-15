
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <p className="mb-4">Please log in to view your profile.</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
              {user.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.email}</h2>
              <p className="text-muted-foreground">User ID: {user.id.substring(0, 8)}...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
