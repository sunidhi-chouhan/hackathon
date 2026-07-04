import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@culturecompass/shared", "@culturecompass/ui", "@culturecompass/ai"],
};

export default nextConfig;
