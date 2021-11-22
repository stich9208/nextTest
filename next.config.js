/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  compress: true,
  webpack: function (config) {
    config.plugins.push(new CompressionPlugin());
    return config;
  },
});
