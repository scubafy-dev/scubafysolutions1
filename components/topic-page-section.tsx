"use client"

import Link from "next/link"
import { topicContent, type TopicCategory } from "@/lib/topics"
import { serviceSeo } from "@/lib/service-seo"
import { notFound } from "next/navigation"

const BOOKING_URL = "https://calendly.com/amadeus-christensen-scubafy/new-meeting"

const categoryLabels: Record<TopicCategory, string> = {
  services: "Services",
  stack: "Stack",
  technologies: "Technologies",
}

export function TopicPageSection({
  category,
  slug,
}: {
  category: TopicCategory
  slug: string
}) {
  const content = topicContent[category]?.[slug]
  if (!content) notFound()

  const categoryLabel = categoryLabels[category]
  const seo = category === "services" ? serviceSeo[slug] : undefined

  return (
    <section className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {categoryLabel}
          </span>
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
          >
            ← Back to Home
          </Link>
        </div>
        <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight uppercase">
          {content.title}
        </h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-10">
        <p className="font-mono text-sm text-foreground/80 leading-relaxed">
          {content.description}
        </p>
        {seo ? (
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">Who this is for</h2>
            <p className="font-mono text-sm text-foreground/80 leading-relaxed">{seo.audience}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-accent/50 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-accent hover:bg-accent/10 transition-colors duration-200"
              >
                Book a call
              </a>
              <Link
                href="/contact"
                className="border border-foreground/20 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors duration-200"
              >
                Request a quote
              </Link>
            </div>
          </div>
        ) : null}
        {content.paragraphs && content.paragraphs.length > 0 && (
          <div className="space-y-4">
            {content.paragraphs.map((para, i) => (
              <p key={i} className="font-mono text-sm text-foreground/80 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}
        {content.bullets && content.bullets.length > 0 && (
          <ul className="space-y-2 font-mono text-sm text-foreground/80">
            {content.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {content.sections && content.sections.length > 0 && (
          <div className="space-y-10 pt-4 border-t border-border/20">
            {content.sections.map((section, i) => (
              <div key={i} className="space-y-4">
                <h2 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">
                  {section.heading}
                </h2>
                {section.body && (
                  <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                    {section.body}
                  </p>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 font-mono text-sm text-foreground/80">
                    {section.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        {seo && seo.faqs.length > 0 ? (
          <div className="space-y-6 pt-4 border-t border-border/20">
            <h2 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">
              {content.title} FAQs
            </h2>
            <dl className="space-y-6">
              {seo.faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <dt className="font-mono text-sm text-foreground">{faq.question}</dt>
                  <dd className="font-mono text-sm text-foreground/80 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
        {seo && seo.related.length > 0 ? (
          <div className="space-y-3 pt-4 border-t border-border/20">
            <h2 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">Related</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {seo.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="font-mono text-xs text-accent hover:underline">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="pt-8 border-t border-border/20 flex flex-wrap gap-6">
          <Link
            href="/contact"
            className="font-mono text-xs text-accent hover:underline uppercase tracking-wider"
          >
            Request a quote for {content.title.toLowerCase()} →
          </Link>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-accent uppercase tracking-wider"
          >
            Or book a call →
          </a>
        </div>
      </div>
    </section>
  )
}
