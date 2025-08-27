import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore
    css: {
      lightningcss: false,
    },
  },
};

export default nextConfig;