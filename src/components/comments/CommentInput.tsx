'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentInputProps {
  postId: string;
  onSubmit: (content: string) => void;
}

export default function CommentInput({ postId, onSubmit }: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
      <div className="max-w-screen-md mx-auto flex gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="resize-none"
          rows={1}
        />
        <Button onClick={handleSubmit} className="shrink-0">
          등록
        </Button>
      </div>
    </div>
  );
} 