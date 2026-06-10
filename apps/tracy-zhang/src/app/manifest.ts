import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.agent.name} Insurance Advisor`,
    short_name: site.brand.shortName,
    description: `Local insurance guidance and office contact details for ${site.agent.name}.`,
    start_url: getSiteUrl().toString(),
    display: "standalone",
    background_color: "#f7f4ed",
    theme_color: "#274c47",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
        type: "image/x-icon",
      },
    ],
  };
}
