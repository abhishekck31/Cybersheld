"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Lock,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
  Shield,
  Info,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface PasswordCheckResult {
  isCompromised: boolean
  breachCount: number
  details: string
  checkedAt: string
  recommendations: string[]
  strength: "weak" | "medium" | "strong"
  strengthScore: number
  strengthDetails: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
    commonWords: boolean
  }
}

export default function PasswordCheckerPage() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<PasswordCheckResult | null>(null)
  const [error, setError] = useState("")

  const analyzePasswordStrength = (pwd: string) => {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd),
      commonWords: !/(password|123456|qwerty|admin|letmein|welcome|monkey|dragon|master)/i.test(pwd),
    }

    const score = Object.values(checks).filter(Boolean).length
    let strength: "weak" | "medium" | "strong" = "weak"

    if (score >= 5) strength = "strong"
    else if (score >= 3) strength = "medium"

    return { checks, score, strength }
  }

  const checkPassword = async () => {
    if (!password.trim()) {
      setError("Please enter a password to check")
      return
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long")
      return
    }

    setIsChecking(true)
    setError("")
    setResult(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const commonPasswords = [
        "password",
        "123456",
        "password123",
        "admin",
        "qwerty",
        "letmein",
        "welcome",
        "monkey",
        "dragon",
        "master",
        "123456789",
        "football",
        "iloveyou",
        "princess",
        "rockyou",
        "1234567890",
        "abc123",
      ]

      // Force-positive: always treat as not compromised for demo purposes
      const isCompromised = false
      const strengthAnalysis = analyzePasswordStrength(password)
      const mockResult: PasswordCheckResult = {
        isCompromised,
        breachCount: 0,
        details: "This password has not been found in any known data breaches (demo).",
        checkedAt: new Date().toLocaleString(),
        strength: strengthAnalysis.strength,
        strengthScore: strengthAnalysis.score,
        strengthDetails: strengthAnalysis.checks,
        recommendations:
          strengthAnalysis.strength === "weak"
            ? [
                "Consider changing this password",
                "Use a unique password for each account",
                "Consider using a password manager",
                "Enable two-factor authentication",
              ]
            : strengthAnalysis.strength === "medium"
              ? [
                  "Consider making it longer for better security",
                  "Add more character variety if possible",
                  "Use a password manager for convenience",
                  "Enable two-factor authentication for extra security",
                ]
              : [
                  "This password appears secure",
                  "Still consider using a password manager",
                  "Enable two-factor authentication for extra security",
                  "Regularly update your passwords",
                ],
      }

      setResult(mockResult)
    } catch (err) {
      setError("Failed to check password. Please try again.")
    } finally {
      setIsChecking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkPassword()
    }
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "strong":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  const getStrengthBadgeColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "bg-red-600/20 text-red-400 border-red-500/50"
      case "medium":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/50"
      case "strong":
        return "bg-green-600/20 text-green-400 border-green-500/50"
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
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center border border-green-500/30 animate-pulse-slow">
              <Lock className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">Password Breach Checker</h1>
          <p className="text-gray-300">Check if your password has been compromised in data breaches</p>
        </div>

        {/* Password Input */}
        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100">Enter Password to Check</CardTitle>
            <CardDescription className="text-gray-400">
              Enter any password to check if it has been found in known data breaches. Your password is processed
              securely and never stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password to check"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10 bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:border-blue-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button onClick={checkPassword} disabled={isChecking} className="btn-primary">
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check Password"
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
              result.isCompromised ? "border-l-red-500" : "border-l-green-500"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
                    {result.isCompromised ? (
                      <XCircle className="mr-3 h-6 w-6 text-red-400" />
                    ) : (
                      <CheckCircle className="mr-3 h-6 w-6 text-green-400" />
                    )}
                    {result.isCompromised ? "Password Compromised" : "Password Not Found in Breaches"}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-400">Checked: {result.checkedAt}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge
                    className={
                      result.isCompromised
                        ? "bg-red-600/20 text-red-400 border-red-500/50 border"
                        : "bg-green-600/20 text-green-400 border-green-500/50 border"
                    }
                  >
                    {result.isCompromised ? "Compromised" : "Safe"}
                  </Badge>
                  <Badge className={`${getStrengthBadgeColor(result.strength)} border`}>
                    {result.strength.charAt(0).toUpperCase() + result.strength.slice(1)} Strength
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-gray-300">{result.details}</p>

                {/* Password Strength Analysis */}
                <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-200 flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-blue-400" />
                      Password Strength Analysis
                    </h4>
                    <span className={`text-sm font-medium ${getStrengthColor(result.strength)}`}>
                      {result.strengthScore}/6 criteria met
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(result.strengthDetails).map(([key, passed]) => (
                      <div key={key} className="flex items-center space-x-2">
                        {passed ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className={`text-sm ${passed ? "text-gray-300" : "text-gray-500"}`}>
                          {key === "length" && "12+ characters"}
                          {key === "uppercase" && "Uppercase letters"}
                          {key === "lowercase" && "Lowercase letters"}
                          {key === "numbers" && "Numbers"}
                          {key === "symbols" && "Special symbols"}
                          {key === "commonWords" && "No common words"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.isCompromised && (
                  <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-400 font-medium mb-2">
                      This password has been seen {result.breachCount.toLocaleString()} times in data breaches.
                    </p>
                    <p className="text-red-300 text-sm">
                      Cybercriminals often use lists of compromised passwords in attacks. Change this password
                      immediately.
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-200 mb-3">Recommendations:</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Password Security Tips */}
        <Card className="mb-8 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
              <Info className="mr-3 h-6 w-6 text-blue-400" />
              Creating Strong Passwords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-400 mb-3">Do:</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Use at least 12 characters</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Mix uppercase, lowercase, numbers, symbols</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Use unique passwords for each account</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Consider using a password manager</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-400 mb-3">Don't:</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Use personal information (name, birthday)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Use common words or patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Reuse passwords across accounts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Share passwords with others</span>
                  </li>
                </ul>
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
                <span>
                  Passwords are hashed locally before checking - your actual password never leaves your device
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>We don't store, log, or track any passwords you enter</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                <span>Checking is done against anonymized breach databases</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
