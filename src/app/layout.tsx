// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// StarBackground のインポートを削除
import './globals.css';
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ステラフィルワールド | Minecraftストリーマーサーバー',
    description: '「シデリオン大陸」と呼ばれる独自の世界観を持つマップを舞台としたオープンワールドMMORPG型ストリーマーサーバー',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <body className={`${inter.className} site-container`}>
        {/* StarBackground コンポーネントを削除 */}
        <Header />
        <div className="content-container">
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
        <Footer />
        </body>
        </html>
    );
}