"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Clock, Tag, User, ArrowUp, Info } from 'lucide-react';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { AuctionItem } from '@/types/auction';
import { formatPrice } from '@/lib/utils';

interface AuctionItemDetailProps {
    item: AuctionItem;
}

export default function AuctionItemDetail({ item }: AuctionItemDetailProps) {
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    useEffect(() => {
        function updateTimeLeft() {
            const endTime = new Date(item.endTime);
            const now = new Date();
            const secondsLeft = differenceInSeconds(endTime, now);

            if (secondsLeft <= 0) {
                setTimeLeft('終了');
                setIsEnded(true);
                setTimeLeftSeconds(0);
                return;
            }

            setTimeLeftSeconds(secondsLeft);
            setIsEnded(false);
            setTimeLeft(formatDistanceToNow(endTime, { locale: ja, addSuffix: true }));
        }

        updateTimeLeft();

        // 1秒ごとに残り時間を更新
        const timer = setInterval(updateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [item.endTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setPrice(item.currentPrice);
        }, 1000);

        return () => clearInterval(timer);
    }, [item.currentPrice]);

    // GitHubからアイテム画像を取得するURL
    const imageUrl = `https://raw.githubusercontent.com/T-ProjectMC/StellaAssets/refs/heads/main/${encodeURIComponent(item.itemKey)}.png`;

    // 入札がある場合は最高入札者情報を表示
    const hasBids = item.highestBidderName && item.highestBidderName !== '';

    // 残り時間を時分秒の形式で表示（10分以内の場合）
    const formattedTimeLeft = () => {
        if (isEnded) return '終了';

        if (timeLeftSeconds < 600) { // 10分 = 600秒
            const hours = Math.floor(timeLeftSeconds / 3600);
            const minutes = Math.floor((timeLeftSeconds % 3600) / 60);
            const seconds = timeLeftSeconds % 60;

            return `${hours > 0 ? `${hours}時間 ` : ''}${minutes}分 ${seconds}秒`;
        }

        return timeLeft;
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
                <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border">
                    <Image
                        src={imageUrl}
                        alt={item.itemName}
                        fill
                        className="object-contain p-8"
                        onError={(e) => {
                            // エラー時は代替画像を表示
                            (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/t-project-org/minecraft-assets/main/items/unknown.png';
                        }}
                        style={{
                            imageRendering: "pixelated",
                        }}
                    />
                </div>
            </div>

            <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2 mb-2">
                    {isEnded ? (
                        <Badge variant="destructive" className="px-3 py-1">オークション終了</Badge>
                    ) : (
                        <Badge variant="secondary" className="px-3 py-1">出品中</Badge>
                    )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold mb-4">{item.itemName}</h1>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-700">
                        <User className="h-5 w-5 mr-2 text-gray-500" />
                        <span>出品者: <span className="font-medium">{item.sellerName}</span></span>
                    </div>

                    <div className="flex items-center text-gray-700">
                        <Tag className="h-5 w-5 mr-2 text-emerald-600" />
                        <span>現在価格: <span className="font-medium text-lg text-emerald-600">{formatPrice(price)}リア</span></span>
                    </div>

                    <div className={`flex items-center ${isEnded ? 'text-red-500' : 'text-amber-600'}`}>
                        <Clock className="h-5 w-5 mr-2" />
                        <span>
                            残り時間: <span className="font-medium">{formattedTimeLeft()}</span>
                        </span>
                    </div>

                    {hasBids && (
                        <div className="flex items-center text-blue-600">
                            <ArrowUp className="h-5 w-5 mr-2" />
                            <span>最高入札者: <span className="font-medium">{item.highestBidderName}</span></span>
                        </div>
                    )}
                </div>

                {item.description && (
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-2" />
                            アイテム詳細
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="whitespace-pre-line">{item.description}</p>
                        </div>
                    </div>
                )}

                <div className="bg-blue-50 p-4 rounded-md">
                    <h2 className="text-blue-800 font-medium mb-2">オークション情報</h2>
                    <div className="text-sm space-y-2 text-blue-700">
                        <p>開始価格: {formatPrice(item.startPrice)}リア</p>
                        <p>出品日時: {new Date(item.startTime).toLocaleString('ja-JP')}</p>
                        <p>終了予定: {new Date(item.endTime).toLocaleString('ja-JP')}</p>
                        <p>オークションID: {item.id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}