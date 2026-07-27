import { api } from './api';

export interface MeResponse {
    id: string;
    name: string;
    email: string;
    accountNumber: string;
    balance: number;
}

export async function me() {
    const { data } = await api.get<MeResponse>('/users/me');

    return data;
}