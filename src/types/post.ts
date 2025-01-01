export type Category = '전체'| '인기'| '질문'| '팁/정보'| '견적'| '자유'

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

export interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

export interface VoteItem {
  id: string;
  text: string;
}

export interface IVote {
  items: VoteItem[];
} 