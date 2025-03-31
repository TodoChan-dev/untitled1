// src/app/api/auction/items/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 外部APIのエンドポイント
const API_BASE_URL = 'http://100.76.121.124:2445';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // IDパラメータを取得（Promiseの場合は解決）
        const idParam = (await params).id;
        const id = parseInt(idParam);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: 'Invalid ID' },
                { status: 400 }
            );
        }

        // 外部APIサーバーにリクエストを送信
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            // タイムアウトを設定（必要に応じて調整）
            signal: AbortSignal.timeout(10000),
            // キャッシュを無効化
            cache: 'no-store'
        });

        // APIからのレスポンスを処理
        if (!response.ok) {
            return NextResponse.json(
                {
                    error: 'API Error',
                    message: `Failed to fetch auction item: ${response.status}`
                },
                { status: response.status }
            );
        }

        // 成功した場合はアイテムデータを返す
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching auction item:', error);

        // エラーメッセージを抽出
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            { error: 'Server Error', message: errorMessage },
            { status: 500 }
        );
    }
}