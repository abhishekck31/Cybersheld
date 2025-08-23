import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tractor, CreditCard, Home, Users, AlertTriangle, ArrowLeft, Lock, Eye } from "lucide-react"
import Link from "next/link"

const ruralThreats = [
  {
    title: "Digital Payment Scams",
    description: "Fake payment requests, QR code fraud, and UPI scams targeting rural users.",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    tips: [
      "Use only official apps for digital payments.",
      "Never share your OTP or PIN with anyone.",
      "Verify recipient details before sending money.",
    ],
  },
  {
    title: "Government Scheme Frauds",
    description: "Scammers impersonating government officials to steal money or information.",
    icon: Home,
    color: "text-green-600",
    bgColor: "bg-green-50",
    tips: [
      "Check scheme details on official government websites.",
      "Do not pay bribes or fees for government benefits.",
      "Report suspicious calls or messages to authorities.",
    ],
  },
  {
    title: "Basic Online Safety",
    description: "Lack of awareness about safe internet practices leading to fraud or data theft.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    tips: [
      "Do not share personal details on unknown websites.",
      "Avoid clicking on suspicious links or ads.",
      "Attend local cyber safety awareness programs if available.",
    ],
  },
]

const safetyPractices = [
  {
    title: "Strong Password Habits",
    description: "Use unique passwords for each account and enable two-factor authentication.",
    icon: Lock,
  },
  {
    title: "Verify Information",
    description: "Always check the authenticity of schemes and offers before acting.",
    icon: Eye,
  },
  {
    title: "Safe Payments",
    description: "Use secure payment methods and avoid sharing sensitive info.",
    icon: CreditCard,
  },
]

export default function RuralUsersKnowledgePage() {
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
              <Tractor className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cyber Safety for Rural Users</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential cyber security knowledge for rural users to stay safe while using digital payments, government schemes, and the internet.
          </p>
        </div>
        {/* Rural User-Specific Threats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Common Threats Targeting Rural Users</h2>
          <div className="space-y-6">
            {ruralThreats.map((threat, index) => {
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
