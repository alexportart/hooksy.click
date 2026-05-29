import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/scraper", "/analysis"],
    },
    sitemap: "https://svalil.com/sitemap.xml",
  };
}