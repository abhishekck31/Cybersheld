import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function BookmarksPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  const bookmarkedContent = [
    {
      id: 1,
      title: "Understanding Phishing Attacks",
      type: "Article",
      category: "Email Security",
      url: "/articles/phishing-attacks",
      savedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Password Security Best Practices",
      type: "Learning Module",
      category: "Password Security",
      url: "/learn/password-security",
      savedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Social Engineering Quiz",
      type: "Quiz",
      category: "Social Engineering",
      url: "/quiz/social-engineering",
      savedAt: "2 weeks ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Bookmarks</h1>
          <p className="text-gray-400 text-lg">Your saved cybersecurity content</p>
        </div>

        <div className="space-y-4">
          {bookmarkedContent.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded mr-2">{item.type}</span>
                    <span className="text-gray-400 text-sm">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">Saved {item.savedAt}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={item.url}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                  >
                    View
                  </Link>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookmarkedContent.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No bookmarks yet</h3>
            <p className="text-gray-400">
              Start bookmarking articles, quizzes, and learning modules to access them quickly.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
