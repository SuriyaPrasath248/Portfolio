import type { NextConfig } from "next";

// Deployed to GitHub Pages at https://suriyaprasath248.github.io/Portfolio/
// Static export; basePath only in production so `next dev` serves at "/".
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/Portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // next/image with `unoptimized` does not prefix basePath onto public/ paths,
  // so components read this and prefix it themselves.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
