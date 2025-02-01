/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['runic2h-website.vercel.app/'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
}

module.exports = nextConfig