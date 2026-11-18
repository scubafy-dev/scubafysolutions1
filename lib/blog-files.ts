import fs from "fs"
import path from "path"
import type { Post } from "@/lib/db/schema"

const CONTENT_DIR = path.join(process.cwd(), "content")

type FrontmatterValue = string | boolean | string[]
type Frontmatter = Record<string, FrontmatterValue>

function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || "post"
  )
}

function unquote(value: string) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseScalar(value: string): FrontmatterValue {
  const trimmed = value.trim()
  if (trimmed === "true") return true
  if (trimmed === "false") return false
  if (trimmed === "null" || trimmed === "~" || trimmed === "") return ""
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((part) => unquote(part))
      .filter(Boolean)
  }
  return unquote(trimmed)
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n")
  if (!text.startsWith("---\n")) return { data: {}, body: text }

  const end = text.indexOf("\n---", 4)
  if (end === -1) return { data: {}, body: text }

  const data: Frontmatter = {}
  const lines = text.slice(4, end).split("\n")
  let index = 0

  while (index < lines.length) {
    const line = lines[index]
    if (!line.trim() || line.trim().startsWith("#")) {
      index += 1
      continue
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) {
      index += 1
      continue
    }

    const key = match[1].toLowerCase().replace(/-/g, "_")
    const rest = match[2]
    index += 1

    if (rest === "|" || rest === ">") {
      const block: string[] = []
      while (index < lines.length && (lines[index].startsWith(" ") || lines[index].startsWith("\t"))) {
        block.push(lines[index].trim())
        index += 1
      }
      data[key] = block.join(rest === ">" ? " " : "\n")
      continue
    }

    if (rest === "") {
      const items: string[] = []
      while (index < lines.length && /^\s*-\s+/.test(lines[index])) {
        items.push(unquote(lines[index].replace(/^\s*-\s+/, "")))
        index += 1
      }
      if (items.length > 0) data[key] = items
      continue
    }

    data[key] = parseScalar(rest)
  }

  const bodyStart = text.indexOf("\n", end + 1)
  return { data, body: bodyStart === -1 ? "" : text.slice(bodyStart + 1).trim() }
}

function asText(value: FrontmatterValue | undefined) {
  if (typeof value === "string") return value.trim()
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean).join(", ")
  return ""
}

function firstText(data: Frontmatter, keys: string[]) {
  for (const key of keys) {
    const text = asText(data[key])
    if (text) return text
  }
  return ""
}

function asBoolean(value: FrontmatterValue | undefined) {
  if (typeof value === "boolean") return value
  if (typeof value === "string") {
    if (value === "true") return true
    if (value === "false") return false
  }
  return null
}

function parseDate(value: string) {
  if (!value) return null
  // Date-only values are a calendar day. Noon UTC keeps that day in every timezone we publish for.
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00Z` : value)
  return Number.isNaN(date.getTime()) ? null : date
}

function excerptFromBody(body: string) {
  const paragraph = body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith("#") && !part.startsWith("```") && !part.startsWith("!"))
  if (!paragraph) return ""
  const plain = paragraph
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  return plain.length > 220 ? `${plain.slice(0, 217).trim()}...` : plain
}

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...listFiles(full))
    else if (/\.mdx?$/i.test(entry.name) && !entry.name.startsWith("_")) files.push(full)
  }
  return files
}

function fileToPost(file: string): Post | null {
  const raw = fs.readFileSync(file, "utf8")
  const { data, body } = parseFrontmatter(raw)
  const filename = path.basename(file).replace(/\.mdx?$/i, "")
  const title = firstText(data, ["title", "headline"]) || filename
  const slug = slugify(firstText(data, ["slug"]) || filename)
  const status = firstText(data, ["status"]).toLowerCase()
  const draft = asBoolean(data.draft) === true || status === "draft" || status === "unpublished"
  const explicitlyUnpublished = asBoolean(data.published) === false
  if (draft || explicitlyUnpublished) return null

  const stat = fs.statSync(file)
  const publishedAt =
    parseDate(firstText(data, ["date", "published_at", "publishedat", "pub_date"])) ?? stat.mtime
  if (publishedAt.getTime() > Date.now() + 60_000) return null

  const updatedAt = parseDate(firstText(data, ["updated", "updated_at", "updatedat", "lastmod"])) ?? stat.mtime
  const description = firstText(data, ["description", "excerpt", "summary", "meta_description", "metadescription"])
  const cover = firstText(data, ["image", "cover", "cover_image", "coverimage", "og_image", "ogimage"]) || null
  const images = data.images ?? data.content_images
  const contentImages = Array.isArray(images) ? JSON.stringify(images) : "[]"
  const content = body.replace(new RegExp(`^#\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\n+`), "")

  return {
    id: `file:${slug}`,
    title,
    slug,
    excerpt: description || excerptFromBody(content),
    content,
    coverImage: cover,
    coverImageAlt: firstText(data, ["image_alt", "cover_image_alt", "alt"]) || null,
    contentImages,
    metaTitle: firstText(data, ["meta_title", "metatitle", "seo_title"]) || null,
    metaDescription: firstText(data, ["meta_description", "metadescription", "seo_description"]) || description || null,
    focusKeyword: firstText(data, ["focus_keyword", "focuskeyword", "keyword", "target_keyword"]) || null,
    keywords: firstText(data, ["keywords"]) || null,
    canonicalUrl: firstText(data, ["canonical", "canonical_url", "canonicalurl"]) || null,
    ogTitle: firstText(data, ["og_title", "ogtitle"]) || null,
    ogDescription: firstText(data, ["og_description", "ogdescription"]) || null,
    ogImage: firstText(data, ["og_image", "ogimage"]) || cover,
    category: firstText(data, ["category", "section"]) || "insights",
    tags: firstText(data, ["tags"]) || null,
    authorName: firstText(data, ["author", "author_name", "authorname"]) || "Scubafy Solutions",
    noIndex: asBoolean(data.noindex) === true || asBoolean(data.no_index) === true,
    featured: asBoolean(data.featured) === true,
    published: true,
    archived: false,
    publishedAt,
    createdAt: stat.birthtime && !Number.isNaN(stat.birthtime.getTime()) ? stat.birthtime : publishedAt,
    updatedAt,
  }
}

export function getPublishedFilePosts(): Post[] {
  const posts = listFiles(CONTENT_DIR)
    .map((file) => {
      try {
        return fileToPost(file)
      } catch {
        return null
      }
    })
    .filter((post): post is Post => Boolean(post))

  const bySlug = new Map<string, Post>()
  for (const post of posts) bySlug.set(post.slug, post)
  return [...bySlug.values()]
}

export function getPublishedFilePostBySlug(slug: string): Post | null {
  return getPublishedFilePosts().find((post) => post.slug === slug) ?? null
}
