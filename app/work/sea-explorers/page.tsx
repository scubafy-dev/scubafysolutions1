import type { Metadata } from "next"
import { SideNav } from "@/components/side-nav"
import { SeaExplorersProject } from "@/components/sea-explorers-project"
import { absoluteUrl, breadcrumbJsonLd, jsonLdString, organizationId } from "@/lib/seo"

const description =
  "Case study: direct booking, CRM, loyalty and a multi-resort admin for Sea Explorers Philippines, cutting reliance on ~18% OTA commissions."

export const metadata: Metadata = {
  title: "Sea Explorers Case Study: Direct Booking and CRM",
  description,
  alternates: { canonical: "/work/sea-explorers" },
  openGraph: {
    type: "article",
    title: "Sea Explorers Case Study | Scubafy Solutions",
    description,
    url: "/work/sea-explorers",
  },
  twitter: { card: "summary_large_image", title: "Sea Explorers Case Study | Scubafy Solutions", description },
}

const caseStudyJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sea Explorers Philippines: direct booking, CRM, loyalty and multi-resort admin",
    description,
    url: absoluteUrl("/work/sea-explorers"),
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    about: { "@type": "Organization", name: "Sea Explorers Philippines" },
  },
  breadcrumbJsonLd([
    { name: "Work", path: "/#work" },
    { name: "Sea Explorers", path: "/work/sea-explorers" },
  ]),
]

export default function SeaExplorersPage() {
  return (
    <main className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(caseStudyJsonLd) }} />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <SeaExplorersProject />
      </div>
    </main>
  )
}
