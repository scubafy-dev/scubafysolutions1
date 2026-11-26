import { companySocialLinks } from "@/components/social-links"
import { topicConfig, topicContent } from "@/lib/topics"
import { serviceSeo } from "@/lib/service-seo"

const APEX_HOST = "scubafysolutions.com"
const CANONICAL_HOST = "www.scubafysolutions.com"

/**
 * Origin for every absolute URL the site emits (no trailing slash).
 * Vercel answers on www and 307s the apex host to www before the app runs.
 * Canonicals must use www, or Google treats the pair as a redirect loop.
 */
function resolveSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const fallback = `https://${CANONICAL_HOST}`
  if (!configured) return fallback
  try {
    const url = new URL(configured)
    if (url.hostname === APEX_HOST || url.hostname === CANONICAL_HOST) {
      return `https://${CANONICAL_HOST}`
    }
    return url.origin
  } catch {
    return fallback
  }
}

export const siteUrl = resolveSiteUrl()

export const siteName = "Scubafy Solutions"

export const siteDescription =
  "Singapore-based studio building custom websites, web and mobile apps, AI platforms, e-commerce and fintech products, plus B2B outreach and marketing."

export const contactEmail = "contact@scubafysolutions.com"
export const bookingUrl = "https://calendly.com/amadeus-christensen-scubafy/new-meeting"

export const organizationId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`

/** Absolute URL on the host that returns 200. Rewrites the apex host to www. */
export function canonicalHref(pathOrUrl: string) {
  const url = new URL(pathOrUrl, siteUrl)
  if (url.hostname === APEX_HOST) {
    url.protocol = "https:"
    url.hostname = CANONICAL_HOST
  }
  return url.toString()
}

export function absoluteUrl(path = "/") {
  return canonicalHref(path)
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
