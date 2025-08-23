"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield,
  Info,
  Clock,
  Calendar,
  MapPin,
  ExternalLink,
  Server,
  Lock,
  Eye
} from "lucide-react"

interface DomainAnalysis {
  domain: string
  registrationDate: string
  expiryDate: string
  ageInDays: number
  ageFormatted: string
  registrar: string
  status: string[]
  dnsRecords: {
    a: string[]
    mx: string[]
    ns: string[]
    txt: string[]
  }
  sslInfo: {
    valid: boolean
    issuer: string
    expiry: string
    daysUntilExpiry: number
  }
  riskLevel: "low" | "medium" | "high"
  redFlags: string[]
  greenFlags: string[]
  recommendations: string[]
  securityScore: number
}

export default function DomainAgeChecker() {
  const [domain, setDomain] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<DomainAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDomainAnalysis = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain name')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Real-time API call
      const response = await fetch('/api/domain-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze domain')
      }

      const result = await response.json()
      setAnalysis(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze domain. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setDomain("")
    setAnalysis(null)
    setError(null)
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-600/20 text-green-400 border-green-500/50'
      case 'medium': return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50'
      case 'high': return 'bg-red-600/20 text-red-400 border-red-500/50'
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/50'
    }
  }

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getSSLStatusColor = (valid: boolean) => {
    return valid ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <Globe className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Domain Age Checker</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Check domain registration dates, SSL certificates, and security information. Analyze any domain for potential security risks and authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Domain Input */}
            <Card className="bg-gray-800/50 border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">🌐 Domain Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter any domain to analyze its age and security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain" className="text-gray-300">Domain Name</Label>
                    <Input
                      id="domain"
                      placeholder="e.g., google.com, example.org"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500"
                    />
                  </div>
                  
                  {/* Example Domains */}
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400">Try these popular domains:</Label>
                    <div className="flex flex-wrap gap-2">
                      {['google.com', 'facebook.com', 'amazon.com', 'netflix.com', 'github.com'].map((example) => (
                        <Button
                          key={example}
                          variant="outline"
                          size="sm"
                          onClick={() => setDomain(example)}
                          className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          {example}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleDomainAnalysis}
                    disabled={isAnalyzing || !domain.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing Domain...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze Domain
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert className="border-red-500/50 bg-red-500/10 mt-4">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                  </Alert>
                )}

                {analysis && (
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Domain Info */}
            <Card className="bg-gray-800/50 border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">🔍 Domain Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time domain information and security checks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🌐</div>
                  <p className="text-sm text-gray-300">Domain Age Checker</p>
                  <p className="text-xs text-gray-500 mt-1">Powered by real-time data</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {analysis ? (
              <>
                {/* Domain Overview */}
                <Card className="bg-gray-800/50 border border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-gray-100">
                      <span className="mr-3 text-2xl">🌐</span>
                      Domain Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Domain:</span>
                          <span className="text-gray-200 font-mono">{analysis.domain}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Registrar:</span>
                          <span className="text-gray-200">{analysis.registrar}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Status:</span>
                                                     <div className="flex flex-wrap gap-1">
                             {analysis.status.map((status, index) => (
                               <Badge key={index} variant="outline" className="text-xs border-gray-500 text-gray-300 bg-gray-700/50">
                                 {status}
                               </Badge>
                             ))}
                           </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Security Score:</span>
                          <span className={`text-2xl font-bold ${getSecurityScoreColor(analysis.securityScore)}`}>
                            {analysis.securityScore}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Risk Level:</span>
                          <Badge className={getRiskLevelColor(analysis.riskLevel)}>
                            {analysis.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Domain Age:</span>
                          <span className="text-gray-200">{analysis.ageFormatted}</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-gray-600" />

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">Registration: {analysis.registrationDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">Expiry: {analysis.expiryDate}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Lock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            SSL: <span className={getSSLStatusColor(analysis.sslInfo.valid)}>
                              {analysis.sslInfo.valid ? 'Valid' : 'Invalid'}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <a 
                            href={`https://${analysis.domain}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
                          >
                            Visit Domain <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SSL Information */}
                <Card className="bg-gray-800/50 border border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100 flex items-center">
                      <Lock className="mr-2 h-5 w-5 text-blue-400" />
                      SSL Certificate Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">SSL Valid:</span>
                                                     <Badge className={analysis.sslInfo.valid ? 'bg-green-600/20 text-green-400 border-green-500/50' : 'bg-red-600/20 text-red-400 border-red-500/50'}>
                             {analysis.sslInfo.valid ? 'YES' : 'NO'}
                           </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Issuer:</span>
                          <span className="text-gray-200 text-sm">{analysis.sslInfo.issuer}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Expiry Date:</span>
                          <span className="text-gray-200">{analysis.sslInfo.expiry}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Days Until Expiry:</span>
                          <span className={`font-bold ${analysis.sslInfo.daysUntilExpiry < 30 ? 'text-red-400' : 'text-gray-200'}`}>
                            {analysis.sslInfo.daysUntilExpiry}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* DNS Records */}
                <Card className="bg-gray-800/50 border border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100 flex items-center">
                      <Server className="mr-2 h-5 w-5 text-green-400" />
                      DNS Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-gray-300 font-medium">A Records (IPv4):</Label>
                        <div className="space-y-1">
                          {analysis.dnsRecords.a.length > 0 ? (
                            analysis.dnsRecords.a.map((record, index) => (
                              <div key={index} className="text-sm text-gray-200 font-mono bg-gray-700/50 p-2 rounded">
                                {record}
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">No A records found</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-gray-300 font-medium">MX Records (Mail):</Label>
                        <div className="space-y-1">
                          {analysis.dnsRecords.mx.length > 0 ? (
                            analysis.dnsRecords.mx.map((record, index) => (
                              <div key={index} className="text-sm text-gray-200 font-mono bg-gray-700/50 p-2 rounded">
                                {record}
                              </div>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">No MX records found</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Red Flags & Green Flags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysis.redFlags.length > 0 && (
                    <Card className="bg-red-600/10 border border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-300 flex items-center">
                          <AlertTriangle className="mr-2 h-5 w-5" />
                          Red Flags ({analysis.redFlags.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.redFlags.map((flag, index) => (
                            <li key={index} className="text-sm text-red-200 flex items-start">
                              <span className="mr-2 text-red-400">•</span>
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {analysis.greenFlags.length > 0 && (
                    <Card className="bg-green-600/10 border border-green-500/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-300 flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Green Flags ({analysis.greenFlags.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.greenFlags.map((flag, index) => (
                            <li key={index} className="text-sm text-green-200 flex items-start">
                              <span className="mr-2 text-green-400">•</span>
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Recommendations */}
                <Card className="bg-gray-800/50 border border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-100 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-blue-400" />
                      Security Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <span className="mr-2 text-blue-400">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Empty State */
              <Card className="bg-gray-800/50 border border-gray-700/50 h-96 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Globe className="mx-auto h-16 w-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-sm">Enter a domain name to start analyzing</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Domain Security Tips */}
        <Card className="bg-gray-800/50 border border-gray-700/50 mt-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-100">🌐 Domain Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Always check SSL certificates before entering sensitive information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Be cautious of domains with very recent registration dates</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Look for established domains with long registration history</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Verify SSL certificate validity and expiration dates</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Check domain registrar reputation and contact information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Monitor domain expiration dates to avoid service disruption</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
