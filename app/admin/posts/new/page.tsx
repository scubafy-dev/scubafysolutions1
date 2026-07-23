import Link from "next/link"
import { PostEditor } from "@/components/admin/post-editor"

export const metadata = {
  title: "New Post — Admin — Scubafy Solutions",
  robots: { index: false, follow: false },
}

export default function NewPostPage() {
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
          <h1 className="mt-6 font-[var(--font-bebas)] text-5xl tracking-tight">NEW POST</h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Fill the SEO boxes for stronger search and social previews.
          </p>
        </div>
        <PostEditor />
      </div>
    </main>
  )
}
