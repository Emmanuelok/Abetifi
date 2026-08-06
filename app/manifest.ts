import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abetifi Stone Age Community Development",
    short_name: "Abetifi Stone Age",
    description:
      "Deep history, shared future: Bosumpra heritage and the proposed museum centre in Abetifi, Ghana.",
    start_url: "/",
    display: "standalone",
    background_color: "#efe6d2",
    theme_color: "#1d281f",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
