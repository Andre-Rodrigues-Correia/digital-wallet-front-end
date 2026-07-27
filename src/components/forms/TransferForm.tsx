'use client';

import { useFormStatus } from 'react-dom';

import { transferAction } from '@/actions/transfer';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft} from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className="w-full"
            disabled={pending}
        >
            {pending ? 'Transferindo...' : 'Transferir'}
        </Button>
    );
}

export function TransferForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5 text-blue-500" />
                    Nova Transferência
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    action={transferAction}
                    className="space-y-4"
                >
                    <Input
                        name="accountNumber"
                        placeholder="Conta destino"
                    />

                    <Input
                        name="amount"
                        type="number"
                        step="0.01"
                        placeholder="Valor"
                    />

                    <SubmitButton />
                </form>
            </CardContent>
        </Card>
    );
}