'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Category = '질문' | '팁/정보' | '견적' | '자유';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState<Category | ''>('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories: Category[] = ['질문', '팁/정보', '견적', '자유'];

  const handleCategorySelect = (selected: Category) => {
    setCategory(selected);
    setDrawerOpen(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) return;
    setSubmitting(true);
    
    try {
      // API 호출 로직
      router.push('/');
    } catch (error) {
      console.error('Failed to submit:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="fixed top-0 w-full md:w-[375px] h-14 border-b bg-background z-50">
        <div className="px-4 h-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="font-medium"
            onClick={handleSubmit}
            disabled={submitting || !title.trim() || !content.trim() || !category}
          >
            등록
          </Button>
        </div>
      </header>

      {/* 본문 */}
      <div className="pt-14">
        <div className="p-4 space-y-4">
          {/* 카테고리 선택 */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <div className="flex items-center justify-between border-b py-3">
                <span className="text-muted-foreground">
                  {category || '카테고리를 선택해주세요.'}
                </span>
                <ChevronLeft className="h-5 w-5 rotate-180 text-muted-foreground" />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <h4 className="font-medium text-center mb-4">
                  카테고리를 선택해주세요.
                </h4>
                <div className="space-y-2">
                  {categories.map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      className="w-full justify-start h-12 text-base"
                      onClick={() => handleCategorySelect(item)}
                    >
                      {item}
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

          {/* 제목 입력 */}
          <div className="border-b">
            <Input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
            />
          </div>

          {/* 내용 입력 */}
          <Textarea
            placeholder="내용을 입력해주세요.

타인에게 불쾌감을 주거나 비방 등 부적절한 게시물은 삭제될 수 있으며, 신고나 의견 커뮤니티 이용이 제한될 수 있어요.

- 복사, 도용, 명예훼손 등 부적절한 내용
- 지나치게 불쾌감을 주는진한 내용
- 기타 플랫폼을 위법하는 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] resize-none border-none placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 w-full md:w-[375px] border-t bg-background">
          <div className="p-4 flex gap-2">
            <Button variant="outline" className="flex-1">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="flex-1">
              투표
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 