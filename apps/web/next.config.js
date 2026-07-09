/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fk-templates/shared"],
  experimental: {
    externalDir: true
  }
};

module.exports = nextConfig;
