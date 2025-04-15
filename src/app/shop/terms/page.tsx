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
                        <h2 className="text-lg font-semibold mb-2">販売業者</h2>
                        <p>T-Project（ティー・プロジェクト）</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">運営統括責任者</h2>
                        <p>櫻井 汐音</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">所在地</h2>
                        <p>神奈川県大和市<br/>※ご請求があった際には遅滞なく開示いたします。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">電話番号</h2>
                        <p>※ご請求があった際には遅滞なく開示いたします。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">メールアドレス</h2>
                        <p>support@tproject.jp</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">販売URL</h2>
                        <p>https://sfw.tproject.jp</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">販売価格</h2>
                        <p>各商品ページをご参照ください。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">商品代金以外の必要料金</h2>
                        <p>消費税、銀行振込手数料、インターネット接続に伴う通信費など</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">支払方法</h2>
                        <p>クレジットカード、銀行振込</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">支払時期</h2>
                        <p>ご注文確定時にお支払いが確定します。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">商品の引渡時期</h2>
                        <p>決済確認後、即時利用可能。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">返品・キャンセル</h2>
                        <p>商品の性質上、返品・キャンセルはお受けしておりません。 ただし、データの不具合等がある場合には、再配布等の対応をさせていただきます。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">動作環境</h2>
                        <p>Minecraft Java Edition 1.21.1以上。 必要MOD等の詳細はT-Project公式Discordをご参照ください。</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-lg font-semibold mb-2">特別条件</h2>
                        <p>18歳未満の方は、保護者の同意を得た上でご利用ください。</p>
                    </div>
                </div>
            </div>
        </div>
    );
}