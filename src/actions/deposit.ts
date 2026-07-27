'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { apiServer } from '@/lib/api-server';

interface DepositState {
    success: boolean;
    message: string;
}

export async function depositAction(
    _: DepositState,
    formData: FormData,
): Promise<DepositState> {
    const amount = Number(formData.get('amount'));

    try {
        const token = (await cookies()).get('token')?.value;

        await apiServer.post(
            '/transactions/deposit',
            {
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Depósito realizado com sucesso!',
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ??
                'Erro ao realizar depósito.',
        };
    }
}