'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { apiServer } from '@/lib/api-server';

interface LoginState {
    success: boolean;
    message: string;
}

export async function loginAction(_: LoginState, formData: FormData) {
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    try {
        const response = await apiServer.post('/auth/login', {
            email,
            password,
        });

        const token = response.data.accessToken;

        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ??
                'E-mail ou senha inválidos.',
        };
    }

    redirect('/dashboard');
}