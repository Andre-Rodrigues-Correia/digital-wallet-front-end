'use client';

import { useActionState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { reverseAction } from '@/actions/reverse';

import { toast } from 'sonner';

interface Props {
    id: string;
}

const initialState = {
    success: false,
    message: '',
};

export function ReverseButton({
                                  id,
                              }: Props) {
    const action = reverseAction.bind(null, id);

    const [state, formAction, pending] =
        useActionState(action, initialState);

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success('Transferência revertida.');
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <Button
                type="submit"
                size="sm"
                variant="outline"
                disabled={pending}
            >
                {pending
                    ? 'Revertendo...'
                    : 'Reverter'}
            </Button>
        </form>
    );
}