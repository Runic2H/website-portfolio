/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel.app'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig