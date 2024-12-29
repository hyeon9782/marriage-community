'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Image as ImageIcon, Vote, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Category, UploadedImage, IVote } from '@/types/post';

export default function WritePage() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Exclude<Category, '전체'> | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [vote, setVote] = useState<IVote | null>(null);

  // 투표 데이터 불러오기
  useEffect(() => {
    const tempVote = localStorage.getItem('tempVote');
    if (tempVote) {
      setVote(JSON.parse(tempVote));
      localStorage.removeItem('tempVote');
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 최대 3개까지만 업로드 가능
    if (images.length + files.length > 3) {
      alert('이미지는 최대 3개까지 업로드할 수 있습니다.');
      return;
    }

    // 파일을 UploadedImage 형태로 변환
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages(prev => [...prev, {
            id: Date.now().toString(),
            url: e.target.result as string,
            file
          }]);
        }
      };
      reader.readAsDataURL(file);
    });

    // input 초기화
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(image => image.id !== id));
  };

  const handleSubmit = async () => {
    if (!category || !title.trim() || !content.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      // 실제 구현 시에는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const tempId = Date.now().toString();
      router.push(`/posts/${tempId}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('게시글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const removeVote = () => {
    setVote(null);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50">
        <div className="max-w-screen-md mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting || !category || !title.trim() || !content.trim()}
          >
            {submitting ? '작성 중...' : '작성하기'}
          </Button>
        </div>
      </header>

      {/* 작성 폼 */}
      <div className="max-w-screen-md mx-auto pt-14 p-4">
        <div className="space-y-4">
          <Select
            value={category}
            onValueChange={(value: Exclude<Category, '전체'>) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="고민">고민</SelectItem>
              <SelectItem value="질문">질문</SelectItem>
              <SelectItem value="자유">자유</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] resize-none"
          />

          {/* 투표 미리보기 */}
          {vote && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">투표</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeVote}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {vote.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-muted rounded-lg"
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 이미지 미리보기 */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map(image => (
                <div key={image.id} className="relative aspect-square">
                  <img
                    src={image.url}
                    alt="업로드 이미지"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={imageInputRef}
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={images.length >= 3}
            >
              <ImageIcon className="h-5 w-5 mr-2" />
              사진
            </Button>
            {!vote && (
              <Link href="/posts/write/vote">
                <Button variant="outline" type="button">
                  <Vote className="h-5 w-5 mr-2" />
                  투표
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 