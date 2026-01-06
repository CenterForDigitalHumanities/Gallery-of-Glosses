/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: Removed 'output: export' to enable API routes for JSON-LD endpoints
  // Static pages will still be generated, but we now support dynamic API routes
  distDir: 'out',
  basePath: '',
  reactStrictMode: true,
  images: {
      unoptimized: true
  }
}

export default nextConfig;
