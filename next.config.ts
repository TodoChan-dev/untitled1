import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ['mc-heads.net'], // mc-heads.netからの画像を許可
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mc-heads.net',
                pathname: '/avatar/**',
            },
        ],
    },
};

export default nextConfig;
