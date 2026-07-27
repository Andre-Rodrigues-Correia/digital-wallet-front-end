import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, 'O nome deve possuir pelo menos 3 caracteres'),

    email: z.email('E-mail inválido'),

    password: z
        .string()
        .min(6, 'A senha deve possuir pelo menos 6 caracteres'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;