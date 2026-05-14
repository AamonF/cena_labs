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
        destination: "/apps/prompted",
        permanent: true,
      },
      {
        source: "/apps/promptly/:path*",
        destination: "/apps/prompted/:path*",
        permanent: true,
      },
      {
        source: "/apps/lumenix",
        destination: "/apps/prompted",
        permanent: true,
      },
      {
        source: "/apps/lumenix/:path*",
        destination: "/apps/prompted/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
