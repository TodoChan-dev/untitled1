// src/types/index.ts
export enum ApplicationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

export type Application = {
    id: number;
    name: string;
    email: string;
    discordUsername: string;
    channelLink: string;
    xLink: string;
    followsTodomen: boolean;
    streamingFrequency?: string | null;
    additionalInfo?: string | null;
    status: ApplicationStatus;
    // 新しく追加したフィールド
    verificationCode?: string;  // 認証コード
    statusMessage?: string | null; // 審査状況メッセージ
    createdAt: Date;
    updatedAt: Date;
};

export type ApplicationFormData = {
    name: string;
    email: string;
    discordUsername: string;
    channelLink: string;
    xLink: string;
    followsTodomen: boolean;
    streamingFrequency?: string;
    additionalInfo?: string;
    termsAgreed: boolean;
    privacyAgreed: boolean;
};

// 状態確認用のフォームデータ型を追加
export type CheckStatusFormData = {
    email: string;
    verificationCode: string;
};

// 状態確認の結果型を追加
export type ApplicationStatusResult = {
    id: number;
    name: string;
    status: ApplicationStatus;
    statusMessage: string | null;
    createdAt: string;
    updatedAt: string;
};

export type ApplicationStats = {
    totalApplications: number;
    acceptedApplications: number;
};