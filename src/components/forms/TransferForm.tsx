'use client';

import { useActionState, useEffect } from 'react';

import { ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';

import { transferAction } from '@/actions/transfer';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState = {
    success: false,
    message: '',
};

export function TransferForm() {
    const [state, formAction, pending] = useActionState(
        transferAction,
        initialState,
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            return;
        }

        toast.error(state.message);
    }, [state]);

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
                    action={formAction}
                    className="space-y-4"
                >
                    <Input
                        name="accountNumber"
                        placeholder="Conta destino"
                        required
                    />

                    <Input
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="Valor"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending
                            ? 'Transferindo...'
                            : 'Transferir'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}