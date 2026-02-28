import { topicConfig } from "@/lib/topics"
import { TopicPageSection } from "@/components/topic-page-section"
import { SideNav } from "@/components/side-nav"
import type { Metadata } from "next"
import { topicContent } from "@/lib/topics"

export function generateStaticParams() {
  return topicConfig.services.map((t) => ({ slug: t.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const content = topicContent.services[slug]
  if (!content) return { title: "Service | Scubafy Solutions" }
  return {
    title: `${content.title} | Scubafy Solutions`,
    description: content.description,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="relative z-10">
        <TopicPageSection category="services" slug={slug} />
      </div>
    </main>
  )
}
