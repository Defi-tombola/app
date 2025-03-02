/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding',);
    return config;
  },
  // images: {
  //   localPatterns: [
  //     {
  //       pathname: '/assets/**',
  //       search: ''
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
