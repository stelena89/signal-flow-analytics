
import BlogPostForm from "@/components/forms/BlogPostForm";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function CreateBlogPostPage() {
  const { session } = useAuth();

  if (!session) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Create Blog Post</h1>
        <p className="mb-4">Please log in to create blog posts.</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <BlogPostForm />
      </div>
    </div>
  );
}
