/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/Gallery-of-Glosses',
  assetPrefix: './Gallery-of-Glosses',
  reactStrictMode: true
}

// const nextConfig = {
//   output: 'export',
//   reactStrictMode: true,
//   
//   distDir: 'site',
//   crossOrigin: 'anonymous'
// }

export default nextConfig;
