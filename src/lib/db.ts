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
            from: process.env.EMAIL_FROM || 'support@tproject.jp',
            to: email,
            subject: '【ステラフィルワールド】応募ありがとうございます',
            html: `
            <!DOCTYPE html>
            <html lang="ja">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ステラフィルワールド応募確認</title>
                <style>
                    body {
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .logo {
                        max-width: 150px;
                        margin-bottom: 20px;
                    }
                    h1 {
                        color: #4a5568;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    .verification-code {
                        background-color: #f7fafc;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        padding: 15px;
                        margin: 20px 0;
                        text-align: center;
                        font-size: 24px;
                        letter-spacing: 2px;
                        font-weight: bold;
                        color: #4a5568;
                    }
                    .button {
                        display: inline-block;
                        background-color: #4f46e5;
                        color: white;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 4px;
                        font-weight: bold;
                        margin: 20px 0;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #718096;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>ステラフィルワールド 応募確認</h1>
                    </div>
                    
                    <p>${name} 様</p>
                    
                    <p>この度はステラフィルワールドへご応募いただき、誠にありがとうございます。</p>
                    
                    <p>応募内容を確認の上、審査を行います。審査結果は追ってご連絡いたします。</p>
                    
                    <p>下記の認証コードは、応募状況を確認する際に必要となります。大切に保管してください。</p>
                    
                    <div class="verification-code">${verificationCode}</div>
                    
                    <p><strong>審査状況の確認方法：</strong><br>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/check-status" class="button">審査状況を確認する</a></p>
                    
                    <p>なお、Discord上でもご連絡することがございますので、以下のユーザーからのフレンド申請をご確認ください。</p>
                    <p>Discord: <strong>todomen</strong></p>
                    
                    <p>ご不明な点がございましたら、本メールに返信いただくか、Discordでお問い合わせください。</p>
                    
                    <p>引き続きよろしくお願いいたします。</p>
                    
                    <div class="footer">
                        <p>--<br>ステラフィルワールド運営チーム<br>T-Project</p>
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