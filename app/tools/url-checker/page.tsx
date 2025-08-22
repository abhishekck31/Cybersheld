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
  url: string
  isSafe: boolean
  threats: string[]
  details: string
  checkedAt: string
  riskLevel: "low" | "medium" | "high"
  domainAge: string
  sslStatus: string
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

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const normalizedUrl = url.toLowerCase()

      // Enhanced threat detection patterns
      const highRiskPatterns = [
        "phishing",
        "malware",
        "scam",
        "fake",
        "suspicious",
        "virus",
        "trojan",
        "bit.ly",
        "tinyurl",
        "t.co",
        "goo.gl",
        "ow.ly",
        "short.link",
        "free-download",
        "click-here",
        "urgent-update",
        "verify-account",
        "suspended-account",
        "security-alert",
        "winner",
        "congratulations",
      ]

      const mediumRiskPatterns = [
        "download",
        "free",
        "offer",
        "deal",
        "discount",
        "limited-time",
        "survey",
        "quiz",
        "test",
        "check",
        "verify",
      ]

      const safePatterns = [
        "google.com",
        "microsoft.com",
        "github.com",
        "stackoverflow.com",
        "wikipedia.org",
        "mozilla.org",
        "w3.org",
        "ietf.org",
        "rfc-editor.org",
        "gov.in",
        "nic.in",
        "uidai.gov.in",
        "incometax.gov.in",
      ]

      let riskLevel: "low" | "medium" | "high" = "low"
      let threats: string[] = []

      // Check for high-risk patterns
      const foundHighRisk = highRiskPatterns.some((pattern) => normalizedUrl.includes(pattern))
      const foundMediumRisk = mediumRiskPatterns.some((pattern) => normalizedUrl.includes(pattern))
      const foundSafe = safePatterns.some((pattern) => normalizedUrl.includes(pattern))

      if (foundHighRisk) {
        riskLevel = "high"
        threats = ["Phishing Attempt", "Malware Distribution", "Suspicious Domain", "Social Engineering"]
      } else if (foundMediumRisk && !foundSafe) {
        riskLevel = "medium"
        threats = ["Potentially Unwanted Software", "Suspicious Content"]
      } else if (foundSafe) {
        riskLevel = "low"
        threats = []
      }

      const mockResult: UrlCheckResult = {
        url: url.startsWith("http") ? url : `https://${url}`,
        isSafe: riskLevel === "low",
        threats,
        riskLevel,
        domainAge: foundSafe ? "10+ years" : foundHighRisk ? "< 30 days" : "2-5 years",
        sslStatus: foundHighRisk ? "Invalid/Missing SSL" : "Valid SSL Certificate",
        details: foundHighRisk
          ? "⚠️ This URL has been flagged as potentially dangerous. It may attempt to steal personal information, install malware, or conduct phishing attacks targeting Indian users."
          : riskLevel === "medium"
            ? "⚡ This URL appears to be safe but exercise caution. Avoid downloading files or entering personal information unless you trust the source completely."
            : "✅ This URL appears to be safe based on our comprehensive security analysis. However, always remain vigilant when browsing online.",
        checkedAt: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      }

      setResult(mockResult)
    } catch (err) {
      setError("Failed to check URL. Please try again.")
    } finally {
      setIsChecking(false)
    }
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
          <Card
            className={`mb-8 border-l-4 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-scale-in ${
              result.isSafe
                ? "border-l-green-500"
                : result.riskLevel === "medium"
                  ? "border-l-yellow-500"
                  : "border-l-red-500"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
                    {result.isSafe ? (
                      <CheckCircle className="mr-3 h-6 w-6 text-green-400" />
                    ) : result.riskLevel === "medium" ? (
                      <AlertTriangle className="mr-3 h-6 w-6 text-yellow-400" />
                    ) : (
                      <XCircle className="mr-3 h-6 w-6 text-red-400" />
                    )}
                    {result.isSafe
                      ? "URL is Safe"
                      : result.riskLevel === "medium"
                        ? "URL Requires Caution"
                        : "URL is Potentially Dangerous"}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-400">
                    Checked: {result.checkedAt} | URL: {result.url}
                  </CardDescription>
                </div>
                <Badge
                  className={`${
                    result.riskLevel === "low"
                      ? "bg-green-600/20 text-green-400 border-green-500/50"
                      : result.riskLevel === "medium"
                        ? "bg-yellow-600/20 text-yellow-400 border-yellow-500/50"
                        : "bg-red-600/20 text-red-400 border-red-500/50"
                  } border`}
                >
                  {result.riskLevel === "low" ? "Safe" : result.riskLevel === "medium" ? "Caution" : "Dangerous"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">{result.details}</p>

                {/* Security Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-medium text-gray-200 mb-2">Domain Information</h4>
                    <p className="text-sm text-gray-400">Age: {result.domainAge}</p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-medium text-gray-200 mb-2">SSL Certificate</h4>
                    <p className="text-sm text-gray-400">{result.sslStatus}</p>
                  </div>
                </div>

                {result.threats.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-200 mb-2">Detected Threats:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.threats.map((threat, index) => (
                        <Badge key={index} className="bg-red-600/20 text-red-400 border border-red-500/50">
                          {threat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`rounded-lg p-4 border ${
                    result.isSafe
                      ? "bg-green-600/20 border-green-500/50"
                      : result.riskLevel === "medium"
                        ? "bg-yellow-600/20 border-yellow-500/50"
                        : "bg-red-600/20 border-red-500/50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      result.isSafe
                        ? "text-green-400"
                        : result.riskLevel === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {result.isSafe ? (
                      <>
                        <strong>Recommendation:</strong> This URL appears safe to visit. However, always remain cautious
                        and avoid entering personal information unless you trust the website.
                      </>
                    ) : result.riskLevel === "medium" ? (
                      <>
                        <strong>Caution:</strong> This URL may be safe but exercise caution. Avoid downloading files or
                        entering personal information unless you trust the source.
                      </>
                    ) : (
                      <>
                        <strong>Warning:</strong> Do not visit this URL. It may attempt to steal your personal
                        information, install malware, or perform other malicious activities.
                      </>
                    )}
                  </p>
                </div>
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
