import api from "@/lib/axios";

interface LoginData {
    username?: string;
    email?: string;
    password: string;
}

export async function login(data: LoginData) {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/profile");
  return response.data;
}