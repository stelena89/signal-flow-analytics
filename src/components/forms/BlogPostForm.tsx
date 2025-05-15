
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createBlogPost } from "@/services/blogService";
import { toast } from "@/components/ui/use-toast";

const categories = [
  "Technical Analysis",
  "Fundamental Analysis",
  "Trading Psychology",
  "Risk Management",
  "Cryptocurrency",
  "Forex",
  "Stocks",
  "Market Updates"
];

type BlogPostFormValues = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  type: string;
  video_url?: string;
  read_time?: string;
  tags: string;
};

export default function BlogPostForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contentType, setContentType] = useState<string>("article");

  const form = useForm<BlogPostFormValues>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "Technical Analysis",
      type: "article",
      video_url: "",
      read_time: "5 min read",
      tags: "",
    },
  });

  const onSubmit = async (data: BlogPostFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a blog post",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert tags string to array
      const tagsArray = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      const blogData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        type: data.type,
        video_url: data.type === "video" ? data.video_url : null,
        read_time: data.type === "article" ? data.read_time : null,
        tags: tagsArray,
        author: user.email || "Anonymous",
        user_id: user.id,
        date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        image: null, // Add the missing field
      };

      const result = await createBlogPost(blogData);
      
      if (result) {
        toast({
          title: "Blog Post Created",
          description: "Your blog post has been successfully created",
        });
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
      toast({
        title: "Error",
        description: "There was an error creating your blog post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentTypeChange = (value: string) => {
    setContentType(value);
    form.setValue("type", value);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create Blog Post</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleContentTypeChange(value);
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="A brief introduction to your post" 
                    className="h-20"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  A short summary that will be displayed in the blog list
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {contentType === "article" && (
            <>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your full blog post content..." 
                        className="h-60"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="read_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Read Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 5 min read" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {contentType === "video" && (
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input placeholder="YouTube or Vimeo embed URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="trading, technical, forex (comma separated)" {...field} />
                </FormControl>
                <FormDescription>
                  Separate tags with commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate("/blog")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
