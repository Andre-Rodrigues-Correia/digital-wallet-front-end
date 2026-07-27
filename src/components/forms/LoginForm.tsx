'use client';

import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { loginAction } from '@/actions/login';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState = {
    success: false,
    message: '',
};

export function LoginForm() {
    const [state, formAction, pending] =
        useActionState(loginAction, initialState);

    useEffect(() => {
        if (!state.message) return;

        toast.error(state.message);
    }, [state]);

    return (
        <form
            action={formAction}
            className="space-y-4"
        >
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
                {pending ? 'Entrando...' : 'Entrar'}
            </Button>
        </form>
    );
}