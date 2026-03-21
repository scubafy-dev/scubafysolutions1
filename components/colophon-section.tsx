"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import { topicConfig, getTopicHref } from "@/lib/topics"

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate header
    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            headerRef.current?.classList.add("animate-in", "fade-in", "slide-in-from-left-12", "duration-1000")
          }
        },
        { threshold: 0.5 },
      )
      headerObserver.observe(headerRef.current)
    }

    // Animate grid columns
    if (gridRef.current) {
      const columns = gridRef.current.querySelectorAll(":scope > div")
      const gridObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            columns.forEach((col, index) => {
              const element = col as HTMLElement
              element.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000")
              element.style.setProperty("--animation-delay", `${index * 100}ms`)
            })
          }
        },
        { threshold: 0.5 },
      )
      gridObserver.observe(gridRef.current)
    }

    // Animate footer
    if (footerRef.current) {
      const footerObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            footerRef.current?.classList.add("animate-in", "fade-in", "slide-in-from-bottom-4", "duration-1000")
          }
        },
        { threshold: 0.5 },
      )
      footerObserver.observe(footerRef.current)
    }

    return () => {}
  }, [])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      {/* Contact Form */}
      <div className="mb-24 max-w-2xl mx-auto">
        <ContactForm />
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Services */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Services</h4>
          <ul className="space-y-2">
            {topicConfig.services.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getTopicHref("services", item.slug)}
                  className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Stack</h4>
          <ul className="space-y-2">
            {topicConfig.stack.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getTopicHref("stack", item.slug)}
                  className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Technologies</h4>
          <ul className="space-y-2">
            {topicConfig.technologies.map((item) => (
              <li key={item.slug}>
                <Link
                  href={getTopicHref("technologies", item.slug)}
                  className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Location</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://maps.app.goo.gl/JmSc4SQRgCUV7wyRA"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Singapore based
              </a>
            </li>
            <li className="font-mono text-xs text-foreground/80">Remote</li>
            <li className="font-mono text-xs text-foreground/80">Everywhere</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:developer@scubafy.co"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                developer@scubafy.co
              </a>
            </li>
            <li>
              <a
                href="#colophon"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Request Quote
              </a>
            </li>
          </ul>
        </div>

        {/* Year */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Year</h4>
          <ul className="space-y-2">
            <li className="font-mono text-xs text-foreground/80">2025</li>
            <li className="font-mono text-xs text-foreground/80">Ongoing</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link
            href="/about"
            className="font-mono text-[10px] text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            About
          </Link>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2026 Scubafy Pte. Ltd.
          </p>
        </div>
        <SocialLinks
          landmark
          linkClassName="font-mono text-[10px] text-muted-foreground hover:text-accent transition-colors duration-200"
        />
        <p className="font-mono text-[10px] text-muted-foreground">
          A subsidiary of{" "}
          <a
            href="https://www.scubafy.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Scubafy
          </a>
          . Building the web, one project at a time.
        </p>
      </div>
    </section>
  )
}
