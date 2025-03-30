// src/app/api/auction/bid/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { itemId, amount } = await request.json();

        if (!itemId || !amount) {
            return NextResponse.json(
                { success: false, message: '入札IDと金額が必要です' },
                { status: 400 }
            );
        }

        // In a real app, you would update your Minecraft server database
        // For now, we'll just return a success response

        return NextResponse.json({
            success: true,
            message: `${amount}リアの入札が成功しました！`
        });
    } catch (error) {
        console.error('Error placing bid:', error);
        return NextResponse.json(
            { success: false, message: '入札処理中にエラーが発生しました' },
            { status: 500 }
        );
    }
}