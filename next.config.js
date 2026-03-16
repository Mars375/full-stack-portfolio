/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'raw.githubusercontent.com' },
    ],
  },
}

module.exports = nextConfig
