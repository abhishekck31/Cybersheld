"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThreatFeed } from "@/components/threat-feed"
import { Newspaper, Calendar, ExternalLink, AlertTriangle, TrendingUp, Shield, Lightbulb, Clock } from "lucide-react"

const newsArticles = [
  {
    id: 1,
    title: "New UPI Fraud Technique Targets Festival Shoppers",
    summary:
      "Cybercriminals are using fake festival offers to trick users into sharing UPI PINs during the festive season.",
    category: "UPI Fraud",
    severity: "High",
    date: "2024-01-15",
    source: "Cyber Security India",
    readTime: "3 min read",
    isBreaking: true,
  },
  {
    id: 2,
    title: "Government Issues Alert on Fake Aadhaar Update Messages",
    summary: "UIDAI warns citizens about fraudulent SMS and emails claiming urgent Aadhaar updates are required.",
    category: "Identity Theft",
    severity: "Medium",
    date: "2024-01-14",
    source: "UIDAI Official",
    readTime: "2 min read",
    isBreaking: false,
  },
  {
    id: 3,
    title: "Banking Trojans Target Indian Mobile Users",
    summary:
      "Security researchers discover new malware specifically designed to steal banking credentials from Indian users.",
    category: "Malware",
    severity: "High",
    date: "2024-01-13",
    source: "Cyber Threat Intelligence",
    readTime: "4 min read",
    isBreaking: false,
  },
  {
    id: 4,
    title: "WhatsApp Business Scams on the Rise",
    summary:
      "Fraudsters are impersonating legitimate businesses on WhatsApp to collect personal and financial information.",
    category: "Social Engineering",
    severity: "Medium",
    date: "2024-01-12",
    source: "Digital Security Watch",
    readTime: "3 min read",
    isBreaking: false,
  },
  {
    id: 5,
    title: "New Cybercrime Portal Features Launched",
    summary:
      "Government enhances cybercrime.gov.in with AI-powered complaint categorization and faster response times.",
    category: "Government Update",
    severity: "Low",
    date: "2024-01-11",
    source: "Ministry of Home Affairs",
    readTime: "2 min read",
    isBreaking: false,
  },
  {
    id: 6,
    title: "Cryptocurrency Investment Scams Target Young Indians",
    summary:
      "Police report surge in fake cryptocurrency investment schemes promising unrealistic returns to young investors.",
    category: "Investment Fraud",
    severity: "High",
    date: "2024-01-10",
    source: "Economic Crime Unit",
    readTime: "5 min read",
    isBreaking: false,
  },
]

const dailyTips = [
  "Never share your OTP with anyone, even if they claim to be from your bank.",
  "Always verify website URLs before entering personal information - look for HTTPS and correct spelling.",
  "Use different passwords for each of your online accounts.",
  "Be suspicious of urgent messages asking for immediate action or money.",
  "Keep your phone and computer software updated with the latest security patches.",
  "Don't click on links in suspicious emails or text messages.",
  "Enable two-factor authentication on all important accounts.",
  "Regularly check your bank statements for unauthorized transactions.",
  "Be cautious when using public Wi-Fi for sensitive activities.",
  "If an offer seems too good to be true, it probably is - verify before acting.",
]

const categories = [
  "All",
  "UPI Fraud",
  "Identity Theft",
  "Malware",
  "Social Engineering",
  "Government Update",
  "Investment Fraud",
]

const severityColors = {
  High: "text-red-600 bg-red-50 border-red-200",
  Medium: "text-orange-600 bg-orange-50 border-orange-200",
  Low: "text-green-600 bg-green-50 border-green-200",
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentTip] = useState(dailyTips[Math.floor(Math.random() * dailyTips.length)])

  const filteredNews =
    selectedCategory === "All" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-6xl px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Latest News & Alerts</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cyber Security News</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest cyber security threats, government alerts, and safety tips
          </p>
        </div>

        {/* Live Threat Intelligence Feed (Real-time) */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md tracking-tight">
              Live Threat Intelligence Feed
            </h2>
            <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 text-white shadow-md border border-blue-400 animate-pulse">
              <svg className="inline-block mr-1 h-3 w-3 animate-pulse" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
              Real-time
            </span>
          </div>
          <div className="rounded-xl bg-black/70 border border-primary/20 p-4">
            <ThreatFeed />
          </div>
        </section>

  {/* Remaining sections removed - Page shows only live threat feed */}
      </main>
    </div>
  )
}
