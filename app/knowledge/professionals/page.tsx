import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Mail, CreditCard, Shield, AlertTriangle, ArrowLeft, Lock, Eye } from "lucide-react"
import Link from "next/link"

const professionalThreats = [
  {
    title: "Business Email Compromise",
    description: "Fraudulent emails impersonating executives or vendors to trick employees into transferring funds or sharing sensitive data.",
    icon: Mail,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    tips: [
      "Always verify payment requests through a second channel.",
      "Be cautious of urgent or secretive requests from executives.",
      "Check sender email addresses carefully.",
    ],
  },
  {
    title: "Phishing & Malware Attacks",
    description: "Links or attachments in emails that install malware or steal credentials.",
    icon: CreditCard,
    color: "text-green-600",
    bgColor: "bg-green-50",
    tips: [
      "Never click suspicious links or download unknown attachments.",
      "Use up-to-date antivirus software.",
      "Report suspicious emails to IT/security team.",
    ],
  },
  {
    title: "Data Breaches",
    description: "Unauthorized access to company or client data due to weak passwords or insecure practices.",
    icon: Shield,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    tips: [
      "Use strong, unique passwords for work accounts.",
      "Enable two-factor authentication wherever possible.",
      "Never share credentials over email or chat.",
    ],
  },
]

const safetyPractices = [
  {
    title: "Strong Password Habits",
    description: "Use unique passwords for each work account and enable two-factor authentication.",
    icon: Lock,
  },
  {
    title: "Email Vigilance",
    description: "Double-check sender addresses and be wary of urgent requests for money or data.",
    icon: Mail,
  },
  {
    title: "Data Privacy",
    description: "Store sensitive files securely and avoid using personal devices for work data.",
    icon: Eye,
  },
]

export default function ProfessionalsKnowledgePage() {
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
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cyber Safety for Professionals</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Key cyber security knowledge for professionals to protect work data, avoid scams, and ensure secure transactions.
          </p>
        </div>
        {/* Professional-Specific Threats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Common Threats Targeting Professionals</h2>
          <div className="space-y-6">
            {professionalThreats.map((threat, index) => {
              const Icon = threat.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${threat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${threat.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold mb-2">{threat.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed mb-4">{threat.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium text-sm text-foreground mb-3">Protection Tips:</h4>
                    <ul className="space-y-2">
                      {threat.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
        {/* Best Practices */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Essential Safety Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyPractices.map((practice, index) => {
              const Icon = practice.icon
              return (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold">{practice.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{practice.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
        {/* Emergency Contact */}
        <Card className="bg-destructive/5 border-destructive/20 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6 text-destructive" />
              If You're a Victim of Cyber Crime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-foreground">
                Don't be embarrassed or scared to report cyber crimes. Quick action can help prevent further damage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black rounded-lg p-4 border">
                  <h4 className="font-semibold text-foreground mb-2">National Cyber Crime Helpline</h4>
                  <p className="text-2xl font-bold text-destructive">1930</p>
                  <p className="text-sm text-muted-foreground">24/7 helpline for reporting cyber crimes</p>
                </div>
                <div className="bg-black rounded-lg p-4 border">
                  <h4 className="font-semibold text-foreground mb-2">Online Reporting</h4>
                  <p className="text-lg font-bold text-primary">cybercrime.gov.in</p>
                  <p className="text-sm text-muted-foreground">File complaints online with evidence</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Next Steps */}
        <div className="text-center">
          <div className="space-y-4">
            <Link href="/quiz">
              <Button size="lg" className="mr-4">
                Test Your Knowledge
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg" className="bg-transparent">
                Use Security Tools
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
