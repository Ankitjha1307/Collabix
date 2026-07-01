import api from "@/lib/axios";

export const getUserWorkspaces = async() => {
    const response = await api.get("/workspaces");
    return response.data;
};

export const createWorkspace = async(name: string) => {
    const response = await api.post("/workspaces", { name });
    return response.data;
};

export const getWorkspaceById = async ( workspaceId: string) => {
  const response = await api.get(`/workspaces/${workspaceId}`);
  return response.data;
};