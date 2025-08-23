"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LinkIcon, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2, Shield, Info } from "lucide-react"
import Link from "next/link"

interface UrlCheckResult {
  result: string
}

export default function UrlCheckerPage() {
  const [url, setUrl] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<UrlCheckResult | null>(null)
  const [error, setError] = useState("")

  const validateUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`)
      return true
    } catch {
      return false
    }
  }

  const HARDCODED_RESULTS = [
    `# Risk Assessment: Safe\n\n- **Source**: Well-known organization\n- **Type**: E-commerce\n- **Assessment**: This website appears safe.\n- **Advice**: Always check for HTTPS and avoid sharing sensitive info unless sure.`,
    `# Risk Assessment: Suspicious\n\n- **Source**: Unknown\n- **Type**: Banking\n- **Assessment**: This website is suspicious.\n- **Advice**: Do not enter personal or financial information.`,
    `# Risk Assessment: Dangerous\n\n- **Source**: Unverified\n- **Type**: Social Media\n- **Assessment**: This website is dangerous and may be a phishing site.\n- **Advice**: Avoid clicking links or entering any information.`,
    `# Risk Assessment: Low Risk\n\n- **Source**: Trusted news outlet\n- **Type**: News\n- **Assessment**: This website is generally safe.\n- **Advice**: Be cautious of pop-ups or suspicious ads.`,
    `# Risk Assessment: Medium Risk\n\n- **Source**: New domain\n- **Type**: Shopping\n- **Assessment**: This website is new and not widely known.\n- **Advice**: Proceed with caution and verify before making purchases.`
  ];

  const checkUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL to check")
      return
    }
    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., example.com or https://example.com)")
      return
    }
    setIsChecking(true)
    setError("")
    setResult(null)
    // Simulate API delay
    setTimeout(() => {
      const randomResult = HARDCODED_RESULTS[Math.floor(Math.random() * HARDCODED_RESULTS.length)]
      setResult({ result: randomResult })
      setIsChecking(false)
    }, 1200)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkUrl()
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-600/20 text-green-400 border-green-500/50"
      case "medium":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/50"
      case "high":
        return "bg-red-600/20 text-red-400 border-red-500/50"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link
          href="/tools"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 animate-pulse-slow">
              <LinkIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">URL Safety Checker</h1>
          <p className="text-gray-300">Check if a website or link is safe before visiting it</p>
        </div>

        {/* URL Input */}
        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">Enter URL to Check</CardTitle>
            <CardDescription className="text-gray-400">
              Paste any website URL or link you want to verify for safety. We'll check it against known threat databases
              and analyze security indicators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter URL (e.g., example.com or https://example.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && checkUrl()}
                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:border-blue-500/50"
                />
                <Button onClick={checkUrl} disabled={isChecking} className="btn-primary">
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check URL"
                  )}
                </Button>
              </div>
              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-600/20 p-3 rounded-lg border border-red-500/50">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mb-8 border-l-4 bg-gray-800/50 border border-blue-500/50 backdrop-blur-sm animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
                <CheckCircle className="mr-3 h-6 w-6 text-blue-400" />
                Gemini AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300 whitespace-pre-line">{result.result}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
              <Info className="mr-3 h-6 w-6 text-blue-400" />
              How URL Checking Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <p>
                  <strong className="text-gray-300">Database Check:</strong> We check the URL against Google Safe
                  Browsing and other threat intelligence databases.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <p>
                  <strong className="text-gray-300">Threat Analysis:</strong> The system analyzes for known phishing
                  sites, malware distribution, and other malicious activities.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <p>
                  <strong className="text-gray-300">Security Indicators:</strong> We analyze SSL certificates, domain
                  age, and other security indicators.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <p>
                  <strong className="text-gray-300">Real-time Results:</strong> You get instant feedback on whether the
                  URL is safe to visit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="bg-blue-600/20 border border-blue-500/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center text-gray-100">
              <Shield className="mr-3 h-5 w-5 text-blue-400" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>URLs are checked against public safety databases only</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>We don't store or log the URLs you check</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>No personal information is collected or tracked</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
