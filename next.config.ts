import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    turbo: false,
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
