'use client';

import Link from 'next/link';
import { Star, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-card py-3 backdrop-blur-md' : 'bg-transparent py-5'
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
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        ステラフィルワールド
                    </motion.span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <motion.ul
                        className="flex space-x-8"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
                    >
                        {['ホーム', '応募フォーム', '利用規約'].map((item, index) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                            >
                                <Link
                                    href={index === 0 ? '/' : index === 1 ? '/apply' : '/terms'}
                                    className="py-2 relative group"
                                >
                                    <span className="text-foreground/90 group-hover:text-primary-300 transition-colors">{item}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </nav>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden z-10 text-foreground/90 hover:text-primary-300 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 glass z-40 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <nav>
                            <motion.ul
                                className="flex flex-col space-y-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, staggerChildren: 0.1 }}
                            >
                                {[
                                    { name: 'ホーム', href: '/' },
                                    { name: '応募フォーム', href: '/apply' },
                                    { name: '利用規約', href: '/terms' },
                                    { name: 'プライバシーポリシー', href: '/privacy' }
                                ].map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-xl font-medium text-foreground/90 hover:text-primary-300 transition-colors"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </nav>
                    </motion.div>
                )}
            </div>
        </header>
    );
}