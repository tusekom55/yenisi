/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['via.placeholder.com', 'picsum.photos'],
    unoptimized: true, // Netlify için
  },
  output: 'export', // Static export için
  trailingSlash: true, // Netlify routing için
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig