import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiServer } from '@/lib/api-server';

import { Header } from '@/components/layout/Header';
import { BalanceCard } from '@/components/cards/BalanceCard';
import { SummaryCard } from '@/components/cards/SummaryCards';
import { TransferForm } from '@/components/forms/TransferForm';
import { HistoryTable } from '@/components/tables/HistoryTable';

import {
    ArrowDownCircle,
    ArrowUpCircle,
    Landmark,
    Repeat2,
} from 'lucide-react';


import {
    HistoryItem,
    Summary,
    UserMe,
} from '@/types/dashboard';
import {DepositCard} from "@/components/dashboard/DepositCard";

export default async function DashboardPage() {
    const token = (await cookies()).get('token');

    if (!token) {
        redirect('/login');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    };

    const [meResponse, summaryResponse, historyResponse] =
        await Promise.all([
            apiServer.get<UserMe>('/users/me', config),
            apiServer.get<Summary>(
                '/transactions/summary',
                config,
            ),
            apiServer.get<HistoryItem[]>(
                '/transactions',
                config,
            ),
        ]);

    return (
        <main className="mx-auto max-w-7xl space-y-8 p-8">
            <Header user={meResponse.data}/>

            <BalanceCard
                balance={meResponse.data.balance}
                accountNumber={meResponse.data.accountNumber}
            />

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <SummaryCard
                    title="Recebido"
                    value={summaryResponse.data.totalReceived.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                    subtitle="Entradas na carteira"
                    icon={ArrowDownCircle}
                    color="bg-green-500"
                />

                <SummaryCard
                    title="Enviado"
                    value={summaryResponse.data.totalSent.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                    subtitle="Transferências enviadas"
                    icon={ArrowUpCircle}
                    color="bg-red-500"
                />

                <SummaryCard
                    title="Depósitos"
                    value={summaryResponse.data.totalDeposited.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                    subtitle="Total depositado"
                    icon={Landmark}
                    color="bg-blue-500"
                />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">

                <div>
                    <div className="mb-4 text-sm font-medium text-muted-foreground"><TransferForm/></div>
                    <div className="mb-4 text-sm font-medium text-muted-foreground"><DepositCard/></div>


                </div>

                <div className="lg:col-span-2">
                    <HistoryTable
                        history={historyResponse.data}
                    />
                </div>
            </div>
        </main>
    );
}