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