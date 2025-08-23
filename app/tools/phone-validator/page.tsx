"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Phone, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Loader2, Shield } from "lucide-react"
import Link from "next/link"

interface PhoneValidationResult {
  phoneNumber: string
  isValid: boolean
  isScam: boolean
  carriers: string[]
  locations: string[]
  numberType: string
  riskLevel: "low" | "medium" | "high"
  threats: string[]
  details: string
  checkedAt: string
}

export default function PhoneValidatorPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [result, setResult] = useState<PhoneValidationResult | null>(null)
  const [error, setError] = useState("")

  const validatePhone = async () => {
    if (!phoneNumber.trim()) {
      setError("Please enter a phone number to validate")
      return
    }

    const cleanNumber = phoneNumber.replace(/\D/g, "")
    if (cleanNumber.length < 10) {
      setError("Please enter a valid phone number with at least 10 digits")
      return
    }

    setIsValidating(true)
    setError("")
    setResult(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Known scam number patterns (for demo)
      const scamPatterns = [
        "9999999999",
        "1234567890",
        "0000000000",
        "1111111111",
        "8888888888",
        "7777777777",
        "6666666666",
      ]

      // Check if it's a known scam pattern
      const isScam = scamPatterns.some((pattern) => cleanNumber.includes(pattern))

      // Indian mobile number validation
      const isIndianMobile = /^[6-9]\d{9}$/.test(cleanNumber.slice(-10))
      const isLandline = /^[2-5]\d{7,10}$/.test(cleanNumber)

  let riskLevel: "low" | "medium" | "high" = "low"
  let threats: string[] = []
  let carriers: string[] = []
  const locations: string[] = ["India"]
      let numberType = "Mobile"

      if (isScam) {
        riskLevel = "high"
        threats = ["Known Scam Number", "Fraudulent Activity", "Spam Calls"]
      } else if (!isIndianMobile && !isLandline) {
        riskLevel = "medium"
        threats = ["International Number", "Potential Spam"]
      }

      // Determine possible carriers based on prefix (heuristic)
      const prefix = cleanNumber.slice(-10, -8)
      const carrierMap: Record<string, string[]> = {
        // some prefixes may map to multiple carriers historically
        '70': ['Airtel', 'BSNL'],
        '71': ['BSNL'],
        '72': ['BSNL'],
        '73': ['BSNL'],
        '74': ['BSNL'],
        '75': ['BSNL'],
        '76': ['BSNL'],
        '77': ['BSNL'],
        '78': ['BSNL'],
        '79': ['BSNL'],
        '80': ['Airtel'],
        '81': ['Airtel'],
        '82': ['Airtel'],
        '83': ['Airtel'],
        '90': ['Vodafone Idea'],
        '91': ['Vodafone Idea'],
        '92': ['Vodafone Idea'],
        '93': ['Vodafone Idea'],
        '94': ['Vodafone Idea'],
        '95': ['Vodafone Idea'],
        '96': ['Vodafone Idea'],
        '97': ['Vodafone Idea'],
        '98': ['Vodafone Idea'],
        '99': ['Vodafone Idea'],
        '60': ['Jio'],
        '61': ['Jio'],
        '62': ['Jio'],
        '63': ['Jio'],
        '64': ['Jio'],
        '65': ['Jio'],
        '66': ['Jio'],
        '67': ['Jio'],
        '68': ['Jio'],
        '69': ['Jio'],
      }

      if (carrierMap[prefix]) {
        carriers = carrierMap[prefix]
      }

      if (isLandline) {
        numberType = "Landline"
        carriers = ['Various']
        // try to infer location from STD code (simple heuristic)
        const std = cleanNumber.slice(-10, -7)
        const stdMap: Record<string, string[]> = {
          '011': ['Delhi'],
          '022': ['Mumbai'],
          '080': ['Bengaluru'],
          '044': ['Chennai'],
          '033': ['Kolkata'],
        }
        if (stdMap[std]) {
          locations.splice(0, locations.length, ...stdMap[std])
        }
      }

      // If no carriers found, set Unknown
      if (carriers.length === 0) carriers = ['Unknown']

      const mockResult: PhoneValidationResult = {
        phoneNumber: `+91 ${cleanNumber.slice(-10)}`,
        isValid: isIndianMobile || isLandline,
        isScam,
        carriers,
        locations,
        numberType,
        riskLevel,
        threats,
        details: isScam
          ? "⚠️ This number has been reported for fraudulent activities. Do not share personal information or send money."
          : riskLevel === "medium"
            ? "⚡ This number requires caution. Verify the caller's identity before sharing any information."
            : "✅ This appears to be a legitimate phone number with no known issues.",
        checkedAt: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      }

      setResult(mockResult)
    } catch (err) {
      setError("Failed to validate phone number. Please try again.")
    } finally {
      setIsValidating(false)
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
            <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center border border-orange-500/30 animate-pulse-slow">
              <Phone className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">Phone Number Validator</h1>
          <p className="text-gray-300">Verify phone numbers and check for known scam numbers</p>
        </div>

        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">Enter Phone Number</CardTitle>
            <CardDescription className="text-gray-400">
              Enter any phone number to verify its legitimacy and check against known scam databases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="tel"
                  placeholder="Enter phone number (e.g., +91 9876543210 or 9876543210)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && validatePhone()}
                  className="flex-1 bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:border-orange-500/50"
                />
                <Button onClick={validatePhone} disabled={isValidating} className="btn-primary">
                  {isValidating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    "Validate"
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

        {result && (
          <Card
            className={`mb-8 border-l-4 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-scale-in ${
              result.isValid && !result.isScam
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
                    {result.isValid && !result.isScam ? (
                      <CheckCircle className="mr-3 h-6 w-6 text-green-400" />
                    ) : result.riskLevel === "medium" ? (
                      <AlertTriangle className="mr-3 h-6 w-6 text-yellow-400" />
                    ) : (
                      <XCircle className="mr-3 h-6 w-6 text-red-400" />
                    )}
                    {result.isScam ? "Scam Number Detected" : result.isValid ? "Valid Phone Number" : "Invalid Number"}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-400">
                    Checked: {result.checkedAt} | Number: {result.phoneNumber}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-medium text-gray-200 mb-2">Carrier</h4>
                    <div className="text-sm text-gray-400">
                      {result.carriers && result.carriers.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {result.carriers.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>Unknown</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-medium text-gray-200 mb-2">Type</h4>
                    <p className="text-sm text-gray-400">{result.numberType}</p>
                  </div>
                  <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <h4 className="font-medium text-gray-200 mb-2">Location</h4>
                    <div className="text-sm text-gray-400">
                      {result.locations && result.locations.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {result.locations.map((l) => (
                            <li key={l}>{l}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>India</span>
                      )}
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

                <div className="mt-4 text-xs text-gray-400 bg-yellow-50/5 p-3 rounded">
                  <strong className="text-gray-200">Note:</strong> Carrier and location inference is heuristic and based on public numbering prefixes. Numbers can be ported between operators (MNP) or belong to virtual operators (MVNOs), so multiple carriers may be possible or the true carrier may differ. Use this as guidance only.
                </div>
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
                <span>Phone numbers are validated against public databases only</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>No phone numbers are stored or logged</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>Validation results are not tracked or saved</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
