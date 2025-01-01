'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/layout/Header';
import PostCard from '@/components/home/PostCard';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import { Category, Post } from '@/types/post';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMockPosts } from '@/lib/utils';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const POSTS_PER_PAGE = 10;

const categories: Category[] = ['전체', '인기', '질문', '팁/정보', '견적', '자유'];

export default function Home() {
  const [category, setCategory] = useState<Category>('전체');
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // 마지막 포스트 요소에 대한 참조 콜백
  const lastPostRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  // 카테고리 변경 시 초기화
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const start = (page - 1) * POSTS_PER_PAGE;
        const newPosts = generateMockPosts(start, start + POSTS_PER_PAGE).filter(
          post => category === '전체' || post.category === category
        );
        
        setPosts(prev => [...prev, ...newPosts]);
        setHasMore(newPosts.length === POSTS_PER_PAGE && page < 10);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, category]);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 카테고리 탭 */}
      <div className="fixed top-14 w-full md:w-[375px] bg-background z-40 border-b">
        <div className="">
          <div className="flex whitespace-nowrap px-4">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={cn(
                  "py-3 px-2 mr-4 relative",
                  "text-muted-foreground hover:text-foreground transition-colors",
                  category === item && "text-foreground font-medium",
                  category === item && "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="pt-[106px] px-4">
        <div className="space-y-4">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div key={post.id} ref={lastPostRef}>
                  <PostCard post={post} />
                </div>
              );
            }
            return <PostCard key={post.id} post={post} />;
          })}
          {loading && <LoadingSpinner />}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8 text-muted-foreground">
              더 이상 게시글이 없습니다
            </div>
          )}
        </div>
      </div>

      {/* 글쓰기 버튼 */}
      <Link href="/posts/write">
        <Button 
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          style={{ 
            right: typeof window !== 'undefined' && window.innerWidth >= 768 
              ? 'calc(50% - 375px/2 + 16px)' 
              : '16px'
          }}
          aria-label="글쓰기"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </main>
  );
}
