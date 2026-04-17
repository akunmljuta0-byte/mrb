import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mrb",
  assetPrefix: "/mrb/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
