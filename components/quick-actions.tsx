import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Shield, Phone, Newspaper, AlertCircle, Lock, Eye, Wifi, QrCode } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Scam Quiz",
    description: "Test your knowledge with interactive quizzes and earn badges",
    icon: Brain,
    href: "/quiz",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-400/20",
  },
  {
    title: "Security Tools",
    description: "Check URLs for safety and test if your passwords have been breached",
    icon: Shield,
    href: "/tools",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-400/20",
  },
  {
    title: "Report Scam",
    description: "Quick access to helplines and step-by-step reporting guides",
    icon: Phone,
    href: "/report",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    borderColor: "border-red-400/20",
  },
  {
    title: "Latest News",
    description: "Stay updated with the latest cyber security threats and alerts",
    icon: Newspaper,
    href: "/news",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-400/20",
  },
]

const advancedTools = [
  {
    title: "AI Phishing Detector",
    description: "Advanced AI-powered email and message analysis",
    icon: Eye,
    href: "/tools/phishing-detector",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    borderColor: "border-cyan-400/20",
  },
  {
    title: "2FA Authenticator",
    description: "Secure two-factor authentication management",
    icon: Lock,
    href: "/tools/2fa-manager",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
    borderColor: "border-indigo-400/20",
  },
  {
    title: "Network Scanner",
    description: "Scan and secure your Wi-Fi networks",
    icon: Wifi,
    href: "/tools/network-scanner",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-400/20",
  },
  {
    title: "QR Code Analyzer",
    description: "Safely analyze QR codes before scanning",
    icon: QrCode,
    href: "/tools/qr-analyzer",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
    borderColor: "border-pink-400/20",
  },
]

export function QuickActions() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 mb-4">Quick Actions</h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
            Essential tools and resources to keep you protected from cyber threats
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={action.title}
                className="card-modern hover-lift text-center card-glow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${action.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 border ${action.borderColor}`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.color}`} />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-200">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                    {action.description}
                  </CardDescription>
                  <Link href={action.href}>
                    <Button className="w-full btn-outline text-xs sm:text-sm py-2 hover:scale-105 transition-all duration-300">
                      Access Tool
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mb-2">Advanced Security Tools</h3>
            <p className="text-gray-400 px-4 sm:px-0">Professional-grade protection for advanced users</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {advancedTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Card
                  key={tool.title}
                  className="card-modern hover-lift text-center card-glow animate-slide-up"
                  style={{ animationDelay: `${(index + 4) * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${tool.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 border ${tool.borderColor}`}
                    >
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-semibold text-gray-200">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
                      {tool.description}
                    </CardDescription>
                    <Link href={tool.href}>
                      <Button className="w-full btn-secondary text-xs sm:text-sm py-2 hover:scale-105 transition-all duration-300">
                        Try Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Card
          className="gradient-border shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 animate-scale-in"
          style={{ animationDelay: "800ms" }}
        >
          <div className="gradient-border-inner p-6 sm:p-8 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 sm:p-3 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-gray-100">Daily Security Tip</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-200 font-medium mb-2 text-sm sm:text-base">
                Never share your OTP or banking passwords with anyone over phone calls or messages.
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Banks and legitimate companies will never ask for your OTP or passwords. Always verify by calling the
                official number.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
