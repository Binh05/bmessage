import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "http://localhost:5000/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
