'use client';

import { HistoryItem } from '@/types/dashboard';

import { ReverseButton } from './ReverseButton';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    ArrowDownCircle,
    ArrowUpCircle,
    Landmark,
    Repeat2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import {
    formatCurrency,
    formatDate,
} from '@/lib/formatters';

interface Props {
    history: HistoryItem[];
}

export function HistoryTable({ history }: Props) {
    function getTypeIcon(type: string) {
        switch (type) {
            case 'DEPOSIT':
                return (
                    <Landmark
                        size={18}
                        className="text-blue-500"
                    />
                );

            case 'TRANSFER':
                return (
                    <ArrowUpCircle
                        size={18}
                        className="text-red-500"
                    />
                );

            case 'REVERSE':
                return (
                    <Repeat2
                        size={18}
                        className="text-amber-500"
                    />
                );

            default:
                return (
                    <ArrowDownCircle
                        size={18}
                    />
                );
        }
    }

    function getType(type: string) {
        switch (type) {
            case 'DEPOSIT':
                return 'Depósito';

            case 'TRANSFER':
                return 'Transferência';

            case 'REVERSE':
                return 'Reversão';

            default:
                return type;
        }
    }

    function getDirectionBadge(direction: string) {
        if (direction === 'IN') {
            return (
                <Badge className="bg-green-500 hover:bg-green-500">
                    Entrada
                </Badge>
            );
        }

        return (
            <Badge
                variant="secondary"
                className="bg-red-100 text-red-700 hover:bg-red-100"
            >
                Saída
            </Badge>
        );
    }

    function getStatusBadge(status: string) {
        switch (status) {
            case 'COMPLETED':
                return (
                    <Badge className="bg-green-500 hover:bg-green-500">
                        Concluída
                    </Badge>
                );

            case 'REVERSED':
                return (
                    <Badge
                        variant="secondary"
                        className="bg-gray-200 text-gray-700 hover:bg-gray-200"
                    >
                        Revertida
                    </Badge>
                );

            default:
                return <Badge>{status}</Badge>;
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-xl">
                    Histórico de Transações
                </CardTitle>
            </CardHeader>

            <CardContent>
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Repeat2
                            size={50}
                            className="mb-4 text-gray-400"
                        />

                        <h3 className="text-lg font-semibold">
                            Nenhuma transação encontrada
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Faça um depósito ou uma transferência para começar.
                        </p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Direção</TableHead>
                                <TableHead>Usuário</TableHead>
                                <TableHead>Conta</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="text-right">
                                    Ações
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {history.map((transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    className="transition-colors hover:bg-muted/40"
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {getTypeIcon(transaction.type)}

                                            <span className="font-medium">
                        {getType(transaction.type)}
                      </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {getDirectionBadge(
                                            transaction.direction,
                                        )}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {transaction.user ?? '-'}
                                    </TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {transaction.accountNumber ?? '-'}
                                    </TableCell>

                                    <TableCell>
                    <span
                        className={`font-semibold ${
                            transaction.direction === 'IN'
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                      {transaction.direction === 'IN'
                          ? '+ '
                          : '- '}
                        {formatCurrency(
                            transaction.amount,
                        )}
                    </span>
                                    </TableCell>

                                    <TableCell>
                                        {getStatusBadge(
                                            transaction.status,
                                        )}
                                    </TableCell>

                                    <TableCell className="text-muted-foreground">
                                        {formatDate(
                                            transaction.createdAt,
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {transaction.type ===
                                            'TRANSFER' &&
                                            transaction.status ===
                                            'COMPLETED' && (
                                                <ReverseButton
                                                    id={transaction.id}
                                                />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}