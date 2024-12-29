'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentInputProps {
  postId: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  isReply?: boolean;
}

export default function CommentInput({ 
  postId, 
  onSubmit, 
  onCancel,
  placeholder = "댓글을 입력하세요",
  isReply = false 
}: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className={isReply ? "space-y-2" : "fixed bottom-0 w-full md:w-[375px] border-t bg-background p-4"}>
      <div className="flex gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="resize-none"
          rows={1}
        />
        <div className="flex flex-col gap-2">
          <Button onClick={handleSubmit} className="shrink-0">
            등록
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" className="shrink-0">
              취소
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 