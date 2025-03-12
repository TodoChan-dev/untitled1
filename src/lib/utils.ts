// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 8桁のランダムなアクセスキーを生成
export function generateAccessKey(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 紛らわしい文字(0,1,I,O)を除外
  let result = '';

  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // 4桁ごとにハイフンを入れる場合
  // return `${result.substring(0, 4)}-${result.substring(4, 8)}`;

  return result;
}

export async function sendDiscordWebhook(data: any) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Discord webhook URL is not defined");
  }

  const fields = [
    { name: "名前", value: data.name, inline: true },
    { name: "メール", value: data.email, inline: true },
    { name: "Discord", value: data.discordUsername, inline: true },
    { name: "チャンネル", value: data.channelLink, inline: false },
    { name: "X(Twitter)", value: data.xLink, inline: true },
    { name: "とどめんフォロー", value: data.followsTodomen ? "はい" : "いいえ", inline: true },
    { name: "配信頻度", value: data.streamingFrequency || "未指定", inline: true },
  ];

  if (data.additionalInfo) {
    fields.push({ name: "追加情報", value: data.additionalInfo, inline: false });
  }

  if (data.accessKey) {
    fields.push({ name: "アクセスキー", value: data.accessKey, inline: false });
  }

  const payload = {
    embeds: [
      {
        title: "新規応募がありました",
        color: 0x6366f1,
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: "ステラフィルワールド応募フォーム"
        }
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook error: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Discord webhook error:', error);
    throw error;
  }
}