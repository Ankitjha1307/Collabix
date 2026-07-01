import api from "@/lib/axios";


export const getBoardsByWorkspace  = async ( workspaceId: string) => {
  const response = await api.get(`/boards/workspace/${workspaceId}`);
  return response.data;
};