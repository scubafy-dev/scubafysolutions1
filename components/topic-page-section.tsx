"use client"

import Link from "next/link"
import { topicContent, type TopicCategory } from "@/lib/topics"
import { notFound } from "next/navigation"

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
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight uppercase">
          {content.title}
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-10">
        <p className="font-mono text-sm text-foreground/80 leading-relaxed">
          {content.description}
        </p>
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
                <h3 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">
                  {section.heading}
                </h3>
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
        <div className="pt-8 border-t border-border/20">
          <Link
            href="/#colophon"
            className="font-mono text-xs text-accent hover:underline uppercase tracking-wider"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </section>
  )
}
