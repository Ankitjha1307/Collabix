import api from "@/lib/axios";
import { BoardTasksData, CreateTaskData, Task } from "@/types/task";

export const getBoardTasks  = async ( boardId: string) => {
  const response = await api.get(`/tasks/board/${boardId}`);
  return response.data.data as BoardTasksData;
};

export const createTask   = async ( boardId: string, taskData: CreateTaskData) => {
  const response = await api.post(`/tasks/board/${boardId}`, taskData);
  return response.data.data as Task;
};