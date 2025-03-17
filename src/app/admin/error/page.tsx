'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl"
            >
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-100 p-4 rounded-full">
                            <AlertTriangle className="h-12 w-12 text-red-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-red-600">ログインエラー</h1>
                    <p className="mt-4 text-gray-600">
                        認証に失敗しました。以下の理由が考えられます：
                    </p>

                    <ul className="mt-4 text-left text-gray-600 space-y-2 pl-4">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>公式Discordサーバーに参加していない</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>必要な権限がない</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>セッションの有効期限が切れている</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-3">
                    <Link href="/admin/login">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            ログインページに戻る
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            トップページに戻る
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}