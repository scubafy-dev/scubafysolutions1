import Link from "next/link"
import Image from "next/image"
import { getPublishedPosts } from "@/lib/blog"

function formatDate(date: Date | null) {
  if (!date) return ""
  return new Intl.DateTimeFormat("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export async function HomeBlogSection() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = []
  try {
    posts = await getPublishedPosts()
  } catch {
    posts = []
  }

  const latest = posts.slice(0, 3)

  return (
    <section
      id="blog"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-16 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Blog</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">INSIGHTS</h2>
          <p className="mt-4 mx-auto max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
            Latest notes on building websites, apps, and digital products.
          </p>
        </div>

        {latest.length === 0 ? (
          <p className="text-center font-mono text-sm text-muted-foreground">
            New posts coming soon.
          </p>
        ) : (
          <ul className="divide-y divide-border/30 border-y border-border/30">
            {latest.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid md:grid-cols-[160px_1fr] gap-6 py-8 hover:opacity-90 transition-opacity"
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
                      {post.category ? ` · ${post.category}` : ""}
                    </p>
                    <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
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

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block border border-border/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-accent hover:text-accent transition-colors"
          >
            View all posts
          </Link>
        </div>
      </div>
    </section>
  )
}
