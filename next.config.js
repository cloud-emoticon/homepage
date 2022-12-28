/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/store.json',
        destination: '/api/store',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
