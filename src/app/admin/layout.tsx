import { Providers } from '../providers';
import type { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
    title: '管理ダッシュボード | ステラフィルワールド',
    description: 'ステラフィルワールド管理者用ダッシュボード',
};

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        </Providers>
    );
}