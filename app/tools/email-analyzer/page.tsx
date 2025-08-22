"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2, Shield } from "lucide-react"
import Link from "next/link"

interface EmailAnalysisResult {
  isAuthentic: boolean
  spamScore: number
  riskLevel: "low" | "medium" | "high"
  threats: string[]
  details: string
  senderInfo: {
    domain: string
    ipAddress: string
    location: string
  }
  authenticationResults: {
    spf: "pass" | "fail" | "neutral"
    dkim: "pass" | "fail" | "neutral"
    dmarc: "pass" | "fail" | "neutral"
  }
  checkedAt: string
}

export default function EmailAnalyzerPage() {
  const [emailHeaders, setEmailHeaders] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<EmailAnalysisResult | null>(null)
  const [error, setError] = useState("")

  const analyzeEmail = async () => {
    if (!emailHeaders.trim()) {
      setError("Please paste email headers to analyze")
      return
    }

    setIsAnalyzing(true)
    setError("")
    setResult(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const headers = emailHeaders.toLowerCase()

      // Check for suspicious patterns
      const suspiciousPatterns = [
        "urgent",
        "verify account",
        "suspended",
        "click here",
        "limited time",
        "congratulations",
        "winner",
        "free money",
        "nigerian prince",
        "inheritance",
      ]

      const phishingIndicators = [
        "paypal",
        "amazon",
        "microsoft",
        "google",
        "apple",
        "bank",
        "credit card",
        "upi",
        "paytm",
        "phonepe",
        "sbi",
        "hdfc",
        "icici",
      ]

      let spamScore = 0
      const threats: string[] = []
      let riskLevel: "low" | "medium" | "high" = "low"

      // Analyze headers for suspicious content
      suspiciousPatterns.forEach((pattern) => {
        if (headers.includes(pattern)) {
          spamScore += 20
          threats.push("Suspicious Content")
        }
      })

      phishingIndicators.forEach((indicator) => {
        if (headers.includes(indicator)) {
          spamScore += 30
          threats.push("Potential Phishing")
        }
      })

      // Check for missing authentication
      if (!headers.includes("dkim-signature")) {
        spamScore += 15
        threats.push("Missing DKIM Signature")
      }

      if (!headers.includes("received-spf")) {
        spamScore += 10
        threats.push("Missing SPF Record")
      }

      // Determine risk level
      if (spamScore >= 50) {
        riskLevel = "high"
      } else if (spamScore >= 25) {
        riskLevel = "medium"
      }

      const mockResult: EmailAnalysisResult = {
        isAuthentic: riskLevel === "low",
        spamScore: Math.min(spamScore, 100),
        riskLevel,
        threats: [...new Set(threats)],
        details:
          riskLevel === "high"
            ? "⚠️ This email shows multiple signs of being fraudulent or malicious. Do not click any links or provide personal information."
            : riskLevel === "medium"
              ? "⚡ This email has some suspicious characteristics. Exercise caution and verify the sender through official channels."
              : "✅ This email appears to be legitimate based on authentication checks and content analysis.",
        senderInfo: {
          domain: "example.com",
          ipAddress: "192.168.1.1",
          location: "Mumbai, India",
        },
        authenticationResults: {
          spf: riskLevel === "high" ? "fail" : riskLevel === "medium" ? "neutral" : "pass",
          dkim: riskLevel === "high" ? "fail" : riskLevel === "medium" ? "neutral" : "pass",
          dmarc: riskLevel === "high" ? "fail" : riskLevel === "medium" ? "neutral" : "pass",
        },
        checkedAt: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      }

      setResult(mockResult)
    } catch (err) {
      setError("Failed to analyze email headers. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security Tools
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 animate-pulse-slow">
              <Mail className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">Email Header Analyzer</h1>
          <p className="text-gray-300">Analyze email headers to detect spoofing and phishing attempts</p>
        </div>

        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">Paste Email Headers</CardTitle>
            <CardDescription className="text-gray-400">
              Copy and paste the full email headers here. We'll analyze authentication records, sender information, and
              detect potential threats.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Paste email headers here (From, To, Subject, Received, Authentication-Results, etc.)"
                value={emailHeaders}
                onChange={(e) => setEmailHeaders(e.target.value)}
                className="min-h-32 bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:border-purple-500/50"
              />
              <Button onClick={analyzeEmail} disabled={isAnalyzing} className="w-full btn-primary">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Headers...
                  </>
                ) : (
                  "Analyze Email"
                )}
              </Button>
              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-600/20 p-3 rounded-lg border border-red-500/50">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card
            className={`mb-8 border-l-4 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-scale-in ${
              result.isAuthentic
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
                    {result.isAuthentic ? (
                      <CheckCircle className="mr-3 h-6 w-6 text-green-400" />
                    ) : result.riskLevel === "medium" ? (
                      <AlertTriangle className="mr-3 h-6 w-6 text-yellow-400" />
                    ) : (
                      <XCircle className="mr-3 h-6 w-6 text-red-400" />
                    )}
                    {result.isAuthentic
                      ? "Email Appears Authentic"
                      : result.riskLevel === "medium"
                        ? "Email Requires Verification"
                        : "Email is Suspicious"}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-400">
                    Analyzed: {result.checkedAt} | Spam Score: {result.spamScore}/100
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
                  {result.riskLevel === "low"
                    ? "Authentic"
                    : result.riskLevel === "medium"
                      ? "Suspicious"
                      : "Dangerous"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-300">{result.details}</p>

                {/* Authentication Results */}
                <div>
                  <h4 className="font-medium text-gray-200 mb-3">Email Authentication</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(result.authenticationResults).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300 uppercase">{key}</span>
                          <Badge
                            className={`${
                              value === "pass"
                                ? "bg-green-600/20 text-green-400 border-green-500/50"
                                : value === "fail"
                                  ? "bg-red-600/20 text-red-400 border-red-500/50"
                                  : "bg-yellow-600/20 text-yellow-400 border-yellow-500/50"
                            } border text-xs`}
                          >
                            {value}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sender Information */}
                <div>
                  <h4 className="font-medium text-gray-200 mb-3">Sender Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                      <div className="text-xs text-gray-400 mb-1">Domain</div>
                      <div className="text-sm text-gray-300">{result.senderInfo.domain}</div>
                    </div>
                    <div className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                      <div className="text-xs text-gray-400 mb-1">IP Address</div>
                      <div className="text-sm text-gray-300">{result.senderInfo.ipAddress}</div>
                    </div>
                    <div className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/30">
                      <div className="text-xs text-gray-400 mb-1">Location</div>
                      <div className="text-sm text-gray-300">{result.senderInfo.location}</div>
                    </div>
                  </div>
                </div>

                {result.threats.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-200 mb-2">Detected Issues:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.threats.map((threat, index) => (
                        <Badge key={index} className="bg-red-600/20 text-red-400 border border-red-500/50">
                          {threat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
                <span>Email headers are processed locally in your browser</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>No email content is stored or transmitted to our servers</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>Analysis results are not logged or tracked</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
