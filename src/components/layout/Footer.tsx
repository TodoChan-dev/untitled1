'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="glass py-10 mt-16 relative z-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <motion.div
                        className="flex items-center space-x-3 mb-6 md:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-9 h-9 bg-primary-500/30 backdrop-blur-md rounded-full flex items-center justify-center border border-primary-500/50">
                            <Star className="h-5 w-5 text-primary-300" />
                        </div>
                        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-primary-100">
              ステラフィルワールド
            </span>
                    </motion.div>

                    <motion.nav
                        className="mb-6 md:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <ul className="flex flex-wrap justify-center gap-6">
                            {[
                                { name: 'ホーム', href: '/' },
                                { name: '応募フォーム', href: '/apply' },
                                { name: '利用規約', href: '/terms' },
                                { name: 'プライバシーポリシー', href: '/privacy' }
                            ].map((item, i) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-foreground/70 hover:text-primary-300 transition-colors text-sm relative group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>
                </div>

                <motion.div
                    className="pt-6 mt-6 border-t border-white/5 text-center text-sm text-foreground/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
                        <span>© {new Date().getFullYear()} T-Project. All rights reserved.</span>
                        <span className="hidden md:block">•</span>
                        <span className="text-xs text-foreground/40">
              本企画はMojang Studioならびにマイクロソフト社とは一切関係がございません。
            </span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}