import { usersApi } from "./axiosConfig";

export interface User {
    NIT: string;
    name: string;
    user_type: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    country: string;
}

export interface Logindt {
    email: string;
    password: string;
}

export const registerUser = async (userData: User) => {
    try {
        const payload = {
            ...userData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const response = await usersApi.post("/auth/register", payload);
        return response.data;
    } catch (error: any) {
        console.error("Error al registrar usuario:", error.response?.data || error);
        throw error;
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await usersApi.post("/auth/login", credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (error: any) {
        console.error("Error al iniciar sesión:", error.response?.data || error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await usersApi.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener perfil:", error.response?.data || error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
