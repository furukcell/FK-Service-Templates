const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fk-templates/shared", "@fk-templates/firebase"],
  experimental: {
    externalDir: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve.modules = [path.resolve(__dirname, "node_modules"), ...(config.resolve.modules || [])];
    return config;
  }
};

module.exports = nextConfig;
