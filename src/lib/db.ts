// src/lib/db.ts
import { PrismaClient } from '@prisma/client';
import * as nodemailer from 'nodemailer';

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

// 応募者に確認メールを送信
export async function sendConfirmationEmail(
    email: string,
    name: string,
    discordUsername: string
) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || 'support@tproject.jp',
            to: email,
            subject: '【ステラフィルワールド】応募ありがとうございます',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>ステラフィルワールドへの応募ありがとうございます！</h2>
          <p>${name} 様</p>
          <p>この度はステラフィルワールドへご応募いただき、誠にありがとうございます。</p>
          <p>応募内容を確認の上、審査を行います。審査結果は追ってご連絡いたします。</p>
          <p>なお、Discord上でもご連絡することがございますので、以下のユーザーからのフレンド申請をご確認ください。</p>
          <p>Discord: <strong>todomen</strong></p>
          <p>ご不明な点がございましたら、本メールに返信いただくか、Discordでお問い合わせください。</p>
          <p>引き続きよろしくお願いいたします。</p>
          <p>--<br>ステラフィルワールド運営チーム<br>T-Project</p>
        </div>
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
                status: 'PENDING'
            }
        });

        return application;
    } catch (error) {
        console.error('Failed to save application:', error);
        throw error;
    }
}