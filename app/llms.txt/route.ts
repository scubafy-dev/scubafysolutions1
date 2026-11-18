import { getPublishedPosts } from "@/lib/blog"
import { guides } from "@/lib/guides"
import { serviceSeo } from "@/lib/service-seo"
import { getTopicHref, topicConfig } from "@/lib/topics"
import { bookingUrl, contactEmail, siteDescription, siteUrl } from "@/lib/seo"

export const revalidate = 3600

/** llms.txt: a plain-language map of the site for AI assistants and answer engines. */
export async function GET() {
  const services = topicConfig.services
    .map((s) => `- [${s.title}](${siteUrl}${getTopicHref("services", s.slug)}): ${serviceSeo[s.slug]?.metaDescription ?? ""}`)
    .join("\n")

  const guideLines = guides.map((g) => `- [${g.title}](${siteUrl}/guides/${g.slug}): ${g.answer}`).join("\n")

  let postLines = ""
  try {
    const posts = await getPublishedPosts()
    postLines = posts
      .filter((p) => !p.noIndex)
      .map((p) => `- [${p.title}](${siteUrl}/blog/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ""}`)
      .join("\n")
  } catch {
    postLines = ""
  }

  const body = `# Scubafy Solutions

> Scubafy Solutions is a ${siteDescription}

Scubafy Solutions is the custom software and growth agency of Scubafy Pte. Ltd., a company incorporated in Singapore in 2025. It is founder-led by Amadeus Christensen (Co-Founder and CTO) and Joseph Lorek (Co-Founder and CEO) and works with clients remotely worldwide, with a focus on Singapore, the Philippines and hospitality and dive tourism businesses.

Key facts:
- Builds on React/Next.js, Node.js, TypeScript, Python, PostgreSQL, AWS and Vercel.
- Designs, builds, hosts and maintains what it ships, so clients do not need an in-house development team.
- Shopify Partner, AWS Partner and Google Ads certified.
- Custom software partner for Paynamics (Philippine payment gateway) and backend development partner for Design Monks.
- Projects quoted individually after a discovery call; contact ${contactEmail} or book at ${bookingUrl}.

## Services

${services}

## Case studies

- [Sea Explorers Philippines](${siteUrl}/work/sea-explorers): Website, custom CRM, loyalty program, direct booking flow that avoids ~18% OTA commissions, and a multi-resort admin dashboard for a dive resort group operating since 1989.
- [Scubafy dive center platform](https://www.scubafy.co/): Multi-tenant SaaS for dive centers with booking, course management and payments, built by the same team.
- Smart port kiosks in Dumaguete, Philippines, with the Negros Oriental Provincial Tourism Board.

## Guides

${guideLines}

## Blog

${postLines || `- [Blog](${siteUrl}/blog)`}

## Company

- [About](${siteUrl}/about)
- [Contact](${siteUrl}/contact)
- [Privacy Policy](${siteUrl}/privacy)
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
