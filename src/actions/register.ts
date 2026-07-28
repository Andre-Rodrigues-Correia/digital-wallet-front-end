'use server';

import { registerSchema } from '@/lib/register-schema';

import { apiServer } from '@/lib/api-server';
import { getErrorMessage } from '@/lib/get-error-message';

export async function registerAction(
    _: any,
    formData: FormData,
) {
    const result = registerSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!result.success) {
        return {
            success: false,
            message: result.error.issues[0].message,
        };
    }

    try {
        await apiServer.post('/auth/register', result.data);

        return {
            success: true,
            message: 'Conta criada com sucesso.',
        };
    } catch (error) {
        return {
            success: false,
            message: getErrorMessage(error),
        };
    }
}