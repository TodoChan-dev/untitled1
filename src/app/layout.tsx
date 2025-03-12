// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StarBackground from '@/components/StarBackground';
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
        <body className={inter.className}>
        <StarBackground />
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <div className="flex-grow flex justify-center w-full relative z-10">
                <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            </div>
            <Footer />
        </div>
        </body>
        </html>
    );
}