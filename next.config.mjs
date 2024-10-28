/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/Gallery-of-Glosses',
  assetPrefix: './Gallery-of-Glosses',
  distDir: 'site',
  crossOrigin: 'anonymous',
  images: {
    unoptimized: true
  }
}

export default nextConfig;
