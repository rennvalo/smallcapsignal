
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { useQuery } from "@tanstack/react-query";

const ProtectedAdminRoute = () => {
  const [searchParams] = useSearchParams();
  const urlKey = searchParams.get("key");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Fetch server config to check if the provided key matches
  const { data: configData, isLoading } = useQuery({
    queryKey: ["serverConfig"],
    queryFn: async () => {
      const response = await fetch("https://www.magasignal.com/config");
      if (!response.ok) {
        throw new Error("Failed to fetch server config");
      }
      return response.json();
    }
  });

  useEffect(() => {
    if (configData && urlKey) {
      // Verify the key by making a test request with the key
      const verifyKey = async () => {
        try {
          console.log("Attempting to verify key:", urlKey);
          const response = await fetch("https://www.magasignal.com/verify-key", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${urlKey}`
            },
          });
          
          console.log("Key verification response:", response.status);
          setIsAuthorized(response.ok);
        } catch (error) {
          console.error("Key verification failed:", error);
          setIsAuthorized(false);
        }
      };
      
      verifyKey();
    } else if (!isLoading && configData) {
      // If we have config data but no key, not authorized
      console.log("No key provided but config loaded. Setting unauthorized.");
      setIsAuthorized(false);
    }
  }, [configData, urlKey, isLoading]);

  // Debug output to help track the state
  console.log("Auth state:", { isLoading, configData, isAuthorized, urlKey });

  if (isLoading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maga-red mx-auto"></div>
          <p className="mt-4 text-lg">Verifying access...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? <Admin /> : <NotFound />;
};

export default ProtectedAdminRoute;
