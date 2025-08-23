import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  CreditCard,
  UserX,
  GraduationCap,
  Briefcase,
  Home,
  Tractor,
  Users,
  ArrowRight,
  Shield,
} from "lucide-react"
import Link from "next/link"

const fraudTypes = [
  {
    id: "phishing",
    title: "Phishing Attacks",
    description: "Fake emails, messages, and websites designed to steal your personal information",
    icon: Mail,
    color: "text-red-600",
    bgColor: "bg-red-50",
    examples: ["Fake bank emails", "Suspicious links", "Fake login pages"],
  },
  {
    id: "otp-scams",
    title: "Fake OTP Calls",
    description: "Fraudsters calling to trick you into sharing your OTP or banking details",
    icon: Phone,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    examples: ["Bank verification calls", "KYC update calls", "Account blocking threats"],
  },
  {
    id: "upi-scams",
    title: "UPI & Payment Scams",
    description: "Fraudulent payment requests and fake QR codes to steal your money",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    examples: ["Fake payment requests", "Wrong QR codes", "Refund scams"],
  },
  {
    id: "identity-theft",
    title: "Identity Theft",
    description: "Criminals using your personal information to commit fraud in your name",
    icon: UserX,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    examples: ["Aadhaar misuse", "PAN card fraud", "Document theft"],
  },
]

const demographics = [
  {
    id: "student",
    title: "Students",
    description: "Online safety, social media scams, and academic fraud protection",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "professional",
    title: "Professionals",
    description: "Work data protection, business email scams, and secure transactions",
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "homemaker",
    title: "Homemakers",
    description: "Online shopping safety, fake offers, and family protection",
    icon: Home,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: "rural",
    title: "Rural Users",
    description: "Digital payments, government schemes, and basic online safety",
    icon: Tractor,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: "senior",
    title: "Seniors",
    description: "Phone scams, tech support fraud, and safe banking practices",
    icon: Users,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "general",
    title: "General Public",
    description: "Tips for safe browsing, secure payments, and protecting personal information",
    icon: Shield,
    color: "text-cyan-400",
    bgColor: "bg-cyan-900/30",
  },
]

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 glass-effect-light px-4 py-2 rounded-full">
              <Shield className="h-5 w-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Knowledge Hub</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">Learn About Cyber Threats</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive guides to help you identify, understand, and protect yourself from common cyber frauds
          </p>
        </div>

        {/* Common Fraud Types */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 text-center">Common Fraud Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fraudTypes.map((fraud) => {
              const Icon = fraud.icon
              return (
                <Card key={fraud.id} className="hover:shadow-lg transition-shadow duration-300 bg-gray-900/60 border border-cyan-400/10">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-cyan-900/30 rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`h-6 w-6 text-cyan-400`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-gray-100 mb-2">{fraud.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed text-gray-300">{fraud.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-cyan-400 mb-2">Common Examples:</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {fraud.examples.map((example, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={
                      fraud.id === "otp-scams"
                        ? "/learn/otp-phone-scam"
                        : fraud.id === "upi-scams"
                        ? "/learn/payment-security"
                        : fraud.id === "identity-theft"
                        ? "/learn/identity-protection"
                        : fraud.id === "phishing"
                        ? "/knowledge/fraud/phishing"
                        : `/knowledge/fraud/${fraud.id}`
                    }>
                      <Button variant="outline" className="w-full bg-transparent group border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:text-fuchsia-400">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Demographic-Specific Content */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-8 text-center">Tailored Content for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demographics.map((demo) => {
              const Icon = demo.icon
              // Map demographic id to correct folder name for routing
              let route = `/knowledge/${demo.id}`
              if (demo.id === "professional") route = "/knowledge/professionals"
              if (demo.id === "homemaker") route = "/knowledge/homemakers"
              if (demo.id === "rural") route = "/knowledge/rural-users"
              if (demo.id === "senior") route = "/knowledge/seniors"
              if (demo.id === "general") route = "/knowledge/general-public"
              // student remains /knowledge/student
              return (
                <Card key={demo.id} className="hover:shadow-lg transition-shadow duration-300 bg-gray-900/60 border border-cyan-400/10">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className={`h-8 w-8 text-cyan-400`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-100">{demo.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-6 text-sm leading-relaxed text-gray-300">{demo.description}</CardDescription>
                    <Link href={route}>
                      <Button variant="outline" className="w-full bg-transparent group border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:text-fuchsia-400">
                        View Content
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
