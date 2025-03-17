'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Star, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/admin/dashboard');
        }
    }, [status, router]);

    const handleDiscordLogin = async () => {
        setIsLoading(true);
        setError('');

        try {
            await signIn('discord', { callbackUrl: '/admin/dashboard' });
        } catch (err) {
            setError('ログインに失敗しました。もう一度お試しください。');
            setIsLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-500 border-r-blue-700 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl"
            >
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Star className="h-12 w-12 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold">管理者ログイン</h1>
                    <p className="mt-2 text-gray-600">
                        ステラフィルワールドの管理者ダッシュボードへアクセスするには、
                        Discordアカウントでログインしてください。
                    </p>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                <Button
                    onClick={handleDiscordLogin}
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                        <LogIn className="h-5 w-5" />
                    )}
                    Discordでログイン
                </Button>

                <div className="text-center text-sm text-gray-500">
                    <p>
                        ログインするには公式Discord サーバーに参加している必要があります。
                        招待URLは運営にお問い合わせください。
                    </p>
                </div>
            </motion.div>
        </div>
    );
}