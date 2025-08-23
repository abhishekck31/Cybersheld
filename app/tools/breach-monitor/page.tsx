"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"

type BreachResult = { ok: boolean; title: string; details: string }

export default function BreachMonitorPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BreachResult | null>(null)

  const analyze = async () => {
    if (!email) return
    setLoading(true)
    setResult(null)
  // Force positive/safe demo output
  await new Promise((r) => setTimeout(r, 450))
  setResult({ ok: true, title: "No Breaches Found", details: "No known breaches found for this email (demo)." })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Data Breach Monitor (Demo)</h1>
          <p className="text-sm text-gray-400">Enter an email to simulate a breach lookup.</p>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle>Email Address</CardTitle>
            <CardDescription>Enter an email to check for known breaches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={loading}>{loading ? "Checking..." : "Check"}</Button>
                <Button variant="ghost" onClick={() => { setEmail(""); setResult(null) }} disabled={loading}>Reset</Button>
              </div>

              {result && (
                <div className={`p-4 rounded border ${result.ok ? "border-l-green-500" : "border-l-red-500"} bg-gray-900/40`}>
                  <div className="flex items-center space-x-3">
                    {result.ok ? <CheckCircle className="text-green-400" /> : <AlertTriangle className="text-red-400" />}
                    <div>
                      <div className="font-semibold">{result.title}</div>
                      <div className="text-sm text-gray-300 mt-1">{result.details}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
