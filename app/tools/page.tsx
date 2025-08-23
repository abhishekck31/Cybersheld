import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  LinkIcon,
  Lock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  QrCode,
  Users,
  Globe,
  MapPin,
  FileText,
  Wifi,
  Award,
} from "lucide-react"
import Link from "next/link"

const securityTools = [
  {
    id: "url-checker",
    title: "URL Safety Checker",
    description: "Check if a website or link is safe before visiting it",
    icon: LinkIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: ["Real-time malware detection", "Phishing site identification", "Safe browsing verification"],
    usage: "Paste any URL to check if it's safe to visit",
    category: "Web Security",
  },
  {
    id: "password-checker",
    title: "Password Breach Checker",
    description: "Check if your password has been compromised in data breaches",
    icon: Lock,
    color: "text-green-600",
    bgColor: "bg-green-50",
    features: ["Check against known breaches", "Privacy-focused checking", "Secure password validation"],
    usage: "Enter your password to see if it's been compromised",
    category: "Authentication",
  },
  {
    id: "email-analyzer",
    title: "Email Header Analyzer",
    description: "Analyze email headers to detect spoofing and phishing attempts",
    icon: Mail,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: ["Header authentication check", "Sender verification", "Spam score analysis"],
    usage: "Paste email headers to analyze authenticity",
    category: "Email Security",
  },
  {
    id: "phone-validator",
    title: "Phone Number Validator",
    description: "Verify phone numbers and check for known scam numbers",
    icon: Phone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    features: ["Number format validation", "Carrier identification", "Scam database lookup"],
    usage: "Enter phone number to verify legitimacy",
    category: "Communication",
  },
  {
    id: "qr-scanner",
    title: "QR Code Analyzer",
    description: "Safely analyze QR codes before scanning with your device",
    icon: QrCode,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    features: ["Safe QR code preview", "Malicious link detection", "Content analysis"],
    usage: "Upload QR code image to analyze safely",
    category: "Mobile Security",
  },
  {
    id: "social-checker",
    title: "Social Profile Checker",
    description: "Verify social media profiles and detect fake accounts",
    icon: Users,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    features: ["Profile authenticity check", "Fake account detection", "Activity analysis"],
    usage: "Enter social media profile URL to verify",
    category: "Social Media",
  },
  {
    id: "domain-checker",
    title: "Domain Age Checker",
    description: "Check domain registration dates and security information",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: ["Domain age verification", "SSL certificate checking", "DNS record analysis"],
    usage: "Enter domain name to analyze",
    category: "Web Security",
  },
  {
    id: "ip-lookup",
    title: "IP Address Lookup",
    description: "Get detailed information about IP addresses and locations",
    icon: MapPin,
    color: "text-red-600",
    bgColor: "bg-red-50",
    features: ["Geolocation data", "ISP information", "Threat intelligence"],
    usage: "Enter IP address to get location and threat data",
    category: "Network Security",
  },
  {
    id: "file-analyzer",
    title: "File Hash Checker",
    description: "Verify file integrity and check for malware signatures",
    icon: FileText,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    features: ["Hash verification", "Malware detection", "File reputation check"],
    usage: "Upload file or enter hash to verify safety",
    category: "File Security",
  },
  {
    id: "wifi-analyzer",
    title: "Wi-Fi Security Scanner",
    description: "Analyze Wi-Fi networks for security vulnerabilities",
    icon: Wifi,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    features: ["Encryption analysis", "Security protocol check", "Vulnerability detection"],
    usage: "Scan nearby networks for security issues",
    category: "Network Security",
  },
  {
    id: "ssl-checker",
    title: "SSL Certificate Checker",
    description: "Verify website SSL certificates and security status",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    features: ["Certificate validation", "Expiry date check", "Security grade analysis"],
    usage: "Enter website URL to check SSL certificate",
    category: "Web Security",
  },
  {
    id: "breach-monitor",
    title: "Data Breach Monitor",
    description: "Monitor your email and accounts for data breaches",
    icon: AlertTriangle,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    features: ["Email breach monitoring", "Account compromise alerts", "Breach timeline"],
    usage: "Enter email to check for known breaches",
    category: "Privacy Protection",
  },
]

const safetyTips = [
  {
    title: "Always Verify Before Clicking",
    description: "Use these tools before visiting suspicious links from emails or messages",
    icon: CheckCircle,
  },
  {
    title: "Regular Security Checks",
    description: "Check your passwords, emails, and accounts periodically for breaches",
    icon: Lock,
  },
  {
    title: "Share with Family",
    description: "Educate your family and friends about online threats and share these tools with them.",
    icon: AlertTriangle,
  },
]

export default function SecurityToolsPage() {
  const categories = [
    "All",
    "Web Security",
    "Authentication",
    "Email Security",
    "Communication",
    "Mobile Security",
    "Social Media",
    "Network Security",
    "File Security",
    "Privacy Protection",
  ]

  return (
  <div className="min-h-screen bg-black text-gray-100">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 glass-effect-light px-4 py-2 rounded-full animate-bounce-in">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Security Tools</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 animate-slide-up">
            Comprehensive Security Tools
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto animate-scale-in" style={{ animationDelay: "200ms" }}>
            Professional-grade security tools to help you verify URLs, analyze emails, check passwords, and protect
            yourself from cyber threats in real-time
          </p>
        </div>

        {/* Security Tools */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {securityTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Card
                  key={tool.id}
                  className="bg-gray-800/50 border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in hover-lift flex flex-col h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-gray-600/30`}
                    >
                      <Icon className={`h-8 w-8 text-blue-400`} />
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full border border-gray-600/30">
                        {tool.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-blue-400 transition-colors text-gray-100">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-gray-400">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-start">
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-gray-200 mb-3">Features:</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 italic">{tool.usage}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href={`/tools/${tool.id}`} className="w-full">
                      <Button className="w-full group btn-primary">
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 text-center animate-fade-in">
            Security Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-md transition-shadow bg-gray-800/50 border border-gray-700/50 animate-fade-in hover-lift"
                >
                  <CardHeader>
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-100">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed text-gray-400">
                      {tip.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Important Notice */}
        <Card className="bg-red-600/20 border border-red-500/50 animate-fade-in backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center text-gray-100">
              <AlertTriangle className="mr-3 h-6 w-6 text-red-400" />
              Privacy & Security Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="space-y-2">
                <p>
                  <strong className="text-gray-200">URL & Domain Tools:</strong> Checked against public safety
                  databases. No personal data stored.
                </p>
                <p>
                  <strong className="text-gray-200">Password Checker:</strong> Passwords are hashed locally. Your actual
                  password never leaves your device.
                </p>
                <p>
                  <strong className="text-gray-200">Email Analyzer:</strong> Headers processed locally. No email content
                  is stored or transmitted.
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong className="text-gray-200">File Analysis:</strong> Files analyzed locally when possible.
                  Hash-based verification for privacy.
                </p>
                <p>
                  <strong className="text-gray-200">Network Tools:</strong> Public IP information only. No private
                  network data collected.
                </p>
                <p>
                  <strong className="text-gray-200">Data Protection:</strong> We don't store, log, or track any
                  information you enter into these tools.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
