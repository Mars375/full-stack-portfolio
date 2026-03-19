/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/#projects', permanent: true },
      { source: '/about', destination: '/#stack', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
    ]
  },
}

module.exports = nextConfig
