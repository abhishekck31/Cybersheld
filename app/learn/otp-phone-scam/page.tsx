"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function OtpPhoneScamLearningPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-3xl px-4 py-10">
        <Card className="bg-gray-900/80 border border-cyan-900/40 mb-8">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-14 h-14 bg-cyan-900/30 rounded-full flex items-center justify-center">
              <Phone className="h-7 w-7 text-cyan-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-cyan-200">Fake OTP Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-200 mb-4">Fraudsters calling to trick you into sharing your OTP or banking details.</p>
            <h2 className="text-cyan-400 font-bold mb-2">How OTP Phone Scams Work:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Scammers pose as bank officials or government agents.</li>
              <li>They claim urgent issues (KYC, account block, etc.) and ask for OTPs.</li>
              <li>They use fear or urgency to pressure you into sharing sensitive info.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">How to Stay Safe:</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li>Never share OTPs or PINs with anyone, even if they claim to be from your bank.</li>
              <li>Verify calls by contacting your bank directly using official numbers.</li>
              <li>Banks and authorities will never ask for your OTP over the phone.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">Common Examples:</h2>
            <ul className="list-disc list-inside text-purple-300 mb-4">
              <li>Bank verification calls</li>
              <li>KYC update calls</li>
              <li>Account blocking threats</li>
            </ul>
            <Link href="/quiz/otp-phone-scam">
              <span className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors">Take the OTP & Phone Scam Quiz</span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
