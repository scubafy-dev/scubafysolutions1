import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PrinciplesSection } from "@/components/principles-section"
import { HomeBlogSection } from "@/components/home-blog-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"
import { HomeHashScroll } from "@/components/home-hash-scroll"

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
