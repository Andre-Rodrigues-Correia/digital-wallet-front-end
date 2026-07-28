'use server';

import { cookies } from 'next/headers';

import { apiServer } from '@/lib/api-server';
import { getErrorMessage } from '@/lib/get-error-message';
import {redirect} from "next/navigation";

export async function loginAction(
    _: any,
    formData: FormData,
) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');

        const { data } = await apiServer.post('/auth/login', {
            email,
            password,
        });

        (await cookies()).set('token', data.accessToken);
        return {
            success: true,
            message: 'Login realizado com sucesso.',
        };
    } catch (error) {
        return {
            success: false,
            message: getErrorMessage(error),
        };
    }
}