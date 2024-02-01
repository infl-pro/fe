import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from 'lib/registry';
import StoreProvider from './StoreProvider';
import ClientComponentContaier from 'components/ClientComponentContaier';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'shoppingMall',
    description: 'shoppingMall web',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={inter.className}>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
