
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;

export const fetchBlogPosts = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    toast({
      title: "Error fetching blog posts",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }

  return data as BlogPost[];
};

export const fetchBlogPostById = async (id: string) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    toast({
      title: "Error fetching blog post",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data as BlogPost;
};

export const fetchBlogPostsByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    toast({
      title: "Error fetching blog posts",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }

  return data as BlogPost[];
};

export const createBlogPost = async (blogPost: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([blogPost])
    .select()
    .single();

  if (error) {
    toast({
      title: "Error creating blog post",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Blog post created",
    description: "Your blog post has been successfully created.",
  });

  return data as BlogPost;
};

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    toast({
      title: "Error updating blog post",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Blog post updated",
    description: "Your blog post has been successfully updated.",
  });

  return data as BlogPost;
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    toast({
      title: "Error deleting blog post",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }

  toast({
    title: "Blog post deleted",
    description: "Your blog post has been successfully deleted.",
  });

  return true;
};
