import type { MetadataRoute } from "next";
import { navigation } from "./lib/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abetifi-7ssg.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...navigation.map((item) => item.href)].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }),
  );
}
