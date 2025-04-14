'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <div className="mb-6">
                <Link href="/shop">
                    <Button variant="ghost" className="flex items-center">
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        ショップに戻る
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">特定商取引法に基づく表記</h1>

                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">販売事業者</h2>
                        <p>T-Project</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">代表者</h2>
                        <p>とどめん</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">所在地</h2>
                        <p>東京都港区</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">連絡先</h2>
                        <p>メールアドレス: support@tproject.jp</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">販売価格</h2>
                        <p>販売ページに表示されている金額</p>
                        <p>一般チケット: 330円/日（税込）</p>
                        <p>ゴールドチケット: 1,000円/日（税込）</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">商品の内容</h2>
                        <p>ステラフィルワールド（Minecraftサーバー）への参加権利（デジタルコンテンツ）</p>
                        <p>有効期間: 購入日の正午12時から翌日午前3時まで</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">支払方法</h2>
                        <p>クレジットカード決済（Stripe決済システムを利用）</p>
                        <p>対応カード: Visa, Mastercard, American Express, JCB, Discover, Diners Club</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">商品の引き渡し時期</h2>
                        <p>決済完了後、即時に利用可能となります。</p>
                        <p>ただし、アクセス権は購入日の正午12時から有効となります。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">返品・キャンセルについて</h2>
                        <p>デジタルコンテンツという商品の特性上、購入後のキャンセルや返品・返金には応じられません。</p>
                        <p>サーバーメンテナンスや障害等によりサービスをご利用いただけない場合は、別途対応いたします。</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">その他の注意事項</h2>
                        <p>本サービスを利用するには、正規版のMinecraftが必要です。</p>
                        <p>サーバー内でのルール違反やゲームプレイに支障をきたす行為が確認された場合、アクセス権を停止する場合があります。その場合の返金はいたしかねます。</p>
                        <p>未成年の方がご購入される場合は、必ず保護者の同意を得てください。</p>
                    </div>
                </div>
            </div>
        </div>
    );
}