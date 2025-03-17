'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AdminLayoutProps = {
    children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // ユーザーのDiscordアバターとフォールバックを取得
    const userImage = session?.user?.image || '';
    const userInitial = session?.user?.name?.charAt(0) || 'U';

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* ヘッダー */}
            <header className="bg-white shadow-sm h-16 flex items-center px-4 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="flex items-center gap-2">
                            <Star className="h-6 w-6 text-blue-500" />
                            <h1 className="text-xl font-bold">ステラフィル管理</h1>
                        </div>
                    </div>

                    {session?.user && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={userImage} alt={session.user.name || ''} />
                                        <AvatarFallback>{userInitial}</AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:inline-block">{session.user.name}</span>
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>アカウント</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut} className="text-red-500 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>ログアウト</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* サイドバー */}
                <aside
                    className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-20 pt-16 md:pt-16 md:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0`}
                >
                    <nav className="px-4 py-6 space-y-1">
                        <Link href="/admin/dashboard">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-700 transition-colors">
                                <LayoutDashboard size={20} />
                                <span>ダッシュボード</span>
                            </div>
                        </Link>
                        <Link href="/admin/applications">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-700 transition-colors">
                                <Users size={20} />
                                <span>応募管理</span>
                            </div>
                        </Link>
                        <Link href="/admin/settings">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-700 transition-colors">
                                <Settings size={20} />
                                <span>設定</span>
                            </div>
                        </Link>
                    </nav>

                    <div className="absolute bottom-8 left-0 right-0 px-4">
                        <Button
                            variant="ghost"
                            className="w-full text-white hover:bg-gray-700"
                            onClick={handleSignOut}
                        >
                            <LogOut className="mr-2 h-5 w-5" />
                            ログアウト
                        </Button>
                    </div>
                </aside>

                {/* メインコンテンツ */}
                <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-0' : ''}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}