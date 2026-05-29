import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.claudedirectory.org" }],
        destination: "https://claudedirectory.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
