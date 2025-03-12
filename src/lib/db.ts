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
        /* メールクライアント互換性を考慮したリセットCSS */
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
        }

        /* メインコンテナ */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f8f9ff;
        }

        .content-wrapper {
            padding: 40px 20px;
            background-color: #ffffff;
        }

        /* ヘッダー */
        .header {
            background: linear-gradient(135deg, #4f46e5, #3b82f6);
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0;
            font-weight: bold;
        }

        /* コンテンツ領域 */
        .content {
            padding: 30px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* 認証コード */
        .verification-code {
            background-color: #f0f7ff;
            border: 2px solid #e0e7ff;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }

        .verification-code-text {
            font-family: monaco, monospace;
            font-size: 28px;
            font-weight: bold;
            color: #4f46e5;
            letter-spacing: 3px;
        }

        /* ボタン */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
        }

        /* テキスト */
        .text {
            margin: 16px 0;
            color: #1a1a1a;
        }

        /* フッター */
        .footer {
            text-align: center;
            padding: 30px 20px;
            background-color: #f8f9ff;
            border-top: 1px solid #e5e7eb;
        }

        .footer-text {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0;
        }

        /* レスポンシブ対応 */
        @media screen and (max-width: 600px) {
            .content {
                padding: 20px;
            }

            .verification-code {
                padding: 15px;
            }

            .verification-code-text {
                font-size: 24px;
            }

            .button {
                display: block;
                margin: 0 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>ステラフィルワールド 応募確認</h1>
        </div>

        <div class="content-wrapper">
            <div class="content">
                <p class="text"><strong>${name}</strong> 様</p>

                <p class="text">
                    この度はステラフィルワールドへご応募いただき、誠にありがとうございます。
                </p>

                <p class="text">
                    応募内容を確認の上、審査を行います。審査結果は追ってご連絡いたします。
                </p>

                <p class="text">
                    下記の認証コードは、応募状況を確認する際に必要となります。大切に保管してください。
                </p>

                <div class="verification-code">
                    <div class="verification-code-text">${verificationCode}</div>
                </div>

                <p class="text"><strong>審査状況の確認方法：</strong></p>
                
                <div class="button-container">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/check-status" class="button">
                        審査状況を確認する
                    </a>
                </div>

                <p class="text">
                    ご不明な点がございましたら、本メールに返信いただくか、Discordでお問い合わせください。
                </p>

                <p class="text">
                    引き続きよろしくお願いいたします。
                </p>
            </div>

            <div class="footer">
                <p class="footer-text">ステラフィルワールド運営チーム</p>
                <p class="footer-text">T-Project</p>
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