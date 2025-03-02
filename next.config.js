/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_GRAPHQL_HTTP_URL: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL,
    NEXT_PUBLIC_GRAPHQL_WS_URL: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL
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
