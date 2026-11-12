import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"
import { SideNav } from "@/components/side-nav"

export const metadata: Metadata = {
  title: "Contact — Scubafy Solutions",
  description: "Tell us what you need built. We'll reply by email.",
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <section className="relative py-32 pl-6 pr-6 md:pl-28 md:pr-12">
          <div className="mb-16 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Contact</span>
            <h1 className="mt-4 font-[var(--font-bebas)] text-5xl tracking-tight md:text-7xl">GET IN TOUCH</h1>
          </div>

          <div className="mx-auto mb-16 max-w-2xl">
            <ContactForm />
          </div>

          <p className="text-center font-mono text-xs text-muted-foreground">
            Or email{" "}
            <a href="mailto:contact@scubafysolutions.com" className="text-foreground hover:text-accent">
              contact@scubafysolutions.com
            </a>
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
