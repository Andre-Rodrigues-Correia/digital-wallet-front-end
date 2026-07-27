import { api } from './api';

export interface SummaryResponse {
    balance: number;
    totalReceived: number;
    totalSent: number;
    totalDeposited: number;
    totalTransferred: number;
    totalReversed: number;
    totalTransactions: number;
}

export interface TransactionHistory {
    id: string;
    type: string;
    direction: 'IN' | 'OUT';
    amount: number;
    status: string;
    user?: string;
    accountNumber?: string;
    createdAt: string;
}

export async function getSummary() {
    const { data } =
        await api.get<SummaryResponse>('/transactions/summary');

    return data;
}


export interface TransferRequest {
    accountNumber: string;
    amount: number;
}

export interface SummaryResponse {
    balance: number;
    totalReceived: number;
    totalSent: number;
    totalDeposited: number;
    totalTransferred: number;
}

export interface TransactionHistory {
    id: string;
    type: string;
    direction: 'IN' | 'OUT';
    amount: number;
    status: string;
    user?: string;
    accountNumber?: string;
    createdAt: string;
}

export async function transfer(data: TransferRequest) {
    const response = await api.post(
        '/transactions/transfer',
        data,
    );

    return response.data;
}


export interface TransactionHistory {
    id: string;
    type: string;
    direction: 'IN' | 'OUT';
    amount: number;
    status: string;
    user?: string;
    accountNumber?: string;
    createdAt: string;
}

export async function getHistory() {
    const response = await api.get<TransactionHistory[]>(
        '/transactions',
    );

    return response.data;
}

export async function reverse(id: string) {
    const response = await api.post(
        `/transactions/${id}/reverse`,
    );

    return response.data;
}