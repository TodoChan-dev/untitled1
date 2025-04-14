'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Check, ChevronLeft, Clock, Loader2, Shield, Star} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Checkbox} from '@/components/ui/checkbox';
import {InfoCircle} from '@/components/shop/InfoCircle';
import {checkPlayerExists} from '@/lib/minecraft';

export default function ShopPage() {
    const router = useRouter();
    const [playerName, setPlayerName] = useState('');
    const [playerAvatar, setPlayerAvatar] = useState('');
    const [playerExists, setPlayerExists] = useState<boolean | null>(null);
    const [isCheckingPlayer, setIsCheckingPlayer] = useState(false);
    const [email, setEmail] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<'regular' | 'gold'>('regular');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [returnsAccepted, setReturnsAccepted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [purchaseAttempted, setPurchaseAttempted] = useState(false);

    // Validate and fetch player avatar when playerName changes
    useEffect(() => {
        if (playerName.trim().length > 2) {
            setPlayerAvatar(`https://mc-heads.net/avatar/${playerName}/500`);
        } else {
            setPlayerAvatar('');
        }
    }, [playerName]);

    const handleCheckPlayer = async () => {
        if (!playerName.trim()) {
            setError('プレイヤー名を入力してください');
            return;
        }

        setIsCheckingPlayer(true);
        setError('');

        try {
            const exists = await checkPlayerExists(playerName);
            setPlayerExists(exists);

            if (!exists) {
                setError('有効なMinecraftアカウントが見つかりませんでした');
            }
        } catch (err) {
            console.error('Error checking player:', err);
            setError('プレイヤーの確認中にエラーが発生しました');
            setPlayerExists(false);
        } finally {
            setIsCheckingPlayer(false);
        }
    };

    const handleProceedToCheckout = async () => {
        setPurchaseAttempted(true);
        setEmailError('');
        setError('');

        if (!termsAccepted || !returnsAccepted) {
            return;
        }

        if (!playerName || !playerExists) {
            setError('有効なプレイヤー名を入力してください');
            return;
        }

        // メールアドレスのバリデーション
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setEmailError('有効なメールアドレスを入力してください');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/shop/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerName,
                    email,
                    ticketType: selectedTicket,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || '決済の初期化に失敗しました');
            }

            // Redirect to Stripe Checkout
            router.push(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : '決済の処理中にエラーが発生しました');
            setIsLoading(false);
        }
    };

    const handleTicketSelect = (type: 'regular' | 'gold') => {
        setSelectedTicket(type);
    };

    return (
        <div className="container max-w-4xl mx-auto py-8 px-4">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center">
                        <ChevronLeft className="mr-2 h-5 w-5"/>
                        トップに戻る
                    </Button>
                </Link>
            </div>

            <Card className="mb-8">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">ステラフィルワールド 参加チケット</CardTitle>
                    <CardDescription>
                        一般の方はチケットを購入することでサーバーにご参加いただけます
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                            <h3 className="flex items-center text-amber-800 font-medium">
                                <Clock className="h-5 w-5 mr-2 text-amber-600"/>
                                参加時間について
                            </h3>
                            <p className="mt-2 text-amber-700 text-sm">
                                チケットの有効期間は、購入時刻が正午前なら正午(12:00)から、正午以降なら購入時刻から始まり、
                                いずれの場合も翌朝3:00に終了します。この時間外はサーバーにアクセスできなくなりますのでご注意ください。
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="playerName" className="mb-2 block">
                                Minecraft プレイヤー名 <span className="text-red-500">*</span>
                            </Label>
                            <div className="flex gap-2">
                                <div className="flex-grow">
                                    <Input
                                        id="playerName"
                                        placeholder="例: TDMN_03"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        className={error ? 'border-red-500' : ''}
                                    />
                                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                                </div>
                                <Button
                                    onClick={handleCheckPlayer}
                                    disabled={isCheckingPlayer || playerName.length < 3}
                                >
                                    {isCheckingPlayer ? (
                                        <Loader2 className="h-4 w-4 animate-spin mr-2"/>
                                    ) : (
                                        <Check className="h-4 w-4 mr-2"/>
                                    )}
                                    確認
                                </Button>
                            </div>

                            {/* Player Avatar Preview */}
                            {playerAvatar && playerExists !== false && (
                                <div className="mt-4 flex items-center">
                                    <div
                                        className="relative w-16 h-16 mr-4 rounded-lg overflow-hidden border-2 border-gray-200">
                                        <Image
                                            src={playerAvatar}
                                            alt={`${playerName}のアバター`}
                                            fill
                                            className="object-cover"
                                            onError={() => setPlayerAvatar('')}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">{playerName}</p>
                                        {playerExists === true && (
                                            <p className="text-green-600 text-sm flex items-center">
                                                <Check className="h-3 w-3 mr-1"/>
                                                有効なアカウントです
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* メールアドレス入力フィールド */}
                            <div className="mt-4">
                                <Label htmlFor="email" className="mb-2 block">
                                    メールアドレス <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-500 ml-2">領収書の送付先になります</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={emailError ? 'border-red-500' : ''}
                                />
                                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                            </div>
                        </div>

                        <Tabs defaultValue="regular" className="mt-6"
                              onValueChange={(value) => handleTicketSelect(value as 'regular' | 'gold')}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="regular">一般チケット</TabsTrigger>
                                <TabsTrigger value="gold">ゴールドチケット</TabsTrigger>
                            </TabsList>
                            <TabsContent value="regular">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Shield className="h-5 w-5 mr-2 text-blue-500"/>
                                            一般チケット
                                        </CardTitle>
                                        <CardDescription>
                                            ステラフィルワールドに参加できる標準的なチケットです
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex justify-between">
                                                <span>価格</span>
                                                <span className="font-bold">330円/日</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span>参加時間</span>
                                                <span>購入時〜翌朝3:00</span>
                                            </div>
                                        </div>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex items-start">
                                                <Check className="h-4 w-4 mt-1 mr-2 text-green-500"/>
                                                <span>サーバーへのフルアクセス</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Check className="h-4 w-4 mt-1 mr-2 text-green-500"/>
                                                <span>すべてのゲーム機能を利用可能</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Dialog open={isDialogOpen && selectedTicket === 'regular'}
                                                onOpenChange={(open) => {
                                                    // ダイアログを開く前にバリデーションを行う
                                                    if (open) {
                                                        // プレイヤー名のチェック
                                                        if (!playerName || !playerExists) {
                                                            setError('有効なプレイヤー名を入力してください');
                                                            return;
                                                        }

                                                        // メールアドレスのチェック
                                                        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                                            setEmailError('有効なメールアドレスを入力してください');
                                                            return;
                                                        }
                                                    }

                                                    setIsDialogOpen(open);
                                                }}>
                                            <DialogTrigger asChild>
                                                <Button className="w-full">購入する</Button>
                                            </DialogTrigger>
                                            <TermsDialog
                                                playerName={playerName}
                                                email={email}
                                                ticketType="一般チケット"
                                                price="330円/日"
                                                termsAccepted={termsAccepted}
                                                returnsAccepted={returnsAccepted}
                                                setTermsAccepted={setTermsAccepted}
                                                setReturnsAccepted={setReturnsAccepted}
                                                onProceed={handleProceedToCheckout}
                                                onCancel={() => setIsDialogOpen(false)}
                                                isLoading={isLoading}
                                                purchaseAttempted={purchaseAttempted}
                                            />
                                        </Dialog>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="gold">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Star className="h-5 w-5 mr-2 text-yellow-500"/>
                                            ゴールドチケット
                                        </CardTitle>
                                        <CardDescription>
                                            サポーター向けの特別チケットです
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-md border border-yellow-200">
                                            <div className="flex justify-between">
                                                <span>価格</span>
                                                <span className="font-bold">1,000円/日</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <span>参加時間</span>
                                                <span>購入時〜翌朝3:00</span>
                                            </div>
                                        </div>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex items-start">
                                                <Check className="h-4 w-4 mt-1 mr-2 text-green-500"/>
                                                <span>サーバーへのフルアクセス</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Check className="h-4 w-4 mt-1 mr-2 text-green-500"/>
                                                <span>すべてのゲーム機能を利用可能</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Star className="h-4 w-4 mt-1 mr-2 text-yellow-500"/>
                                                <span>ゲーム内で名前が目立ちます</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Star className="h-4 w-4 mt-1 mr-2 text-yellow-500"/>
                                                <span>公式サイトの支援者一覧に名前が掲載されます</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Dialog open={isDialogOpen && selectedTicket === 'gold'}
                                                onOpenChange={(open) => {
                                                    // ダイアログを開く前にバリデーションを行う
                                                    if (open) {
                                                        // プレイヤー名のチェック
                                                        if (!playerName || !playerExists) {
                                                            setError('有効なプレイヤー名を入力してください');
                                                            return;
                                                        }

                                                        // メールアドレスのチェック
                                                        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                                                            setEmailError('有効なメールアドレスを入力してください');
                                                            return;
                                                        }
                                                    }

                                                    setIsDialogOpen(open);
                                                }}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600">
                                                    購入する
                                                </Button>
                                            </DialogTrigger>
                                            <TermsDialog
                                                playerName={playerName}
                                                email={email}
                                                ticketType="ゴールドチケット"
                                                price="1,000円/日"
                                                termsAccepted={termsAccepted}
                                                returnsAccepted={returnsAccepted}
                                                setTermsAccepted={setTermsAccepted}
                                                setReturnsAccepted={setReturnsAccepted}
                                                onProceed={handleProceedToCheckout}
                                                onCancel={() => setIsDialogOpen(false)}
                                                isLoading={isLoading}
                                                purchaseAttempted={purchaseAttempted}
                                            />
                                        </Dialog>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <p className="text-gray-500 text-sm">
                    お問い合わせは <a href="mailto:support@tproject.jp"
                                      className="text-primary hover:underline">support@tproject.jp</a> までお願いします
                </p>
            </div>
        </div>
    );
}

