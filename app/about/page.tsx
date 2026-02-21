import { AboutSection } from "@/components/about-section"
import { SideNav } from "@/components/side-nav"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <AboutSection />
      </div>
    </main>
  )
}

