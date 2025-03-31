"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Tag, ArrowUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { AuctionItem } from '@/types/auction';
import { formatPrice } from '@/lib/utils';

interface AuctionCardProps {
    item: AuctionItem;
    onClick: () => void;
}

export default function AuctionCard({ item, onClick }: AuctionCardProps) {
    const [timeLeft, setTimeLeft] = useState<string>('');
    // 初期値を現在の価格に設定することで、初期表示時に0が表示されない
    const [price, setPrice] = useState<number>(item.currentPrice);

    useEffect(() => {
        function updateTimeLeft() {
            const endTime = new Date(item.endTime);
            const now = new Date();

            if (now >= endTime) {
                setTimeLeft('終了');
                return;
            }

            setTimeLeft(formatDistanceToNow(endTime, { locale: ja, addSuffix: true }));
        }

        updateTimeLeft();

        // 1秒ごとに残り時間を更新
        const timer = setInterval(updateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [item.endTime]);

    // 親コンポーネントからのitem.currentPriceが変更されたら即座に反映
    useEffect(() => {
        setPrice(item.currentPrice);
    }, [item.currentPrice]);

    // GitHubからアイテム画像を取得するURL
    const imageUrl = `https://raw.githubusercontent.com/T-ProjectMC/StellaAssets/refs/heads/main/${encodeURIComponent(item.itemKey)}.png`;

    // 入札がある場合は最高入札者情報を表示
    const hasBids = item.highestBidderName && item.highestBidderName !== '';

    return (
        <Card
            className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col"
            onClick={onClick}
        >
            <div className="relative aspect-square bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={item.itemName}
                    fill
                    className="object-contain p-4"
                    onError={(e) => {
                        // エラー時は代替画像を表示
                        (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/T-ProjectMC/StellaAssets/refs/heads/main/apple.png';
                    }}
                    style={{
                        imageRendering: "pixelated",
                    }}
                />
            </div>

            <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.itemName}</h3>

                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-emerald-600 font-medium">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{formatPrice(price)}リア</span>
                    </div>

                    <div className={`flex items-center text-sm ${
                        timeLeft === '終了' ? 'text-red-500' : 'text-amber-600'
                    }`}>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{timeLeft}</span>
                    </div>
                </div>

                {hasBids && (
                    <div className="mt-auto pt-2 text-sm text-gray-500 flex items-center">
                        <ArrowUp className="h-3 w-3 mr-1 text-blue-500" />
                        <span className="line-clamp-1">最高入札: {item.highestBidderName}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}