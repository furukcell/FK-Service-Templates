/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@fk-templates/shared", "@fk-templates/firebase"],
  experimental: {
    externalDir: true
  }
};

module.exports = nextConfig;
