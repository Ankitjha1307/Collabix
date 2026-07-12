import type { User } from "./user";

export interface Comment {
  _id: string;
  content: string;
  author: User;
  mentions: User[];
  taskId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCommentsData {
  comments: Comment[];
  pagination: {
    totalComments: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export interface CreateCommentData {
  content: string;
  mentions?: string[];
}