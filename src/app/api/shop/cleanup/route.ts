import { NextRequest, NextResponse } from 'next/server';
import { removeExpiredWhitelist } from '@/lib/shop-database';

export async function GET(request: NextRequest) {
    try {
        // Verify API key for security
        const apiKey = request.headers.get('x-api-key');
        const configuredApiKey = process.env.CLEANUP_API_KEY;

        if (!apiKey || apiKey !== configuredApiKey) {
            return NextResponse.json(
                { success: false, message: '認証エラー' },
                { status: 401 }
            );
        }

        // Remove expired whitelist entries
        const result = await removeExpiredWhitelist();

        return NextResponse.json({
            success: true,
            message: '期限切れのホワイトリストエントリーを削除しました',
            result
        });
    } catch (error) {
        console.error('Error cleaning up whitelist:', error);

        return NextResponse.json(
            { success: false, message: 'クリーンアップ中にエラーが発生しました' },
            { status: 500 }
        );
    }
}