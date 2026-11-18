import type { MetadataRoute } from "next"
import { getPublishedPosts } from "@/lib/blog"
import { getTopicHref, topicConfig } from "@/lib/topics"
import { guides } from "@/lib/guides"
import { siteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
    lastModified: Date = now,
  ) => ({ url: path === "/" ? siteUrl : `${siteUrl}${path}`, lastModified, changeFrequency, priority })

  const staticRoutes: MetadataRoute.Sitemap = [
    page("/", 1, "weekly"),
    page("/contact", 0.8),
    page("/blog", 0.8, "weekly"),
    page("/about", 0.7),
    page("/work/sea-explorers", 0.7),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ]

  const serviceRoutes = topicConfig.services.map((t) => page(getTopicHref("services", t.slug), 0.9))
  const stackRoutes = [
    ...topicConfig.stack.map((t) => page(getTopicHref("stack", t.slug), 0.5)),
    ...topicConfig.technologies.map((t) => page(getTopicHref("technologies", t.slug), 0.5)),
  ]
  const guideRoutes = guides.map((g) => page(`/guides/${g.slug}`, 0.7, "monthly", new Date(g.dateModified)))

  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await getPublishedPosts()
    postRoutes = posts
      .filter((post) => !post.noIndex)
      .map((post) => page(`/blog/${post.slug}`, 0.7, "monthly", post.updatedAt))
  } catch {
    // Database unavailable at build time: publish the static routes only.
  }

  return [...staticRoutes, ...serviceRoutes, ...guideRoutes, ...stackRoutes, ...postRoutes]
}
