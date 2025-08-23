import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import DemographicCards from "@/components/demographic-cards"
import { QuickActions } from "@/components/quick-actions"
import { StatsSection } from "@/components/stats-section"
import { FooterSection } from "@/components/footer-section"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function HomePage() {
  return (
    <ProtectedRoute>
  <div className="min-h-screen bg-black text-gray-100">
        <Navigation />
        <main>
          <HeroSection />
          <section className="py-12 sm:py-16 px-4 bg-black">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-8 sm:mb-12 animate-fade-in">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-4">Choose Your Learning Path</h2>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
                  Get personalized cyber security guidance based on your background and needs
                </p>
              </div>
              <DemographicCards />
            </div>
          </section>
          <QuickActions />
          <StatsSection />
        </main>
        <FooterSection />
      </div>
    </ProtectedRoute>
  )
}
