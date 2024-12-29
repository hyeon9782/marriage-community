'use client';

import { useState } from 'react';
import { formatTimeAgo } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Comment } from '@/types/comment';
import CommentInput from './CommentInput';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CommentItemProps {
  comment: Comment;
  currentUser?: string;
  onReplySubmit: (content: string, parentId: string) => void;
  replies?: Comment[];
}

interface ReplyItemProps {
  reply: Comment;
  currentUser?: string;
  onAction: (action: string) => void;
}

function ReplyItem({ reply, currentUser = '사용자', onAction }: ReplyItemProps) {
  const [open, setOpen] = useState(false);
  const isMyReply = reply.author === currentUser;

  const handleAction = (action: string) => {
    onAction(action);
    setOpen(false);
  };

  const actions = isMyReply
    ? ['수정하기', '삭제하기']
    : ['신고하기', '차단하기'];

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{reply.author}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatTimeAgo(reply.createdAt)}</span>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <h4 className="font-medium text-center mb-4">
                  {isMyReply ? '답글 관리' : '답글 메뉴'}
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
      </div>
      <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
    </div>
  );
}

export default function CommentItem({ 
  comment, 
  currentUser = '사용자',
  onReplySubmit,
  replies = []
}: CommentItemProps) {
  const [open, setOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const isMyComment = comment.author === currentUser;

  const handleAction = (action: string) => {
    switch (action) {
      case '답글달기':
        setIsReplying(true);
        break;
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
    }
    setOpen(false);
  };

  const handleReplySubmit = (content: string) => {
    onReplySubmit(content, comment.id);
    setIsReplying(false);
  };

  const handleReplyAction = (action: string) => {
    switch (action) {
      case '수정하기':
        // 답글 수정 로직
        break;
      case '삭제하기':
        // 답글 삭제 로직
        break;
      case '신고하기':
        // 답글 신고 로직
        break;
      case '차단하기':
        // 답글 차단 로직
        break;
    }
  };

  const actions = isMyComment
    ? ['답글달기', '수정하기', '삭제하기']
    : ['답글달기', '신고하기', '차단하기'];

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{comment.author}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatTimeAgo(comment.createdAt)}</span>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <h4 className="font-medium text-center mb-4">
                  {isMyComment ? '댓글 관리' : '댓글 메뉴'}
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
      </div>
      <p className="text-sm whitespace-pre-wrap">{comment.content}</p>

      {/* 답글 목록 */}
      {replies.length > 0 && (
        <div className="ml-8 mt-4 space-y-4 border-l-2 pl-4">
          {replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              currentUser={currentUser}
              onAction={handleReplyAction}
            />
          ))}
        </div>
      )}

      {/* 답글 입력 */}
      {isReplying && (
        <div className="ml-8 mt-4 border-l-2 pl-4">
          <CommentInput
            postId={comment.postId}
            onSubmit={handleReplySubmit}
            onCancel={() => setIsReplying(false)}
            placeholder="답글을 입력하세요"
            isReply
          />
        </div>
      )}
    </div>
  );
} 