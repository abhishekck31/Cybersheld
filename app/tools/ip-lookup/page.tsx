"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, CheckCircle, AlertTriangle } from "lucide-react"

type IPResult = { ok: boolean; title: string; details: string }

export default function IPLookupPage() {
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IPResult | null>(null)

  const analyze = async () => {
    if (!ip) return
    setLoading(true)
    setResult(null)
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 600))
    const seed = Array.from(ip).reduce((s, c) => s + c.charCodeAt(0), 0)
    const bucket = seed % 4
    if (bucket === 0) setResult({ ok: false, title: "Known VPN/Proxy IP", details: "This IP appears to be from a proxy or VPN provider (demo)." })
    else if (bucket === 1) setResult({ ok: true, title: "Residential IP", details: "Looks like a residential ISP allocation (demo)." })
    else if (bucket === 2) setResult({ ok: false, title: "Abusive IP Activity", details: "Past abusive activity associated with this IP (demo)." })
    else setResult({ ok: true, title: "Clean IP", details: "No immediate issues detected (demo)." })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-700/20 rounded-full flex items-center justify-center border border-indigo-600/30">
              <MapPin className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">IP Address Lookup (Demo)</h1>
          <p className="text-sm text-gray-400">Enter an IP address to get a quick demo lookup.</p>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle>IP Address</CardTitle>
            <CardDescription>Enter an IPv4 or IPv6 address and click Analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="8.8.8.8" />
              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={loading}>{loading ? "Looking up..." : "Analyze"}</Button>
                <Button variant="ghost" onClick={() => { setIp(""); setResult(null) }} disabled={loading}>Reset</Button>
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
