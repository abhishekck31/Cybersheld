"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, FileText } from "lucide-react"

type FileResult = { ok: boolean; title: string; details: string; hash?: string }

export default function FileAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [hashInput, setHashInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<FileResult | null>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0]
    setFile(f || null)
    setResult(null)
  }

  const analyze = async () => {
    const seedStr = file ? file.name + file.size : hashInput || ""
    if (!seedStr) return
    setLoading(true)
    setResult(null)
  // Force positive/safe demo output
  await new Promise((r) => setTimeout(r, 400))
  const seed = Array.from(seedStr).reduce((s, c) => s + c.charCodeAt(0), 0)
  const fakeHash = `SHA256:${(seed >>> 0).toString(16).padStart(64, "0").slice(0,64)}`
  setResult({ ok: true, title: "Clean File", details: "No known malware signatures found for this hash (demo).", hash: fakeHash })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-700/20 rounded-full flex items-center justify-center border border-indigo-600/30">
              <FileText className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">File Hash Checker (Demo)</h1>
          <p className="text-sm text-gray-400">Upload a file or paste a hash to simulate a quick file check.</p>
        </div>

        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardHeader>
            <CardTitle>Upload or Paste Hash</CardTitle>
            <CardDescription>Upload a file or paste a hash to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input type="file" onChange={onFileChange} className="text-sm" />
              <Input value={hashInput} onChange={(e) => setHashInput(e.target.value)} placeholder="Paste SHA256 hash" />
              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={loading}>{loading ? "Checking..." : "Check"}</Button>
                <Button variant="ghost" onClick={() => { setFile(null); setHashInput(""); setResult(null) }} disabled={loading}>Reset</Button>
              </div>
              {result && (
                <div className={`p-4 rounded border ${result.ok ? "border-l-green-500" : "border-l-red-500"} bg-gray-900/40`}>
                  <div className="flex items-start space-x-3">
                    {result.ok ? <CheckCircle className="text-green-400" /> : <AlertTriangle className="text-red-400" />}
                    <div>
                      <div className="font-semibold">{result.title}</div>
                      <div className="text-sm text-gray-300 mt-1">{result.details}</div>
                      {result.hash && <div className="text-xs text-gray-400 mt-2">Detected hash: <span className="font-mono">{result.hash}</span></div>}
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
