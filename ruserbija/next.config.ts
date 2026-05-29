import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig & Record<string, any> = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ['192.168.100.105'],

  // SEO: чтобы генерация метаданных знала базовый URL
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://svalil.com",
  },
};

export default nextConfig;