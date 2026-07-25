import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/blog"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scubafysolutions.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    {
      url: `${siteUrl}/work/sea-explorers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  try {
    const posts = await getPublishedPosts()
    const postRoutes = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
    return [...staticRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
