// src/app/auction/[id]/AuctionList.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, User, Tag, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AuctionItemDetail from '@/components/auction/AuctionItemDetail';
import { Skeleton } from '@/components/ui/skeleton';
import BidForm from '@/components/auction/BidForm';
import { fetchAuctionItem } from '@/lib/auction-api';
import { AuctionItem } from '@/types/auction';

export default function AuctionItemPage() {
    const params = useParams();
    const router = useRouter();
    const [item, setItem] = useState<AuctionItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadAuctionItem() {
            try {
                const id = typeof params.id === 'string' ? params.id : "0";
                const data = await fetchAuctionItem(parseInt(id));
                setItem(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load auction item:', err);
                setError('アイテムの読み込みに失敗しました。');
                setLoading(false);
            }
        }

        loadAuctionItem();
    }, [params.id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-6">
                    <Button variant="ghost" disabled className="flex items-center">
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        オークション一覧に戻る
                    </Button>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <Skeleton className="w-full md:w-1/2 aspect-square rounded-md" />
                            <div className="w-full md:w-1/2 space-y-4">
                                <Skeleton className="h-10 w-3/4" />
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-1/3" />
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error || !item) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <div className="mb-6">
                    <Link href="/auction">
                        <Button variant="ghost" className="flex items-center">
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            オークション一覧に戻る
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardContent className="p-6 text-center">
                        <p className="text-red-500 mb-4">
                            {error || 'アイテムが見つかりませんでした。'}
                        </p>
                        <Button onClick={() => router.back()}>前のページに戻る</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-6">
                <Link href="/auction">
                    <Button variant="ghost" className="flex items-center">
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        オークション一覧に戻る
                    </Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-6">
                    <AuctionItemDetail item={item} />

                    <div className="mt-8 border-t pt-6">
                        <h2 className="text-xl font-bold mb-4">入札</h2>
                        <BidForm item={item} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}