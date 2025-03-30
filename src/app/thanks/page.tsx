// src/app/thanks/AuctionList.tsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '応募完了 | ステラフィルワールド',
    description: 'ステラフィルワールドへの応募が完了しました。',
};

export default function Thanks() {
    return (
        <div className="max-w-2xl mx-auto text-center py-12">
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <Star className="h-16 w-16 text-yellow-400 animate-twinkle" />
                    <Star className="h-10 w-10 text-yellow-400 absolute -top-2 -right-1 animate-twinkle" style={{ animationDelay: '0.3s' }} />
                    <Star className="h-8 w-8 text-yellow-400 absolute -bottom-1 -left-2 animate-twinkle" style={{ animationDelay: '0.6s' }} />
                </div>
            </div>

            <h1 className="text-3xl font-bold mb-6">応募ありがとうございます！</h1>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <p className="text-lg mb-4">
                    ステラフィルワールドへの応募が完了しました。
                </p>
                <p className="mb-6">
                    審査結果は、ご登録いただいたメールアドレスまたはDiscordアカウントへ連絡いたします。
                    審査には数日かかる場合がありますので、しばらくお待ちください。
                </p>
                <div className="p-4 bg-gray-100 rounded-md text-left">
                    <h2 className="font-semibold mb-2 flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        次のステップ
                    </h2>
                    <ol className="list-decimal pl-5 space-y-1">
                        <li>審査結果の連絡をお待ちください（通常3〜5営業日以内）</li>
                        <li>承認された場合、Discordサーバーへの招待リンクが送られます</li>
                        <li>サーバー参加後、オリエンテーションを行います</li>
                        <li>2025年4月5日のサーバー開始に備えましょう</li>
                    </ol>
                </div>
            </div>

            <Link href="/">
                <Button className="flex items-center mx-auto">
                    <Star className="mr-2 h-5 w-5" />
                    トップページに戻る
                </Button>
            </Link>
        </div>
    );
}