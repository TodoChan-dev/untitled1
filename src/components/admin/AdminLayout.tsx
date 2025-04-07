'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    Settings,
    Menu,
    X,
    LogOut,
    Package, // アイテム管理用アイコン追加
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ナビゲーション項目の定義
    const navItems = [
        { href: '/admin/dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
        { href: '/admin/items', label: 'アイテム管理', icon: Package }, // アイテム管理を追加
        // { href: '/admin/users', label: 'ユーザー管理', icon: Users }, // 未実装のためコメントアウト
        { href: '/admin/settings', label: '設定', icon: Settings },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* ヘッダー */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <button
                            className="md:hidden mr-4"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                        <Link href="/admin/dashboard" className="text-xl font-bold">
                            管理パネル
                        </Link>
                    </div>

                    {session && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm hidden sm:inline">
                                {session.user?.name || session.user?.email}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">ログアウト</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* サイドバー（モバイルでは条件付き表示） */}
                <aside
                    className={`
                        bg-gray-100 w-64 border-r fixed md:static inset-y-0 mt-12 md:mt-0 z-10
                        transition-transform duration-300 ease-in-out
                        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}
                >
                    <nav className="p-4 mt-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center px-4 py-3 rounded-md transition-colors
                                        ${isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-gray-200 text-gray-700'}
                                    `}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* メインコンテンツ */}
                <main className="flex-1 bg-gray-50">
                    {/* モバイルメニューが開いているときの背景オーバーレイ */}
                    {mobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black/20 z-0 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                    )}

                    {/* 子コンポーネント */}
                    {children}
                </main>
            </div>
        </div>
    );
}