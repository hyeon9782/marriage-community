'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import PostCard from '@/components/home/PostCard';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import { Post } from '@/types/post';
import { ActivityTab } from '@/types/activity';
import { generateMockPosts } from '@/lib/utils';

export default function MyActivityPage() {
  const [currentTab, setCurrentTab] = useState<ActivityTab>('작성글');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // 실제 구현 시에는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 임시 데이터 생성
        const mockPosts = generateMockPosts(0, 5).map(post => ({
          ...post,
          author: '사용자', // 현재 사용자로 설정
        }));
        
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentTab]);

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="fixed top-0 w-full md:w-[375px] h-14 border-b bg-background z-50">
        <div className="px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-lg">내 활동</h1>
          </div>
        </div>
      </header>

      {/* 탭 */}
      <div className="fixed top-14 w-full md:w-[375px] bg-background z-40">
        <Tabs
          defaultValue="작성글"
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as ActivityTab)}
          className="w-full"
        >
          <TabsList className="w-full h-12">
            <TabsTrigger value="작성글" className="flex-1">
              작성글
            </TabsTrigger>
            <TabsTrigger value="댓글" className="flex-1">
              댓글
            </TabsTrigger>
            <TabsTrigger value="좋아요" className="flex-1">
              좋아요
            </TabsTrigger>
            <TabsTrigger value="저장" className="flex-1">
              저장
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 본문 */}
      <div className="pt-[106px] p-4">
        {loading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
          <div className="space-y-4 flex flex-col gap-2 mt-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            {currentTab === '작성글' && '작성한 글이 없습니다.'}
            {currentTab === '댓글' && '작성한 댓글이 없습니다.'}
            {currentTab === '좋아요' && '좋아요한 글이 없습니다.'}
            {currentTab === '저장' && '저장한 글이 없습니다.'}
          </div>
        )}
      </div>
    </main>
  );
} 