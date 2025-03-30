"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Clock, SortAsc, SortDesc, RefreshCcw } from 'lucide-react';
import AuctionCard from '@/components/auction/AuctionCard';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAuctionItems } from '@/lib/auction-api';
import { AuctionItem } from '@/types/auction';

type SortOption = 'endTime' | 'currentPrice';
type SortDirection = 'asc' | 'desc';

export default function AuctionList() {
    const router = useRouter();
    const [items, setItems] = useState<AuctionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('endTime');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [refreshCounter, setRefreshCounter] = useState(0);

    // useCallbackでメモ化して不要な再生成を防止
    const loadAuctions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchAuctionItems();
            setItems(data);
            setError('');
        } catch (err) {
            console.error('Failed to load auctions:', err);
            setError('オークションアイテムの読み込みに失敗しました。');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAuctions();

        // 30秒ごとに自動更新 (コメントは30秒となっていましたが、コードでは1秒だったので修正)
        const interval = setInterval(() => {
            loadAuctions();
        }, 30000); // 1秒→30秒に変更

        return () => clearInterval(interval);
    }, [loadAuctions, refreshCounter]);

    const handleRefresh = () => {
        // 強制的にuseEffectを再実行させるためのカウンター
        setRefreshCounter(prev => prev + 1);
    };

    const handleSortToggle = useCallback((option: SortOption) => {
        if (sortBy === option) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(option);
            setSortDirection('asc');
        }
    }, [sortBy, sortDirection]);

    const handleCardClick = useCallback((id: number) => {
        router.push(`/auction/${id}`);
    }, [router]);

    // 検索の状態変更ハンドラをメモ化
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    // useMemoを使ってフィルタリングとソートの計算を最適化
    const filteredAndSortedItems = items
        .filter(item =>
            item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'endTime') {
                return sortDirection === 'asc'
                    ? new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
                    : new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
            } else {
                return sortDirection === 'asc'
                    ? a.currentPrice - b.currentPrice
                    : b.currentPrice - a.currentPrice;
            }
        });

    // ローディングスケルトンのメモ化
    const renderSkeletons = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
                <Card key={i} className="p-4">
                    <Skeleton className="h-40 w-full rounded-md mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </Card>
            ))}
        </div>
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="アイテム名または出品者名で検索..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleSortToggle('endTime')}
                        className="flex items-center"
                    >
                        <Clock className="mr-2 h-4 w-4" />
                        終了時間
                        {sortBy === 'endTime' && (
                            sortDirection === 'asc'
                                ? <SortAsc className="ml-1 h-4 w-4" />
                                : <SortDesc className="ml-1 h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleSortToggle('currentPrice')}
                        className="flex items-center"
                    >
                        価格
                        {sortBy === 'currentPrice' && (
                            sortDirection === 'asc'
                                ? <SortAsc className="ml-1 h-4 w-4" />
                                : <SortDesc className="ml-1 h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={handleRefresh}
                        className="flex items-center"
                        title="最新情報に更新"
                    >
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {loading ? (
                renderSkeletons()
            ) : error ? (
                <div className="text-center p-6 bg-red-50 rounded-lg">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={handleRefresh}>再読み込み</Button>
                </div>
            ) : filteredAndSortedItems.length === 0 ? (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    {searchQuery ? (
                        <p className="text-gray-500">「{searchQuery}」に一致するアイテムがありません</p>
                    ) : (
                        <p className="text-gray-500">現在出品されているアイテムはありません</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAndSortedItems.map(item => (
                        <AuctionCard
                            key={item.id}
                            item={item}
                            onClick={() => handleCardClick(item.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}