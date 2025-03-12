'use client';

// src/app/check-status/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, Search, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ApplicationStatus } from '@prisma/client';


// フォームのバリデーションスキーマ
const checkStatusSchema = z.object({
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    verificationCode: z.string().length(8, { message: '認証コードは8文字である必要があります' })
});

type FormValues = z.infer<typeof checkStatusSchema>;


type ApplicationResult = {
    id: number;
    name: string;
    status: ApplicationStatus;
    statusMessage: string | null;
    createdAt: string;
    updatedAt: string;
};

export default function CheckStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [application, setApplication] = useState<ApplicationResult | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(checkStatusSchema)
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        setError('');
        setApplication(null);

        try {
            const response = await fetch('/api/check-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || '審査状況の確認に失敗しました');
            }

            setApplication(result.application);
        } catch (err) {
            setError(err instanceof Error ? err.message : '審査状況の確認中にエラーが発生しました');
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status: ApplicationStatus) => {
        switch (status) {
            case 'ACCEPTED':
                return (
                    <div className="flex items-center bg-green-100 text-green-800 rounded-full px-3 py-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span>承認済み</span>
                    </div>
                );
            case 'REJECTED':
                return (
                    <div className="flex items-center bg-red-100 text-red-800 rounded-full px-3 py-1">
                        <XCircle className="h-4 w-4 mr-1" />
                        <span>不承認</span>
                    </div>
                );
            case 'PENDING':
            default:
                return (
                    <div className="flex items-center bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>審査中</span>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        トップに戻る
                    </Button>
                </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">応募状況確認</h1>

                {!application ? (
                    <>
                        <p className="text-gray-600 mb-6">
                            応募時に受け取った認証コードとメールアドレスを入力して、審査状況を確認してください。
                        </p>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <div>{error}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="font-medium">
                                    メールアドレス
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="応募時に使用したメールアドレス"
                                    {...register('email')}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="verificationCode" className="font-medium">
                                    認証コード
                                </Label>
                                <Input
                                    id="verificationCode"
                                    placeholder="8桁の認証コード"
                                    {...register('verificationCode')}
                                    className={errors.verificationCode ? 'border-red-500' : ''}
                                />
                                {errors.verificationCode && (
                                    <p className="mt-1 text-red-500 text-sm">{errors.verificationCode.message}</p>
                                )}
                                <p className="mt-1 text-gray-500 text-sm">
                                    認証コードは応募完了時に送信されたメールに記載されています。
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <span className="animate-spin h-4 w-4 mr-2 border-b-2 border-white rounded-full"></span>
                                        読み込み中...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Search className="h-4 w-4 mr-2" />
                                        審査状況を確認
                                    </span>
                                )}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{application.name} さんの応募状況</h2>
                                {getStatusBadge(application.status)}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">ステータスメッセージ</h3>
                                    <p className="mt-1">{application.statusMessage || '特に追加情報はありません。'}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">応募日時</h3>
                                    <p className="mt-1">{new Date(application.createdAt).toLocaleString('ja-JP')}</p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">最終更新日時</h3>
                                    <p className="mt-1">{new Date(application.updatedAt).toLocaleString('ja-JP')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                className="flex-1 flex items-center justify-center"
                                onClick={() => setApplication(null)}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                戻る
                            </Button>
                            <Link href="/" className="flex-1">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    トップページへ
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}