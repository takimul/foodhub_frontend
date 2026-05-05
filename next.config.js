/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://foodhub-backend-zbhr.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;