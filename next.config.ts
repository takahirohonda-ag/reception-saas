import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/reception-saas",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
