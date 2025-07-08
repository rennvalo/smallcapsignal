import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Post } from "@/components/BlogPost";

interface BlogContextType {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (post: Omit<Post, 'id' | 'createdAt'>, apiKey: string) => Promise<boolean>;
  deletePost: (postId: string, apiKey: string) => Promise<boolean>;
  configStatus: {
    loading: boolean;
    apiKeyAvailable: boolean;
    apiKeyLength: number;
  };
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: React.ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [configStatus, setConfigStatus] = useState({
    loading: true,
    apiKeyAvailable: false,
    apiKeyLength: 0
  });
  
  //const API_URL = "http://localhost:8000/posts";
  const API_URL = "https://www.smallcapsignal.com/posts";
  const CONFIG_URL = "https://www.smallcapsignal.com/config";
  
  // Helper function to format API key consistently
  const formatApiKey = (key: string): string => {
    return key.startsWith("Bearer ") ? key : `Bearer ${key}`;
  };
  
  // Fetch configuration from the server
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(CONFIG_URL);
        if (!response.ok) throw new Error('Failed to fetch config');
        const data = await response.json();
        console.log("Server config:", data);
        setConfigStatus({
          loading: false,
          apiKeyAvailable: data.apiKeyAvailable,
          apiKeyLength: data.apiKeyLength
        });
      } catch (error) {
        console.error("Error fetching config:", error);
        setConfigStatus({
          loading: false,
          apiKeyAvailable: false,
          apiKeyLength: 0
        });
      }
    };
    
    fetchConfig();
  }, []);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    setIsError(false);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsError(true);
      setIsLoading(false);
      toast.error("Failed to load posts. Please try again later.");
    }
  };
  
  const createPost = async (
    post: Omit<Post, 'id' | 'createdAt'>, 
    apiKey: string
  ): Promise<boolean> => {
    try {
      console.log("Creating post with API key provided:", !!apiKey);
      
      // Format the API key consistently
      const formattedKey = formatApiKey(apiKey.trim());
      console.log("Authorization header:", formattedKey.substring(0, 8) + "...");
      
      // Additional debugging
      console.log("API key length:", apiKey.length);
      console.log("Formatted key length:", formattedKey.length);
      console.log("Server reports API key length:", configStatus.apiKeyLength);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": formattedKey
        },
        body: JSON.stringify(post)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error" }));
        console.error("Error response:", response.status, errorData);
        if (response.status === 401) {
          toast.error("Authentication failed: Invalid API key");
        } else {
          toast.error(errorData.detail || "Failed to create post");
        }
        return false;
      }
      
      const newPost = await response.json();
      setPosts(prev => [newPost, ...prev]);
      toast.success("Post created successfully!");
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please check your API key and try again.");
      return false;
    }
  };
  
  const deletePost = async (
    postId: string,
    apiKey: string
  ): Promise<boolean> => {
    try {
      console.log("Deleting post with API key provided:", !!apiKey);
      
      // Format the API key consistently
      const formattedKey = formatApiKey(apiKey.trim());
      console.log("Authorization header:", formattedKey.substring(0, 8) + "...");
      
      // Additional debugging
      console.log("API key length:", apiKey.length);
      console.log("Formatted key length:", formattedKey.length);
      console.log("Server reports API key length:", configStatus.apiKeyLength);
      
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": formattedKey
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error" }));
        console.error("Delete error response:", response.status, errorData);
        if (response.status === 401) {
          toast.error("Authentication failed: Invalid API key");
        } else if (response.status === 404) {
          toast.error("Post not found");
        } else {
          toast.error(errorData.detail || "Failed to delete post");
        }
        return false;
      }
      
      // Remove the post from state
      setPosts(prev => prev.filter(post => post.id !== postId));
      toast.success("Post deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post. Please check your API key and try again.");
      return false;
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const value = {
    posts,
    isLoading,
    isError,
    fetchPosts,
    createPost,
    deletePost,
    configStatus
  };
  
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
