
import BlogPostForm from "@/components/forms/BlogPostForm";
import AdminRoute from "@/components/AdminRoute";

export default function CreateBlogPostPage() {
  return (
    <AdminRoute>
      <div className="py-8 px-4">
        <div className="container mx-auto">
          <BlogPostForm />
        </div>
      </div>
    </AdminRoute>
  );
}
