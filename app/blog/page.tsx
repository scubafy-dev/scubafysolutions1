import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SideNav } from "@/components/side-nav"
import { getPublishedPosts } from "@/lib/blog"
import { categoriesForPosts, categoryLabel, postInCategory } from "@/lib/blog-categories"
import type { Post } from "@/lib/db/schema"

export const dynamic = "force-dynamic"

type Props = {
  searchParams: Promise<{ category?: string | string[] }>
}

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function categoryParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  return raw?.trim() || ""
}

async function loadPosts() {
  try {
    return await getPublishedPosts()
  } catch {
    return [] as Post[]
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams
  const posts = await loadPosts()
  const active =
    categoriesForPosts(posts.map((post) => post.category)).find(
      (category) => category.slug === categoryParam(params.category),
    ) ?? null
  const title = active
    ? `${active.label} — Blog — Scubafy Solutions`
    : "Blog — Scubafy Solutions"
  const description = active
    ? `${active.label} from Scubafy Solutions.`
    : "Insights on web development, product engineering, and digital strategy from Scubafy Solutions."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: active ? `/blog?category=${active.slug}` : "/blog",
    },
  }
}

function PostRow({ post }: { post: Post }) {
  const label = categoryLabel(post.category)

  return (
    <li className={post.featured ? "border-l-2 border-accent" : undefined}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid md:grid-cols-[180px_1fr] gap-6 py-8 px-4 hover:opacity-90 transition-opacity text-left"
      >
        <div className="relative aspect-[16/10] w-full border border-border/30 overflow-hidden bg-muted/20 mx-auto md:mx-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Scubafy
            </div>
          )}
        </div>
        <div className="space-y-3 text-center md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {post.featured ? <span className="text-accent">Featured · </span> : null}
            {formatDate(post.publishedAt)}
            {label ? ` · ${label}` : ""}
          </p>
          <h2 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          {post.excerpt ? (
            <p className="font-mono text-sm text-foreground/70 leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          ) : null}
          <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Read →
          </span>
        </div>
      </Link>
    </li>
  )
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const params = await searchParams
  const posts = await loadPosts()
  const categories = categoriesForPosts(posts.map((post) => post.category))
  const active = categories.find((category) => category.slug === categoryParam(params.category)) ?? null

  const visible = active ? posts.filter((post) => postInCategory(post.category, active.slug)) : posts
  const featured = active ? [] : visible.filter((post) => post.featured)
  const list = active ? visible : visible.filter((post) => !post.featured)

  const filterClass = (selected: boolean) =>
    `border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
      selected
        ? "border-accent bg-accent/10 text-accent"
        : "border-border/50 text-muted-foreground hover:border-accent hover:text-accent"
    }`

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <section className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Blog</span>
            <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
              {active ? active.label : "INSIGHTS"}
            </h1>
            <p className="mt-4 mx-auto max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
              {active
                ? `Posts filed under ${active.label}.`
                : "Practical notes on building websites, apps, and digital products."}
            </p>
            <Link
              href="/"
              className="inline-block mt-6 font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
          </div>

          <nav aria-label="Blog categories" className="mb-12 flex flex-wrap justify-center gap-2">
            <Link href="/blog" className={filterClass(!active)} aria-current={!active ? "page" : undefined}>
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className={filterClass(active?.slug === category.slug)}
                aria-current={active?.slug === category.slug ? "page" : undefined}
              >
                {category.label}
              </Link>
            ))}
          </nav>

          {visible.length === 0 ? (
            <p className="font-mono text-sm text-muted-foreground text-center">
              {active ? `No published posts in ${active.label} yet.` : "No published posts yet. Check back soon."}
            </p>
          ) : (
            <div className="space-y-12">
              {featured.length > 0 ? (
                <div>
                  <h2 className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    Featured
                  </h2>
                  <ul className="space-y-0 divide-y divide-border/30 border-y border-border/30">
                    {featured.map((post) => (
                      <PostRow key={post.id} post={post} />
                    ))}
                  </ul>
                </div>
              ) : null}

              {list.length > 0 ? (
                <ul className="space-y-0 divide-y divide-border/30 border-y border-border/30">
                  {list.map((post) => (
                    <PostRow key={post.id} post={post} />
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
