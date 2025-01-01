import { Post } from '@/types/post';
import { formatTimeAgo } from '@/lib/utils';
import { Heart, MessageCircle, EyeIcon } from 'lucide-react';
import Link from 'next/link';

interface ActivityPostCardProps {
  post: Post;
}

export default function ActivityPostCard({ post }: ActivityPostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex items-center justify-between py-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium mb-1 truncate">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{post.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentCount}</span>
            </div>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
          <EyeIcon className="h-4 w-4" />
          <span>{post.viewCount}+</span>
        </div>
      </div>
    </Link>
  );
} 