import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  output: 'export',

  experimental: {
    // @ts-ignore
    css: {
      lightningcss: false,
    },
  },
};

export default nextConfig;
