"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
        <div className="text-center mb-12">
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

        {/* Daily Safety Tip */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Lightbulb className="mr-3 h-6 w-6 text-primary" />
              Daily Security Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground font-medium text-lg leading-relaxed">{currentTip}</p>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory !== category ? "bg-transparent" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Breaking News */}
        {filteredNews.some((article) => article.isBreaking) && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-destructive" />
              Breaking News
            </h2>
            <div className="space-y-4">
              {filteredNews
                .filter((article) => article.isBreaking)
                .map((article) => (
                  <Card key={article.id} className="border-l-4 border-l-destructive bg-destructive/5">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-destructive text-white">BREAKING</Badge>
                            <Badge
                              variant="outline"
                              className={severityColors[article.severity as keyof typeof severityColors]}
                            >
                              {article.severity} Risk
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-semibold mb-2">{article.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed">{article.summary}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <span>Source: {article.source}</span>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Read More
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </section>
        )}

        {/* Regular News */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNews
              .filter((article) => !article.isBreaking)
              .map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${severityColors[article.severity as keyof typeof severityColors]}`}
                      >
                        {article.severity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">{article.summary}</CardDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-auto p-0 text-primary hover:text-primary/80">
                        Read More
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Source: {article.source}</div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>

        {/* Government Alerts Section */}
        <section className="mt-12">
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
                Government Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-l-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800 mb-1">CERT-In Advisory</h4>
                  <p className="text-sm text-orange-700">
                    Multiple vulnerabilities reported in popular mobile banking apps. Users advised to update
                    immediately.
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Issued: January 15, 2024</p>
                </div>
                <div className="border-l-4 border-l-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800 mb-1">RBI Warning</h4>
                  <p className="text-sm text-orange-700">
                    Fake loan apps targeting users with instant approval promises. Verify lender credentials before
                    applying.
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Issued: January 12, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Subscribe Section */}
        <section className="mt-12">
          <Card className="bg-primary/5 border-primary/20 text-center">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Stay Protected</h3>
              <p className="text-muted-foreground mb-4">
                Get the latest cyber security alerts and tips delivered to your phone via SMS
              </p>
              <Button size="lg">Subscribe to Alerts</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
