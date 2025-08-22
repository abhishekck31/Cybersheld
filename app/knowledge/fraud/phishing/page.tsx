import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, AlertTriangle, Shield, Eye, LinkIcon, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

const phishingExamples = [
  {
    type: "Email",
    title: "Fake Bank Email",
    description: "Urgent account verification required",
    warning: "Banks never ask for passwords via email",
    isLegit: false,
  },
  {
    type: "SMS",
    title: "Prize Winner Message",
    description: "Congratulations! You've won ₹50,000. Click link to claim.",
    warning: "Legitimate contests don't ask for personal details via SMS",
    isLegit: false,
  },
  {
    type: "Website",
    title: "Fake Government Portal",
    description: "Update your Aadhaar details immediately",
    warning: "Always verify URLs - look for https:// and official domains",
    isLegit: false,
  },
]

const protectionTips = [
  {
    title: "Check the Sender",
    description: "Verify email addresses and phone numbers. Banks use official domains.",
    icon: Eye,
  },
  {
    title: "Don't Click Suspicious Links",
    description: "Hover over links to see the actual URL before clicking.",
    icon: LinkIcon,
  },
  {
    title: "Never Share Personal Info",
    description: "Legitimate organizations won't ask for passwords or OTPs via email/SMS.",
    icon: Shield,
  },
  {
    title: "Use Official Channels",
    description: "Always log in through official websites or apps, not through email links.",
    icon: CheckCircle,
  },
]

export default function PhishingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link href="/knowledge" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Knowledge Hub
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Phishing Attacks</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn to identify and protect yourself from fake emails, messages, and websites designed to steal your
            information
          </p>
        </div>

        {/* What is Phishing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
              What is Phishing?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Phishing is a cyber attack where criminals pretend to be trustworthy organizations to steal your personal
              information like passwords, credit card numbers, or bank details.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 font-medium">
                <strong>Remember:</strong> Legitimate banks, government agencies, and companies will never ask for
                sensitive information via email, SMS, or phone calls.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Common Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Common Phishing Examples</h2>
          <div className="space-y-4">
            {phishingExamples.map((example, index) => (
              <Card key={index} className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="destructive" className="mb-2">
                        {example.type}
                      </Badge>
                      <CardTitle className="text-lg">{example.title}</CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </div>
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm font-medium">
                      <strong>Warning:</strong> {example.warning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Protection Tips */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">How to Protect Yourself</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{tip.title}</CardTitle>
                        <CardDescription className="mt-2 leading-relaxed">{tip.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Action Steps */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Shield className="mr-3 h-6 w-6 text-primary" />
              If You Think You've Been Phished
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-foreground">
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>
                  <strong>Don't panic.</strong> Change your passwords immediately for affected accounts.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>
                  <strong>Contact your bank</strong> if financial information was shared.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>
                  <strong>Report the incident</strong> to cybercrime.gov.in or call 1930.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>
                  <strong>Monitor your accounts</strong> for any suspicious activity.
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <div className="space-y-4">
            <Link href="/quiz">
              <Button size="lg" className="mr-4">
                Test Your Knowledge
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg" className="bg-transparent">
                Check URL Safety
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
