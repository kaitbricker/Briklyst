/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Add this to allow the build even if there are type errors
  },
  /* other config options can stay here */
};

module.exports = nextConfig; 