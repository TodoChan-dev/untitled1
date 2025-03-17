import { DefaultSession } from "next-auth";

// NextAuth.jsのセッション型を拡張して、追加のプロパティを含める
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        } & DefaultSession["user"];
        accessToken?: string;
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}

// JWT型の拡張
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        accessToken?: string;
    }
}