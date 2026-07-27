import { z } from 'zod';

export const transferSchema = z.object({
    accountNumber: z
        .string()
        .min(1, 'Informe a conta de destino'),

    amount: z
        .string()
        .min(1, 'Informe o valor')
        .refine((value) => !isNaN(Number(value)), {
            message: 'Informe um valor válido',
        })
        .refine((value) => Number(value) > 0, {
            message: 'O valor deve ser maior que zero',
        }),
});

export type TransferSchema = z.infer<typeof transferSchema>;