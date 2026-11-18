import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Scubafy Pte. Ltd. collects, uses and protects personal data on scubafysolutions.com.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2026-11-18"
      intro="This policy explains how Scubafy Pte. Ltd. (trading as Scubafy Solutions), a company registered in Singapore, collects, uses and protects personal data when you visit scubafysolutions.com or contact us. We handle personal data in line with Singapore's Personal Data Protection Act 2012 (PDPA)."
      sections={[
        {
          heading: "What we collect",
          bullets: [
            "Details you send through our contact form: your name, email address, the type of project and your message.",
            "Details you give when you book a call through Calendly, which Calendly processes under its own privacy policy.",
            "Emails you send to contact@scubafysolutions.com and our replies.",
            "Usage data such as pages visited, referring site, device and browser type, collected through Google Tag Manager and Vercel Web Analytics.",
          ],
        },
        {
          heading: "How we use it",
          bullets: [
            "To reply to your enquiry, prepare quotes and deliver the services you ask for.",
            "To send a confirmation that we received your enquiry.",
            "To understand how the site is used and improve it.",
            "To meet our legal, accounting and contractual obligations.",
          ],
          paragraphs: ["We do not sell your personal data."],
        },
        {
          heading: "Service providers",
          paragraphs: [
            "We use trusted providers to run the site and handle enquiries, including Vercel (hosting and analytics), Resend (email delivery), Google (tag management and analytics) and Calendly (meeting booking). They process data on our behalf and may store it outside Singapore, with protections comparable to the PDPA.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "Analytics tools loaded through Google Tag Manager may set cookies to measure visits. You can block or delete cookies in your browser settings; the site will still work.",
          ],
        },
        {
          heading: "How long we keep data",
          paragraphs: [
            "We keep enquiry and client records for as long as needed to respond, deliver services and meet legal and accounting requirements, then delete or anonymize them.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can ask to access or correct the personal data we hold about you, or withdraw consent to us using it, by emailing contact@scubafysolutions.com. We will respond within a reasonable time.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about this policy or your data: contact@scubafysolutions.com. Scubafy Pte. Ltd., Singapore.",
          ],
        },
      ]}
    />
  )
}
