import Link from 'next/link';

import { LoginForm } from '@/components/forms/LoginForm';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-lg border p-8 shadow">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Digital Wallet
                </h1>

                <LoginForm />

                <p className="mt-6 text-center text-sm">
                    Não possui conta?{' '}
                    <Link
                        href="/register"
                        className="font-semibold underline"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </main>
    );
}