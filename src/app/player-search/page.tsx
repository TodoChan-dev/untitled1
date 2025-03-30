// src/app/player-search/AuctionList.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import PlayerSearchForm from '@/components/player/PlayerSearchForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'プレイヤー検索 | ステラフィルワールド',
    description: 'ステラフィルワールドのプレイヤーデータを検索できます。',
};

export default function PlayerSearchPage() {
    return (
        <>
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center">
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        トップに戻る
                    </Button>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">プレイヤーステータス検索</h1>
                    <p className="text-gray-600">
                        Minecraftのユーザー名を入力して、プレイヤーデータを検索できます。
                    </p>
                </div>

                <PlayerSearchForm />
            </div>
        </>
    );
}