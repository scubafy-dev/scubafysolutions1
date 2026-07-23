import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SideNav } from "@/components/side-nav"
import { MarkdownContent } from "@/components/blog/markdown-content"
import { BlogImageSlideshow } from "@/components/blog/image-slideshow"
import { getPublishedPostBySlug } from "@/lib/blog"
import { parseContentImages } from "@/lib/content-images"

export const dynamic = "force-dynamic"

type Props = {
  params: Promise<{ slug: string }>
}

function splitList(value: string | null | undefined) {
  if (!value) return []
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPublishedPostBySlug(slug)
    if (!post) return { title: "Post not found" }

    const title = post.metaTitle || `${post.title} — Scubafy Solutions`
    const description = post.metaDescription || post.excerpt || post.title
    const ogTitle = post.ogTitle || title
    const ogDescription = post.ogDescription || description
    const ogImage = post.ogImage || post.coverImage || undefined
    const keywords = [
      ...splitList(post.focusKeyword),
      ...splitList(post.keywords),
      ...splitList(post.tags),
    ]

    return {
      title,
      description,
      keywords: keywords.length ? keywords : undefined,
      robots: post.noIndex ? { index: false, follow: false } : { index: true, follow: true },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: post.authorName ? [post.authorName] : ["Scubafy Solutions"],
        tags: splitList(post.tags),
        images: ogImage ? [{ url: ogImage, alt: post.coverImageAlt || post.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: ogImage ? [ogImage] : undefined,
      },
      alternates: {
        canonical: post.canonicalUrl || `/blog/${post.slug}`,
      },
      category: post.category || undefined,
    }
  } catch {
    return { title: "Blog — Scubafy Solutions" }
  }
}

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post: Awaited<ReturnType<typeof getPublishedPostBySlug>> = null
  try {
    post = await getPublishedPostBySlug(slug)
  } catch {
    notFound()
  }
  if (!post) notFound()

  const tags = splitList(post.tags)
  const author = post.authorName || "Scubafy Solutions"
  const image = post.ogImage || post.coverImage || undefined
  const galleryImages = parseContentImages(post.contentImages)
  const schemaImages = [post.coverImage, ...galleryImages].filter(Boolean) as string[]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    alternativeHeadline: post.title,
    description: post.metaDescription || post.excerpt,
    image: schemaImages.length > 0 ? schemaImages : image,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    keywords: [post.focusKeyword, post.keywords, post.tags].filter(Boolean).join(", ") || undefined,
    articleSection: post.category || undefined,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Scubafy Solutions",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.canonicalUrl || `/blog/${post.slug}`,
    },
  }

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <article className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-10 text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {post.category || "Blog"}
              </span>
              <Link
                href="/blog"
                className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
              >
                ← All posts
              </Link>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {formatDate(post.publishedAt)}
              {author ? ` · ${author}` : ""}
            </p>
            <h1 className="font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">{post.title}</h1>
            {post.excerpt ? (
              <p className="mt-6 mx-auto max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}
            {tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border/40 px-2 py-1"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {post.coverImage ? (
            <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden border border-border/30">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : null}

          {galleryImages.length > 0 ? (
            <div className="mb-12">
              <BlogImageSlideshow images={galleryImages} title={post.title} />
            </div>
          ) : null}

          <div className="mx-auto max-w-3xl text-left">
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </article>
    </main>
  )
}
