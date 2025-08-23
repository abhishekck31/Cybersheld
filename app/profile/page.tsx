// import { UserProfile } from "@clerk/nextjs"
// import { dark } from "@clerk/themes"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <p className="text-muted-foreground">Authentication disabled - Demo Mode</p>
        </div>
        
        {/* <UserProfile
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#0891b2",
              colorBackground: "#111827",
              colorInputBackground: "#1f2937",
              colorInputText: "#f9fafb",
            },
          }}
        /> */}
        
        <div className="bg-card border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Demo Profile</h2>
          <p className="text-muted-foreground mb-6">
            This is a demo version of CyberShield India. Authentication has been disabled for demonstration purposes.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm">
              In the full version, users would be able to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Sign in with email or social accounts</li>
              <li>• Manage their profile information</li>
              <li>• Track learning progress</li>
              <li>• Save bookmarks and preferences</li>
            </ul>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
