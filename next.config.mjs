/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '',
  reactStrictMode: true,
  images: {
      unoptimized: true
  }
}

export default nextConfig;
