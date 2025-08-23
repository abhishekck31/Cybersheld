"use client"

import { Twitter, Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 py-8 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4">
        <div className="text-2xl font-bold text-blue-400 tracking-wide mb-2 md:mb-0">CyberShield</div>
        <nav className="flex flex-wrap gap-4 justify-center">
          <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Home</a>
          <a href="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Dashboard</a>
          <a href="/knowledge" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Knowledge</a>
          <a href="/learn" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Learn</a>
          <a href="/quiz" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Quiz</a>
          <a href="/tools" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Tools</a>
          <a href="/report" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Report</a>
          <a href="/profile" className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">Profile</a>
        </nav>
      </div>
    </footer>
  )
}
