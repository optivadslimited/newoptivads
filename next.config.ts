import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a static copy for GitHub Pages (served under /newoptivads).
// Without it (Vercel), the site runs as a normal Next.js app with the /api/lead route.
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = isStatic ? "/newoptivads" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isStatic ? "export" : undefined,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  async redirects() {
    if (isStatic) return [];
    // Old static-site URLs.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/performance-media-buying.html", destination: "/performance-media-buying", permanent: true },
      { source: "/creator-content-marketing.html", destination: "/creator-content-marketing", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
