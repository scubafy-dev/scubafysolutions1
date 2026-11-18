import { and, desc, eq } from "drizzle-orm"
import { getPublishedFilePostBySlug, getPublishedFilePosts } from "@/lib/blog-files"
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

function publishedTime(post: Post) {
  return post.publishedAt?.getTime() ?? post.createdAt.getTime()
}

/** Database posts win when a file uses the same slug, so an admin edit stays in control. */
function mergePublishedPosts(dbPosts: Post[], filePosts: Post[]) {
  const bySlug = new Map<string, Post>()
  for (const post of filePosts) bySlug.set(post.slug, post)
  for (const post of dbPosts) bySlug.set(post.slug, post)
  return [...bySlug.values()].sort((a, b) => publishedTime(b) - publishedTime(a))
}

async function loadPublishedDbPosts(): Promise<Post[]> {
  const db = getDb()
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.published, true), eq(posts.archived, false)))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
}

export async function getPublishedPosts(): Promise<Post[]> {
  const filePosts = getPublishedFilePosts()
  try {
    return mergePublishedPosts(await loadPublishedDbPosts(), filePosts)
  } catch {
    return filePosts.sort((a, b) => publishedTime(b) - publishedTime(a))
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  try {
    const db = getDb()
    const rows = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true), eq(posts.archived, false)))
      .limit(1)
    if (rows[0]) return rows[0]
  } catch {
    // A database outage should still serve articles committed by Okara.
  }
  return getPublishedFilePostBySlug(slug)
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
