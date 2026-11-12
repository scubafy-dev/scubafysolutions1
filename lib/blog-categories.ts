export const BLOG_CATEGORIES = [
  { slug: "important-updates", label: "Important Updates" },
  { slug: "partnerships", label: "Partnerships" },
  { slug: "company-news", label: "Company News" },
  { slug: "technology-insights", label: "Technology Insights" },
  { slug: "b2b-marketing-and-lead-generation", label: "B2B Marketing and Lead Generation" },
  { slug: "smart-infrastructure-tourism-technology", label: "Smart Infrastructure / Tourism Technology" },
  { slug: "case-studies", label: "Case Studies" },
  { slug: "insights", label: "Insights" },
  { slug: "events", label: "Events" },
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"]

export function resolveBlogCategory(value: string | null | undefined) {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  return (
    BLOG_CATEGORIES.find(
      (category) =>
        category.slug === normalized || category.label.toLowerCase() === normalized,
    ) ?? null
  )
}

export function categoryLabel(value: string | null | undefined) {
  if (!value) return null
  return resolveBlogCategory(value)?.label ?? value
}

/** Persist a known category slug. Keep an unrecognized value so older posts are not wiped. */
export function normalizeCategory(value: string | null) {
  if (!value) return null
  return resolveBlogCategory(value)?.slug ?? value
}

export function categorySlug(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "category"
  )
}

export function postInCategory(postCategory: string | null | undefined, slug: string) {
  const resolved = resolveBlogCategory(postCategory)
  if (resolved) return resolved.slug === slug
  if (!postCategory) return false
  return categorySlug(postCategory) === slug || postCategory.trim().toLowerCase() === slug
}

/** Official categories, then any extra labels already saved on posts. */
export function categoriesForPosts(values: Array<string | null | undefined>) {
  const extras: { slug: string; label: string }[] = []
  const seen = new Set<string>(BLOG_CATEGORIES.map((category) => category.slug))

  for (const value of values) {
    const label = value?.trim()
    if (!label || resolveBlogCategory(label)) continue
    const slug = categorySlug(label)
    if (seen.has(slug)) continue
    seen.add(slug)
    extras.push({ slug, label })
  }

  return [...BLOG_CATEGORIES, ...extras]
}
