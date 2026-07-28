'use server';

import { cookies } from 'next/headers';

import { revalidatePath } from 'next/cache';

import { apiServer } from '@/lib/api-server';
import { getErrorMessage } from '@/lib/get-error-message';

export async function depositAction(
    _: any,
    formData: FormData,
) {
    try {
        const token = (await cookies()).get('token');

        await apiServer.post(
            '/transactions/deposit',
            {
                amount: Number(formData.get('amount')),
            },
            {
                headers: {
                    Authorization: `Bearer ${token?.value}`,
                },
            },
        );

        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Depósito realizado com sucesso.',
        };
    } catch (error) {
        return {
            success: false,
            message: getErrorMessage(error),
        };
    }
}