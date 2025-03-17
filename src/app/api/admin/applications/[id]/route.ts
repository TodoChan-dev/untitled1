import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { ApplicationStatus } from '@prisma/client';
import { z } from 'zod';

// リクエストのバリデーションスキーマ
const updateStatusSchema = z.object({
    status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
    statusMessage: z.string().optional(),
});

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({ error: '認証が必要です' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        // paramsのidを待機してから使用
        const id = parseInt((await params).id);
        if (isNaN(id)) {
            return new NextResponse(JSON.stringify({ error: '無効なID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        // リクエストボディを取得
        const body = await request.json();

        // バリデーション
        const result = updateStatusSchema.safeParse(body);
        if (!result.success) {
            return new NextResponse(JSON.stringify({ error: 'リクエストデータが無効です' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { status, statusMessage } = result.data;

        // 応募データの更新
        const updatedApplication = await prisma.application.update({
            where: { id },
            data: {
                status: status as ApplicationStatus,
                statusMessage: statusMessage || null,
                updatedAt: new Date()
            },
        });

        // メール通知などの処理をここに追加することができます
        // 例: status が ACCEPTED または REJECTED に変わった場合に通知を送る

        return NextResponse.json(updatedApplication);
    } catch (error) {
        console.error('Error updating application status:', error);

        if (error instanceof Error && 'code' in error && error.code === 'P2025') {
            return new NextResponse(JSON.stringify({ error: '応募データが見つかりません' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new NextResponse(JSON.stringify({ error: 'サーバーエラーが発生しました' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}