import Link from "next/link"
import { notFound } from "next/navigation"
import { PostEditor } from "@/components/admin/post-editor"
import { PostAdminActions } from "@/components/admin/post-admin-actions"
import { getPostById } from "@/lib/blog"

export const metadata = {
  title: "Edit Post — Admin — Scubafy Solutions",
  robots: { index: false, follow: false },
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

  return (
    <main className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="mb-10 text-center">
          <Link
            href="/admin"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            ← All posts
          </Link>
          <h1 className="mt-6 font-[var(--font-bebas)] text-5xl tracking-tight">EDIT POST</h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground truncate px-4">{post.title}</p>
          <div className="mt-6 flex justify-center">
            <PostAdminActions id={post.id} archived={post.archived} />
          </div>
        </div>
        <PostEditor post={post} />
      </div>
    </main>
  )
}
