/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/assets/gallery/**',
        search: '',
      },
      {
        pathname: '/assets/projects/**',
        search: '',
      },
      {
        pathname: '/assets/resume/**',
        search: '',
      },
    ],
  },
}

module.exports = nextConfig