import { api } from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        name: string;
        email: string;
        accountNumber: string;
    };
}

export async function login(data: LoginRequest) {
    const response = await api.post<AuthResponse>('/auth/login', data);

    return response.data;
}

export async function register(data: {
    name: string;
    email: string;
    password: string;
}) {
    const response = await api.post<AuthResponse>('/auth/register', data);

    return response.data;
}