import { Post } from '@/types/post';
import { formatTimeAgo } from '@/lib/utils';
import { MessageCircle, Heart, EyeIcon } from 'lucide-react';
import Link from 'next/link';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="py-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-muted" /> {/* 프로필 이미지 */}
          <div>
            <div className="font-medium">{post.author}</div>
            <div className="text-sm text-muted-foreground">
              {post.category}
            </div>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-1">{post.title}</h3>
        <p className="text-muted-foreground mb-3 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">{post.content}</p>
        <div className='flex justify-between text-sm text-muted-foreground'>

        <div className="flex items-center gap-3 ">
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
        <div className='flex items-center gap-1'>
            <EyeIcon className='h-4 w-4' />
            <span>{post.viewCount}</span>
        </div>
        </div>
      </div>
    </Link>
  );
} 