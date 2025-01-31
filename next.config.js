/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/website-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/website-portfolio/' : '',
}

module.exports = nextConfig 