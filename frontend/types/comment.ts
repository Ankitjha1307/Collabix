export interface CommentUser {
  _id: string;
  username: string;
  name: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: CommentUser;
  mentions: CommentUser[];
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