import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscriberManager from "@/components/SubscriberManager";
import { useBlog } from "@/contexts/BlogContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, AlertCircle, CheckCircle, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Admin = () => {
  const { posts, createPost, deletePost, configStatus } = useBlog();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // Email newsletter states
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content || !author || !apiKey) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await createPost({
        title,
        content,
        author,
        imageUrl: imageUrl || undefined
      }, apiKey);
      
      if (success) {
        toast.success("Post published successfully!");
        setTitle("");
        setContent("");
        setImageUrl("");
        // Keep author and API key for convenience
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!apiKey) {
      toast.error("Please enter your API key to delete posts");
      return;
    }

    setIsDeleting(true);
    try {
      const success = await deletePost(postId, apiKey);
      if (success) {
        setPostToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailSubject || !emailMessage || !apiKey) {
      toast.error("Please fill in all required fields including API key");
      return;
    }
    
    setIsSendingEmail(true);
    
    try {
      const response = await fetch("/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
        setEmailSubject("");
        setEmailMessage("");
      } else {
        toast.error(data.detail || "Failed to send newsletter");
      }
      
    } catch (error) {
      console.error("Error sending newsletter:", error);
      toast.error("Failed to send newsletter. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-8">Admin Portal</h1>
          
          {/* Config Status Alert */}
          {configStatus.loading ? (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Loading Configuration</AlertTitle>
              <AlertDescription>
                Checking server configuration...
              </AlertDescription>
            </Alert>
          ) : configStatus.apiKeyAvailable ? (
            <Alert className="mb-6 border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">Server API Key Available</AlertTitle>
              <AlertDescription>
                Server has API key configured (length: {configStatus.apiKeyLength})
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-6 border-red-500">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertTitle className="text-red-500">Server API Key Missing</AlertTitle>
              <AlertDescription>
                API key not configured on server. Check your environment variables.
              </AlertDescription>
            </Alert>
          )}

          <Card className="bg-secondary border-gray-800 mb-12">
            <CardHeader>
              <CardTitle>API Key Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input 
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Your secret API key"
                  required
                  type="password"
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground">
                  This API key will be used for all admin operations (posts, subscribers, and newsletters)
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-6">
              {/* Create New Post Section */}
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title"
                        required
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input 
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your name"
                        required
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea 
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Post content (HTML supported)"
                        required
                        className="min-h-[200px] bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                      <Input 
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-background"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !apiKey}
                      className="w-full bg-maga-red hover:bg-maga-darkRed"
                    >
                      {isSubmitting ? "Publishing..." : "Publish Post"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Manage Posts Section */}
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle>Manage Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No posts found</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => setPostToDelete(post.id)}
                                    disabled={!apiKey}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the post
                                      titled: "{post.title}"
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(post.id)}
                                      disabled={isDeleting}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      {isDeleting ? "Deleting..." : "Delete"}
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscribers">
              <SubscriberManager apiKey={apiKey} />
            </TabsContent>
            
            <TabsContent value="newsletter" className="space-y-6">
              <Card className="bg-secondary border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Newsletter to Subscribers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendNewsletter} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="emailSubject">Subject</Label>
                      <Input 
                        id="emailSubject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Newsletter subject line"
                        required
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emailMessage">Message</Label>
                      <Textarea 
                        id="emailMessage"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        placeholder="Your newsletter message..."
                        required
                        className="min-h-[300px] bg-background"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSendingEmail || !apiKey}
                      className="w-full bg-maga-red hover:bg-maga-darkRed"
                    >
                      {isSendingEmail ? "Sending Newsletter..." : "Send Newsletter"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
