// src/app/apply/page.tsx
import Link from 'next/link';
import { Star } from 'lucide-react';
import ApplicationForm from '@/components/form/ApplicationForm';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '応募フォーム | ステラフィルワールド',
    description: 'ステラフィルワールドへの参加応募フォームページです。',
};

export default function Apply() {
    return (
        <>
            <div className="mb-6">
                <Link href="/">
                    <Button variant="link" className="flex items-center">
                        <span className="mr-2">←</span> トップに戻る
                    </Button>
                </Link>
            </div>

            <ApplicationForm />
        </>
    );
}