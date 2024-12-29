import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  }

export function generateMockPosts(start: number, end: number): Post[] {
  const categories: Exclude<Category, '전체'>[] = ['고민', '질문', '자유'];
  
  return Array.from({ length: end - start }, (_, index) => {
    // 더 균등한 분포의 카테고리 생성
    const categoryIndex = (start + index) % categories.length;
    return {
      id: (start + index + 1).toString(),
      category: categories[categoryIndex],
      title: `${categories[categoryIndex]} - 게시글 제목 ${start + index + 1}`,
      content: '...',
      viewCount: Math.floor(Math.random() * 1000),
      commentCount: Math.floor(Math.random() * 50),
      likeCount: Math.floor(Math.random() * 100),
      author: `사용자${start + index + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      hasImage: Math.random() > 0.5,
      hasVote: Math.random() > 0.7,
    };
  });
}