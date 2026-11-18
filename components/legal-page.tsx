import Link from "next/link"
import { SideNav } from "@/components/side-nav"

export type LegalSection = { heading: string; paragraphs?: string[]; bullets?: string[] }

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <article className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Legal</span>
            <Link
              href="/"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight uppercase">{title}</h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Last updated <time dateTime={updated}>{updated}</time>
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="font-mono text-sm text-foreground/80 leading-relaxed">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} className="space-y-3">
              <h2 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="font-mono text-sm text-foreground/80 leading-relaxed">
                  {p}
                </p>
              ))}
              {s.bullets?.length ? (
                <ul className="space-y-2 font-mono text-sm text-foreground/80 list-disc pl-5">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
