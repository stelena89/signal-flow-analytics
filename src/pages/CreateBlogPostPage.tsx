
import BlogPostForm from "@/components/forms/BlogPostForm";
import AdminPageLayout from "@/components/AdminPageLayout";

export default function CreateBlogPostPage() {
  return (
    <AdminPageLayout title="Create New Blog Post">
      <BlogPostForm />
    </AdminPageLayout>
  );
}
