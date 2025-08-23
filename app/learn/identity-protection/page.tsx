"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { UserCheck } from "lucide-react"

export default function IdentityProtectionLearningPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Card className="bg-gray-900/80 border border-cyan-900/40 mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-14 h-14 bg-cyan-900/30 rounded-full flex items-center justify-center">
              <UserCheck className="h-7 w-7 text-cyan-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-cyan-200">Identity Theft</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-200 mb-4">Criminals using your personal information to commit fraud in your name.</p>
            <h2 className="text-cyan-400 font-bold mb-2">How Identity Theft Happens:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Fraudsters steal your Aadhaar, PAN, or other personal info.</li>
              <li>They use it to open accounts, get loans, or commit crimes.</li>
              <li>They may use phishing, data breaches, or physical theft.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">How to Stay Safe:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Never share sensitive documents or details online.</li>
              <li>Monitor your financial statements and credit reports.</li>
              <li>Report lost or stolen documents immediately.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">Common Examples:</h2>
            <ul className="list-disc list-inside text-purple-300 mb-4">
              <li>Aadhaar misuse</li>
              <li>PAN card fraud</li>
              <li>Document theft</li>
            </ul>
            <Link href="/quiz/identity-protection">
              <span className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors">Take the Identity Theft Prevention Quiz</span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
