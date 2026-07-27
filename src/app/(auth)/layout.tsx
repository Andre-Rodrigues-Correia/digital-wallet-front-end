'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);
        if (token) {
            router.replace('/dashboard');
        }
    }, [router]);

    // if (Cookies.get('token')) {
    //     return null;
    // }

    return children;
}