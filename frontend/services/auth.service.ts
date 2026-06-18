import api from "@/lib/axios";

interface LoginData {
    username?: string;
    email?: string;
    password: string;
}

interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
}

export async function register(data: RegisterData) {
    const response = await api.post("/auth/register", data);
    return response.data;
}

export async function login(data: LoginData) {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export async function getProfile() {
  const response = await api.get("/auth/profile");
  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}