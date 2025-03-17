// src/lib/db.ts
import { PrismaClient } from '@prisma/client';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

// PrismaClientのグローバルインスタンス（開発環境での重複を防ぐ）
const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// メール送信のトランスポーター
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// ランダムな英数字を生成する関数
export function generateVerificationCode(length = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return randomBytes(length)
        .toString('hex')
        .slice(0, length)
        .toUpperCase();
}

// 応募者に確認メールを送信
export async function sendConfirmationEmail(
    email: string,
    name: string,
    discordUsername: string,
    verificationCode: string
) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || 'no-reply@tproject.jp',
            to: email,
            subject: '【ステラフィルワールド】応募ありがとうございます',
            html: `
            <!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ステラフィルワールド応募確認</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 font-sans">
    <div class="max-w-2xl mx-auto my-8 bg-white rounded-lg shadow-md overflow-hidden">
        <!-- ヘッダー -->
        <div class="bg-gradient-to-r from-indigo-600 to-blue-500 py-8 px-6 text-center">
            <h1 class="text-2xl font-bold text-white">ステラフィルワールド 応募確認</h1>
        </div>

        <!-- メインコンテンツ -->
        <div class="p-8">
            <p class="mb-4"><span class="font-semibold">${name}</span> 様</p>

            <p class="mb-4 text-gray-800">
                この度はステラフィルワールドへご応募いただき、誠にありがとうございます。
            </p>

            <p class="mb-4 text-gray-800">
                応募内容を確認の上、審査を行います。審査結果は追ってご連絡いたします。
            </p>

            <p class="mb-4 text-gray-800">
                下記の認証コードは、応募状況を確認する際に必要となります。大切に保管してください。
            </p>

            <!-- 認証コード -->
            <div class="my-6 p-5 bg-indigo-50 border-2 border-indigo-100 rounded-lg text-center">
                <div class="font-mono text-2xl font-bold text-indigo-600 tracking-widest">${verificationCode}</div>
            </div>

            <p class="mt-6 mb-2 font-semibold text-gray-800">審査状況の確認方法：</p>
            
            <!-- ボタン -->
            <div class="my-6 text-center">
                <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://sfw.tproject.jp'}/check-status" 
                   class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    審査状況を確認する
                </a>
            </div>

            <p class="mb-4 text-gray-800">
                ご不明な点がございましたら、support@tproject.jpまで、またはT-Project公式Discordコミュニティサーバーのお問い合わせチケットにてお問い合わせください。
            </p>

            <div class="mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <p class="text-sm text-gray-600">
                    <span class="font-semibold">ご注意：</span> 本メールはno-reply@tproject.jpから送られる送信専用メールです。本件に関するお問い合わせは「support@tproject.jp」または「T-Project公式Discordコミュニティサーバーのお問い合わせチケット」にお願いいたします。とどめんまたはスタッフ、各参加者へ直接の連絡を試みる行為はお控えください。
                </p>
            </div>

            <p class="mt-6 text-gray-800">
                引き続きよろしくお願いいたします。
            </p>
        </div>

        <!-- フッター -->
        <div class="bg-gray-50 py-6 px-8 border-t border-gray-200">
            <div class="text-center text-gray-600">
                <p class="mb-2">ステラフィルワールド運営チーム</p>
                <p class="mb-2">T-Project</p>
                <p class="mt-4 text-sm">© 2025 T-Project. All rights reserved</p>
                <p class="mt-2 text-xs text-gray-500">
                    本企画はMojang Studioならびにマイクロソフト社とは一切関係がございません。
                </p>
            </div>
        </div>
    </div>
</body>
</html>
            `,
        });
        return true;
    } catch (error) {
        console.error('Email sending error:', error);
        return false;
    }
}

// 応募者統計を取得
export async function getApplicationStats() {
    try {
        // 総応募数
        const totalApplications = await prisma.application.count();

        // 参加決定者数
        const acceptedApplications = await prisma.application.count({
            where: {
                status: 'ACCEPTED'
            }
        });

        return {
            totalApplications,
            acceptedApplications
        };
    } catch (error) {
        console.error('Failed to get application stats:', error);
        return {
            totalApplications: 0,
            acceptedApplications: 0
        };
    }
}

// 応募を保存
export async function saveApplication(applicationData: any) {
    try {
        // 確認コードの生成
        const verificationCode = generateVerificationCode(8);

        const application = await prisma.application.create({
            data: {
                name: applicationData.name,
                email: applicationData.email,
                discordUsername: applicationData.discordUsername,
                channelLink: applicationData.channelLink,
                xLink: applicationData.xLink,
                followsTodomen: applicationData.followsTodomen,
                streamingFrequency: applicationData.streamingFrequency || null,
                additionalInfo: applicationData.additionalInfo || null,
                status: 'PENDING',
                verificationCode: verificationCode,
                statusMessage: '審査中です。しばらくお待ちください。'
            }
        });

        return {
            ...application,
            verificationCode
        };
    } catch (error) {
        console.error('Failed to save application:', error);
        throw error;
    }
}

// 応募状況を確認する関数
export async function checkApplicationStatus(email: string, verificationCode: string) {
    try {
        const application = await prisma.application.findFirst({
            where: {
                email,
                verificationCode // 簡略化した書き方
            },
            select: {
                id: true,
                name: true,
                status: true,
                statusMessage: true, // この行を追加
                createdAt: true,
                updatedAt: true
            }
        });

        return application;
    } catch (error) {
        console.error('Failed to check application status:', error);
        return null;
    }
}