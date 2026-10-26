import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },

  experimental: {
    agentUpgrade: "security",
  },
  allowedDevOrigins: ['luckless-connected-lagoon.ngrok-free.dev', 'easy-fuel-pro.vercel.app', 'easyfuelpro.co.ke'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
