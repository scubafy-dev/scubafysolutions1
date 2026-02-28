export type TopicCategory = "services" | "stack" | "technologies"

export const topicConfig: Record<
  TopicCategory,
  { title: string; slug: string; label: string }[]
> = {
  services: [
    { title: "Web Development", slug: "web-development", label: "Web Development" },
    { title: "Web Applications", slug: "web-applications", label: "Web Applications" },
    { title: "Mobile Apps", slug: "mobile-apps", label: "Mobile Apps" },
    { title: "API Development", slug: "api-development", label: "API Development" },
    { title: "E-Commerce", slug: "e-commerce", label: "E-Commerce" },
  ],
  stack: [
    { title: "React / Next.js", slug: "react-nextjs", label: "React / Next.js" },
    { title: "Node.js", slug: "nodejs", label: "Node.js" },
    { title: "TypeScript", slug: "typescript", label: "TypeScript" },
    { title: "Tailwind CSS", slug: "tailwind-css", label: "Tailwind CSS" },
  ],
  technologies: [
    { title: "Vue.js", slug: "vuejs", label: "Vue.js" },
    { title: "Python", slug: "python", label: "Python" },
    { title: "PostgreSQL", slug: "postgresql", label: "PostgreSQL" },
    { title: "AWS / Vercel", slug: "aws-vercel", label: "AWS / Vercel" },
  ],
}

export type TopicSection = {
  heading: string
  body?: string
  bullets?: string[]
}

export type TopicContentItem = {
  title: string
  description: string
  bullets?: string[]
  paragraphs?: string[]
  sections?: TopicSection[]
}

export const topicContent: Record<
  TopicCategory,
  Record<string, TopicContentItem>
