
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import BlogPost, { Post } from "@/components/BlogPost";
import { toast } from "sonner";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      // Use the available posts from the main feed
      // This avoids having to create a new endpoint just for individual posts
      const response = await fetch("https://www.smallcapsignal.com/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const posts: Post[] = await response.json();
      const foundPost = posts.find(p => p.id === id);
      
      if (!foundPost) {
        throw new Error("Post not found");
      }
      
      return foundPost;
    }
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load the post. It may have been removed.");
    }
  }, [isError]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading && (
            <div className="border border-gray-800 rounded-lg p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-6" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          )}
          
          {isError && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-maga-red mb-2">
                Post Not Found
              </h2>
              <p className="text-muted-foreground">
                The post you are looking for may have been removed or doesn't exist.
              </p>
            </div>
          )}
          
          {!isLoading && !isError && post && (
            <BlogPost post={post} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
