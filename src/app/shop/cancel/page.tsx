'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export default function CancelPage() {
    return (
        <div className="container max-w-2xl mx-auto py-12 px-4">
            <Card className="overflow-hidden">
                <div className="bg-amber-500 p-4 text-white text-center">
                    <AlertCircle className="mx-auto h-16 w-16 mb-2" />
                    <h1 className="text-2xl font-bold">決済がキャンセルされました</h1>
                </div>

                <CardHeader>
                    <CardTitle>購入がキャンセルされました</CardTitle>
                    <CardDescription>
                        チケットの購入手続きがキャンセルされました。
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                        <p className="text-amber-800">
                            決済が完了していないため、サーバーへのアクセス権は付与されていません。
                            再度購入をご希望の場合は、ショップページからお手続きください。
                        </p>
                    </div>

                    <div className="mt-4 text-gray-600">
                        <p>
                            ご不明な点がございましたら、support@tproject.jpまでお問い合わせください。
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2 justify-center">
                    <Link href="/">
                        <Button variant="outline" className="flex items-center">
                            <Home className="h-4 w-4 mr-2" />
                            トップページに戻る
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button className="flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            ショップに戻る
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}