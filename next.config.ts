import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ne fait pas échouer le build Vercel sur une erreur ESLint non bloquante.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
