// src/app/auction/AuctionList.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import AuctionList from '@/components/auction/AuctionList';

export const metadata: Metadata = {
    title: 'オークション | ステラフィルワールド',
    description: 'ステラフィルワールドのオークションアイテム一覧です。',
};

export default function AuctionPage() {
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

            <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">オークション</h1>
                    <p className="text-gray-600">
                        現在出品されているアイテム一覧です。クリックして詳細を確認し、入札できます。
                    </p>
                </div>

                <AuctionList />
            </div>
        </>
    );
}