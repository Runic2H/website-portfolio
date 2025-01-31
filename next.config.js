/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['localhost', 'your-domain.vercel.app'],
  },
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig 