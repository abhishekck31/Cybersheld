import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DemographicCards } from "@/components/demographic-cards"
import { QuickActions } from "@/components/quick-actions"
import { StatsSection } from "@/components/stats-section"
import { FooterSection } from "@/components/footer-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      <Navigation />
      <main>
        <HeroSection />
        <DemographicCards />
        <QuickActions />
        <StatsSection />
      </main>
      <FooterSection />
    </div>
  )
}
