export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  postId: string;
  parentId?: string;
} 