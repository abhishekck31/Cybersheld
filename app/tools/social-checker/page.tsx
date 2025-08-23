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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Shield,
  Info,
  Clock,
  UserCheck,
  UserX,
  Activity,
  Globe,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ExternalLink
} from "lucide-react"

interface SocialProfileAnalysis {
  platform: string
  profileUrl: string
  username: string
  displayName: string
  isVerified: boolean
  authenticityScore: number
  riskLevel: "low" | "medium" | "high"
  redFlags: string[]
  greenFlags: string[]
  recommendations: string[]
  lastActivity?: string
  followerCount?: number
  accountAge?: string
  location?: string
  description?: string
}

const socialPlatforms = [
  { id: "twitter", name: "Twitter/X", icon: "🐦", domain: "twitter.com" },
  { id: "instagram", name: "Instagram", icon: "📷", domain: "instagram.com" },
  { id: "facebook", name: "Facebook", icon: "📘", domain: "facebook.com" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", domain: "linkedin.com" },
  { id: "tiktok", name: "TikTok", icon: "🎵", domain: "tiktok.com" },
  { id: "youtube", name: "YouTube", icon: "📺", domain: "youtube.com" },
  { id: "reddit", name: "Reddit", icon: "🤖", domain: "reddit.com" },
  { id: "discord", name: "Discord", icon: "🎮", domain: "discord.com" }
]

export default function SocialProfileChecker() {
  const [selectedPlatform, setSelectedPlatform] = useState("twitter")
  const [profileUrl, setProfileUrl] = useState("")
  const [username, setUsername] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<SocialProfileAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("url")

  const handleUrlAnalysis = async () => {
    if (!profileUrl.trim()) {
      setError('Please enter a profile URL')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Real-time API call
      const response = await fetch('/api/social-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          profileUrl: profileUrl
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze profile')
      }

      const result = await response.json()
      setAnalysis(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze profile. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleUsernameAnalysis = async () => {
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Real-time API call
      const response = await fetch('/api/social-checker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          username: username
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze profile')
      }

      const result = await response.json()
      setAnalysis(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze profile. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setProfileUrl("")
    setUsername("")
    setAnalysis(null)
    setError(null)
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAuthenticityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPlatformIcon = (platformId: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId)
    return platform ? platform.icon : "🌐"
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600/20 rounded-full mb-4">
            <Users className="h-8 w-8 text-pink-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">Social Profile Checker</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Verify social media profiles and detect fake accounts. Analyze profiles across multiple platforms to identify potential scams and verify authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Platform Selection & Input */}
          <div className="lg:col-span-1 space-y-6">
            {/* Platform Selection */}
            <Card className="bg-gray-800/50 border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">Select Platform</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose the social media platform to analyze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={selectedPlatform === platform.id ? "default" : "outline"}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`h-auto p-3 flex-col ${
                        selectedPlatform === platform.id 
                          ? 'bg-pink-600 hover:bg-pink-700' 
                          : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{platform.icon}</span>
                      <span className="text-xs">{platform.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Input Methods */}
            <Card className="bg-gray-800/50 border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Enter profile URL or username to analyze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="url" className="data-[state=active]:bg-pink-600">URL</TabsTrigger>
                    <TabsTrigger value="username" className="data-[state=active]:bg-pink-600">Username</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="url" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-url" className="text-gray-300">Profile URL</Label>
                      <Input
                        id="profile-url"
                        placeholder={`https://${socialPlatforms.find(p => p.id === selectedPlatform)?.domain}/username`}
                        value={profileUrl}
                        onChange={(e) => setProfileUrl(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500"
                      />
                    </div>
                    <Button
                      onClick={handleUrlAnalysis}
                      disabled={isAnalyzing || !profileUrl.trim()}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze Profile
                        </>
                      )}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="username" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500"
                      />
                    </div>
                    <Button
                      onClick={handleUsernameAnalysis}
                      disabled={isAnalyzing || !username.trim()}
                      className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analyze Profile
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>

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
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {analysis ? (
              <>
                {/* Profile Overview */}
                <Card className="bg-gray-800/50 border border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-gray-100">
                      <span className="mr-3 text-2xl">{getPlatformIcon(analysis.platform)}</span>
                      Profile Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Platform:</span>
                          <Badge variant="outline" className="border-gray-600">
                            {socialPlatforms.find(p => p.id === analysis.platform)?.name}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Username:</span>
                          <span className="text-gray-200 font-mono">@{analysis.username}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Display Name:</span>
                          <span className="text-gray-200">{analysis.displayName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Verified:</span>
                          <Badge className={analysis.isVerified ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-800 border-gray-200'}>
                            {analysis.isVerified ? 'YES' : 'NO'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Authenticity Score:</span>
                          <span className={`text-2xl font-bold ${getAuthenticityScoreColor(analysis.authenticityScore)}`}>
                            {analysis.authenticityScore}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Risk Level:</span>
                          <Badge className={getRiskLevelColor(analysis.riskLevel)}>
                            {analysis.riskLevel.toUpperCase()}
                          </Badge>
                        </div>
                        {analysis.followerCount && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Followers:</span>
                            <span className="text-gray-200">{analysis.followerCount.toLocaleString()}</span>
                          </div>
                        )}
                        {analysis.accountAge && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Account Age:</span>
                            <span className="text-gray-200">{analysis.accountAge}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="bg-gray-600" />

                    {/* Additional Details */}
                    {(analysis.location || analysis.description || analysis.lastActivity) && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {analysis.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-300">{analysis.location}</span>
                          </div>
                        )}
                        {analysis.lastActivity && (
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-300">Active {analysis.lastActivity}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a 
                            href={analysis.profileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-pink-400 hover:text-pink-300 flex items-center"
                          >
                            View Profile <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    )}

                    {analysis.description && (
                      <div>
                        <Label className="text-gray-300 font-medium">Bio/Description:</Label>
                        <div className="mt-2 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                          <p className="text-sm text-gray-200">{analysis.description}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Red Flags & Green Flags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analysis.redFlags.length > 0 && (
                    <Card className="bg-red-600/10 border border-red-500/30">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-300 flex items-center">
                          <UserX className="mr-2 h-5 w-5" />
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
                          <UserCheck className="mr-2 h-5 w-5" />
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
                      Recommendations
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
                  <Users className="mx-auto h-16 w-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                  <p className="text-sm">Enter a profile URL or username to start analyzing</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Security Tips */}
        <Card className="bg-gray-800/50 border border-gray-700/50 mt-8">
          <CardHeader>
            <CardTitle className="text-lg text-gray-100">Social Media Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Always verify accounts through official channels before engaging</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Be cautious of accounts with very recent creation dates</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Look for consistent posting patterns and engagement</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <UserX className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Avoid accounts that promise unrealistic rewards or opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Check for verified badges and official partnerships</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Monitor account activity and posting frequency</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
