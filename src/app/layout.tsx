import './globals.css';

import { Manrope } from 'next/font/google';

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
        <body className={`${manrope.variable} font-sans antialiased`}>
        {children}
        </body>
        </html>
    );
}