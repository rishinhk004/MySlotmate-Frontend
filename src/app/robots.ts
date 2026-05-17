import type { MetadataRoute } from "next";

const SITE_URL = "https://www.myslotmate.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/host-dashboard",
          "/host-dashboard/",
          "/saved-experiences",
          "/activities",
          "/experience/*/book",
          "/experience/*/confirmation",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
