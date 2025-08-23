"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Globe,
  Building2,
  CreditCard,
  AlertTriangle,
  Clock,
  FileText,
  ExternalLink,
  ArrowRight,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"

const emergencyContacts = [
  {
    title: "National Cyber Crime Helpline",
    number: "1930",
    description: "24/7 helpline for reporting cyber crimes across India",
    icon: Phone,
    color: "text-red-600",
    bgColor: "bg-red-50",
    urgent: true,
  },
  {
    title: "Women Helpline",
    number: "181",
    description: "For women facing cyber harassment or threats",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    urgent: true,
  },
  {
    title: "Police Emergency",
    number: "100",
    description: "For immediate police assistance in serious cases",
    icon: Shield,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    urgent: true,
  },
]

const reportingChannels = [
  {
    title: "Online Cyber Crime Portal",
    url: "cybercrime.gov.in",
    description: "Official government portal to file cyber crime complaints online",
    icon: Globe,
    features: ["File FIR online", "Track complaint status", "Upload evidence", "Get case updates"],
  },
  {
    title: "Local Police Station",
    description: "Visit your nearest police station to file a complaint in person",
    icon: Building2,
    features: ["Face-to-face reporting", "Immediate FIR", "Local investigation", "Physical evidence submission"],
  },
  {
    title: "Bank Fraud Reporting",
    description: "Contact your bank immediately for financial fraud cases",
    icon: CreditCard,
    features: ["Block cards/accounts", "Dispute transactions", "Freeze accounts", "Recovery assistance"],
  },
]

const scamTypes = [
  {
    title: "Financial Fraud",
    description: "UPI scams, fake payment requests, banking fraud",
    urgency: "Immediate",
    color: "text-red-600",
    steps: ["Block cards immediately", "Call bank helpline", "File police complaint", "Report to cybercrime.gov.in"],
  },
  {
    title: "Identity Theft",
    description: "Aadhaar misuse, PAN fraud, document theft",
    urgency: "Within 24 hours",
    color: "text-orange-600",
    steps: ["Gather evidence", "File police complaint", "Contact relevant authorities", "Monitor accounts"],
  },
  {
    title: "Online Harassment",
    description: "Cyberbullying, threats, fake profiles",
    urgency: "As soon as possible",
    color: "text-purple-600",
    steps: ["Take screenshots", "Block the person", "Report to platform", "File police complaint if serious"],
  },
  {
    title: "Phishing/Malware",
    description: "Fake emails, malicious links, virus attacks",
    urgency: "Within hours",
    color: "text-blue-600",
    steps: ["Change passwords", "Run antivirus scan", "Check accounts", "Report suspicious emails"],
  },
]

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-destructive/10 px-4 py-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-destructive">Emergency Reporting</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Report Cyber Crime</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick access to helplines, reporting channels, and step-by-step guidance for cyber crime victims
          </p>
        </div>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Emergency Helplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emergencyContacts.map((contact) => {
              const Icon = contact.icon
              return (
                <Card key={contact.number} className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300 relative p-0">
                  {contact.urgent && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-white">Urgent</Badge>
                  )}
                  <div className="flex flex-col flex-1">
                    <CardHeader className="text-center flex flex-col items-center pt-8 pb-4">
                      <div
                        className={`w-16 h-16 ${contact.bgColor} rounded-full flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-8 w-8 ${contact.color}`} />
                      </div>
                      <CardTitle className="text-xl font-semibold mb-2">{contact.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center flex-1 text-center pb-8 w-full">
                      <div className="text-3xl font-bold text-destructive mb-2">{contact.number}</div>
                      <CardDescription className="text-sm leading-relaxed mb-6">{contact.description}</CardDescription>
                      <div className="flex-grow" />
                      <div className="w-full flex items-end justify-center mt-auto">
                        <Button className="w-full max-w-xs mx-auto" onClick={() => (window.location.href = `tel:${contact.number}`)}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Reporting Channels */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Reporting Channels</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reportingChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold mb-2">{channel.title}</CardTitle>
                        {channel.url && (
                          <div className="flex items-center space-x-1 text-primary text-sm mb-2">
                            <Globe className="h-4 w-4" />
                            <span>{channel.url}</span>
                          </div>
                        )}
                        <CardDescription className="text-sm leading-relaxed">{channel.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between min-h-[260px]">
                    <div>
                      <h4 className="font-medium text-sm text-foreground mb-3">Features:</h4>
                      <ul className="space-y-2 mb-6">
                        {channel.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-end w-full mt-auto">
                      {channel.url ? (
                        <Button className="w-full group" asChild>
                          <a href={`https://${channel.url}`} target="_blank" rel="noopener noreferrer">
                            Visit Portal
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      ) : (
                        <Link href="/report/guide">
                          <Button variant="outline" className="w-full bg-transparent group">
                            Get Guidance
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Quick Response by Scam Type */}
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Quick Response by Scam Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scamTypes.map((scam, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{scam.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm">{scam.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`${scam.color} border-current`}>
                      <Clock className="mr-1 h-3 w-3" />
                      {scam.urgency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-foreground mb-3">Immediate Steps:</h4>
                    <ol className="space-y-2">
                      {scam.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-3 text-sm text-muted-foreground">
                          <span className="flex-shrink-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <Link href="/report/guide">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Detailed Guide
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center">
              <FileText className="mr-3 h-6 w-6 text-orange-600" />
              Before You Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-orange-800">
              <p>
                <strong>Gather Evidence:</strong> Take screenshots, save emails/messages, note down transaction IDs, and
                collect any relevant documents.
              </p>
              <p>
                <strong>Act Quickly:</strong> Time is crucial in cyber crime cases. Report immediately to increase
                chances of recovery and catching perpetrators.
              </p>
              <p>
                <strong>Don't Be Embarrassed:</strong> Cyber criminals are sophisticated. Reporting helps protect others
                and improves law enforcement response.
              </p>
              <p>
                <strong>Follow Up:</strong> Keep track of your complaint numbers and follow up regularly with
                authorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
