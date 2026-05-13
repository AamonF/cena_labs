/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/apps/promptly",
        destination: "/apps/lumenix",
        permanent: true,
      },
      {
        source: "/apps/promptly/:path*",
        destination: "/apps/lumenix/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
