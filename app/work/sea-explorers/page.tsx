import type { Metadata } from "next"
import { SideNav } from "@/components/side-nav"
import { SeaExplorersProject } from "@/components/sea-explorers-project"

export const metadata: Metadata = {
  title: "Sea Explorers — Case Study | Scubafy Solutions",
  description:
    "How we modernized Sea Explorers Philippines with a custom CRM, loyalty system, direct booking that saves ~18% vs OTAs, and a multi-role admin dashboard for their resort group.",
}

export default function SeaExplorersPage() {
  return (
    <main className="relative min-h-screen">
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <SeaExplorersProject />
      </div>
    </main>
  )
}
