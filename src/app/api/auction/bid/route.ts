// src/app/api/auction/bid/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 外部APIのエンドポイント
const API_BASE_URL = 'http://100.76.121.124:2445';

export async function POST(request: NextRequest) {
    try {
        // リクエストボディからデータを取得
        const body = await request.json();
        const { itemId, amount, playerUuid } = body;

        if (!itemId || !amount) {
            return NextResponse.json(
                { success: false, message: '入札IDと金額が必要です' },
                { status: 400 }
            );
        }

        // 外部APIサーバーに入札リクエストを送信
        const response = await fetch(`${API_BASE_URL}/bid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId, amount, playerUuid }),
            // タイムアウトを設定（必要に応じて調整）
            signal: AbortSignal.timeout(10000)
        });

        // APIからのレスポンスを処理
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: data.message || '入札処理中にエラーが発生しました'
                },
                { status: response.status }
            );
        }

        // 成功した場合は結果を返す
        return NextResponse.json({
            success: true,
            message: data.message || `${amount}リアの入札が成功しました！`
        });
    } catch (error) {
        console.error('Error placing bid:', error);

        // エラーメッセージを抽出
        const errorMessage = error instanceof Error ? error.message : '入札処理中に不明なエラーが発生しました';

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 }
        );
    }
}