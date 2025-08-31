import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // ปิด Turbopack
  },
};

export default nextConfig;
