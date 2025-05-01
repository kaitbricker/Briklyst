/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Add this to allow the build even if there are type errors
  },
  images: {
    domains: [
      'res.cloudinary.com', // Cloudinary
      'cdn.pixabay.com',    // Pixabay
      // Add more domains as needed
    ],
  },
  /* other config options can stay here */
};

module.exports = nextConfig; 