
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogPostForm from "@/components/forms/BlogPostForm";
import { fetchBlogPostById, updateBlogPost } from "@/services/blogService";
import AdminPageLayout from "@/components/AdminPageLayout";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    async function load() {
      if (!id) return;
      setLoading(true);
      const blogPost = await fetchBlogPostById(id);
      if (!blogPost) {
        toast({ title: "Could not load blog post", variant: "destructive" });
        navigate("/blog");
        return;
      }
      // Convert tags: string[] -> string
      setInitialData({
        ...blogPost,
        tags: Array.isArray(blogPost.tags) ? blogPost.tags.join(", ") : "",
      });
      setLoading(false);
    }
    load();
  }, [id, navigate]);

  if (!user || !isAdmin) return null;

  return (
    <AdminPageLayout title="Edit Blog Post">
      {loading || !initialData ? (
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      ) : (
        <BlogPostForm
          defaultValues={initialData}
          onSubmit={async (values) => {
            // Convert tags string to array before saving
            const updates = {
              ...values,
              tags: values.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== ""),
            };
            const result = await updateBlogPost(id!, updates);
            if (result) {
              toast({ title: "Blog post updated" });
              navigate("/blog");
            }
          }}
          submitLabel="Update Blog Post"
        />
      )}
    </AdminPageLayout>
  );
}
