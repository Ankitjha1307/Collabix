import api from "@/lib/axios";

export const getUserWorkspaces = async() => {
    const response = await api.get("/workspaces");
    return response.data;
};