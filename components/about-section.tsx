"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { SocialLinks } from "@/components/social-links"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

    // Animate content
    if (contentRef.current) {
      const contentObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            contentRef.current?.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000")
          }
        },
        { threshold: 0.5 },
      )
      contentObserver.observe(contentRef.current)
    }

    return () => {}
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">About</span>
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
          >
            ← Back to Home
          </Link>
        </div>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHO WE ARE</h2>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-6">
          <p className="font-mono text-sm text-foreground/80 leading-relaxed">
            Scubafy Solutions is a subsidiary of{" "}
            <a
              href="https://scubafy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Scubafy
            </a>
            , specializing in web development and digital solutions. Behind every project is a dedicated team of professionals committed to delivering results.
          </p>

          <p className="font-mono text-sm text-foreground/80 leading-relaxed">
            We are a team of professionals—experienced developers, designers, and specialists—dedicated to building high-quality web applications, websites, and digital platforms. Our expertise spans the full stack—from modern frontend frameworks to robust backend systems.
          </p>

          <p className="font-mono text-sm text-foreground/80 leading-relaxed">
            Whether you need a custom web application, an e-commerce platform, a mobile-responsive website,
            or API development services, we deliver solutions that are scalable, maintainable, and aligned
            with your business objectives.
          </p>

          <div className="pt-6 border-t border-border/20">
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Follow us
            </h4>
            <SocialLinks listClassName="flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2" />
          </div>
        </div>

        {/* Additional info grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/20">
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Focus
            </h4>
            <ul className="space-y-2 font-mono text-xs text-foreground/80">
              <li>• Custom Web Development</li>
              <li>• Full-Stack Applications</li>
              <li>• API & Backend Services</li>
              <li>• E-Commerce Solutions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Our Approach
            </h4>
            <ul className="space-y-2 font-mono text-xs text-foreground/80">
              <li>• Client-Centric Development</li>
              <li>• Modern Technology Stack</li>
              <li>• Agile Methodology</li>
              <li>• Continuous Support</li>
            </ul>
          </div>
        </div>

        {/* Leadership */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col items-center">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Leadership
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 max-w-2xl sm:max-w-none w-full sm:w-auto justify-items-center">
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border/30 mb-4 ring-2 ring-accent/20">
                <Image
                  src="https://ik.imagekit.io/hiw6wzfdz/founders/F5AB0843-7A64-4DD1-9383-F7D9D6F29BAE.JPG"
                  alt="Amadeus Christensen"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h5 className="font-mono text-sm font-medium text-foreground">Amadeus Christensen</h5>
              <p className="font-mono text-xs text-accent uppercase tracking-wider mt-1">Co-Founder & CTO</p>
              <p className="font-mono text-xs text-foreground/90 leading-relaxed mt-4">
                I lead our technical direction and architecture at Scubafy Solutions. I grew up around dive centers and resorts and saw the struggle—clunky tools, outdated systems, and operations that don&apos;t talk to each other. My background in Electrical Engineering and Computer Science, plus hands-on work in real estate development, gave me the skills to do something about it. I focus on building software that actually holds up: clean code, sensible architecture, and solutions that grow with your business instead of holding it back.
              </p>
              <Link
                href="https://www.linkedin.com/in/amadeuschristensen/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider text-accent border border-accent/50 hover:bg-accent/10 px-4 py-2.5 transition-colors duration-200"
                aria-label="Connect with Amadeus Christensen on LinkedIn"
              >
                Connect
              </Link>
            </div>
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border/30 mb-4 ring-2 ring-accent/20">
                <Image
                  src="https://ik.imagekit.io/hiw6wzfdz/founders/1773886650664.png"
                  alt="Joseph Lorek"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <h5 className="font-mono text-sm font-medium text-foreground">Joseph Lorek</h5>
              <p className="font-mono text-xs text-accent uppercase tracking-wider mt-1">Co-Founder & CEO</p>
              <p className="font-mono text-xs text-foreground/90 leading-relaxed mt-4">
                I co-founded Scubafy Solutions to help businesses turn complex operational needs into reliable digital products.
                With a background in global procurement and years of experience managing large-scale luxury resort projects through Interior Resource Network Inc., I&apos;ve built a career on delivering systems where precision and reliability are non-negotiable. That foundation drives my approach to every project we take on, ensuring our software solutions are as efficient as they are scalable.
              </p>
              <Link
                href="https://www.linkedin.com/in/joseph-alexander-lorek-a6a8b5294/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider text-accent border border-accent/50 hover:bg-accent/10 px-4 py-2.5 transition-colors duration-200"
                aria-label="Connect with Joseph Lorek on LinkedIn"
              >
                Connect
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

