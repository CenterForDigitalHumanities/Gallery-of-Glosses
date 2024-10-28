/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/Gallery-of-Glosses',
  reactStrictMode: true,
  images: {
      unoptimized: true
  }
}

export default nextConfig;
