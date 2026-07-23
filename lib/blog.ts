import { and, desc, eq } from "drizzle-orm"
import { getDb } from "@/lib/db"
import { posts, type Post } from "@/lib/db/schema"

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
}

export async function getPublishedPosts(): Promise<Post[]> {
  const db = getDb()
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.archived, false)))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const db = getDb()
  const rows = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true), eq(posts.archived, false)))
    .limit(1)
  return rows[0] ?? null
}

export async function getAllPosts(): Promise<Post[]> {
  const db = getDb()
  return db.select().from(posts).orderBy(desc(posts.updatedAt))
}

export async function getPostById(id: string): Promise<Post | null> {
  const db = getDb()
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  return rows[0] ?? null
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const db = getDb()
  const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  return rows[0] ?? null
}
