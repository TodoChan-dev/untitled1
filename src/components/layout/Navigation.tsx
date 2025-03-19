import Link from 'next/link';
import {useState, useEffect} from 'react';
import {Menu, X} from 'lucide-react';
import {motion} from 'framer-motion';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        hidden: {opacity: 0, y: "-100%"},
        visible: {opacity: 1, y: "0"},
        exit: {opacity: 0, y: "-100%"},
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 z-50"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} className="text-black" onClick={() => setIsOpen(false)}/> : <Menu size={24}/>}
            </button>

            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-40 bg-primary pt-16"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                    transition={{duration: 0.3}}
                >
                    <div className="container">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-primary-foreground text-lg py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                ホーム
                            </Link>
                            <Link href="/player-serch"
                                  className="text-primary-foreground text-lg py-2"
                                  onClick={() => setIsOpen(false)}
                                  >
                                プレイヤー検索
                            </Link>
                            <Link
                                href="/apply"
                                className="text-primary-foreground text-lg py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                応募フォーム
                            </Link>
                            <Link
                                href="/terms"
                                className="text-primary-foreground text-lg py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                利用規約
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-primary-foreground text-lg py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                プライバシーポリシー
                            </Link>
                            <Link href="/check-status"
                                  className="text-primary-foreground text-lg py-2"
                                  onClick={() => setIsOpen(false)}
                            >
                                審査状況
                            </Link>
                        </nav>
                    </div>
                </motion.div>
            )}
        </div>
    );
}