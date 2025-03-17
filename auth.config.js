// auth.config.js
export const authConfig = {
    pages: {
        signIn: '/admin/login',
        error: '/admin/error',
    },
    providers: [],
    callbacks: {
        authorized({ auth, request }) {
            const { pathname } = request.nextUrl;
            const isLoggedIn = !!auth?.user;
            const isAdminPage = pathname.startsWith('/admin');
            const isLoginPage = pathname === '/admin/login';
            const isErrorPage = pathname === '/admin/error';

            // ログインページとエラーページは常にアクセス可能
            if (isLoginPage || isErrorPage) {
                return true;
            }

            // 管理者ページで未ログインの場合はログインページにリダイレクト
            if (isAdminPage && !isLoggedIn) {
                return false; // リダイレクトさせる
            }

            return true;
        },
    },
};