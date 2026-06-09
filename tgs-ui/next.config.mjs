/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't expose Next.js version in response headers
  poweredByHeader: false,

  // Treat imports from the backend as errors at build time if types mismatch
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
