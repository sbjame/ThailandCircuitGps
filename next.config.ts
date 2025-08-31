import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
