"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"

export function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)

  const principles = [
    {
      number: "01",
      titleParts: [
        { text: "CUSTOM", highlight: true },
        { text: " SOLUTIONS", highlight: false },
      ],
      description: "Every project is unique. We build tailored websites and applications that fit your specific needs and goals.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "MODERN", highlight: true },
        { text: " TECH STACK", highlight: false },
      ],
      description: "We use cutting-edge technologies and frameworks to build fast, secure, and scalable applications.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "FULL ", highlight: false },
        { text: "SERVICE", highlight: true },
      ],
      description: "From design to deployment. We handle frontend, backend, APIs, hosting, and ongoing maintenance.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "RESULTS ", highlight: false },
        { text: "DRIVEN", highlight: true },
      ],
      description: "We measure success by your success. Transparent communication, on-time delivery, and measurable outcomes.",
      align: "right",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !principlesRef.current) return

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add("animate-in", "fade-in", "slide-in-from-left-12", "duration-1000")
        }
      },
      { threshold: 0.5 },
    )

    headerObserver.observe(headerRef.current)

    // Animate each principle
    const articles = principlesRef.current.querySelectorAll("article")
    articles.forEach((article, index) => {
      const isRight = principles[index].align === "right"
      article.classList.add(
        "animate-in",
        "fade-in",
        isRight ? "slide-in-from-right-12" : "slide-in-from-left-12",
        "duration-1000",
      )
      article.style.setProperty("--animation-delay", `${index * 100}ms`)
    })

    return () => {
      headerObserver.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="principles" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Approach</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">HOW WE WORK</h2>
      </div>

      {/* Staggered principles */}
      <div ref={principlesRef} className="space-y-24 md:space-y-32">
        {principles.map((principle, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              principle.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {principle.number} / {principle.titleParts[0].text.split(" ")[0]}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
              {principle.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            {/* Description */}
            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {principle.description}
            </p>

            {/* Decorative line */}
            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${principle.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
