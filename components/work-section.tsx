"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type Project = {
  title: string
  medium: string
  description: string
  url?: string
  logo?: string
  logoDark?: string
  logoLight?: string
  logoSize?: "large" | "default" | "wide"
  nda?: boolean
  variant?: "default" | "more"
}

const projects: Project[] = [
  {
    title: "Scubafy",
    medium: "Web Platform",
    description:
      "Complete diving platform with booking system, course management, community features, and integrated payment processing.",
    url: "https://www.scubafy.co/",
    logo:
      "https://ik.imagekit.io/allinaquatic/scubafy%20logo%20/scubafy%20logo%20light%20mode.jpeg?updatedAt=1748171262049",
    logoSize: "wide" as const,
  },
  {
    title: "Sea Explorers",
    medium: "Resort Group",
    description:
      "Modernized their site and built a custom CRM, loyalty system, and direct booking flow that saves ~18% vs OTA fees — plus a multi-resort admin for reservations, transfers, dive ops, and financials.",
    url: "/work/sea-explorers",
    logoDark:
      "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/SEA%20EXPLORES/Sea%20Explorers%20Logo%20for%20dark%20background.png",
    logoLight:
      "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/SEA%20EXPLORES/Sea%20Explorers%20Logo%20for%20light%20background.png",
    logoSize: "large" as const,
  },
  {
    title: "All In Aquatic Adventures Inc",
    medium: "Website",
    description:
      "A website showcasing their dive center, services, and diving adventures. Mobile-optimized design.",
    url: "https://www.allinscubaadventures.com/",
    logo: "https://ik.imagekit.io/allinaquatic/all%20in%20aquatic%20images/logo%20transparent.png?updatedAt=1747057853185",
  },
  {
    title: "3× Confidential",
    medium: "Projects",
    description:
      "Three additional engagements spanning web applications, SaaS platforms, and digital products. Details withheld under signed NDAs.",
    nda: true,
  },
  {
    title: "And Many More",
    medium: "Ongoing",
    description:
      "Websites, apps, and platforms for clients across industries — more work shipping every month.",
    url: "/#colophon",
    variant: "more",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      loop: true,
    },
    [autoplay.current],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      viewportRef.current = node
      emblaRef(node)
    },
    [emblaRef],
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!headerRef.current) return

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerRef.current?.classList.add(
            "animate-in",
            "fade-in",
            "slide-in-from-left-12",
            "duration-1000",
          )
        }
      },
      { threshold: 0.5 },
    )
    headerObserver.observe(headerRef.current)

    return () => headerObserver.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [scrollPrev, scrollNext])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !emblaApi) return

    let accumulated = 0
    let cooldown = false
    let resetTimer: ReturnType<typeof setTimeout> | undefined
    let cooldownTimer: ReturnType<typeof setTimeout> | undefined

    const onWheel = (event: WheelEvent) => {
      // Only hijack clearly horizontal gestures so vertical page scroll still works
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      if (cooldown) return

      accumulated += event.deltaX
      if (Math.abs(accumulated) < 40) {
        clearTimeout(resetTimer)
        resetTimer = setTimeout(() => {
          accumulated = 0
        }, 200)
        return
      }

      if (accumulated > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()

      accumulated = 0
      cooldown = true
      cooldownTimer = setTimeout(() => {
        cooldown = false
      }, 400)
    }

    viewport.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      viewport.removeEventListener("wheel", onWheel)
      clearTimeout(resetTimer)
      clearTimeout(cooldownTimer)
    }
  }, [emblaApi])

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-28 pl-6 md:pl-28 pr-0 overflow-hidden">
      <div ref={headerRef} className="mb-10 md:mb-12 flex items-end justify-between pr-6 md:pr-12">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Portfolio</span>
          <h2 className="mt-3 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">SELECTED WORK</h2>
        </div>
        <div className="hidden md:flex flex-col items-end gap-4">
          <p className="max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
            Custom websites, web applications, and digital platforms. Built with modern frameworks and best
            practices.
          </p>
          <div className="flex items-center gap-3">
            <CarouselButton direction="prev" onClick={scrollPrev} />
            <CarouselButton direction="next" onClick={scrollNext} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={setViewportRef}>
        <div className="flex touch-pan-y">
          {projects.map((project, index) => (
            <div
              key={`${project.title}-${project.medium}-${index}`}
              className="min-w-0 shrink-0 grow-0 basis-[82%] sm:basis-[64%] md:basis-[52%] lg:basis-[42%] pr-3 md:pr-5"
            >
              <ProjectSlide
                project={project}
                index={index}
                isActive={selectedIndex === index}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pr-6 md:pr-12 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-foreground tabular-nums">
            {String(selectedIndex + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-xs text-muted-foreground">/</span>
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex-1 max-w-xs h-px bg-border/30 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 ease-out"
            style={{ width: `${((selectedIndex + 1) / projects.length) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CarouselButton direction="prev" onClick={scrollPrev} />
          <CarouselButton direction="next" onClick={scrollNext} />
        </div>

        <div className="hidden md:flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to project ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 transition-all duration-300",
                selectedIndex === index ? "w-8 bg-accent" : "w-1.5 bg-border/50 hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next"
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="flex h-9 w-9 items-center justify-center border border-border/40 text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M12.5 5L7.5 10L12.5 15" : "M7.5 5L12.5 10L7.5 15"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

function ProjectSlide({
  project,
  index,
  isActive,
}: {
  project: Project
  index: number
  isActive: boolean
}) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoUrl = (() => {
    if (project.logoDark || project.logoLight) {
      if (!mounted) return project.logoDark || project.logo
      return theme === "dark" ? project.logoDark : project.logoLight
    }
    return project.logo
  })()

  if (project.variant === "more") {
    const moreCard = (
      <div
        className={cn(
          "relative h-full min-h-[340px] md:min-h-[380px] overflow-hidden border p-5 md:p-7 flex flex-col justify-between transition-all duration-500",
          isActive
            ? "border-accent/50 bg-accent/[0.08]"
            : "border-border/20 bg-transparent opacity-60",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
          aria-hidden="true"
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
            {project.medium}
          </span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center py-8">
          <p
            className={cn(
              "font-[var(--font-bebas)] text-[clamp(4rem,12vw,7rem)] leading-[0.85] tracking-tight transition-colors duration-300",
              isActive ? "text-accent" : "text-muted-foreground",
            )}
          >
            +
          </p>
          <h3
            className={cn(
              "mt-2 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight transition-colors duration-300",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {project.title}
          </h3>
        </div>

        <div className="relative space-y-4">
          <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
            {project.description}
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Let&apos;s build yours
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    )

    if (project.url) {
      const isExternal = project.url.startsWith("http")
      return (
        <a
          href={project.url}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {moreCard}
        </a>
      )
    }

    return <div className="h-full">{moreCard}</div>
  }

  const inner = (
    <div
      className={cn(
        "relative h-full min-h-[340px] md:min-h-[380px] border border-border/30 p-5 md:p-7 flex flex-col justify-between transition-all duration-500",
        isActive
          ? "bg-foreground/[0.03] border-accent/40"
          : "bg-transparent border-border/20 opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        {project.nda ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground border border-border/40 px-2 py-1">
            NDA
          </span>
        ) : (
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
            {project.medium}
          </span>
        )}
      </div>

      <div className="my-6 md:my-8 flex flex-1 items-center justify-center">
        {logoUrl ? (
          project.logoSize === "wide" ? (
            <div
              className={cn(
                "flex items-center justify-center transition-transform duration-500",
                isActive ? "scale-100" : "scale-90",
              )}
            >
              <Image
                src={logoUrl}
                alt={`${project.title} logo`}
                width={280}
                height={100}
                className="h-12 w-auto md:h-16 object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative transition-transform duration-500",
                project.logoSize === "large" ? "w-20 h-20 md:w-28 md:h-28" : "w-16 h-16 md:w-20 md:h-20",
                isActive ? "scale-100" : "scale-90",
              )}
            >
              <Image
                src={logoUrl}
                alt={`${project.title} logo`}
                fill
                sizes="(max-width: 768px) 80px, 112px"
                className="object-contain"
                unoptimized
              />
            </div>
          )
        ) : project.nda ? (
          <div
            className={cn(
              "relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center border border-dashed border-border/40 transition-transform duration-500",
              isActive ? "scale-100" : "scale-90",
            )}
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,var(--border)_6px,var(--border)_7px)] opacity-30" />
            <span className="relative font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Private
            </span>
          </div>
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <h3
            className={cn(
              "font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
              isActive ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {project.title}
          </h3>
          {project.nda && (
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Undisclosed · Covered by NDA
            </span>
          )}
          {!project.nda && (
            <span className="md:hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {project.medium}
            </span>
          )}
        </div>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
          {project.description}
        </p>
        {project.url && (
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent pt-2">
            View project
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  )

  if (project.url) {
    const isExternal = project.url.startsWith("http")

    if (isExternal) {
      return (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {inner}
        </a>
      )
    }

    return (
      <a
        href={project.url}
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {inner}
      </a>
    )
  }

  return <div className="h-full">{inner}</div>
}
