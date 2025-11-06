/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 🧠 This line tells Next.js to ignore ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/editor',
        destination: '/builder',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
