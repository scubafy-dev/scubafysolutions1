import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SideNav } from "@/components/side-nav"
import { getPublishedPosts } from "@/lib/blog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog — Scubafy Solutions",
  description:
    "Insights on web development, product engineering, and digital strategy from Scubafy Solutions.",
  openGraph: {
    title: "Blog — Scubafy Solutions",
    description:
      "Insights on web development, product engineering, and digital strategy from Scubafy Solutions.",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
}

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default async function BlogIndexPage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = []
  try {
    posts = await getPublishedPosts()
  } catch {
    posts = []
  }

  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <section className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-16 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Blog</span>
            <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">INSIGHTS</h1>
            <p className="mt-4 mx-auto max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
              Practical notes on building websites, apps, and digital products.
            </p>
            <Link
              href="/"
              className="inline-block mt-6 font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="font-mono text-sm text-muted-foreground text-center">
              No published posts yet. Check back soon.
            </p>
          ) : (
            <ul className="space-y-0 divide-y divide-border/30 border-y border-border/30">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid md:grid-cols-[180px_1fr] gap-6 py-8 hover:opacity-90 transition-opacity text-left"
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
                        {formatDate(post.publishedAt)}
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
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
