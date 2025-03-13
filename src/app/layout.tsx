// src/app/layout.tsx
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';  // Interの代わりにRobotoをインポート
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// StarBackground のインポートを削除
import './globals.css';
import React from "react";
import StarBackground from "@/components/StarBackground";

const inter = Roboto({ subsets: ['latin'] });

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
        <StarBackground></StarBackground>
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