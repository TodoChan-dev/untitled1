'use client';

import Link from 'next/link';
import { Star, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // スクロール時のヘッダースタイル変更
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // モバイルメニューのスクロール制御
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const menuItems = [
        { name: 'ホーム', href: '/' },
        { name: '応募フォーム', href: '/apply' },
        { name: 'プレイヤー検索', href: '/player-search' }, // この行を追加
        { name: '利用規約', href: '/terms' },
        { name: 'プライバシーポリシー', href: '/privacy' },
        { name: '審査状況', href: '/check-status' }
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white bg-opacity-80 backdrop-blur-md py-3 shadow-md'
                        : 'bg-white py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3 z-10">
                        <motion.div
                            className="relative w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Star className="h-6 w-6 animate-pulse-glow text-primary-400" />
                        </motion.div>
                        <motion.span
                            className="text-xl font-bold text-gray-800"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            ステラフィルワールド
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex space-x-8">
                            {menuItems.slice(0, 4).map((item, index) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="py-2 relative group"
                                    >
                                        <span className="text-gray-800 group-hover:text-primary-600 transition-colors">
                                            {item.name}
                                        </span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-gray-800 hover:text-primary-600 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay - ヘッダーとは別に完全に独立したオーバーレイとして実装 */}
            <AnimatePresence>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <motion.div
                            className="fixed inset-0 bg-white z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="h-full flex flex-col items-center justify-center px-6 pt-16 pb-10">
                                <nav className="w-full max-w-sm">
                                    <ul className="space-y-6">
                                        {menuItems.map((item, index) => (
                                            <motion.li
                                                key={item.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05 * index }}
                                                className="border-b border-gray-100 pb-2"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-center text-xl font-medium text-gray-800 hover:text-primary-600 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}