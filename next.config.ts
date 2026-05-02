import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "samuelsurf.vercel.app" }],
        destination: "https://samuelsurf.me/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.samuelsurf.me" }],
        destination: "https://samuelsurf.me/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
