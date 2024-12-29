'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Search as SearchIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import PostCard from '@/components/home/PostCard';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import { Post } from '@/types/post';
import { generateMockPosts } from '@/lib/utils';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 최근 검색어 로드
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 검색 실행
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // 실제 구현 시에는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시 데이터 생성 및 필터링
      const allPosts = generateMockPosts(0, 20);
      const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);

      // 최근 검색어 저장
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(item => item !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

      // URL 업데이트
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.error('Failed to search:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  // 최근 검색어 클릭
  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  // 최근 검색어 삭제
  const removeRecentSearch = (searchQuery: string) => {
    const newRecentSearches = recentSearches.filter(item => item !== searchQuery);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="fixed top-0 w-full md:w-[375px] h-14 border-b bg-background z-50">
        <div className="px-4 h-full flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <Input
              type="search"
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </header>

      {/* 본문 */}
      <div className="pt-14 p-4">
        {/* 최근 검색어 */}
        {!loading && searchResults.length === 0 && (
          <div className="space-y-4">
            <h2 className="font-medium">최근 검색어</h2>
            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((searchQuery) => (
                  <div
                    key={searchQuery}
                    className="flex items-center justify-between py-2"
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => handleRecentSearchClick(searchQuery)}
                    >
                      {searchQuery}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRecentSearch(searchQuery)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">최근 검색어가 없습니다.</p>
            )}
          </div>
        )}

        {/* 검색 결과 */}
        {loading ? (
          <LoadingSpinner />
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            <h2 className="font-medium">검색 결과 {searchResults.length}개</h2>
            <div className="space-y-4">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : query && !loading && (
          <div className="py-20 text-center text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </main>
  );
} 