import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = dirname(dirname(appRoot));

const nextConfig: NextConfig = {
  turbopack: {
    root: workspaceRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynl.mktgcdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/insurance",
        destination: "/coverages",
        permanent: true,
      },
      {
        source: "/insurance/:path*",
        destination: "/coverages/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
