import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// 全ての応募データを取得するAPI
export async function GET(request: NextRequest) {
    try {
        // セッションチェック
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({ error: '認証が必要です' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 全ての応募データを取得
        const applications = await prisma.application.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        return new NextResponse(JSON.stringify({ error: 'サーバーエラーが発生しました' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}