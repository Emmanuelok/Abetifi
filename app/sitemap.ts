import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://abetifi-7ssg.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/heritage", "/project", "/community", "/record", "/research", "/visit", "/invest"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }),
  );
}
