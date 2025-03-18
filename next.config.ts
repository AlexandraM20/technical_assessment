import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {},
  images: {
    domains: [], // Keeping this empty since all external images are allowed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // It allows images from any external domain
      },
    ],
  },
};

export default nextConfig;
