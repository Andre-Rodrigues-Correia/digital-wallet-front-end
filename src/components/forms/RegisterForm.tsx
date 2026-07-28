'use client';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { registerAction } from '@/actions/register';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {redirect} from "next/navigation";

const initialState = {
    success: false,
    message: '',
};

export function RegisterForm() {
    const [state, formAction, pending] =
        useActionState(registerAction, initialState);

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            redirect('/login')
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="space-y-4"
        >
            <Input
                name="name"
                placeholder="Nome"
                required
            />

            <Input
                name="email"
                type="email"
                placeholder="E-mail"
                required
            />

            <Input
                name="password"
                type="password"
                placeholder="Senha"
                required
            />

            <Button
                type="submit"
                className="w-full"
                disabled={pending}
            >
                {pending
                    ? 'Criando conta...'
                    : 'Cadastrar'}
            </Button>
        </form>
    );
}