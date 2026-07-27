export interface UserMe {
    id: string;
    name: string;
    email: string;
    accountNumber: string;
    balance: number;
}

export interface Summary {
    balance: number;
    totalReceived: number;
    totalSent: number;
    totalDeposited: number;
    totalTransferred: number;
    totalTransactions: number;
}

export interface HistoryItem {
    id: string;
    type: string;
    direction: 'IN' | 'OUT';
    amount: number;
    status: string;
    user?: string;
    accountNumber?: string;
    createdAt: string;
}