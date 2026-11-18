/**
 * Answer-first guides written for the buyer questions AI search engines get asked
 * (tracked in Okara). Each guide opens with a direct answer, then supports it with
 * sections and FAQs that are also emitted as structured data.
 */

export type Guide = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  /** One to three sentences that answer the question directly. */
  answer: string
  sections: { heading: string; paragraphs?: string[]; bullets?: string[] }[]
  faqs: { question: string; answer: string }[]
  related: { label: string; href: string }[]
  datePublished: string
  dateModified: string
}

export const guides: Guide[] = [
  {
    slug: "no-code-vs-custom-development-agency",
    title: "Lovable, Bubble or a Custom Development Agency: Which Should You Use?",
    metaTitle: "Lovable vs Bubble vs Hiring a Development Agency",
    metaDescription:
      "When AI and no-code builders like Lovable and Bubble are enough, and when a custom development agency is the better call for a production app.",
    answer:
      "Use an AI or no-code builder such as Lovable or Bubble to validate an idea quickly and cheaply. Hire a custom development agency when the product has to handle real customers, payments, integrations, permissions or scale, and you need someone accountable for keeping it running.",
    sections: [
      {
        heading: "What AI and no-code builders do well",
        paragraphs: [
          "Tools like Lovable generate a working app from prompts, and visual builders like Bubble let you assemble an app without writing code. Both are fast and inexpensive ways to test whether an idea has demand, build an internal tool, or show investors a clickable product.",
        ],
        bullets: [
          "Prototypes and MVPs you want in days, not months",
          "Simple CRUD apps, forms and internal dashboards",
          "Ideas where speed matters more than long-term architecture",
        ],
      },
      {
        heading: "Where they start to struggle",
        paragraphs: [
          "As a product grows, the hard parts are rarely the screens. They are data models, permissions, integrations with payment providers and existing systems, performance under load, security reviews, and who fixes it when something breaks. Generated or visually built apps can become difficult to extend, test or move to another platform, and you are often the only person responsible for maintaining them.",
        ],
        bullets: [
          "Complex business logic, multi-role access and audit trails",
          "Payments, payouts, bookings and other money-moving flows",
          "Integrations with CRMs, ERPs, banks or legacy databases",
          "Compliance, security reviews and uptime commitments",
        ],
      },
      {
        heading: "What a custom development agency adds",
        paragraphs: [
          "An agency designs the architecture, writes code you own, integrates your existing tools, and hosts and maintains the product after launch. At Scubafy Solutions we build on Next.js, Node, Python and PostgreSQL, so the product can be handed to any competent developer later.",
          "A common path is to prototype with a builder, prove demand, then have an agency rebuild or harden the parts that matter. We can take over a Lovable or similar codebase, or start fresh from what you learned.",
        ],
      },
      {
        heading: "How to decide",
        bullets: [
          "Still validating the idea, small budget: start with a builder",
          "Paying customers, payments or sensitive data: use an agency or experienced developers",
          "No technical co-founder and no plan to hire one: choose a partner that also hosts and maintains the product",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Lovable or Bubble good enough for a production app?",
        answer:
          "For simple apps with modest traffic, often yes. For products with payments, complex permissions, integrations or compliance needs, most teams eventually need custom development and someone accountable for maintenance.",
      },
      {
        question: "Can an agency take over an app built with an AI builder?",
        answer:
          "Yes, when the code can be exported. Scubafy Solutions can review a generated codebase, keep what works and rebuild what will not scale.",
      },
      {
        question: "How much does it cost to hire an agency instead?",
        answer:
          "It depends on scope. Scubafy Solutions quotes each project after a short discovery call, with milestones and a timeline in writing before work starts.",
      },
    ],
    related: [
      { label: "Web application development", href: "/services/web-applications" },
      { label: "AI development", href: "/services/ai-development" },
      { label: "Build a web app without an in-house team", href: "/guides/build-web-app-without-in-house-team" },
    ],
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
  },
  {
    slug: "build-web-app-without-in-house-team",
    title: "How to Build a Custom Web App Without Hiring an In-House Team",
    metaTitle: "Build a Custom Web App Without an In-House Team",
    metaDescription:
      "How to get a custom web application designed, built, hosted and maintained without hiring developers: your options, steps and what to ask for.",
    answer:
      "Hire a development partner that covers design, frontend, backend, hosting and ongoing maintenance under one contract. Start with a discovery phase to agree scope, build in milestones you can review, and make sure you own the code and cloud accounts.",
    sections: [
      {
        heading: "Your options",
        bullets: [
          "Freelancers: flexible and affordable, but you coordinate several people and own the risk if someone leaves",
          "No-code or AI builders: fast for prototypes, limited for complex or regulated products",
          "A full-service development agency: one team accountable for design, build, hosting and maintenance",
        ],
      },
      {
        heading: "The steps",
        bullets: [
          "Discovery and technical audit: map how your business runs and what the app must do",
          "Architecture and design: data model, integrations, user roles and screens",
          "Development and QA in milestones, with demos you can review",
          "Launch with hosting, monitoring, backups and analytics in place",
          "Ongoing maintenance: updates, security patches and new features",
        ],
      },
      {
        heading: "What to ask any development partner",
        bullets: [
          "Will we own the code, domain and cloud accounts?",
          "Who hosts the app, and what happens if it goes down?",
          "How are changes priced after launch?",
          "Can we see similar work, such as booking systems, dashboards or portals?",
        ],
      },
      {
        heading: "How Scubafy Solutions does it",
        paragraphs: [
          "We build custom web applications on Next.js, Node, Python and PostgreSQL, integrate the tools you already use, and host and maintain the app after launch. For Sea Explorers Philippines we built a direct booking flow, CRM, loyalty program and a multi-resort admin dashboard that runs the whole group.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a technical co-founder to build a web app?",
        answer:
          "No. A full-service development partner can handle the technical work end to end. You stay responsible for the business decisions and priorities.",
      },
      {
        question: "Who maintains the app after launch?",
        answer:
          "With Scubafy Solutions, we do. We host, update and maintain what we build, so you are not left to run it alone.",
      },
      {
        question: "What technology should a custom web app use?",
        answer:
          "Choose mainstream, well-supported tools so any developer can work on it later. We typically use React or Next.js, Node.js or Python, and PostgreSQL.",
      },
    ],
    related: [
      { label: "Web application development", href: "/services/web-applications" },
      { label: "Sea Explorers case study", href: "/work/sea-explorers" },
      { label: "Lovable, Bubble or an agency?", href: "/guides/no-code-vs-custom-development-agency" },
    ],
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
  },
]

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug)
}
