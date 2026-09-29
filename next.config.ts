import type { NextConfig } from "next";

// Deployed to GitHub Pages at https://suriyaprasath248.github.io/Portfolio/
// Static export; basePath only in production so `next dev` serves at "/".
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Portfolio" : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
