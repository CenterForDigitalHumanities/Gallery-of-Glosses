/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //output: 'standalone'
  reactStrictMode: true,
  basePath: '/Gallery-of-Glosses',
  distDir: 'site',
  crossOrigin: 'anonymous',
}

export default nextConfig;
