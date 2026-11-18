import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { HomeBlogSection } from "@/components/home-blog-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { HomeHashScroll } from "@/components/home-hash-scroll"

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    title: "Web Development Agency | Scubafy Solutions",
    description: "Scubafy Solutions is a web development and digital solutions company.",
    url: "https://scubafysolutions.com/",
    siteName: "Scubafy Solutions",
    images: [
      {
        url: "https://scubafysolutions.com/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Scubafy Solutions logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Web Development Agency | Scubafy Solutions",
    description: "Scubafy Solutions is a web development and digital solutions company.",
    images: ["https://scubafysolutions.com/android-chrome-512x512.png"],
  },
}

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <HomeHashScroll />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <SignalsSection />
        <WorkSection />
        <PrinciplesSection />
        <HomeBlogSection />
        <ColophonSection />
      </div>
    </main>
  )
}
