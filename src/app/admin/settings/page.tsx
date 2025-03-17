'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Save, Info } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '@/components/ui/alert';

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // ログイン状態をチェック
    if (status === 'unauthenticated') {
        router.push('/admin/login');
        return null;
    }

    // 設定を保存する関数（このプロジェクトでは実装しない）
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        // 通常はここでAPIを呼び出して設定を保存
        try {
            // 実装例：
            // const response = await fetch('/api/admin/settings', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify(settingsData),
            // });

            // デモ用に成功メッセージを表示
            setTimeout(() => {
                setSuccessMessage('設定が保存されました');
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            setErrorMessage('設定の保存に失敗しました');
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <AdminLayout>
                <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">設定</h1>
            <Card>
            <CardHeader>
                <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
    ))}
        </div>
        </CardContent>
        </Card>
        </div>
        </AdminLayout>
    );
    }

    return (
        <AdminLayout>
            <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">設定</h1>

            <Tabs defaultValue="general">
    <TabsList className="mb-4">
    <TabsTrigger value="general">一般設定</TabsTrigger>
        <TabsTrigger value="notifications">通知設定</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
        <Card>
            <CardHeader>
                <CardTitle>一般設定</CardTitle>
        </CardHeader>
        <CardContent>
        {successMessage && (
            <Alert className="mb-4 bg-green-50 border-green-200">
            <Info className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">成功</AlertTitle>
                <AlertDescription className="text-green-600">
        {successMessage}
        </AlertDescription>
        </Alert>
)}

    {errorMessage && (
        <Alert className="mb-4 bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-600">エラー</AlertTitle>
            <AlertDescription className="text-red-600">
        {errorMessage}
        </AlertDescription>
        </Alert>
    )}

    <form onSubmit={handleSaveSettings} className="space-y-4">
    <div className="space-y-2">
    <Label htmlFor="adminName">管理者名</Label>
        <Input
    id="adminName"
    defaultValue={session?.user?.name || ''}
    disabled
    />
    <p className="text-sm text-gray-500">
        管理者名はDiscordアカウントから自動的に設定されます
        </p>
        </div>

        <div className="space-y-2">
    <Label htmlFor="email">メールアドレス</Label>
        <Input
    id="email"
    type="email"
    defaultValue={session?.user?.email || ''}
    disabled
    />
    <p className="text-sm text-gray-500">
        メールアドレスはDiscordアカウントから自動的に設定されます
        </p>
        </div>

        <div className="pt-4">
    <Button type="submit" disabled={isLoading}>
        {isLoading ? (
                    <>
                        <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                保存中...
                </>
) : (
        <>
            <Save className="mr-2 h-4 w-4" />
            保存
            </>
    )}
    </Button>
    </div>
    </form>
    </CardContent>
    </Card>
    </TabsContent>

    <TabsContent value="notifications">
    <Card>
        <CardHeader>
            <CardTitle>通知設定</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="space-y-4">
    <Alert className="bg-blue-50 border-blue-200">
    <Info className="h-4 w-4 text-blue-600" />
    <AlertTitle className="text-blue-600">お知らせ</AlertTitle>
        <AlertDescription className="text-blue-600">
        現在、通知設定は開発中です。今後のアップデートでこの機能が利用可能になります。
                    </AlertDescription>
                    </Alert>

                    <p className="text-gray-500">
        今後実装予定の機能:
    </p>
    <ul className="list-disc pl-5 space-y-1 text-gray-500">
        <li>新規応募時のメール通知</li>
        <li>ステータス変更時のDiscord通知</li>
        <li>統計レポートのスケジュール送信</li>
        </ul>
        </div>
        </CardContent>
        </Card>
        </TabsContent>
        </Tabs>
        </div>
        </AdminLayout>
);
}