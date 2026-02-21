"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Web Development",
    note: "Custom websites and web applications built with modern frameworks. Responsive, fast, and optimized for performance.",
  },
  {
    title: "App Development",
    note: "Native iOS and Android mobile applications, plus cross-platform solutions. From concept to app store deployment.",
  },
  {
    title: "E-Commerce Solutions",
    note: "Complete online stores with payment processing, inventory management, and admin dashboards.",
  },
  {
    title: "API & Backend",
    note: "Scalable backend architecture with REST/GraphQL APIs, microservices, authentication, and cloud infrastructure.",
  },
  {
    title: "Cloud Infrastructure",
    note: "DevOps, deployment, and cloud services. We handle hosting, scaling, and infrastructure management.",
  },
  {
    title: "IT Consulting",
    note: "Technology strategy, system integration, and ongoing support. We help you make the right technical decisions.",
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true)
  const [desktopArrowOpacity, setDesktopArrowOpacity] = useState(1)
  const [showBackArrow, setShowBackArrow] = useState(false)
  const [desktopBackArrowOpacity, setDesktopBackArrowOpacity] = useState(0)

  const handleArrowClick = (direction: "forward" | "backward") => {
    const scrollContainer = cardsRef.current
    if (!scrollContainer) return

    // Calculate scroll amount: one card width + gap (320px + 32px = 352px)
    const cardWidth = 320 // w-80 = 320px
    const gap = 32 // gap-8 = 32px
    const scrollAmount = cardWidth + gap

    // Get current scroll position
    const currentScroll = scrollContainer.scrollLeft
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
    
    // Calculate target scroll position
    let targetScroll: number
    if (direction === "forward") {
      targetScroll = Math.min(currentScroll + scrollAmount, maxScroll)
    } else {
      targetScroll = Math.max(currentScroll - scrollAmount, 0)
    }

    // Smooth scroll to target position
    scrollContainer.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    const scrollContainer = cardsRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
      
      // Mobile: Show forward indicator when at the first card (scrollLeft is 0 or very close)
      // Hide indicator when user has scrolled away
      if (scrollLeft <= 10) {
        setShowSwipeIndicator(true)
      } else {
        setShowSwipeIndicator(false)
      }

      // Mobile: Show back arrow when scrolled away from start
      setShowBackArrow(scrollLeft > 10)

      // Desktop forward arrow: Calculate opacity based on scroll position
      // Start fading when scroll begins, fully fade when scrolled ~30% of the way
      const fadeStart = 0
      const fadeEnd = maxScroll * 0.3
      let forwardOpacity = 1
      
      if (scrollLeft > fadeStart) {
        if (scrollLeft >= fadeEnd) {
          forwardOpacity = 0
        } else {
          // Linear fade between fadeStart and fadeEnd
          forwardOpacity = 1 - (scrollLeft / fadeEnd)
        }
      }
      
      setDesktopArrowOpacity(forwardOpacity)

      // Desktop back arrow: Show when scrolled, fade in as user scrolls
      // Start appearing when scrolled, fully visible when scrolled ~10% of the way
      const backFadeStart = 0
      const backFadeEnd = maxScroll * 0.1
      let backOpacity = 0
      
      if (scrollLeft > backFadeStart) {
        if (scrollLeft >= backFadeEnd) {
          backOpacity = 1
        } else {
          // Linear fade between backFadeStart and backFadeEnd
          backOpacity = scrollLeft / backFadeEnd
        }
      }
      
      setDesktopBackArrowOpacity(backOpacity)
    }

    // Initial check on mount
    handleScroll()

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section id="signals" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12 animate-in fade-in slide-in-from-left-12 duration-1000">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Services</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">WHAT WE DO</h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div
          ref={cardsRef}
          className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Mobile arrows - only visible on mobile, at the bottom */}
        <div className="absolute bottom-0 right-6 left-6 md:hidden z-10 flex items-center justify-between pointer-events-none">
          {/* Back arrow - left side */}
          <button
            onClick={() => handleArrowClick("backward")}
            className={cn(
              "flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-t border-t border-l border-r border-border/30 hover:bg-background/95 active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation pointer-events-auto",
              showBackArrow ? "opacity-100" : "opacity-0"
            )}
            aria-label="Scroll to previous service"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent animate-bounce-x"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Forward arrow - right side */}
          <button
            onClick={() => handleArrowClick("forward")}
            className={cn(
              "flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-t border-t border-l border-r border-border/30 hover:bg-background/95 active:scale-95 transition-all duration-200 cursor-pointer touch-manipulation pointer-events-auto",
              showSwipeIndicator ? "opacity-100" : "opacity-0"
            )}
            aria-label="Scroll to next service"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Swipe</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent animate-bounce-x"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop back arrow - visible on desktop, left side */}
        <div 
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center"
          style={{ 
            opacity: desktopBackArrowOpacity,
            transition: "opacity 0.3s ease-out"
          }}
        >
          <button
            onClick={() => handleArrowClick("backward")}
            className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded border border-border/30 hover:bg-background/95 hover:border-accent/50 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Scroll to previous service"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent animate-bounce-x"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop forward arrow - visible on desktop, right side, fades on scroll */}
        <div 
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center"
          style={{ 
            opacity: desktopArrowOpacity,
            transition: "opacity 0.3s ease-out"
          }}
        >
          <button
            onClick={() => handleArrowClick("forward")}
            className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded border border-border/30 hover:bg-background/95 hover:border-accent/50 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Scroll to next service"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent animate-bounce-x"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: { title: string; note: string }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700",
      )}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Card with paper texture effect */}
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        {/* Top torn edge effect */}
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        {/* Service number */}
        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>

        {/* Divider line */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        {/* Description */}
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">{service.note}</p>

        {/* Bottom right corner fold effect */}
        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      {/* Shadow/depth layer */}
      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
