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

export type ApplicationStats = {
    totalApplications: number;
    acceptedApplications: number;
};