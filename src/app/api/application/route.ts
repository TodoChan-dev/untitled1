// src/app/api/application/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma, saveApplication, sendConfirmationEmail } from '@/lib/db';
import { sendDiscordWebhook } from '@/lib/utils';

// フォームのバリデーションスキーマ
const formSchema = z.object({
    name: z.string().min(1, { message: 'ニックネームを入力してください' }),
    email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
    discordUsername: z.string().min(2, { message: 'Discordのユーザー名を入力してください' }),
    channelLink: z.string().url({ message: '有効なURLを入力してください' }),
    xLink: z.string().url({ message: '有効なURLを入力してください' }),
    followsTodomen: z.boolean().refine(val => val === true, { message: 'フォローしていることが応募条件です' }),
    streamingFrequency: z.string().optional(),
    termsAgreed: z.boolean().refine(val => val === true, { message: '利用規約に同意してください' }),
    privacyAgreed: z.boolean().refine(val => val === true, { message: 'プライバシーポリシーに同意してください' }),
    additionalInfo: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // バリデーション
        const validationResult = formSchema.safeParse(body);
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

        const data = validationResult.data;

        // 同じメールアドレスでの重複応募チェック
        const existingApplication = await prisma.application.findFirst({
            where: { email: data.email },
        });

        if (existingApplication) {
            return NextResponse.json(
                { success: false, message: 'このメールアドレスは既に応募済みです' },
                { status: 400 }
            );
        }

        // データベースに保存
        const application = await saveApplication(data);

        // Discord Webhookに通知
        await sendDiscordWebhook(data);

        // 確認メール送信
        await sendConfirmationEmail(
            data.email,
            data.name,
            data.discordUsername
        );

        return NextResponse.json(
            {
                success: true,
                message: '応募が完了しました',
                data: { id: application.id }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'サーバーエラーが発生しました。後でもう一度お試しください。'
            },
            { status: 500 }
        );
    }
}