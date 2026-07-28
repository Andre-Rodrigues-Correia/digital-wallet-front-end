'use client';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Landmark } from 'lucide-react';

import { depositAction } from '@/actions/deposit';

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

export function DepositCard() {
    const [state, formAction, pending] =
        useActionState(depositAction, initialState);

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-blue-500" />

                    Novo Depósito
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    action={formAction}
                    className="space-y-4"
                >
                    <Input
                        type="number"
                        name="amount"
                        min={1}
                        step="0.01"
                        placeholder="Valor"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending
                            ? 'Depositando...'
                            : 'Depositar'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}