// src/lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Discordに必要な権限のスコープ
const scopes = ["identify", "guilds"].join(" ");

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: scopes } },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }: any) {
            // ユーザーがログインしようとしたときに実行される
            try {
                if (account?.provider === "discord") {
                    // Discord APIを使用してユーザーのギルド（サーバー）を取得
                    const response = await fetch("https://discord.com/api/users/@me/guilds", {
                        headers: {
                            Authorization: `Bearer ${account.access_token}`,
                        },
                    });

                    const guilds = await response.json();

                    // 特定のサーバーIDに所属しているかチェック
                    const targetServerId = "1063151196795306034";
                    const isMember = guilds.some((guild: any) => guild.id === targetServerId);

                    if (!isMember) {
                        // 指定されたサーバーのメンバーでない場合、ログインを拒否
                        console.log(`User ${user.id} attempted to login but is not a member of the required Discord server.`);
                        return false;
                    }

                    return true;
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },
        async jwt({ token, account, profile }: any) {
            // JWTトークンに追加情報を付与
            if (account) {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            // セッションにユーザー情報を付与
            if (session.user) {
                session.user.id = token.id;
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
        error: "/admin/error",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};

// ミドルウェアなどで使用する認証機能をエクスポート
export const { auth, signIn, signOut } = NextAuth(authOptions);