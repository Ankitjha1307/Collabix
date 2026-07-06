import api from "@/lib/axios";

export const getBoardsByWorkspace  = async ( workspaceId: string) => {
  const response = await api.get(`/boards/workspace/${workspaceId}`);
  return response.data;
};

export const createBoard = async(workspaceId: string, name: string, description: string) => {
    const response = await api.post(`/boards/workspace/${workspaceId}/`, { name, description });
    return response.data;
};

export const getBoardById = async(boardId: string) => {
  const response = await api.get(`/boards/${boardId}`);
  return response.data;
};  