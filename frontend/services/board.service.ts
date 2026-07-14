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

export const updateBoard = async (boardId: string,
  updatedData: {
    name: string;
    description: string;
  }
) => {
  const response = await api.patch(`/boards/${boardId}`, updatedData);
  return response.data.data;
};

export const deleteBoard = async (boardId: string) => {
  await api.delete(`/boards/${boardId}`);
};