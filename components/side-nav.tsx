"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "signals", label: "Projects" },
  { id: "work", label: "Portfolio" },
  { id: "principles", label: "Approach" },
  { id: "blog", label: "Blog" },
  { id: "colophon", label: "Contact" },
]

const LOGIN_FADE_DISTANCE = 420

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [loginOpacity, setLoginOpacity] = useState(1)
  const pathname = usePathname()

  useEffect(() => {
    const updateLoginOpacity = () => {
      const next = Math.max(0, 1 - window.scrollY / LOGIN_FADE_DISTANCE)
      setLoginOpacity((prev) => (Math.abs(prev - next) < 0.01 ? prev : next))
    }

    updateLoginOpacity()
    window.addEventListener("scroll", updateLoginOpacity, { passive: true })
    return () => window.removeEventListener("scroll", updateLoginOpacity)
  }, [])

  useEffect(() => {
    // Only observe sections if we're on the home page
    if (pathname !== "/") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleNavClick = (id: string) => {
    if (pathname === "/") {
      // On home page, scroll to section
      scrollToSection(id)
    } else {
      // On other pages, navigate to home with hash
      if (id === "hero") {
        window.location.href = "/"
      } else {
        window.location.href = `/#${id}`
      }
    }
  }

  return (
    <>
      <a
        href="https://portal.scubafysolutions.com"
        aria-hidden={loginOpacity < 0.05}
        tabIndex={loginOpacity < 0.05 ? -1 : undefined}
        style={{
          opacity: loginOpacity,
          pointerEvents: loginOpacity < 0.05 ? "none" : "auto",
        }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 border border-foreground/20 bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent md:px-4 md:text-xs"
      >
        Client Login
      </a>
      <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-between border-r border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col gap-6 px-4 py-8">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="group relative flex items-center gap-3"
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                  pathname === "/" && activeSection === id ? "bg-accent scale-125" : "bg-muted-foreground/40 group-hover:bg-foreground/60",
                )}
              />
              <span
                className={cn(
                  "absolute left-6 font-mono text-[10px] uppercase tracking-widest opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:left-8 whitespace-nowrap",
                  pathname === "/" && activeSection === id ? "text-accent" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
        <div className="px-4 pb-8 flex items-center justify-center">
          <ThemeToggle className="w-10 h-10 border border-border/50 hover:border-accent/50 hover:bg-accent/10 rounded-md transition-all" />
        </div>
      </nav>
    </>
  )
}
