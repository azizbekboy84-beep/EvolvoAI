/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for production
  swcMinify: true,
  compress: true,
  // Increase serverless function timeout
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Fix framer-motion issue
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
