import Link from "next/link"
import { logoutAction } from "@/lib/actions/blog"
import { getAllPosts } from "@/lib/blog"
import { PostAdminActions } from "@/components/admin/post-admin-actions"

export const metadata = {
  title: "Admin — Blog — Scubafy Solutions",
  robots: { index: false, follow: false },
}

function statusLabel(post: { published: boolean; archived: boolean }) {
  if (post.archived) return "Archived"
  if (post.published) return "Published"
  return "Draft"
}

export default async function AdminDashboardPage() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = []
  let dbError: string | null = null

  try {
    posts = await getAllPosts()
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Database connection failed"
  }

  return (
    <main className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Admin</span>
            <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-6xl tracking-tight">BLOG</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/posts/new"
              className="border border-accent bg-accent/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              New post
            </Link>
            <Link
              href="/blog"
              className="border border-border/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-accent hover:text-accent transition-colors"
            >
              View blog
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="border border-border/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {dbError ? (
          <div className="border border-destructive/40 p-6 space-y-2">
            <p className="font-mono text-xs text-destructive">Could not load posts.</p>
            <p className="font-mono text-[10px] text-muted-foreground">{dbError}</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              Set DATABASE_URL in .env.local and run{" "}
              <code className="text-accent">npm run db:push</code>.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">No posts yet. Create your first one.</p>
        ) : (
          <ul className="divide-y divide-border/30 border-y border-border/30">
            {posts.map((post) => (
              <li key={post.id} className="py-5 flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-mono text-sm text-foreground hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    /blog/{post.slug} · {statusLabel(post)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0 items-center">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="border border-border/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors"
                  >
                    Edit
                  </Link>
                  {post.published && !post.archived ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="border border-border/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors"
                    >
                      Open
                    </Link>
                  ) : null}
                  <PostAdminActions id={post.id} archived={post.archived} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
