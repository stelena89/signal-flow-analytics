
import BlogPostForm from "@/components/forms/BlogPostForm";
import AdminRoute from "@/components/AdminRoute";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateBlogPostPage() {
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    console.log("CreateBlogPostPage rendered, isAdmin:", isAdmin);
  }, [isAdmin]);

  return (
    <AdminRoute>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
          <BlogPostForm />
        </div>
      </div>
    </AdminRoute>
  );
}
