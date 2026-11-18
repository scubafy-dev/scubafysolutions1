/**
 * Search and AI-answer metadata for each service page: a meta description that fits in
 * search results (under ~155 characters), FAQs rendered on the page and as FAQPage
 * structured data, and related pages for internal linking.
 *
 * Answers only restate what the service pages already say. Add real starting prices
 * and typical timelines here when you are ready to publish them.
 */

export type ServiceFaq = { question: string; answer: string }

export type ServiceSeo = {
  metaDescription: string
  audience: string
  faqs: ServiceFaq[]
  related: { label: string; href: string }[]
}

const quoteAnswer =
  "Every project is quoted after a short discovery call where we scope what you need. You get a written quote with scope, milestones and timeline before any work starts. Book a call or send the contact form to start."

const supportAnswer =
  "Yes. We host, update and maintain what we build after launch, so you are not left to run it alone. Support can be ongoing or on request."

export const serviceSeo: Record<string, ServiceSeo> = {
  "web-development": {
    metaDescription:
      "Custom web development by Scubafy Solutions: fast, responsive, SEO-ready websites with optional CMS, hosting and ongoing support. Get a quote.",
    audience:
      "Businesses that need a new marketing site, a redesign of a slow or outdated site, or a content site their team can edit.",
    faqs: [
      { question: "How much does a custom website cost?", answer: quoteAnswer },
      {
        question: "Can my team edit the website without a developer?",
        answer:
          "Yes. We can connect a CMS such as Sanity or Contentful so non-developers can edit content, or keep the site static if you prefer speed and simplicity.",
      },
      {
        question: "Do you handle SEO and performance?",
        answer:
          "Every site ships with semantic HTML, meta and Open Graph tags, a sitemap, structured data where useful, optimized images and minimal JavaScript, plus accessibility-friendly markup and keyboard navigation.",
      },
      {
        question: "Do you host and maintain the website after launch?",
        answer: supportAnswer,
      },
    ],
    related: [
      { label: "Web applications", href: "/services/web-applications" },
      { label: "E-commerce", href: "/services/e-commerce" },
      { label: "Sea Explorers case study", href: "/work/sea-explorers" },
    ],
  },
  "web-applications": {
    metaDescription:
      "Custom web applications: dashboards, portals, booking tools and internal systems built with Next.js, Node, Python and PostgreSQL. Get a quote.",
    audience:
      "Teams running on spreadsheets or disconnected tools who need a customer portal, booking system, admin panel or internal dashboard.",
    faqs: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website mostly presents information. A web application handles data, user accounts and business logic, such as admin panels, customer portals, booking or scheduling tools and internal dashboards.",
      },
      {
        question: "What technology do you use for web apps?",
        answer:
          "Usually React or Next.js on the front end, Node.js or Python on the back end, PostgreSQL for data, and secure authentication with roles and permissions.",
      },
      {
        question: "Can the app connect to the tools we already use?",
        answer:
          "Yes. We integrate with CRMs, payment providers, email services and custom APIs or webhooks so the app fits how you already work.",
      },
      {
        question: "Can I get a custom web app built without hiring an in-house team?",
        answer:
          "Yes. We handle design, development, hosting and maintenance end to end, so you get a working product and an ongoing partner instead of hiring developers.",
      },
      { question: "How much does a custom web application cost?", answer: quoteAnswer },
    ],
    related: [
      { label: "API development", href: "/services/api-development" },
      { label: "AI development", href: "/services/ai-development" },
      { label: "Build a web app without an in-house team", href: "/guides/build-web-app-without-in-house-team" },
    ],
  },
  "mobile-apps": {
    metaDescription:
      "iOS and Android app development with React Native or native Swift and Kotlin, from design to App Store and Google Play launch. Get a quote.",
    audience:
      "Businesses and founders who want an app for customers or field teams that works with their existing website or backend.",
    faqs: [
      {
        question: "Do you build native or cross-platform apps?",
        answer:
          "We usually recommend React Native when you need both iOS and Android and want to move quickly, and go fully native with Swift or Kotlin when the project needs platform-specific features or maximum performance.",
      },
      {
        question: "Can you help publish the app to the App Store and Google Play?",
        answer:
          "Yes. We prepare store listing assets and the privacy policy and guide you through App Store and Google Play submission.",
      },
      {
        question: "Can the app work offline?",
        answer:
          "Yes, where it matters. We design offline-first flows for forms and cached data that sync when the device is back online.",
      },
      {
        question: "I'm a non-technical founder. Can you build the whole app?",
        answer:
          "Yes. We cover design, prototyping, development, testing on real devices, the backend and APIs, store submission and post-launch updates.",
      },
    ],
    related: [
      { label: "API development", href: "/services/api-development" },
      { label: "Web applications", href: "/services/web-applications" },
    ],
  },
  "ai-development": {
    metaDescription:
      "Custom AI platforms and AI features built around your data and workflows, not generic chatbot wrappers. RAG, assistants and automation.",
    audience:
      "Companies that want their own AI product, or want AI search, drafting, assistants or automation inside software they already run.",
    faqs: [
      {
        question: "Is this just a ChatGPT wrapper?",
        answer:
          "No. We build the full platform: accounts and permissions, the interface, connections to your tools and documents, and a backend that routes models, tracks usage and controls cost and quality.",
      },
      {
        question: "Can you add AI to software we already have?",
        answer:
          "Yes. We add search, drafting, assistants or automation behind your existing authentication, data and APIs.",
      },
      {
        question: "How do you keep AI answers accurate and safe?",
        answer:
          "We ground answers in your data with retrieval (RAG), limit what the model can see and do, add evaluation sets and guardrails, and include human review where the result matters.",
      },
      {
        question: "Can I automate business processes with AI without building a whole new system?",
        answer:
          "Often, yes. We can add tool-using AI workflows for tickets, bookings, CRM updates or email inside the systems you already use.",
      },
    ],
    related: [
      { label: "Web applications", href: "/services/web-applications" },
      { label: "API development", href: "/services/api-development" },
    ],
  },
  "api-development": {
    metaDescription:
      "REST and GraphQL API development with authentication, rate limiting, versioning and OpenAPI docs, deployed on AWS or Vercel. Get a quote.",
    audience:
      "Products that need a backend for web and mobile apps, partner integrations, or a clean API over an existing database.",
    faqs: [
      {
        question: "Do you build REST or GraphQL APIs?",
        answer:
          "Both. REST for broad compatibility and simple operations, GraphQL when clients need flexible queries and fewer round trips.",
      },
      {
        question: "How do you secure an API?",
        answer:
          "Authentication with API keys, OAuth2 or JWT, plus authorization, rate limiting, validation, audit logging, health checks and monitoring.",
      },
      {
        question: "Will we get documentation?",
        answer:
          "Yes. We deliver versioned endpoints with OpenAPI/Swagger or GraphQL schema docs and example code so your team or partners can integrate quickly.",
      },
    ],
    related: [
      { label: "Web applications", href: "/services/web-applications" },
      { label: "Fintech", href: "/services/fintech" },
    ],
  },
  "e-commerce": {
    metaDescription:
      "Custom e-commerce development: headless Shopify or custom stores with secure checkout, payments, inventory and order management.",
    audience:
      "Brands outgrowing a template store, or businesses that need custom checkout, subscriptions, memberships or B2B pricing.",
    faqs: [
      {
        question: "Do you build on Shopify or custom?",
        answer:
          "Either. We build headless stores (for example Shopify or a custom API with a Next.js front end) for flexibility and performance, or set up an all-in-one storefront if you prefer.",
      },
      {
        question: "Which payment providers do you integrate?",
        answer:
          "Stripe, PayPal and other processors, with tax and shipping logic as needed and PCI-aware, HTTPS-secured checkout.",
      },
      {
        question: "Can you add subscriptions or B2B pricing?",
        answer: "Yes. We add subscriptions, memberships or B2B pricing when your business model requires it.",
      },
    ],
    related: [
      { label: "Fintech and payments", href: "/services/fintech" },
      { label: "Web development", href: "/services/web-development" },
    ],
  },
  fintech: {
    metaDescription:
      "Fintech development: payments, payouts, wallets, ledgers, KYC hooks and admin dashboards with secure, auditable processor integrations.",
    audience:
      "Startups and businesses building payment flows, wallets, lending or billing portals, or finance operations tools.",
    faqs: [
      {
        question: "What fintech products do you build?",
        answer:
          "Checkout and payout layers, customer wallets, lending and billing portals, ledger and transaction systems, and internal operations consoles for finance teams.",
      },
      {
        question: "How do you handle security and compliance?",
        answer:
          "We build role-based access, audit trails, idempotent transactions, KYC and onboarding hooks and secure session design from day one, and scope around your regulatory and partner requirements.",
      },
      {
        question: "Which payment and banking providers can you integrate?",
        answer:
          "Stripe, bank APIs and other processors. In the Philippines we are a custom software partner for Paynamics.",
      },
    ],
    related: [
      { label: "API development", href: "/services/api-development" },
      { label: "Paynamics partnership", href: "/blog/scubafy-paynamics-custom-software-partnership" },
    ],
  },
  "email-outreach": {
    metaDescription:
      "Done-for-you B2B email outreach: lead lists, dedicated mailboxes, warm-up and three-step sequences sent at scale with reply reporting.",
    audience:
      "B2B companies that want a steady flow of sales conversations without building an outbound team.",
    faqs: [
      {
        question: "What is included in your email outreach service?",
        answer:
          "Lead research and list building for your ideal customer, dedicated mailbox and domain setup with warm-up, a three-email sequence, ongoing sends at scale, reply handling and performance reporting.",
      },
      {
        question: "Will cold email hurt my main domain?",
        answer:
          "We send from dedicated mailboxes with their own domain and DNS setup and warm them up first, which protects your primary domain and improves deliverability.",
      },
      {
        question: "How many emails do you send?",
        answer:
          "Thousands of emails per month, tuned over time on subject lines, send windows and targeting as reply data comes in.",
      },
    ],
    related: [
      { label: "Marketing", href: "/services/marketing" },
      {
        label: "How B2B email outreach finds new customers",
        href: "/blog/how-b2b-email-outreach-helps-businesses-find-new-customers",
      },
    ],
  },
  marketing: {
    metaDescription:
      "Digital marketing across social, content, SEO and paid ads: strategy, content creation, posting, engagement and reporting in one team.",
    audience:
      "Businesses that want a consistent presence across social, search and email without running marketing day to day.",
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer: "Instagram, TikTok, LinkedIn, YouTube, email, search and more, matched to where your audience spends time.",
      },
      {
        question: "Do you create the content?",
        answer:
          "Yes. Posts, reels, stories, graphics, short-form video, newsletters and ad creative, formatted for each platform.",
      },
      {
        question: "Can you handle SEO and paid ads too?",
        answer: "Yes. SEO, landing pages, paid campaigns, analytics and reporting tied to real outcomes.",
      },
    ],
    related: [
      { label: "Email outreach", href: "/services/email-outreach" },
      { label: "Web development", href: "/services/web-development" },
    ],
  },
}
