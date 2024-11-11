/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable if you're using static exports
  output: "standalone",

  // Proper TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Handle redirects and rewrites if needed
  async redirects() {
    return [];
  },

  // Enable experimental features if needed
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
