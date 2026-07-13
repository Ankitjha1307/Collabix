import api from "@/lib/axios";
import { WorkspaceMembersData } from "@/types/workspace";
import { WorkspaceAssignee } from "@/types/workspace";

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

export const getWorkspaceMembers = async (workspaceId: string) => {
  const response = await api.get(`/workspaces/${workspaceId}/members`);
  return response.data.data as WorkspaceMembersData;
};

export const getWorkspaceAssignees = async (workspaceId: string) => {
  const response = await api.get(`/workspaces/${workspaceId}/assignees`);
  return response.data.data as WorkspaceAssignee[];
};

export const inviteUserToWorkspace = async (workspaceId: string, username: string, role: "ADMIN" | "MEMBER") => {
  const response = await api.post(`/workspaces/${workspaceId}/invite`, { username, role });
  return response.data;
};

export const updateMemberRole = async (workspaceId: string, usernameToUpdate: string, newRole: "ADMIN" | "MEMBER") => {
  const response = await api.patch(`/workspaces/${workspaceId}/role`, { usernameToUpdate, newRole });
  return response.data;
};

export const removeMember = async (workspaceId: string, userIdToRemove: string) => {
  const response = await api.delete(`/workspaces/${workspaceId}/remove`, {data: {userIdToRemove}});
  return response.data;
};