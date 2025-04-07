// src/app/api/admin/items/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// Java APIサーバーのベースURL
const API_BASE_URL = 'http://100.76.121.124:2002';

/**
 * 特定アイテムの詳細を取得するAPI
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // セッションチェック
        const session = await getServerSession(authOptions);
        if (!session) {
            return new NextResponse(JSON.stringify({ error: '認証が必要です' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // URLからアイテムIDを取得
        const itemId = (await params).id;

        if (!itemId) {
            return new NextResponse(JSON.stringify({ error: 'アイテムIDが必要です' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Java APIサーバーにリクエスト
        const response = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return new NextResponse(JSON.stringify({
                error: 'APIエラー',
                message: `アイテム詳細の取得に失敗しました: ${response.status} ${response.statusText}`
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // APIからのレスポンスを返す
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching item detail:', error);

        return new NextResponse(JSON.stringify({
            error: 'サーバーエラー',
            message: error instanceof Error ? error.message : '不明なエラーが発生しました'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}