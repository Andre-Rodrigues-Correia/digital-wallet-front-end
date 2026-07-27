'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { apiServer } from '@/lib/api-server';

export async function transferAction(formData: FormData) {
    const token = (await cookies()).get('token');

    if (!token) {
        throw new Error('Unauthorized');
    }

    const accountNumber = formData.get('accountNumber')?.toString();
    const amount = Number(formData.get('amount'));

    await apiServer.post(
        '/transactions/transfer',
        {
            accountNumber,
            amount,
        },
        {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        },
    );

    revalidatePath('/dashboard');
}