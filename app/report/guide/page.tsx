import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Phone,
  CreditCard,
  Shield,
  Camera,
  Save,
} from "lucide-react"
import Link from "next/link"

const immediateSteps = [
  {
    title: "Stay Calm",
    description: "Don't panic. Quick, clear thinking will help you respond effectively.",
    icon: Shield,
    timeframe: "Immediately",
  },
  {
    title: "Stop Further Damage",
    description: "Block cards, change passwords, or disconnect from internet if needed.",
    icon: AlertTriangle,
    timeframe: "Within minutes",
  },
  {
    title: "Gather Evidence",
    description: "Take screenshots, save messages, note transaction details.",
    icon: Camera,
    timeframe: "Within 30 minutes",
  },
  {
    title: "Report to Authorities",
    description: "Call helplines and file complaints through official channels.",
    icon: Phone,
    timeframe: "Within 1 hour",
  },
]

const evidenceChecklist = [
  "Screenshots of fraudulent messages/emails",
  "Transaction IDs and bank statements",
  "Phone numbers of scammers",
  "URLs of suspicious websites",
  "Time and date of incidents",
  "Any communication with the fraudster",
  "Device information (if malware suspected)",
  "Witness contact information (if any)",
]

const reportingSteps = [
  {
    step: 1,
    title: "File Online Complaint",
    description: "Visit cybercrime.gov.in to file your complaint online",
    details: [
      "Create account on the portal",
      "Fill complaint form with all details",
      "Upload evidence files",
      "Note down complaint number",
    ],
  },
  {
    step: 2,
    title: "Contact Your Bank",
    description: "If financial fraud, immediately contact your bank",
    details: [
      "Call bank's fraud helpline",
      "Block affected cards/accounts",
      "Dispute fraudulent transactions",
      "Request transaction reversal",
    ],
  },
  {
    step: 3,
    title: "Visit Police Station",
    description: "File FIR at your local police station",
    details: [
      "Carry all evidence and documents",
      "Provide detailed written complaint",
      "Get FIR copy and number",
      "Ask for investigating officer details",
    ],
  },
  {
    step: 4,
    title: "Follow Up Regularly",
    description: "Track your complaint and stay in touch with authorities",
    details: [
      "Check complaint status online",
      "Call investigating officer weekly",
      "Provide additional evidence if found",
      "Keep records of all communications",
    ],
  },
]

const bankContacts = [
  { bank: "State Bank of India", number: "1800-11-2211", fraud: "1800-11-1109" },
  { bank: "HDFC Bank", number: "1800-202-6161", fraud: "1800-202-6161" },
  { bank: "ICICI Bank", number: "1800-200-3344", fraud: "1800-200-3344" },
  { bank: "Axis Bank", number: "1800-419-5959", fraud: "1800-419-0066" },
  { bank: "Punjab National Bank", number: "1800-180-2222", fraud: "1800-180-2222" },
  { bank: "Bank of Baroda", number: "1800-258-4455", fraud: "1800-258-4455" },
]

export default function ReportGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link href="/report" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Report Page
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">What to Do If You're Scammed</h1>
          <p className="text-muted-foreground">Step-by-step guide to respond effectively to cyber fraud</p>
        </div>

        {/* Immediate Response Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Immediate Response Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {immediateSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="mr-1 h-3 w-3" />
                            {step.timeframe}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Evidence Collection */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <Camera className="mr-3 h-6 w-6 text-primary" />
                Evidence Collection Checklist
              </CardTitle>
              <CardDescription>
                Gather as much evidence as possible. This will help authorities investigate and potentially recover your
                losses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evidenceChecklist.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Reporting Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Detailed Reporting Process</h2>
          <div className="space-y-6">
            {reportingSteps.map((step) => (
              <Card key={step.step} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{step.title}</CardTitle>
                      <CardDescription className="mt-2">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 ml-12">
                    {step.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bank Fraud Helplines */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <CreditCard className="mr-3 h-6 w-6 text-primary" />
                Bank Fraud Helplines
              </CardTitle>
              <CardDescription>
                Contact your bank immediately if you've been a victim of financial fraud
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bankContacts.map((bank, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{bank.bank}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">General: </span>
                        <a href={`tel:${bank.number}`} className="text-primary hover:underline">
                          {bank.number}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <span className="text-muted-foreground">Fraud: </span>
                        <a href={`tel:${bank.fraud}`} className="text-destructive hover:underline">
                          {bank.fraud}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recovery Tips */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <Save className="mr-3 h-6 w-6 text-green-600" />
              Recovery & Prevention Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-green-800">
              <p>
                <strong>Act Fast:</strong> The sooner you report, the better your chances of recovery. Many banks can
                reverse transactions if reported within 24 hours.
              </p>
              <p>
                <strong>Keep Records:</strong> Maintain a file with all complaint numbers, officer contacts, and
                correspondence for future reference.
              </p>
              <p>
                <strong>Learn & Share:</strong> Use this experience to educate yourself and others about cyber security
                to prevent future incidents.
              </p>
              <p>
                <strong>Stay Vigilant:</strong> Monitor your accounts regularly and set up alerts for all transactions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                File Online Complaint
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-transparent">
              <a href="tel:1930">Call 1930 Now</a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
