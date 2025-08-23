// import { currentUser } from "@clerk/nextjs/server"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"

export default function BookmarksPage() {
  // const user = await currentUser()
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Bookmarks</h1>
          <p className="text-muted-foreground">Authentication disabled - Demo Mode</p>
        </div>
        
        <div className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Demo Bookmarks</h2>
          <p className="text-muted-foreground mb-6">
            This is a demo version of CyberShield India. Authentication has been disabled for demonstration purposes.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm">
              In the full version, users would be able to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Save interesting articles and lessons</li>
              <li>• Bookmark security tools for quick access</li>
              <li>• Organize learning materials</li>
              <li>• Sync bookmarks across devices</li>
            </ul>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
