import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join CyberShield</h1>
          <p className="text-gray-400">Create your account to start learning about cyber security</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-800 border border-gray-700 shadow-xl",
            },
          }}
        />
      </div>
    </div>
  )
}
