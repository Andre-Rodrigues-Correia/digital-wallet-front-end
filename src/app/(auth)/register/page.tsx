import Link from 'next/link';

import { RegisterForm } from '@/components/forms/RegisterForm';

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg border p-8 shadow">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Criar Conta
                </h1>

                <RegisterForm />

                <p className="mt-6 text-center text-sm">
                    Já possui conta?{' '}
                    <Link
                        href="/login"
                        className="font-semibold underline"
                    >
                        Entrar
                    </Link>
                </p>
            </div>
        </main>
    );
}