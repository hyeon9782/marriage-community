export type Category = '전체' | '고민' | '질문' | '자유';

export interface Post {
  id: string;
  category: Exclude<Category, '전체'>;
  title: string;
  content: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  author: string;
  createdAt: Date;
  hasImage: boolean;
  hasVote: boolean;
} 