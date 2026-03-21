"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { SocialLinks } from "@/components/social-links"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const progress = 1 - entry.intersectionRatio
          const translateY = -100 * Math.min(progress * 2, 1)
          const opacity = 1 - Math.min(progress * 2, 1)
          contentRef.current!.style.transform = `translateY(${translateY}px)`
          contentRef.current!.style.opacity = String(opacity)
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      },
    )

    observer.observe(sectionRef.current!)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12 pt-14 md:pt-20"
    >
      <AnimatedNoise opacity={0.03} />

      {/* Left vertical labels */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          SCUBAFY
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        <SplitFlapAudioProvider>
          <div className="relative">
            <div className="flex flex-col">
              <SplitFlapText text="SCUBAFY" speed={80} />
              <SplitFlapText text="SOLUTIONS" speed={80} />
            </div>
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-accent text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
          Web Development & Digital Solutions
        </h2>

        <p className="mt-12 max-w-md font-mono text-sm text-foreground leading-relaxed">
          We design and develop custom websites, web applications, mobile apps, and digital platforms. Full-stack development services from frontend to backend, cloud infrastructure, APIs, e-commerce solutions, and more. Delivering scalable solutions that grow with your business.
        </p>

        <div className="mt-16 flex flex-wrap items-center gap-4 md:gap-8">
          <a
            href="#work"
            aria-label="View Our Work"
            onClick={(e) => {
              e.preventDefault()
              const workSection = document.getElementById("work")
              if (workSection) {
                workSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="group inline-flex items-center gap-3 border border-foreground/20 px-4 md:px-6 py-2 md:py-3 font-mono text-xs uppercase tracking-widest text-foreground touch-manipulation active:opacity-80 hover-only-border-accent hover-only-text-accent transition-colors duration-200"
          >
            <ScrambleTextOnHover text="View Our Work" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover-only-rotate" />
          </a>
          <a
            href="#signals"
            aria-label="What We Do"
            onClick={(e) => {
              e.preventDefault()
              const signalsSection = document.getElementById("signals")
              if (signalsSection) {
                signalsSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
            className="group inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground touch-manipulation active:opacity-80 hover-only-border-accent hover-only-text-accent transition-colors duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover-only-scale flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M7 0L8.75 5.25L14 7L8.75 8.75L7 14L5.25 8.75L0 7L5.25 5.25L7 0Z"
                fill="currentColor"
              />
            </svg>
            <ScrambleTextOnHover text="What We Do" as="span" duration={0.6} />
          </a>
          <Link
            href="/about"
            aria-label="About"
            onClick={() => {
              // Smooth scroll to top before navigation
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group inline-flex items-center gap-2 border border-foreground/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground touch-manipulation active:opacity-80 hover-only-border-accent hover-only-text-accent transition-colors duration-200"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-200 group-hover-only-scale flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M7 0C3.134 0 0 3.134 0 7C0 10.866 3.134 14 7 14C10.866 14 14 10.866 14 7C14 3.134 10.866 0 7 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6Z"
                fill="currentColor"
              />
              <path
                d="M7 3.5C6.475 3.5 6.05 3.925 6.05 4.45C6.05 4.975 6.475 5.4 7 5.4C7.525 5.4 7.95 4.975 7.95 4.45C7.95 3.925 7.525 3.5 7 3.5Z"
                fill="currentColor"
              />
              <path
                d="M7 6.3C6.475 6.3 6.05 6.725 6.05 7.25V10.5C6.05 11.025 6.475 11.45 7 11.45C7.525 11.45 7.95 11.025 7.95 10.5V7.25C7.95 6.725 7.525 6.3 7 6.3Z"
                fill="currentColor"
              />
            </svg>
            <ScrambleTextOnHover text="About" as="span" duration={0.6} />
          </Link>
        </div>

        <div className="mt-14 max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Social</p>
          <SocialLinks className="opacity-90" listClassName="gap-x-5 gap-y-2" />
        </div>
      </div>
    </section>
  )
}
