"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, AlertTriangle } from "lucide-react"

type SSLResult = { ok: boolean; title: string; details: string }

export default function SSLCheckerPage() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SSLResult | null>(null)

  const analyze = async () => {
    if (!url) return
    setLoading(true)
    setResult(null)
  // Force positive/safe demo output
  await new Promise((r) => setTimeout(r, 350))
  setResult({ ok: true, title: "Valid Certificate", details: "Certificate is valid and issued by a trusted CA (demo)." })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-700/20 rounded-full flex items-center justify-center border border-indigo-600/30">
              <Award className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">SSL Certificate Checker (Demo)</h1>
          <p className="text-sm text-gray-400">Enter a website URL to simulate a certificate check.</p>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle>Website URL</CardTitle>
            <CardDescription>Enter a URL like https://example.com and click Analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={loading}>{loading ? "Checking..." : "Analyze"}</Button>
                <Button variant="ghost" onClick={() => { setUrl(""); setResult(null) }} disabled={loading}>Reset</Button>
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
