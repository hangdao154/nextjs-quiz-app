import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Export static HTML into "out/" folder
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
