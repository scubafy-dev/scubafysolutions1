import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image"),
  coverImageAlt: text("cover_image_alt"),
  /** JSON array of content image URLs shown in the slideshow */
  contentImages: text("content_images").notNull().default("[]"),
  // SEO
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  focusKeyword: text("focus_keyword"),
  keywords: text("keywords"),
  canonicalUrl: text("canonical_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  category: text("category"),
  tags: text("tags"),
  authorName: text("author_name"),
  noIndex: boolean("no_index").notNull().default(false),
  // Publishing
  published: boolean("published").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
