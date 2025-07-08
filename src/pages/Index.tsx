
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";
import { useBlog } from "@/contexts/BlogContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const { posts, isLoading, isError } = useBlog();
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 2;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">Latest Updates</h1>

          {/* 🔄 Loading State */}
          {isLoading && (
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="border border-gray-800 rounded-lg p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/4 mb-6" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ⚠️ Error State */}
          {isError && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-maga-red mb-2">
                Error Loading Posts
              </h2>
              <p className="text-muted-foreground">
                There was a problem loading the latest updates. Please try again later.
              </p>
            </div>
          )}

          {/* 🚫 Empty State */}
          {!isLoading && !isError && posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
              <p className="text-muted-foreground">
                Check back later for updates or be the first to post!
              </p>
            </div>
          )}

          {/* ✅ Posts */}
          {!isLoading && !isError && posts.length > 0 && (
            <div>
              <div className="space-y-8">
                {currentPosts.map((post) => (
                  <BlogPost key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
