import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(3, 'O nome deve possuir pelo menos 3 caracteres'),

        email: z.email('E-mail inválido'),

        password: z
            .string()
            .min(8, 'A senha deve possuir pelo menos 8 caracteres'),
    })
    .superRefine(({ password }, ctx) => {
        if (!/[a-z]/.test(password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
                message: 'A senha deve conter pelo menos uma letra minúscula',
            });
        }

        if (!/[A-Z]/.test(password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
                message: 'A senha deve conter pelo menos uma letra maiúscula',
            });
        }

        if (!/[0-9]/.test(password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
                message: 'A senha deve conter pelo menos um número',
            });
        }

        if (!/[^A-Za-z0-9]/.test(password)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['password'],
                message: 'A senha deve conter pelo menos um caractere especial',
            });
        }
    });

export type RegisterSchema = z.infer<typeof registerSchema>;