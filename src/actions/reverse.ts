'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { apiServer } from '@/lib/api-server';

export async function reverseAction(id: string) {
    const token = (await cookies()).get('token');

    if (!token) {
        return {
            success: false,
            message: 'Usuário não autenticado.',
        };
    }

    try {
        await apiServer.post(
            `/transactions/${id}/reverse`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            },
        );

        revalidatePath('/dashboard');

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error?.response?.data?.message ??
                'Erro ao reverter transação.',
        };
    }
}