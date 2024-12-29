import { Post } from '@/types/post';
import { formatTimeAgo } from '@/lib/utils';
import { MessageCircle, Heart, Image as ImageIcon, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="border-x-0 border-t-0 rounded-none hover:bg-accent/50 transition-colors cursor-pointer">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              {post.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <h2 className="text-lg font-medium mb-2">{post.title}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {post.commentCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {post.likeCount}
            </span>
            {post.hasImage && <ImageIcon className="h-4 w-4" />}
            {post.hasVote && <BarChart2 className="h-4 w-4" />}
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 