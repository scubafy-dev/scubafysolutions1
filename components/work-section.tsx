"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Scubafy",
    medium: "Web Platform",
    description: "Complete diving platform with booking system, course management, community features, and integrated payment processing.",
    span: "",
    url: "https://www.scubafy.co/",
    logoDark: "https://ik.imagekit.io/allinaquatic/Copy_of_Untitled_Design-removebg-preview.png?updatedAt=1752047008566",
    logoLight: "https://ik.imagekit.io/allinaquatic/scubafy%20logo%20/scubafy%20logo%20light%20mode.jpeg?updatedAt=1748171262049",
    logoSize: "large" as const,
  },
  {
    title: "All In Aquatic Adventures Inc",
    medium: "Website",
    description: "A website showcasing their dive center, services, and diving adventures. Mobile-optimized design.",
    span: "",
    url: "https://www.allinscubaadventures.com/",
    logo: "https://ik.imagekit.io/allinaquatic/all%20in%20aquatic%20images/logo%20transparent.png?updatedAt=1747057853185",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    // Animate header
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add("animate-in", "fade-in", "slide-in-from-left-12", "duration-1000")
        }
      },
      { threshold: 0.5 },
    )
    headerObserver.observe(headerRef.current)

    // Animate cards
    const cards = gridRef.current.querySelectorAll("a, div")
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement
      cardElement.classList.add("animate-in", "fade-in", "slide-in-from-bottom-8", "duration-1000")
      cardElement.style.setProperty("--animation-delay", `${index * 100}ms`)
    })

    return () => {
      headerObserver.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Portfolio</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">SELECTED WORK</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Custom websites, web applications, and digital platforms. Built with modern frameworks and best practices.
        </p>
      </div>

      {/* Projects List */}
      <div ref={gridRef} className="space-y-1">
        {projects.map((project, index) => (
          <WorkCard key={index} experiment={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  experiment,
  index,
}: {
  experiment: {
    title: string
    medium: string
    description: string
    span: string
    url?: string
    logo?: string
    logoDark?: string
    logoLight?: string
    logoSize?: "large" | "default"
  }
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Determine which logo to use based on theme
  const getLogo = () => {
    if (experiment.logoDark || experiment.logoLight) {
      // Default to dark mode logo until mounted to prevent hydration mismatch
      if (!mounted) {
        return experiment.logoDark || experiment.logo
      }
      return theme === "dark" ? experiment.logoDark : experiment.logoLight
    }
    return experiment.logo
  }
  
  const logoUrl = getLogo()

  const cardClassName = "group relative cursor-pointer block w-full"

  if (experiment.url) {
    return (
      <a
        href={experiment.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-between py-6 md:py-8 border-b border-border/20 group-hover:border-accent/40 transition-colors duration-300">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-2 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground min-w-[60px] md:min-w-[80px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {logoUrl && (
                <div className={cn(
                  "relative flex-shrink-0",
                  experiment.logoSize === "large" ? "w-16 h-16 md:w-28 md:h-28" : "w-10 h-10 md:w-16 md:h-16"
                )}>
                  <Image
                    src={logoUrl}
                    alt={`${experiment.title} logo`}
                    fill
                    className="object-contain transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0.7 }}
                  />
                </div>
              )}
              <h3
                className={cn(
                  "font-[var(--font-bebas)] text-2xl md:text-5xl tracking-tight transition-colors duration-300 flex-shrink-0",
                  isHovered ? "text-accent" : "text-foreground",
                )}
              >
                {experiment.title}
              </h3>
            </div>
            <div className={cn(
              "flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0",
              logoUrl 
                ? experiment.logoSize === "large" 
                  ? "md:ml-[260px]" 
                  : "md:ml-[200px]"
                : "md:ml-[120px]"
            )}>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex-shrink-0">
                {experiment.medium}
              </span>
              <p
                className={cn(
                  "font-mono text-sm text-muted-foreground leading-relaxed transition-all duration-500 max-w-2xl",
                  isHovered ? "opacity-100" : "opacity-60",
                )}
              >
                {experiment.description}
              </p>
            </div>
          </div>
          <div className="ml-4 md:ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-accent"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </a>
    )
  }

  return (
    <div
      className={cardClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between py-6 md:py-8 border-b border-border/20 group-hover:border-accent/40 transition-colors duration-300">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 md:gap-6 mb-3 md:mb-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground min-w-[60px] md:min-w-[80px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {logoUrl && (
              <div className={cn(
                "relative flex-shrink-0",
                experiment.logoSize === "large" ? "w-16 h-16 md:w-28 md:h-28" : "w-10 h-10 md:w-16 md:h-16"
              )}>
                <Image
                  src={logoUrl}
                  alt={`${experiment.title} logo`}
                  fill
                  className="object-contain transition-opacity duration-300"
                  style={{ opacity: isHovered ? 1 : 0.7 }}
                />
              </div>
            )}
            <h3
              className={cn(
                "font-[var(--font-bebas)] text-2xl md:text-5xl tracking-tight transition-colors duration-300 flex-shrink-0",
                isHovered ? "text-accent" : "text-foreground",
              )}
            >
              {experiment.title}
            </h3>
          </div>
          <div className={cn(
            "flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0",
            logoUrl 
              ? experiment.logoSize === "large" 
                ? "md:ml-[260px]" 
                : "md:ml-[200px]"
              : "md:ml-[120px]"
          )}>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex-shrink-0">
              {experiment.medium}
            </span>
            <p
              className={cn(
                "font-mono text-sm text-muted-foreground leading-relaxed transition-all duration-500 max-w-2xl",
                isHovered ? "opacity-100" : "opacity-60",
              )}
            >
              {experiment.description}
            </p>
          </div>
        </div>
        <div className="ml-4 md:ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-accent"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
