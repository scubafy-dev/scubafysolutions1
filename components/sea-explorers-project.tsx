"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const resorts = [
  {
    name: "Vida Homes",
    location: "Condo Resort · Dauin, Philippines",
    logo: "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/Vida%20Homes/Vida%20Homes%20grey%20background.png",
    note: "Their condo resort brand in Dauin — we folded Vida Homes into the same booking, CRM, and loyalty stack so guests and staff get one consistent experience across the group.",
  },
  {
    name: "Pura Vida Dauin",
    location: "Beach & Dive Resort · Dauin",
    logo: "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/Pura%20Vida%20Dauin/Pura%20Vida%20Dauin%202.png",
    note: "Flagship beach and dive property. Direct booking, guest profiles, and day-to-day operations all run through the shared admin dashboard we built for the group.",
  },
  {
    name: "Pura Vida Cabilao",
    location: "Beach & Dive Resort · Cabilao",
    logo: "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/Pura%20Vida%20Cabilao/Pura%20Vida%20Cabilao%202.png",
    note: "Island sister resort to Dauin. Same systems, tailored to Cabilao — so the team can manage both locations without juggling separate tools.",
  },
  {
    name: "Ocean Vida",
    location: "Beach & Dive Resort · Malapascua",
    logo: "https://ik.imagekit.io/hiw6wzfdz/scubafy%20solutions/sea%20ex/LOGO/ocean%20vida/Ocean%20Vida%20tuquoise%20-%20Malapascua2RGB.png",
    note: "Their Malapascua beach and dive property. Brought into the same booking, CRM, and loyalty stack so the group can run Malapascua alongside Dauin and Cabilao from one place.",
  },
  {
    name: "Buena Vida",
    location: "Resort & Spa · Malapascua",
    logo: "https://ik.imagekit.io/hiw6wzfdz/scubafy%20solutions/sea%20ex/LOGO/buena%20vida%20(malapascua)/Buena%20Vida%20Logo%20RGB.png",
    note: "Resort and spa on Malapascua. Connected to the shared CRM, loyalty, and booking systems so guests and staff get one consistent experience across the Malapascua properties.",
  },
  {
    name: "M/Y Gypsy",
    location: "Liveaboard · Philippines",
    logo: "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/MY%20GYPSY/SEL-logo_dark-circle2.png",
    note: "Their liveaboard vessel under the Sea Explorers umbrella. Bookings and guest data sit alongside the land resorts in one CRM and loyalty program.",
  },
]

const highlights = [
  "Modernized public site for the Sea Explorers brand and resort group",
  "Custom Guests CRM with profiles, history, and multi-property context",
  "Loyalty program built into the same operational stack",
  "Direct booking that recovers ~18% typically lost to OTA commissions",
  "Multi-role admin for reservations, rooms, transfers, dive trips, and financials",
  "Group-wide dashboard — filter by resort or view all properties at once",
]

const modules = [
  "Reservations",
  "Guests CRM",
  "Airport Transfers",
  "Rooms & Inventory",
  "Financials",
  "Loyalty Program",
  "Analytics",
  "Staff Management",
  "Reports",
]

export function SeaExplorersProject() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const brandLogo =
    mounted && theme === "light"
      ? "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/SEA%20EXPLORES/Sea%20Explorers%20Logo%20for%20light%20background.png"
      : "https://ik.imagekit.io/hiw6wzfdz/sea%20ex/LOGO/SEA%20EXPLORES/Sea%20Explorers%20Logo%20for%20dark%20background.png"

  return (
    <section className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div className="mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Case Study
          </span>
          <Link
            href="/#work"
            className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
          >
            ← Back to Work
          </Link>
        </div>
        <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          SEA EXPLORERS
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          Resort group · Philippines · Site modernization, CRM, loyalty &amp; direct booking
        </p>
      </div>

      <div className="mb-20 flex justify-center">
        <div className="relative h-28 w-48 md:h-36 md:w-64 overflow-hidden">
          <Image
            src={brandLogo}
            alt="Sea Explorers Philippines logo"
            fill
            sizes="256px"
            className="object-contain"
            unoptimized
            priority
          />
        </div>
      </div>

      <div className="max-w-3xl space-y-8 mb-24">
        <p className="font-mono text-sm text-foreground/80 leading-relaxed">
          Sea Explorers Philippines has been welcoming divers and travelers since 1989. We
          modernized their digital presence and built the operational backbone behind it — so the
          brand, resorts, and liveaboard can run as one group instead of a patchwork of tools.
        </p>
        <p className="font-mono text-sm text-foreground/80 leading-relaxed">
          Beyond a refreshed website, we shipped a custom CRM, loyalty program, and direct booking
          flow designed to keep guests on their channels — recovering about{" "}
          <span className="text-accent">18%</span> typically taken by OTAs.
        </p>
        <p className="font-mono text-sm text-foreground/80 leading-relaxed">
          The multi-role admin dashboard is the day-to-day control center. Staff can filter by a
          single resort or view the whole group at once. The overview surfaces live KPIs — revenue,
          occupancy, active guests, upcoming arrivals, airport transfers, scheduled dive trips, and
          direct-booking share — alongside revenue analytics and booking-source breakdowns. Role-based
          access keeps operations managers, front desk, and other teams in the right parts of the
          system.
        </p>

        <ul className="space-y-3 pt-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3 font-mono text-sm text-foreground/80">
              <span className="text-accent shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Built into the platform
          </p>
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <span
                key={module}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border/40 px-3 py-1.5"
              >
                {module}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          Resort Group
        </span>
        <h2 className="mt-3 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight">
          PROPERTIES WE BUILT FOR
        </h2>
        <p className="mt-4 max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
          Each property keeps its own identity while sharing the CRM, loyalty, booking, and admin
          systems underneath.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {resorts.map((resort) => (
          <article
            key={resort.name}
            className="border border-border/30 p-6 md:p-8 flex flex-col gap-5 bg-foreground/[0.02]"
          >
            <div className="relative mx-auto h-20 w-full max-w-[200px] md:h-24 md:max-w-[220px] overflow-hidden">
              <Image
                src={resort.logo}
                alt={`${resort.name} logo`}
                fill
                sizes="220px"
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="space-y-3 border-t border-border/20 pt-5">
              <div>
                <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight">
                  {resort.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {resort.location}
                </p>
              </div>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                {resort.note}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 pt-8 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          Want something similar for your group?
        </p>
        <Link
          href="/#colophon"
          className="font-mono text-xs text-accent hover:underline uppercase tracking-wider"
        >
          Get in touch →
        </Link>
      </div>
    </section>
  )
}
