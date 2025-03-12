// src/components/layout/Navigation.tsx
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-primary pt-16">
                    <div className="container">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-primary-foreground text-lg py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                ホーム
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
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}