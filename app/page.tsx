import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { HomeBlogSection } from "@/components/home-blog-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { HomeHashScroll } from "@/components/home-hash-scroll"
import { companySocialLinks } from "@/components/social-links"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://scubafysolutions.com"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Scubafy Solutions",
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  description:
    "Scubafy Solutions is a web development and digital solutions company building websites and web applications.",
  email: "contact@scubafysolutions.com",
  address: { "@type": "PostalAddress", addressCountry: "SG" },
  sameAs: companySocialLinks.map((l) => l.href),
}

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    title: "Web Development Agency | Scubafy Solutions",
    description: "Scubafy Solutions is a web development and digital solutions company.",
    url: "https://scubafysolutions.com/",
    siteName: "Scubafy Solutions",
    images: [
      {
        url: "https://scubafysolutions.com/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Scubafy Solutions logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Web Development Agency | Scubafy Solutions",
    description: "Scubafy Solutions is a web development and digital solutions company.",
    images: ["https://scubafysolutions.com/android-chrome-512x512.png"],
  },
}

const processSteps = [
  {
    title: "Discovery and Technical Audit",
    text: "We learn how your business runs and where your website or manual process is holding sales back. Then we agree on what to build.",
  },
  {
    title: "Architecture and Design",
    text: "We plan the structure of the product and design the experience around how your customers actually use it.",
  },
  {
    title: "Development and QA",
    text: "We build custom websites, web and mobile apps, APIs and AI platforms with modern frameworks, from frontend to backend.",
  },
  {
    title: "Launch and Support",
    text: "We launch the product and host it, with payment integrations, booking flows or storefronts where you need them. We keep it updated and maintained after launch, so you aren't left to run it alone. We can also run outbound email outreach: prospect lists, dedicated mailboxes and three-step sequences.",
  },
]

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeHashScroll />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <SignalsSection />
        <WorkSection />
        <PrinciplesSection />
        <section id="process" className="relative py-24 pl-6 md:pl-28 pr-6 md:pr-12">
          <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">OUR WEB DEVELOPMENT PROCESS</h2>
          <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            Scubafy Solutions is a web development and digital solutions company. We build websites, web applications,
            mobile apps, APIs and AI platforms, and we stay involved after launch with hosting and maintenance.
          </p>
          <ol className="mt-12 grid gap-10 md:grid-cols-2 max-w-4xl">
            {processSteps.map((step) => (
              <li key={step.title}>
                <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight">{step.title}</h3>
                <p className="mt-3 font-mono text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <HomeBlogSection />
        <ColophonSection />
      </div>
    </main>
  )
}
