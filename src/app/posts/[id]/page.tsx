'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types/post';
import { formatTimeAgo } from '@/lib/utils';
import { ChevronLeft, MessageCircle, Heart, Image as ImageIcon, BarChart2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import CommentInput from '@/components/comments/CommentInput';
import CommentItem from '@/components/comments/CommentItem';
import { Comment } from '@/types/comment';

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // 실제 구현 시에는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 임시 데이터
        setPost({
          id: params.id,
          category: '고민',
          title: '결혼식 비용 고민이에요',
          content: '결혼식 비용이 너무 많이 들어서 걱정입니다. 어떻게 하면 좋을까요?',
          viewCount: 120,
          commentCount: 15,
          likeCount: 23,
          author: '예비신부',
          createdAt: new Date(),
          hasImage: true,
          hasVote: false,
        });
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleCommentSubmit = (content: string) => {
    // 실제 구현 시에는 API 호출
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: '사용자',
      createdAt: new Date(),
      postId: params.id,
    };
    
    setComments(prev => [newComment, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50">
        <div className="max-w-screen-md mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* 본문 */}
      <div className="max-w-screen-md mx-auto pt-14 p-4">
        <div className="mb-4">
          <Badge variant="secondary" className="rounded-full mb-2">
            {post.category}
          </Badge>
          <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>

        <div className="border-t border-b py-4 mb-4">
          <p className="text-lg whitespace-pre-wrap">{post.content}</p>
          {post.hasImage && (
            <div className="mt-4">
              <img
                src="https://via.placeholder.com/400x300"
                alt="게시글 이미지"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-5 w-5" />
            <span>{post.likeCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>{post.commentCount}</span>
          </Button>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="max-w-screen-md mx-auto px-4">
        <div className="border-t pt-4">
          <h2 className="text-lg font-bold mb-4">
            댓글 {comments.length}개
          </h2>
          <div className="divide-y">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            {comments.length === 0 && (
              <p className="py-20 text-center text-muted-foreground">
                첫 댓글을 작성해보세요
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 댓글 입력 */}
      <CommentInput postId={params.id} onSubmit={handleCommentSubmit} />
    </main>
  );
} 