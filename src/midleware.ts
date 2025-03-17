import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

export default auth((req: { nextUrl: any; auth: any; }) => {
    const { nextUrl, auth } = req;
    const isLoggedIn = !!auth?.user;

    // /admin/* パスのアクセスを保護
    const isAdminPage = nextUrl.pathname.startsWith('/admin');
    const isLoginPage = nextUrl.pathname === '/admin/login';
    const isErrorPage = nextUrl.pathname === '/admin/error';

    // ログインページとエラーページは常にアクセス可能
    if (isLoginPage || isErrorPage) {
        return NextResponse.next();
    }

    // 管理者ページで未ログインの場合はログインページにリダイレクト
    if (isAdminPage && !isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', nextUrl.origin));
    }

    return NextResponse.next();
});

// 特定のルートにのみミドルウェアを適用
export const config = {
    matcher: [
        '/admin/:path*',
    ],
};