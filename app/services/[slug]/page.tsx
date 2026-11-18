import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { topicConfig, topicContent } from "@/lib/topics"
import { serviceSeo } from "@/lib/service-seo"
import { TopicPageSection } from "@/components/topic-page-section"
import { SideNav } from "@/components/side-nav"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  defaultOgImage,
  faqJsonLd,
  jsonLdString,
  organizationId,
  siteName,
} from "@/lib/seo"

export function generateStaticParams() {
  return topicConfig.services.map((t) => ({ slug: t.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = topicContent.services[slug]
  if (!content) return { title: "Service" }
  const description = serviceSeo[slug]?.metaDescription ?? content.description
  const path = `/services/${slug}`
  return {
    title: `${content.title} Services`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${content.title} Services | ${siteName}`,
      description,
      url: absoluteUrl(path),
      siteName,
      images: [defaultOgImage],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const content = topicContent.services[slug]
  if (!content) notFound()
  const seo = serviceSeo[slug]
  const path = `/services/${slug}`

  const schemas: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: content.title,
      serviceType: content.title,
      description: seo?.metaDescription ?? content.description,
      url: absoluteUrl(path),
      provider: { "@id": organizationId },
      areaServed: "Worldwide",
      audience: seo ? { "@type": "Audience", audienceType: seo.audience } : undefined,
    },
    breadcrumbJsonLd([
      { name: "Services", path: "/#signals" },
      { name: content.title, path },
    ]),
  ]
  if (seo?.faqs.length) schemas.push(faqJsonLd(seo.faqs))

  return (
    <main className="relative min-h-screen">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />
      ))}
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative z-10">
        <TopicPageSection category="services" slug={slug} />
      </div>
    </main>
  )
}
