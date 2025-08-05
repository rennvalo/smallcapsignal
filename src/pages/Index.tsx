
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Calculate pagination
  const displayedPosts = searchResults !== null ? searchResults : posts;
  const totalPages = Math.ceil(displayedPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = displayedPosts.slice(startIndex, endIndex);
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setSearchError("");
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    setSearchError("");
    try {
      const response = await fetch(`https://www.smallcapsignal.com/posts/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setSearchError("Failed to search posts. Please try again later.");
    } finally {
      setSearchLoading(false);
      setCurrentPage(0);
    }
  };

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

          {/* � Search Bar */}
          <form onSubmit={handleSearch} className="mb-8 flex gap-2">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded border border-gray-700 bg-background text-white focus:outline-none focus:border-maga-red"
            />
            <Button type="submit" variant="default">Search</Button>
            {searchTerm && (
              <Button type="button" variant="outline" onClick={() => { setSearchTerm(""); setSearchResults(null); setSearchError(""); }}>
                Clear
              </Button>
            )}
          </form>

          {searchLoading && (
            <div className="text-center py-4">Searching...</div>
          )}
          {searchError && (
            <div className="text-center text-maga-red py-4">{searchError}</div>
          )}

          {/* �🔄 Loading State */}
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
          {!isLoading && !isError && displayedPosts.length === 0 && !searchLoading && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No Posts Found</h2>
              <p className="text-muted-foreground">
                {searchTerm ? "Try a different search term." : "Check back later for updates or be the first to post!"}
              </p>
            </div>
          )}

          {/* ✅ Posts */}
          {!isLoading && !isError && displayedPosts.length > 0 && (
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
