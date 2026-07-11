import api from "@/lib/axios";
import type {Comment, TaskCommentsData, CreateCommentData} from "@/types/comment";

export const getTaskComments = async (taskId: string) => {
  const response = await api.get(`/tasks/${taskId}/comments`);
  return response.data.data as TaskCommentsData;
};

export const createComment = async (taskId: string, data: CreateCommentData) => {
  const response = await api.post(`/tasks/${taskId}/comments`, data);
  return response.data.data as Comment;
};

export const deleteComment = async (commentId: string) => {
  await api.delete(`/comments/${commentId}`);
};