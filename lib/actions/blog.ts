"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import {
  createSession,
  destroySession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/auth"
import { getDb } from "@/lib/db"
import { posts } from "@/lib/db/schema"
import { getPostBySlug, slugify } from "@/lib/blog"
import { parseContentImages, serializeContentImages } from "@/lib/content-images"

export type BlogFormState = {
  error?: string
  success?: string
}

function field(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim()
  return value || null
}

function parsePostFields(formData: FormData) {
  const contentImagesRaw = String(formData.get("contentImages") ?? "[]")
  const contentImages = serializeContentImages(parseContentImages(contentImagesRaw))
  const publishedAtRaw = String(formData.get("publishedAt") ?? "").trim()
  let publishedAt: Date | null = null
  if (publishedAtRaw) {
    // date input is YYYY-MM-DD; treat as local noon to avoid timezone day-shifts
    const parsed = new Date(`${publishedAtRaw}T12:00:00`)
    if (!Number.isNaN(parsed.getTime())) {
      publishedAt = parsed
    }
  }

  return {
    title: String(formData.get("title") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    coverImage: field(formData, "coverImage"),
    coverImageAlt: field(formData, "coverImageAlt"),
    contentImages,
    metaTitle: field(formData, "metaTitle"),
    metaDescription: field(formData, "metaDescription"),
    focusKeyword: field(formData, "focusKeyword"),
    keywords: field(formData, "keywords"),
    canonicalUrl: field(formData, "canonicalUrl"),
    ogTitle: field(formData, "ogTitle"),
    ogDescription: field(formData, "ogDescription"),
    ogImage: field(formData, "ogImage"),
    category: field(formData, "category"),
    tags: field(formData, "tags"),
    authorName: field(formData, "authorName"),
    noIndex: formData.get("noIndex") === "on" || formData.get("noIndex") === "true",
    published: formData.get("published") === "on" || formData.get("published") === "true",
    publishedAt,
    slugInput: String(formData.get("slug") ?? "").trim(),
  }
}

function resolvePublishedAt(
  published: boolean,
  chosen: Date | null,
  existing: Date | null | undefined,
) {
  if (!published) return null
  if (chosen) return chosen
  if (existing) return existing
  return new Date()
}

export async function loginAction(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const valid = await verifyAdminCredentials(email, password)
  if (!valid) {
    const configured = Boolean(process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_PASSWORD?.trim())
    if (!configured) {
      return {
        error:
          "Admin login is not configured on the server. Add ADMIN_EMAIL and ADMIN_PASSWORD in Vercel, then Redeploy.",
      }
    }
    return { error: "Invalid email or password." }
  }

  await createSession(email)
  redirect("/admin")
}

export async function logoutAction() {
  await destroySession()
  redirect("/admin/login")
}

async function uniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base) || "post"
  let attempt = slug
  let i = 2

  while (true) {
    const existing = await getPostBySlug(attempt)
    if (!existing || existing.id === excludeId) return attempt
    attempt = `${slug}-${i}`
    i += 1
  }
}

export async function createPostAction(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  try {
    await requireAdmin()
  } catch {
    return { error: "Unauthorized." }
  }

  const data = parsePostFields(formData)
  if (!data.title) return { error: "Title is required." }

  const slug = await uniqueSlug(data.slugInput || data.title)
  const db = getDb()
  const now = new Date()
  const [created] = await db
    .insert(posts)
    .values({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt,
      contentImages: data.contentImages,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      keywords: data.keywords,
      canonicalUrl: data.canonicalUrl,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      ogImage: data.ogImage,
      category: data.category,
      tags: data.tags,
      authorName: data.authorName,
      noIndex: data.noIndex,
      published: data.published,
      publishedAt: resolvePublishedAt(data.published, data.publishedAt, null),
      updatedAt: now,
    })
    .returning({ id: posts.id })

  revalidatePath("/blog")
  revalidatePath("/")
  revalidatePath("/admin")
  revalidatePath("/sitemap.xml")
  redirect("/admin")
}

export async function updatePostAction(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  try {
    await requireAdmin()
  } catch {
    return { error: "Unauthorized." }
  }

  const id = String(formData.get("id") ?? "")
  if (!id) return { error: "Missing post id." }

  const data = parsePostFields(formData)
  if (!data.title) return { error: "Title is required." }

  const slug = await uniqueSlug(data.slugInput || data.title, id)
  const db = getDb()
  const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  const current = existing[0]
  if (!current) return { error: "Post not found." }

  const now = new Date()
  const publishedAt = resolvePublishedAt(data.published, data.publishedAt, current.publishedAt)

  await db
    .update(posts)
    .set({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      coverImageAlt: data.coverImageAlt,
      contentImages: data.contentImages,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      focusKeyword: data.focusKeyword,
      keywords: data.keywords,
      canonicalUrl: data.canonicalUrl,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      ogImage: data.ogImage,
      category: data.category,
      tags: data.tags,
      authorName: data.authorName,
      noIndex: data.noIndex,
      published: data.published,
      publishedAt,
      updatedAt: now,
    })
    .where(eq(posts.id, id))

  revalidatePath("/blog")
  revalidatePath("/")
  revalidatePath(`/blog/${slug}`)
  if (current.slug !== slug) {
    revalidatePath(`/blog/${current.slug}`)
  }
  revalidatePath("/admin")
  revalidatePath(`/admin/posts/${id}`)
  revalidatePath("/sitemap.xml")

  return { success: "Post saved." }
}

export async function archivePostAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return

  const db = getDb()
  const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  const current = existing[0]
  if (!current) return

  const archived = formData.get("archived") !== "false"

  await db
    .update(posts)
    .set({
      archived,
      // Archiving also removes from public feed; unarchive keeps published flag as-is
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))

  revalidatePath("/blog")
  revalidatePath("/")
  if (current.slug) revalidatePath(`/blog/${current.slug}`)
  revalidatePath("/admin")
  revalidatePath(`/admin/posts/${id}`)
  revalidatePath("/sitemap.xml")
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get("id") ?? "")
  if (!id) return

  const db = getDb()
  const existing = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  const current = existing[0]

  await db.delete(posts).where(eq(posts.id, id))

  revalidatePath("/blog")
  revalidatePath("/")
  if (current?.slug) revalidatePath(`/blog/${current.slug}`)
  revalidatePath("/admin")
  revalidatePath("/sitemap.xml")
  redirect("/admin")
}
