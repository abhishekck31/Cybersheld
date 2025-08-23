"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function OtpScamLearningPage() {
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
            <h2 className="text-cyan-400 font-bold mb-2">What is an OTP Phone Scam?</h2>
            <p className="text-gray-300 mb-4">OTP (One-Time Password) phone scams are when criminals pretend to be from your bank, government, or a trusted company and call you to steal your OTP or banking details. They use fear, urgency, or fake threats to pressure you into sharing sensitive information.</p>
            <div className="mb-4">
              <span className="block text-cyan-400 font-bold mb-1">Remember:</span>
              <ul className="list-disc list-inside text-gray-300">
                <li>Banks, government agencies, and companies will <span className="font-bold text-pink-400">never</span> ask for your OTP or PIN over the phone.</li>
                <li>Never share OTPs, PINs, or passwords with anyone—even if they sound official.</li>
              </ul>
            </div>
            <h2 className="text-cyan-400 font-bold mb-2">Common OTP Scam Examples</h2>
            <div className="mb-4">
              <span className="block font-bold text-purple-300 mb-1">Bank Verification Call</span>
              <p className="text-gray-300 mb-1">"This is your bank. We need to verify your account. Please share the OTP you just received." <span className="text-pink-400 font-bold">Warning:</span> Banks never ask for OTPs over the phone.</p>
              <span className="block font-bold text-purple-300 mb-1">KYC Update Call</span>
              <p className="text-gray-300 mb-1">"Your KYC is expiring. Share your OTP to update your account." <span className="text-pink-400 font-bold">Warning:</span> Never share OTPs for KYC updates.</p>
              <span className="block font-bold text-purple-300 mb-1">Account Blocking Threat</span>
              <p className="text-gray-300">"Your account will be blocked unless you provide the OTP now." <span className="text-pink-400 font-bold">Warning:</span> Banks do not threaten to block accounts over the phone.</p>
            </div>
            <h2 className="text-cyan-400 font-bold mb-2">How to Protect Yourself</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              <li><span className="font-bold text-cyan-200">Verify the Caller:</span> Hang up and call your bank using the official number from their website or your passbook.</li>
              <li><span className="font-bold text-cyan-200">Never Share OTPs:</span> No legitimate organization will ever ask for your OTP or PIN.</li>
              <li><span className="font-bold text-cyan-200">Stay Calm:</span> Scammers use urgency and fear. Take your time and think before acting.</li>
              <li><span className="font-bold text-cyan-200">Report Suspicious Calls:</span> Inform your bank and report to cybercrime.gov.in or call 1930.</li>
            </ul>
            <h2 className="text-cyan-400 font-bold mb-2">If You Think You've Been Scammed</h2>
            <ol className="list-decimal list-inside text-gray-300 mb-4">
              <li>Don't panic. Immediately contact your bank and block your card/account if needed.</li>
              <li>Change your online banking passwords and PINs.</li>
              <li>Report the incident to <a href="https://cybercrime.gov.in" className="underline text-cyan-400" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> or call <span className="font-bold">1930</span>.</li>
              <li>Monitor your accounts for any unauthorized transactions.</li>
            </ol>
            <Link href="/quiz/otp-phone-scam">
              <span className="inline-block mt-4 bg-cyan-600 hover:bg-cyan-400 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors">Take the OTP & Phone Scam Quiz</span>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
