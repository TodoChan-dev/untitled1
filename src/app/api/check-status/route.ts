// src/app/api/check-status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkApplicationStatus } from '@/lib/db';

// バリデーションスキーマ
const checkStatusSchema = z.object({
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    verificationCode: z.string().length(8, { message: '認証コードは8文字である必要があります' })
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // バリデーション
        const validationResult = checkStatusSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: '入力内容に問題があります',
                    errors: validationResult.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

        const { email, verificationCode } = validationResult.data;

        // 応募状況を確認
        const application = await checkApplicationStatus(email, verificationCode);

        if (!application) {
            return NextResponse.json(
                {
                    success: false,
                    message: '該当する応募が見つかりません。メールアドレスと認証コードを確認してください。'
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                application
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Status check error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'サーバーエラーが発生しました。後でもう一度お試しください。'
            },
            { status: 500 }
        );
    }
}