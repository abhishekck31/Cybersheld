import { UserProfile } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <UserProfile
              appearance={{
                baseTheme: dark,
                variables: {
                  colorPrimary: "#0891b2",
                  colorBackground: "#1f2937",
                  colorInputBackground: "#374151",
                  colorInputText: "#f9fafb",
                },
              }}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
