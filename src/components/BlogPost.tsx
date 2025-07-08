
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Link } from "react-router-dom";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

interface BlogPostProps {
  post: Post;
}

const BlogPost = ({ post }: BlogPostProps) => {
  // Parse the ISO string to a Date object
  const date = parseISO(post.createdAt);
  
  // Get user's timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Format date in user's timezone
  const localDate = new Date(formatInTimeZone(date, userTimeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  
  // Only show "ago" for past dates, not future dates
  const timeAgo = localDate <= new Date() 
    ? formatDistanceToNow(localDate, { addSuffix: true })
    : format(localDate, "MMM d, yyyy 'at' h:mm a");

  return (
    <Card className="mb-8 bg-secondary border-gray-800 hover:border-maga-red transition-all duration-300">
      <CardHeader className="p-6 pb-3">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/post/${post.id}`} className="hover:underline">
            <h2 className="text-2xl font-bold">{post.title}</h2>
          </Link>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.createdAt}>{timeAgo}</time>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-3">
        {post.imageUrl && (
          <div className="mb-4">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto rounded-md"
            />
          </div>
        )}
        <div 
          className="blog-post whitespace-pre-wrap break-words"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </Card>
  );
};

export default BlogPost;
