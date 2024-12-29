'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { VoteItem } from '@/types/post';

export default function CreateVotePage() {
  const router = useRouter();
  const [items, setItems] = useState<VoteItem[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);

  const addItem = () => {
    if (items.length >= 5) return;
    setItems([...items, { id: Date.now().toString(), text: '' }]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 2) return;
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, text: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, text } : item
    ));
  };

  const handleSubmit = () => {
    if (items.some(item => !item.text.trim())) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // localStorage를 통해 임시로 데이터 전달
    // 실제 구현 시에는 상태 관리 라이브러리 사용 권장
    localStorage.setItem('tempVote', JSON.stringify({ items }));
    router.back();
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background z-50">
        <div className="max-w-screen-md mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/posts/write">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button onClick={handleSubmit}>
            완료
          </Button>
        </div>
      </header>

      <div className="max-w-screen-md mx-auto pt-14 p-4">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-2">
              <Input
                placeholder={`항목 ${items.indexOf(item) + 1}`}
                value={item.text}
                onChange={(e) => updateItem(item.id, e.target.value)}
              />
              {items.length > 2 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {items.length < 5 && (
            <Button
              variant="outline"
              className="w-full"
              onClick={addItem}
            >
              <Plus className="h-4 w-4 mr-2" />
              항목 추가
            </Button>
          )}
        </div>
      </div>
    </main>
  );
} 