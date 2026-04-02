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
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/careers",
        destination: "/",
        permanent: false,
      },
      {
        source: "/careers/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/",
        permanent: false,
      },
      {
        source: "/coverages",
        destination: "/",
        permanent: false,
      },
      {
        source: "/coverages/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/insurance",
        destination: "/",
        permanent: false,
      },
      {
        source: "/insurance/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/locations",
        destination: "/",
        permanent: false,
      },
      {
        source: "/locations/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
