// src/app/api/player/status/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // URLからクエリパラメータを取得
        const searchParams = request.nextUrl.searchParams;
        const playerName = searchParams.get('name');
        const uuid = searchParams.get('uuid');

        // playerNameもuuidも提供されていない場合はエラー
        if (!playerName && !uuid) {
            return NextResponse.json(
                { error: 'Bad Request', message: 'Player name or UUID is required' },
                { status: 400 }
            );
        }

        // 適切なクエリパラメータを使用してAPIエンドポイントを構築
        let apiUrl = 'http://100.76.121.124:8081/player/status?';
        if (playerName) {
            apiUrl += `name=${encodeURIComponent(playerName)}`;
        } else if (uuid) {
            apiUrl += `uuid=${encodeURIComponent(uuid)}`;
        }

        // 外部APIにリクエストを送信
        const response = await fetch(apiUrl, {
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
                    message: `Failed to fetch player data: ${response.status} ${response.statusText}`
                },
                { status: response.status }
            );
        }

        // 成功した場合はプレイヤーデータを返す
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching player data:', error);

        // エラーメッセージを抽出
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            { error: 'Server Error', message: errorMessage },
            { status: 500 }
        );
    }
}