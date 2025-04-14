'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Loader2 } from 'lucide-react';

// メインコンテンツはSuspenseで囲みます
export default function SuccessPage() {
    return (
        <div className="container max-w-2xl mx-auto py-12 px-4">
            <Suspense fallback={<LoadingCard />}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}

// ロード中に表示するコンポーネント
function LoadingCard() {
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>処理中...</CardTitle>
                <CardDescription>決済情報を確認しています</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p>お待ちください...</p>
                </div>
            </CardContent>
        </Card>
    );
}

// useSearchParamsを使う実際のコンテンツコンポーネント
import { useSearchParams } from 'next/navigation';
import { Check, Calendar, Clock } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [isLoading, setIsLoading] = React.useState(true);
    const [ticketInfo, setTicketInfo] = React.useState<{
        playerName: string;
        ticketType: string;
        startTime: string;
        endTime: string;
    } | null>(null);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        async function verifyPayment() {
            if (!sessionId) {
                setError('セッションIDが見つかりません');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/shop/verify-payment?session_id=${sessionId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || '支払い情報の検証に失敗しました');
                }

                setTicketInfo(data);
            } catch (err) {
                console.error('Error verifying payment:', err);
                setError(err instanceof Error ? err.message : '支払い情報の検証中にエラーが発生しました');
            } finally {
                setIsLoading(false);
            }
        }

        verifyPayment();
    }, [sessionId]);

    function formatDateTime(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <Card className="overflow-hidden">
            <div className="bg-green-500 p-4 text-white text-center">
                <Check className="mx-auto h-16 w-16 mb-2" />
                <h1 className="text-2xl font-bold">ご購入ありがとうございます！</h1>
            </div>

            <CardHeader>
                <CardTitle>チケット購入完了</CardTitle>
                <CardDescription>
                    ステラフィルワールドのチケットを購入いただきました。
                </CardDescription>
            </CardHeader>

            <CardContent>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p>支払い情報を確認中...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700">
                        <p className="font-medium">エラーが発生しました</p>
                        <p className="text-sm mt-1">{error}</p>
                        <p className="text-sm mt-3">
                            このエラーが続く場合は、support@tproject.jpまでお問い合わせください。
                            <br />
                            購入が正常に完了している場合は、しばらく経ってからログインをお試しください。
                        </p>
                    </div>
                ) : ticketInfo ? (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                            <p className="text-green-800 font-medium mb-2 flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                ホワイトリストに登録されました！
                            </p>
                            <p className="text-sm text-green-700">
                                サーバーアドレス: <strong>mc.tproject.jp</strong> にアクセスしてください。
                            </p>
                        </div>

                        <div className="border rounded-md divide-y">
                            <div className="p-3 flex justify-between">
                                <span className="font-medium">プレイヤー名</span>
                                <span className="font-mono">{ticketInfo.playerName}</span>
                            </div>
                            <div className="p-3 flex justify-between">
                                <span className="font-medium">チケットタイプ</span>
                                <span>{ticketInfo.ticketType === 'gold' ? 'ゴールドチケット' : '一般チケット'}</span>
                            </div>
                            <div className="p-3 flex justify-between items-center">
                <span className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  開始時間
                </span>
                                <span>{formatDateTime(ticketInfo.startTime)}</span>
                            </div>
                            <div className="p-3 flex justify-between items-center">
                <span className="font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  終了時間
                </span>
                                <span>{formatDateTime(ticketInfo.endTime)}</span>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800">
                            <p className="text-sm">
                                <strong>注意:</strong> サーバーへのアクセスは上記の時間内のみ有効です。
                                この期間が過ぎるとホワイトリストから自動的に削除されます。
                            </p>
                        </div>
                    </div>
                ) : null}
            </CardContent>

            <CardFooter className="flex gap-2 justify-center">
                <Link href="/">
                    <Button variant="outline" className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        トップページに戻る
                    </Button>
                </Link>
                <Link href="/shop">
                    <Button>
                        ショップに戻る
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}