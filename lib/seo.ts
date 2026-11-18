import { companySocialLinks } from "@/components/social-links"
import { topicConfig, topicContent } from "@/lib/topics"
import { serviceSeo } from "@/lib/service-seo"

/** Canonical origin for every absolute URL the site emits (no trailing slash). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://scubafysolutions.com").replace(/\/+$/, "")

export const siteName = "Scubafy Solutions"

export const siteDescription =
  "Singapore-based studio building custom websites, web and mobile apps, AI platforms, e-commerce and fintech products, plus B2B outreach and marketing."

export const contactEmail = "contact@scubafysolutions.com"
export const bookingUrl = "https://calendly.com/amadeus-christensen-scubafy/new-meeting"

export const organizationId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

/** Serialize JSON-LD safely for a <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export const founders = [
  {
    name: "Amadeus Christensen",
    jobTitle: "Co-Founder & CTO",
    url: "https://www.linkedin.com/in/amadeuschristensen/",
  },
  {
    name: "Joseph Lorek",
    jobTitle: "Co-Founder & CEO",
    url: "https://www.linkedin.com/in/joseph-alexander-lorek-a6a8b5294/",
  },
]

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": organizationId,
  name: siteName,
  legalName: "Scubafy Pte. Ltd.",
  url: siteUrl,
  logo: absoluteUrl("/android-chrome-512x512.png"),
  image: absoluteUrl("/android-chrome-512x512.png"),
  description: siteDescription,
  email: contactEmail,
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "Philippines" },
    { "@type": "Place", name: "Worldwide (remote)" },
  ],
  founder: founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle, sameAs: f.url })),
  knowsAbout: [
    "Custom web development",
    "Web application development",
    "Mobile app development",
    "AI platform development",
    "API development",
    "E-commerce development",
    "Fintech and payments integration",
    "Hospitality and dive resort booking systems",
    "B2B email outreach",
    "Digital marketing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software development services",
    itemListElement: topicConfig.services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        url: absoluteUrl(`/services/${s.slug}`),
        description: serviceSeo[s.slug]?.metaDescription ?? topicContent.services[s.slug]?.description,
      },
    })),
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactEmail,
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
  ],
  sameAs: companySocialLinks.map((l) => l.href),
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: siteName,
  url: siteUrl,
  publisher: { "@id": organizationId },
  inLanguage: "en",
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export const defaultOgImage = {
  url: absoluteUrl("/android-chrome-512x512.png"),
  width: 512,
  height: 512,
  alt: "Scubafy Solutions logo",
}
