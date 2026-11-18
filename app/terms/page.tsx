import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "Terms for using the Scubafy Solutions website, scubafysolutions.com.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Website Terms of Use"
      updated="2026-11-18"
      intro="These terms apply to your use of scubafysolutions.com, operated by Scubafy Pte. Ltd., Singapore. By using the site you agree to them. Client projects are governed by the separate written agreement signed for each engagement, not by these terms."
      sections={[
        {
          heading: "Information on this site",
          paragraphs: [
            "Content on this site is for general information about our services. We aim to keep it accurate but do not guarantee it is complete or current, and it is not professional advice for your specific situation. Quotes, timelines and scope are only binding once agreed in writing.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The site's text, design, logos and code belong to Scubafy Pte. Ltd. or its licensors. Client names, logos and project images are shown with permission and remain their owners' property. You may not copy or reuse them without permission.",
          ],
        },
        {
          heading: "Acceptable use",
          bullets: [
            "Do not attempt to access restricted areas such as the admin or API routes without permission.",
            "Do not use the contact form to send spam, malicious content or unlawful material.",
            "Do not interfere with the site's security or operation.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "The site links to other websites, including client sites, social networks and Calendly. We are not responsible for their content or practices.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "To the extent permitted by law, Scubafy Pte. Ltd. is not liable for any loss arising from use of, or reliance on, this website.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: ["These terms are governed by the laws of Singapore."],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions about these terms: contact@scubafysolutions.com."],
        },
      ]}
    />
  )
}
