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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function PostDetail({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentUser = '사용자'; // 실제 구현 시에는 인증 상태에서 가져옴

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
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: '사용자',
      createdAt: new Date(),
      postId: params.id,
    };
    
    setComments(prev => [newComment, ...prev]);
  };

  const handleReplySubmit = (content: string, parentId: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      content,
      author: '사용자',
      createdAt: new Date(),
      postId: params.id,
      parentId,
    };
    
    setComments(prev => [newReply, ...prev]);
  };

  // 댓글과 답글을 구분하여 정리
  const organizedComments = comments.reduce((acc, comment) => {
    if (!comment.parentId) {
      const replies = comments.filter(reply => reply.parentId === comment.id);
      acc.push({ ...comment, replies });
    }
    return acc;
  }, [] as (Comment & { replies: Comment[] })[]);

  const handleAction = (action: string) => {
    switch (action) {
      case '수정하기':
        // 수정 로직
        break;
      case '삭제하기':
        // 삭제 로직
        break;
      case '신고하기':
        // 신고 로직
        break;
      case '차단하기':
        // 차단 로직
        break;
      case '답글달기':
        // 답글 로직
        break;
    }
    setDrawerOpen(false);
  };

  const isMyPost = post?.author === currentUser;
  const actions = isMyPost
    ? ['답글달기', '수정하기', '삭제하기']
    : ['답글달기', '신고하기', '차단하기'];

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
      <header className="fixed top-0 w-full md:w-[375px] h-14 border-b bg-background z-50">
        <div className="px-4 h-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          {post && (
            <span className="font-medium absolute left-1/2 -translate-x-1/2">
              {post.category}
            </span>
          )}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <h4 className="font-medium text-center mb-4">
                  {isMyPost ? '게시글 관리' : '게시글 메뉴'}
                </h4>
                <div className="space-y-2">
                  {actions.map((action) => (
                    <Button
                      key={action}
                      variant="ghost"
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                  >
                    취소
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
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
            {organizedComments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment}
                replies={comment.replies}
                onReplySubmit={handleReplySubmit}
              />
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