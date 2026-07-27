'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiServer } from '@/lib/api-server';

interface RegisterState {
    success: boolean;
    message: string;
}

export async function registerAction(
    _: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    try {
        console.log(name, email, password);
        const response = await apiServer.post('/auth/register', {
            name,
            email,
            password,
        });

        console.log({response});

        const token = response.data.accessToken;

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        redirect('/dashboard');
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ??
                'Erro ao criar conta.',
        };
    }
}