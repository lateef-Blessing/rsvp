/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
    ],
  },
  trailingSlash: true, // Helps with consistent URLs
  reactStrictMode: true, // Best practice for Next.js
};

export default nextConfig;
