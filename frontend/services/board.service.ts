import api from "@/lib/axios";


export const getBoardsByWorkspace  = async ( workspaceId: string) => {
  const response = await api.get(`/workspaces/${workspaceId}`);
  return response.data;
};