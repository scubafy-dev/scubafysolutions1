import Link from "next/link"
import { LoginForm } from "@/components/admin/login-form"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Admin Login — Scubafy Solutions",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session) redirect("/admin")

  return (
    <main className="relative min-h-screen px-6 md:px-12 py-24">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative z-10 max-w-lg">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Admin</span>
        <h1 className="mt-4 font-[var(--font-bebas)] text-5xl tracking-tight">SIGN IN</h1>
        <p className="mt-3 mb-10 font-mono text-xs text-muted-foreground">
          Restricted area. Use your admin email to continue.
        </p>
        <LoginForm />
        <Link
          href="/"
          className="inline-block mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </main>
  )
}
