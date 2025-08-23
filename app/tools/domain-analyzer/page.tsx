"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Globe, CheckCircle, AlertTriangle } from "lucide-react"

type DomainResult = { ok: boolean; title: string; details: string }

export default function DomainAnalyzerPage() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DomainResult | null>(null)

  const analyze = async () => {
    if (!domain) return
    setLoading(true)
    setResult(null)
  // Force positive/safe demo output
  await new Promise((r) => setTimeout(r, 350))
  setResult({ ok: true, title: "Established Domain", details: "Domain has a long registration history (demo)." })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-700/20 rounded-full flex items-center justify-center border border-indigo-600/30">
              <Globe className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Domain Age Checker (Demo)</h1>
          <p className="text-sm text-gray-400">Enter a domain to get a quick demo registration check.</p>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle>Domain</CardTitle>
            <CardDescription>Enter a domain like example.com and click Analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" />
              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={loading}>{loading ? "Checking..." : "Analyze"}</Button>
                <Button variant="ghost" onClick={() => { setDomain(""); setResult(null) }} disabled={loading}>Reset</Button>
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
