import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

interface Subscriber {
  email: string;
  subscribed_at: string;
}

interface SubscriberManagerProps {
  apiKey: string;
}

const SubscriberManager = ({ apiKey }: SubscriberManagerProps) => {
  const [newEmail, setNewEmail] = useState("");
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch subscribers
  const { data: subscribers = [], isLoading, error } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const response = await fetch("https://www.magasignal.com/subscribers");
      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }
      return response.json();
    }
  });

  // Add subscriber mutation
  const addSubscriberMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("https://www.magasignal.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error("Failed to add subscriber");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      setNewEmail("");
      toast.success("Subscriber added successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to add subscriber: ${error.message}`);
    }
  });

  // Delete subscriber mutation
  const deleteSubscriberMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!apiKey) {
        throw new Error("API key is required");
      }
      const response = await fetch(`https://www.magasignal.com/subscribers/${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscribers"] });
      setSubscriberToDelete(null);
      toast.success("Subscriber deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete subscriber: ${error.message}`);
    }
  });

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error("Please enter an email address");
      return;
    }
    addSubscriberMutation.mutate(newEmail);
  };

  const handleDeleteSubscriber = (email: string) => {
    if (!apiKey) {
      toast.error("Please enter your API key in the main admin form to delete subscribers");
      return;
    }
    deleteSubscriberMutation.mutate(email);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-secondary border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Subscriber Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Subscriber Form */}
          <form onSubmit={handleAddSubscriber} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newEmail">Add New Subscriber</Label>
              <div className="flex gap-2">
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-background flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={addSubscriberMutation.isPending}
                  className="bg-maga-red hover:bg-maga-darkRed"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {addSubscriberMutation.isPending ? "Adding..." : "Add"}
                </Button>
              </div>
            </div>
          </form>

          {!apiKey && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800 text-sm">
                Enter your API key in the main admin form below to enable subscriber deletion.
              </p>
            </div>
          )}

          {/* Subscribers Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Current Subscribers ({subscribers.length})</h3>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-maga-red mx-auto"></div>
                <p className="mt-2">Loading subscribers...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>Error loading subscribers: {error.message}</p>
              </div>
            ) : subscribers.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No subscribers found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscribed At</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber: Subscriber) => (
                    <TableRow key={subscriber.email}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>{new Date(subscriber.subscribed_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => setSubscriberToDelete(subscriber.email)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the subscriber
                                with email: "{subscriber.email}"
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteSubscriber(subscriber.email)}
                                disabled={deleteSubscriberMutation.isPending}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {deleteSubscriberMutation.isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriberManager;
