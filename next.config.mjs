/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // JSON-LD endpoints are prerendered as static .json files using generateStaticParams
  distDir: 'out',
  basePath: '',
  reactStrictMode: true,
  images: {
      unoptimized: true
  }
}

export default nextConfig;
