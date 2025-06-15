import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, 
  Calendar, 
  Search, 
  Youtube, 
  Filter,
  ChevronRight,
  Clock,
  BarChart
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost, fetchBlogPosts } from "@/services/blogService";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const BlogPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Fetch blog posts from Supabase
  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: fetchBlogPosts,
    enabled: !!user
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading blog posts",
        description: "There was a problem fetching the blog posts. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Extract unique categories for filter
  const uniqueCategories = Array.from(new Set(blogPosts.map(p => p.category)));

  // Filter posts based on search term and filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === null || post.category === categoryFilter;
    
    const matchesType = 
      typeFilter === null || post.type === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trading Education</h1>
            <p className="text-muted-foreground">
              Educational articles, videos, and strategy guides for traders of all levels.
            </p>
          </div>
          {/* Show create button only for logged in users */}
          {user && (
            <Link to="/blog/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Blog Post
              </Button>
            </Link>
          )}
        </div>
        {/* Filters Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, videos, and guides..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Select value={categoryFilter || "all"} onValueChange={(val) => setCategoryFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={typeFilter || "all"} onValueChange={(val) => setTypeFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Content Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Button variant="outline" className="w-full" onClick={() => {
              setSearchTerm("");
              setCategoryFilter(null);
              setTypeFilter(null);
            }}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Posts List */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="latest" className="mb-6">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="beginner">For Beginners</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-muted-foreground">Loading content...</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card 
                    key={post.id} 
                    className="hover-card cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="h-48 bg-accent relative">
                      {post.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Youtube className="h-12 w-12 text-red-500" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          {post.read_time || "5 min read"}
                        </div>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No content found</p>
                <p className="text-muted-foreground text-center mt-2 max-w-md">
                  No articles or videos match your current filters. Try adjusting your search or filter criteria.
                </p>
                <Button variant="link" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter(null);
                  setTypeFilter(null);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Selected Post Preview or Popular Categories */}
            {selectedPost ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{selectedPost.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>By {selectedPost.author}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedPost.type === "video" ? (
                    <div className="aspect-video mb-4">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={selectedPost.video_url || ""} 
                        title={selectedPost.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-md"
                      ></iframe>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-4">{selectedPost.content || selectedPost.excerpt}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedPost.tags && selectedPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Read Full Article
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {uniqueCategories.map((category) => (
                    <Button 
                      key={category} 
                      variant="ghost" 
                      className="w-full justify-between"
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                      <Badge variant="outline" className="ml-2">
                        {blogPosts.filter(p => p.category === category).length}
                      </Badge>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Featured Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Youtube className="h-5 w-5 mr-2 text-red-500" />
                  Featured Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts
                  .filter(post => post.type === "video")
                  .slice(0, 3)
                  .map((video) => (
                    <div key={video.id} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-24 h-16 bg-accent rounded-md relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                          <Youtube className="h-8 w-8 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{video.read_time || "Video"}</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => setTypeFilter("video")}>
                  View All Videos
                </Button>
              </CardFooter>
            </Card>

            {/* Trading Courses */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Premium Trading Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-background p-3 flex gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Smart Money Masterclass</h4>
                      <p className="text-sm text-muted-foreground">Advanced institutional trading tactics</p>
                    </div>
                  </div>
                  
                  <div className="rounded-md bg-background p-3 flex gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Technical Analysis Fundamentals</h4>
                      <p className="text-sm text-muted-foreground">Master chart patterns and indicators</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Browse All Courses
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