> = {
  services: {
    "web-development": {
      title: "Web Development",
      description:
        "We build fast, responsive websites tailored to your brand and audience. From marketing sites to content-heavy platforms, we use modern frameworks and best practices so your site performs well and is easy to maintain.",
      bullets: [
        "Responsive, mobile-first design",
        "SEO and performance optimization",
        "Content management integration",
        "Ongoing support and updates",
      ],
      paragraphs: [
        "Whether you need a simple landing page, a multi-page marketing site, or a content-driven blog or portfolio, we focus on clear structure, fast load times, and a design that works on every device. We avoid bloated themes and one-size-fits-all builders; instead we deliver clean, maintainable code that you or your team can update over time.",
        "Every project includes attention to accessibility (WCAG-friendly markup and keyboard navigation), search engine optimization (semantic HTML, meta tags, sitemaps), and performance (optimized images, minimal JavaScript where possible). We can plug in a CMS like Sanity or Contentful if you need non-developers to edit content, or keep it static if you prefer speed and simplicity.",
      ],
      sections: [
        {
          heading: "What we deliver",
          body: "A production-ready site deployed to a reliable host, with clear documentation and optional training so you know how to update content or request changes. We can also set up analytics, monitoring, and basic security headers so you can focus on your business.",
          bullets: [
            "Fully responsive layout and cross-browser testing",
            "SEO setup (meta, Open Graph, structured data when needed)",
            "Optional CMS or static content workflow",
            "Handoff docs and ongoing support options",
          ],
        },
      ],
    },
    "web-applications": {
      title: "Web Applications",
      description:
        "Custom web applications that solve real business problems. We design and build dashboards, internal tools, and user-facing apps that scale with your operations and integrate with your existing systems.",
      bullets: [
        "Custom UI and workflows",
        "Authentication and permissions",
        "Integrations and APIs",
        "Deployment and hosting",
      ],
      paragraphs: [
        "Unlike a brochure website, a web application handles data, user accounts, and business logic. Think admin panels for your team, customer portals, booking or scheduling tools, or internal dashboards that pull from your existing databases and APIs. We work with you to map your workflows, then build an interface that's intuitive and reliable.",
        "We typically use React or Next.js on the front end and Node.js or Python on the back end, with a database (often PostgreSQL) and secure authentication (e.g. login, roles, API keys). We can integrate with your current tools—CRMs, payment providers, email, or custom APIs—so the app fits into how you already work.",
      ],
      sections: [
        {
          heading: "Typical features",
          body: "Depending on your needs, we implement user management, role-based access, forms and validation, file uploads, reporting, and real-time updates. We also set up deployment, environment variables, and monitoring so the app stays stable as usage grows.",
          bullets: [
            "User authentication and authorization",
            "CRUD operations and data tables with search/filter",
            "Integrations with third-party APIs and webhooks",
            "Export/reporting and audit trails where required",
          ],
        },
      ],
    },
    "mobile-apps": {
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android. We focus on smooth performance, intuitive UX, and alignment with your web or backend so your product feels consistent across devices.",
      bullets: [
        "React Native or native development",
        "Offline and sync capabilities",
        "Push notifications and analytics",
        "App store submission support",
      ],
      paragraphs: [
        "A dedicated mobile app can deepen engagement with your customers or give your team a better tool in the field. We build apps that feel native—smooth navigation, platform-appropriate patterns, and attention to performance—while reusing logic and often sharing code with your web or API layer.",
        "We usually recommend React Native when you need both iOS and Android and want to move quickly; we can also go fully native (Swift, Kotlin) when the project demands platform-specific features or maximum performance. Either way, we design for offline use where it matters (e.g. forms, cached data) and ensure push notifications, deep linking, and analytics are in place.",
      ],
      sections: [
        {
          heading: "From idea to store",
          body: "We handle the full lifecycle: design and prototyping, development and testing on real devices, connection to your backend or APIs, and guidance through App Store and Google Play submission. Post-launch we can support updates, new features, and compatibility with new OS versions.",
          bullets: [
            "UI/UX aligned with iOS and Android guidelines",
            "Offline-first flows and sync when back online",
            "Push notifications and in-app updates",
            "Store listing assets, privacy policy, and release support",
          ],
        },
      ],
    },
    "api-development": {
      title: "API Development",
      description:
        "RESTful and modern APIs that power your products and partners. We design clear contracts, secure authentication, and scalable backends so your data and business logic are reliable and easy to extend.",
      bullets: [
        "REST and GraphQL APIs",
        "Documentation and versioning",
        "Rate limiting and security",
        "Database and cache design",
      ],
      paragraphs: [
        "APIs are the backbone of modern software: they let your website talk to your database, let mobile apps sync data, and let partners or internal systems integrate with your services. We design and build APIs that are consistent, well-documented, and secure so that integrating with you is straightforward and safe.",
        "We use REST or GraphQL depending on your use case—REST for broad compatibility and simple CRUD; GraphQL when clients need flexible queries and fewer round-trips. Authentication is built in (API keys, OAuth2, or JWT), and we add rate limiting, validation, and logging so you can run the API in production with confidence.",
      ],
      sections: [
        {
          heading: "What you get",
          body: "A documented, versioned API deployed on a scalable stack (e.g. Node.js or Python on AWS or Vercel), with clear request/response formats and error handling. We can also provide OpenAPI or GraphQL schema docs and example code so your team or partners can integrate quickly.",
          bullets: [
            "Stable, versioned endpoints with deprecation strategy",
            "Authentication, authorization, and audit logging",
            "OpenAPI/Swagger or GraphQL schema and docs",
            "Health checks, monitoring, and alerting",
          ],
        },
      ],
    },
    "e-commerce": {
      title: "E-Commerce",
      description:
        "Online stores and checkout experiences that convert. We build on proven platforms or custom solutions so you can manage products, orders, and payments with confidence and scale as you grow.",
      bullets: [
        "Product catalogs and search",
        "Checkout and payment integration",
        "Inventory and order management",
        "Analytics and reporting",
      ],
      paragraphs: [
        "Selling online requires a balance of great UX, reliable payments, and manageable operations. We build e-commerce experiences that put the customer first—clear product pages, fast checkout, and mobile-friendly design—while giving you control over catalog, pricing, and orders.",
        "We can work with headless commerce (e.g. Shopify or custom API + Next.js front end) for maximum flexibility and performance, or set up a full-storefront solution if you prefer an all-in-one platform. Either way we integrate with your payment provider (Stripe, PayPal, etc.), handle tax and shipping logic as needed, and ensure the site is secure (PCI-aware design, HTTPS, secure sessions).",
      ],
      sections: [
        {
          heading: "Features we include",
          body: "Product management (categories, variants, images), search and filtering, cart and checkout with multiple payment options, order confirmation and emails, and an admin view for orders and basic reporting. We can add subscriptions, memberships, or B2B pricing when your model requires it.",
          bullets: [
            "Product catalog with search, filters, and facets",
            "Secure checkout and payment gateway integration",
            "Order and inventory management and notifications",
            "Discounts, shipping rules, and basic reporting",
          ],
        },
      ],
    },
  },
  stack: {
    "react-nextjs": {
      title: "React / Next.js",
      description:
        "We use React and Next.js for most of our web projects. React keeps UIs predictable and maintainable; Next.js adds server rendering, routing, and optimizations so sites are fast and SEO-friendly.",
      bullets: [
        "Component-based architecture",
        "Server and client rendering",
        "Built-in routing and API routes",
        "Image and performance optimizations",
      ],
      paragraphs: [
        "React is a JavaScript library for building user interfaces. Components are reusable pieces of UI that receive data (props) and manage their own state, making it easier to reason about complex pages and keep code DRY. The ecosystem—hooks, context, and a huge set of libraries—lets us build everything from marketing pages to full-blown dashboards.",
        "Next.js sits on top of React and adds structure: file-based routing, server-side rendering (SSR) and static generation (SSG), API routes for backend logic, and built-in image optimization. That means faster first load, better SEO, and less custom configuration. For most new web projects we choose Next.js by default.",
      ],
      sections: [
        {
          heading: "Why we use it",
          body: "Next.js gives us a single framework for static sites, dynamic apps, and APIs. The same codebase can serve pre-rendered pages for speed and SEO, client-side interactivity where needed, and serverless API endpoints. Deploying to Vercel (or similar) is straightforward, and the team can scale from a small site to a large application without switching stacks.",
          bullets: [
            "Fast initial load and strong Core Web Vitals",
            "SEO-friendly HTML from the server when needed",
            "API routes for backend logic without a separate server",
            "Large community, clear docs, and long-term support",
          ],
        },
      ],
    },
    nodejs: {
      title: "Node.js",
      description:
        "Node.js powers our backend services and tooling. Its event-driven model and JavaScript ecosystem let us build APIs, workers, and automation that integrate smoothly with frontends and third-party services.",
      bullets: [
        "Fast, non-blocking I/O",
        "Rich ecosystem (npm)",
        "APIs and microservices",
        "Scripts and build tooling",
      ],
      paragraphs: [
        "Node.js is JavaScript running on the server. It uses an event-driven, non-blocking I/O model, which makes it well-suited for I/O-heavy workloads like APIs, file handling, and real-time features. Because we often use JavaScript or TypeScript on the front end, sharing the same language on the back end simplifies hiring, code reuse, and context switching.",
        "We use Node.js for REST and GraphQL APIs, serverless functions (e.g. on Vercel or AWS Lambda), background jobs, and build scripts. The npm ecosystem gives us battle-tested packages for databases, auth, validation, and more, so we can ship quickly without reinventing the wheel.",
      ],
      sections: [
        {
          heading: "Where you'll see it",
          body: "Node.js backs many of our web apps and APIs. We pair it with frameworks like Express or Fastify for traditional servers, or use it inside serverless functions. It also powers our tooling: build scripts, migrations, and automation that run in CI/CD or on your machine.",
          bullets: [
            "API servers and serverless functions",
            "Real-time features (WebSockets, server-sent events)",
            "CLI tools and dev/build scripts",
            "Compatibility with front-end JavaScript/TypeScript",
          ],
        },
      ],
    },
    typescript: {
      title: "TypeScript",
      description:
        "We write TypeScript by default for reliability and better tooling. Types catch bugs early and make refactoring safer, so your codebase stays easier to maintain as requirements change.",
      bullets: [
        "Static typing and inference",
        "Better editor support",
        "Clearer APIs and contracts",
        "Gradual adoption possible",
      ],
      paragraphs: [
        "TypeScript is JavaScript with optional static types. You describe the shape of your data and function parameters, and the compiler (and your editor) flag mismatches before the code runs. That leads to fewer runtime errors, clearer intent, and safer refactors—especially valuable as the project and team grow.",
        "We use TypeScript for both front-end and back-end code. Editors like VS Code offer autocomplete, go-to-definition, and inline error reporting, which speeds up development and onboarding. If you have an existing JavaScript codebase, we can introduce TypeScript gradually by adding types file-by-file.",
      ],
      sections: [
        {
          heading: "Benefits in practice",
          body: "Types act as living documentation: when you see a function that takes a User and returns an Order, you know exactly what to pass in and what you get back. That reduces back-and-forth and makes it easier to change code months later. For APIs and shared libraries, TypeScript ensures that front and back end stay in sync.",
          bullets: [
            "Fewer bugs from typos and wrong argument types",
            "Faster development with autocomplete and refactoring",
            "Self-documenting code and clearer contracts",
            "Easier to onboard new developers and maintain long-term",
          ],
        },
      ],
    },
    "tailwind-css": {
      title: "Tailwind CSS",
      description:
        "Tailwind CSS lets us ship consistent, responsive UIs without leaving the markup. Utility-first classes and design tokens keep styling predictable and easy to adjust across the project.",
      bullets: [
        "Utility-first workflow",
        "Consistent design system",
        "Small production CSS",
        "Dark mode and theming",
      ],
      paragraphs: [
        "Tailwind is a utility-first CSS framework. Instead of writing custom CSS or naming lots of classes, you apply small, single-purpose classes directly in your HTML (or JSX): padding, margin, colors, typography, and responsive breakpoints. The result is a consistent look without context-switching to a separate stylesheet for every tweak.",
        "We use Tailwind for almost all new projects. It comes with a sensible design scale (spacing, colors, font sizes), built-in dark mode support, and a production build that only includes the classes you use, so the final CSS stays small. When we need custom components, we still use Tailwind for layout and tokens and add a few custom classes where it makes sense.",
      ],
      sections: [
        {
          heading: "Why it fits our workflow",
          body: "Tailwind speeds up UI work and keeps design consistent. New screens match the existing system because we reuse the same utilities and tokens. Responsive and accessible patterns (focus states, reduced motion) are easy to add. For you, the codebase is readable and any developer familiar with Tailwind can jump in quickly.",
          bullets: [
            "Faster iteration with utility classes in the template",
            "Consistent spacing, color, and type scale",
            "Smaller CSS bundle via purging unused styles",
            "Dark mode and theming without extra complexity",
          ],
        },
      ],
    },
  },
  technologies: {
    vuejs: {
      title: "Vue.js",
      description:
        "When the fit is right, we use Vue.js for reactive, component-based UIs. Its gentle learning curve and clear documentation make it a strong choice for teams and long-term projects.",
      bullets: [
        "Reactive component model",
        "Single-file components",
        "Vue Router and state management",
        "Nuxt for full-stack apps",
      ],
      paragraphs: [
        "Vue.js is a progressive JavaScript framework for building UIs. Like React, it uses a component-based model and a reactive data layer, but its template syntax and single-file components (.vue) feel closer to classic HTML and can be easier for designers or backend developers to contribute to. The official docs and ecosystem are strong, and Vue 3 has excellent TypeScript support.",
        "We choose Vue when a client already uses it, when the team prefers Vue's template style, or when we're building with Nuxt (Vue's meta-framework for SSR, routing, and static sites). Nuxt is a solid alternative to Next.js for full-stack Vue apps and content-heavy sites.",
      ],
      sections: [
        {
          heading: "When we use Vue",
          body: "Vue is a great fit for interactive dashboards, admin panels, and marketing sites where you want a single, well-documented framework. We use Vue 3 with the Composition API and TypeScript for larger apps, and we use Nuxt when we need server rendering, file-based routing, or a built-in backend layer.",
          bullets: [
            "Reactive data binding and composables",
            "Single-file components for template, script, and style",
            "Vue Router for SPA navigation",
            "Nuxt for SSR, static sites, and API routes",
          ],
        },
      ],
    },
    python: {
      title: "Python",
      description:
        "We use Python for data pipelines, automation, and backends when it’s the best tool for the job. From Django and FastAPI to scripts and ML integrations, Python helps us deliver quickly and reliably.",
      bullets: [
        "Django and FastAPI backends",
        "Scripts and automation",
        "Data processing and APIs",
        "Integration with other stacks",
      ],
      paragraphs: [
        "Python is our go-to for backend services that need rapid development, strong libraries, or integration with data/ML tooling. Django gives us a full-stack framework with an ORM, admin, and auth out of the box—ideal for content-heavy sites or internal tools. FastAPI is our choice for high-performance APIs with automatic OpenAPI docs and async support.",
        "We also use Python for scripts, data processing, and automation: ETL jobs, report generation, and glue code between systems. If your project involves data science or ML models, we can integrate Python services with your main app (e.g. Node or Next.js) via APIs or serverless functions.",
      ],
      sections: [
        {
          heading: "Where Python fits",
          body: "Python backs many of our API and internal tool projects. We use it when we need a rich ecosystem (Django, FastAPI, pandas, etc.), when the client's team already knows Python, or when we're connecting to data pipelines or ML models. It coexists easily with Node.js or Next.js—we'll pick the right tool per service.",
          bullets: [
            "Django for full-featured web apps and admin tools",
            "FastAPI for fast, documented APIs",
            "Scripts and cron jobs for data and automation",
            "Integration with data science and ML stacks",
          ],
        },
      ],
    },
    postgresql: {
      title: "PostgreSQL",
      description:
        "PostgreSQL is our default database for applications that need robust data modeling, transactions, and query flexibility. We design schemas and indexes so your data stays consistent and performant.",
      bullets: [
        "ACID and complex queries",
        "JSON and full-text search",
        "Migrations and backups",
        "Scaling and replication",
      ],
      paragraphs: [
        "PostgreSQL is an open-source relational database with a strong reputation for reliability, standards compliance, and advanced features. We use it for most greenfield projects: it supports complex queries, JSON columns when we need flexibility, full-text search, and strict ACID transactions so your data stays consistent under load.",
        "We design schemas with migrations (e.g. with Prisma, Drizzle, or Django migrations) so every change is versioned and repeatable. We also plan for backups, point-in-time recovery where needed, and read replicas or connection pooling when traffic grows. For smaller projects we often use managed Postgres (e.g. Vercel Postgres, Supabase, or AWS RDS) so you get reliability without running the database yourself.",
      ],
      sections: [
        {
          heading: "Why Postgres",
          body: "Postgres gives us a single database that can handle relational data, JSON, and full-text search without adding multiple data stores too early. Its extension ecosystem (e.g. PostGIS for geo) means we can grow into specialized needs. For most apps, Postgres plus good indexing and connection management is enough to scale to significant traffic.",
          bullets: [
            "Reliable transactions and data integrity",
            "JSONB and full-text search in one database",
            "Migrations and schema versioning",
            "Managed options (Vercel, Supabase, RDS) for easy ops",
          ],
        },
      ],
    },
    "aws-vercel": {
      title: "AWS / Vercel",
      description:
        "We deploy and host on AWS and Vercel depending on the project. Vercel for frontends and serverless; AWS for full control, storage, and backend infrastructure. Both keep your apps available and scalable.",
      bullets: [
        "Vercel for Next.js and frontends",
        "AWS for APIs, storage, and compute",
        "CDN and edge delivery",
        "CI/CD and monitoring",
      ],
      paragraphs: [
        "Vercel is our default for Next.js and React front ends. It offers zero-config deployments, preview URLs for every branch, global CDN, and serverless functions so we can ship quickly and scale automatically. Integrations with GitHub/GitLab make CI/CD straightforward, and the dashboard gives clear metrics and logs.",
        "When we need more control—custom runtimes, long-running processes, or specific AWS services (S3, RDS, SQS, etc.)—we use AWS. We might run a Node or Python API on ECS or Lambda, store files in S3, or use RDS for Postgres. We choose the mix that fits your budget, compliance needs, and team's comfort with ops.",
      ],
      sections: [
        {
          heading: "How we use them",
          body: "Many projects use Vercel for the front end and serverless API routes, plus a managed database (Vercel Postgres, Supabase, or RDS) and maybe S3 or a third-party service for files. Larger or more complex systems might move API or workers to AWS while keeping the front end on Vercel. We'll recommend a clear split and document it so your team can operate and scale the system.",
          bullets: [
            "Vercel: Next.js, previews, edge, serverless functions",
            "AWS: Compute (Lambda, ECS), storage (S3), DB (RDS), queues",
            "CDN and edge for low latency worldwide",
            "CI/CD, env vars, and monitoring for both",
          ],
        },
      ],
    },
  },
}

/** URL path segment for stack (avoids conflict with reserved or internal "stack" routes) */
const STACK_PATH = "tech-stack"

export function getTopicHref(
  category: TopicCategory,
  slug: string
): string {
  const segment = category === "stack" ? STACK_PATH : category
  return `/${segment}/${slug}`
}
