import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abetifi Stone Age Community Development",
    short_name: "Abetifi Stone Age",
    description:
      "Research, conservation and development information for Bosumpra Rockshelter and the proposed museum centre in Abetifi, Ghana.",
    start_url: "/",
    display: "standalone",
    background_color: "#efe6d2",
    theme_color: "#1d281f",
    icons: [
      {
        src: "/abetifi-icon-192-20260807.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/abetifi-icon-512-20260807.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/abetifi-favicon-20260807.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
