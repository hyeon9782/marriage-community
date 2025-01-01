'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PostCard from '@/components/home/PostCard';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import { Post } from '@/types/post';
import { generateMockPosts } from '@/lib/utils';
import { cn } from '@/lib/utils';
import ActivityPostCard from '@/components/my/ActivityPostCard';

type ActivityTab = '작성한 글' | '좋아요한 글' | '북마크한 글' | '댓글단 글';

export default function MyActivityPage() {
  const [currentTab, setCurrentTab] = useState<ActivityTab>('작성한 글');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs: ActivityTab[] = ['작성한 글', '좋아요한 글', '북마크한 글', '댓글단 글'];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockPosts = generateMockPosts(0, 5).map(post => ({
          ...post,
          author: '사용자',
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
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-lg absolute left-1/2 -translate-x-1/2">
            내 활동
          </h1>
          <div className="w-10" /> {/* 중앙 정렬을 위한 여백 */}
        </div>
      </header>

      {/* 탭 */}
      <div className="fixed top-14 w-full md:w-[375px] bg-background z-40 border-b">
        <div className="">
          <div className="flex whitespace-nowrap px-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={cn(
                  "py-3 px-2 mr-4 relative text-sm",
                  "text-muted-foreground hover:text-foreground transition-colors",
                  currentTab === tab && "text-foreground font-medium",
                  currentTab === tab && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="pt-[106px] px-4">
        {loading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
          <div className="divide-y">
            {posts.map((post) => (
              <ActivityPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-muted-foreground">
            {currentTab === '작성한 글' && '작성한 글이 없습니다.'}
            {currentTab === '좋아요한 글' && '좋아요한 글이 없습니다.'}
            {currentTab === '북마크한 글' && '북마크한 글이 없습니다.'}
            {currentTab === '댓글단 글' && '댓글단 글이 없습니다.'}
          </div>
        )}
      </div>
    </main>
  );
} 