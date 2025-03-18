import createNextIntlPlugin from 'next-intl/plugin';
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
  // Ensure static files are served from the public directory
  assetPrefix: '',
  output: 'standalone',
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
