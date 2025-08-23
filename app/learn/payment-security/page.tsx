"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CreditCard } from "lucide-react"

export default function PaymentSecurityLearningPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Card className="bg-gray-900/80 border border-cyan-900/40 mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-14 h-14 bg-cyan-900/30 rounded-full flex items-center justify-center">
              <CreditCard className="h-7 w-7 text-cyan-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-cyan-200">UPI & Payment Scams</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-200 mb-4">Fraudulent payment requests and fake QR codes to steal your money.</p>
            <h2 className="text-cyan-400 font-bold mb-2">How Payment Scams Work:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Scammers send fake payment requests or QR codes.</li>
              <li>They impersonate businesses or friends to trick you.</li>
              <li>They may claim you need to pay a fee or refund.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">How to Stay Safe:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Always verify payment requests and QR codes before paying.</li>
              <li>Never send money to unknown contacts or for suspicious reasons.</li>
              <li>Use official apps and check recipient details carefully.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">Common Examples:</h2>
            <ul className="list-disc list-inside text-purple-300 mb-4">
              <li>Fake payment requests</li>
              <li>Wrong QR codes</li>
              <li>Refund scams</li>
            </ul>
            <Link href="/quiz/payment-security">
              <span className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors">Take the UPI & Payment Security Quiz</span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