interface TermsDialogProps {
    playerName: string;
    email: string;
    ticketType: string;
    price: string;
    termsAccepted: boolean;
    returnsAccepted: boolean;
    setTermsAccepted: (value: boolean) => void;
    setReturnsAccepted: (value: boolean) => void;
    onProceed: () => void;
    onCancel: () => void;
    isLoading: boolean;
    purchaseAttempted: boolean;
}

function TermsDialog({
                         playerName,
                         email,
                         ticketType,
                         price,
                         termsAccepted,
                         returnsAccepted,
                         setTermsAccepted,
                         setReturnsAccepted,
                         onProceed,
                         onCancel,
                         isLoading,
                         purchaseAttempted
                     }: TermsDialogProps) {
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>チケット購入の確認</DialogTitle>
                <DialogDescription>
                    以下の内容をご確認ください
                </DialogDescription>
            </DialogHeader>

            <div className="py-4">
                <div className="mb-4 space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">チケットタイプ</span>
                        <span>{ticketType}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">価格</span>
                        <span>{price}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">プレイヤー名</span>
                        <span className="font-mono">{playerName}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">メールアドレス</span>
                        <span className="font-mono">{email}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                        <span className="font-medium">有効期間</span>
                        <span>購入時〜翌3:00</span>
                    </div>
                </div>

                <div className="bg-amber-50 p-3 rounded-md mb-4 border border-amber-200">
                    <p className="text-sm text-amber-800 flex items-start">
                        <InfoCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"/>
                        購入後すぐにサーバーへの接続が可能になります。ただし、チケットは午後12時から翌朝3時までの期間のみ有効です。
                    </p>
                </div>

                <div className="space-y-3">
                    <div className="flex items-top space-x-2">
                        <Checkbox
                            id="terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            className={purchaseAttempted && !termsAccepted ? "border-red-500" : ""}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms"
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center ${purchaseAttempted && !termsAccepted ? "text-red-500" : ""}`}
                            >
                <span>
                  <Link href="/shop/terms" target="_blank" className="text-primary hover:underline">
                    特定商取引法に関する表記
                  </Link>
                  を確認し、同意します
                </span>
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-top space-x-2">
                        <Checkbox
                            id="returns"
                            checked={returnsAccepted}
                            onCheckedChange={(checked) => setReturnsAccepted(checked as boolean)}
                            className={purchaseAttempted && !returnsAccepted ? "border-red-500" : ""}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="returns"
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${purchaseAttempted && !returnsAccepted ? "text-red-500" : ""}`}
                            >
                                <span>デジタルコンテンツという商品の特性上、購入後の返品・返金には応じられないことを理解しました</span>
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={onCancel}>
                    キャンセル
                </Button>
                <Button
                    onClick={onProceed}
                    disabled={isLoading || !termsAccepted || !returnsAccepted}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            処理中...
                        </>
                    ) : (
                        '決済に進む'
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}