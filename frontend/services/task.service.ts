import api from "@/lib/axios";
import { BoardTasksData } from "@/types/task";

export const getBoardTasks  = async ( boardId: string) => {
  const response = await api.get(`/tasks/board/${boardId}`);
  return response.data.data as BoardTasksData;
};