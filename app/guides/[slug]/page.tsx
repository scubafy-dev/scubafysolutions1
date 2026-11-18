import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SideNav } from "@/components/side-nav"
import { getGuide, guides } from "@/lib/guides"
import {
  absoluteUrl,
  bookingUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdString,
  organizationId,
  siteName,
} from "@/lib/seo"

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: "Guide" }
  const path = `/guides/${slug}`
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${guide.metaTitle} | ${siteName}`,
      description: guide.metaDescription,
      url: absoluteUrl(path),
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
    },
    twitter: { card: "summary_large_image", title: guide.metaTitle, description: guide.metaDescription },
  }
}

const h2 = "font-mono text-xs font-medium text-foreground uppercase tracking-wider"
const body = "font-mono text-sm text-foreground/80 leading-relaxed"

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  const path = `/guides/${slug}`

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription,
      url: absoluteUrl(path),
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: absoluteUrl(path),
    },
    faqJsonLd(guide.faqs),
    breadcrumbJsonLd([{ name: guide.metaTitle, path }]),
  ]

  return (
    <main className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schemas) }} />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <article className="relative z-10 py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Guide</span>
            <Link
              href="/"
              className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight uppercase">{guide.title}</h1>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            By {siteName} · Updated{" "}
            <time dateTime={guide.dateModified}>
              {new Intl.DateTimeFormat("en-SG", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              }).format(new Date(guide.dateModified))}
            </time>
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          <section className="border-l-2 border-accent pl-4 space-y-2">
            <h2 className={h2}>The short answer</h2>
            <p className={body}>{guide.answer}</p>
          </section>

          {guide.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className={h2}>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className={body}>
                  {p}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="space-y-2 font-mono text-sm text-foreground/80">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-accent" aria-hidden="true">
                        •
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="space-y-6 pt-4 border-t border-border/20">
            <h2 className={h2}>Frequently asked questions</h2>
            <dl className="space-y-6">
              {guide.faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <dt className="font-mono text-sm text-foreground">{faq.question}</dt>
                  <dd className={body}>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="space-y-3 pt-4 border-t border-border/20">
            <h2 className={h2}>Related</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {guide.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-mono text-xs text-accent hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="pt-8 border-t border-border/20 flex flex-wrap gap-6">
            <Link href="/contact" className="font-mono text-xs text-accent hover:underline uppercase tracking-wider">
              Request a quote →
            </Link>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground hover:text-accent uppercase tracking-wider"
            >
              Or book a call →
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
