
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BarChart2, Signal as SignalIcon, Plus } from "lucide-react";
import AdminPageLayout from "@/components/AdminPageLayout";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <AdminPageLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> 
              Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create and manage blog posts for your audience.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleNavigate("/blog/create")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> New Blog Post
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" /> 
              Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Share market insights and technical analysis with your users.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleNavigate("/analysis/create")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> New Analysis
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <SignalIcon className="h-5 w-5" /> 
              Trading Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Publish trading signals and opportunities to subscribers.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleNavigate("/signals/create")}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> New Signal
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminPageLayout>
  );
}
