import type { Metadata } from "next"
import { AboutSection } from "@/components/about-section"
import { SideNav } from "@/components/side-nav"
import { breadcrumbJsonLd, founders, jsonLdString, organizationId } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About Us: Founders and Team",
  description:
    "Meet Scubafy Solutions, a Singapore-based software studio founded by Amadeus Christensen and Joseph Lorek, building custom web, app and AI products.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Scubafy Solutions",
    description: "The founders and team behind Scubafy Solutions, a custom software studio based in Singapore.",
    url: "/about",
  },
}

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "/about",
    mainEntity: { "@id": organizationId },
  },
  ...founders.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.name,
    jobTitle: f.jobTitle,
    worksFor: { "@id": organizationId },
    sameAs: [f.url],
  })),
  breadcrumbJsonLd([{ name: "About", path: "/about" }]),
]

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(aboutJsonLd) }} />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <AboutSection />
      </div>
    </main>
  )
}

