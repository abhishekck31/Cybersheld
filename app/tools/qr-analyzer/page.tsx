"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle, Loader2, QrCode } from "lucide-react"
import Image from "next/image"

type ScanResult = {
  safe: boolean
  reason: string
  extracted?: string
}

export default function QRAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult(null)
    setError("")
    const f = e.target.files && e.target.files[0]
    if (!f) return
    if (!f.type.startsWith("image/")) {
      setError("Please upload a valid image file containing a QR code")
      return
    }
    setFile(f)
  }

  const analyze = async () => {
    setError("")
    if (!file) {
      setError("Please upload a QR code image first")
      return
    }

    setIsScanning(true)
    setResult(null)

    // Simulate a 3-5 second scan with a bit of randomness
    const delay = 3000 + Math.floor(Math.random() * 2000)
    await new Promise((r) => setTimeout(r, delay))

    // Real client-side decoding: draw image to canvas and decode pixels using jsQR
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error("Failed to read image"))
        reader.readAsDataURL(file)
      })

      const img = document.createElement("img") as HTMLImageElement
      img.src = dataUrl
      await new Promise((res, rej) => {
        img.onload = () => res(true)
        img.onerror = () => rej(new Error("Failed to load image for decoding"))
      })

      // create an offscreen canvas (or hidden canvas) to draw the image
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas 2D not supported")

      // scale large images down to a reasonable size to keep jsQR fast
      const max = 1024
      let w = img.width
      let h = img.height
      if (w > max || h > max) {
        const scale = Math.min(max / w, max / h)
        w = Math.round(w * scale)
        h = Math.round(h * scale)
      }
      canvas.width = w
      canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)

      const imageData = ctx.getImageData(0, 0, w, h)

  // dynamic import to avoid SSR issues
  // @ts-ignore: jsqr has no bundled types in this project, import dynamically
  const jsQR = (await import("jsqr")).default as any
  const code = jsQR(imageData.data, imageData.width, imageData.height)

      let scan: ScanResult
      if (!code || !code.data) {
        scan = {
          safe: false,
          reason: "No QR code found or decoding failed",
        }
      } else {
        const payload = code.data.trim()

        // Basic safety heuristics on the decoded payload
        const lower = payload.toLowerCase()
        if (lower.includes("malicious") || lower.includes("phish") || lower.includes("danger") || lower.includes("%2f%2e%2e")) {
          scan = {
            safe: false,
            reason: "Decoded content matches known malicious indicators",
            extracted: payload,
          }
        } else if (lower.startsWith("upi:") || lower.startsWith("upi://") || lower.includes("pay") || lower.includes("upi")) {
          scan = {
            safe: false,
            reason: "Potential payment/payment-request QR detected — treat with caution",
            extracted: payload,
          }
        } else if (lower.startsWith("http://") || lower.startsWith("https://") || lower.startsWith("mailto:") || /^[a-z0-9+.-]+:/i.test(lower)) {
          // URLs and other schemes: check for suspicious patterns
          const suspicious = lower.includes("@") && lower.includes("%")
          scan = {
            safe: !suspicious,
            reason: suspicious ? "Decoded URL contains suspicious encoded sequences" : "No known malicious indicators found in decoded QR content",
            extracted: payload,
          }
        } else {
          scan = {
            safe: true,
            reason: "Decoded payload does not match known threat patterns",
            extracted: payload,
          }
        }
      }

      setResult(scan)
    } catch (e: any) {
      setError(e?.message || "Failed to decode QR image")
    } finally {
      setIsScanning(false)
    }
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError("")
    setIsScanning(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-700/20 rounded-full flex items-center justify-center border border-indigo-600/30">
              <QrCode className="h-8 w-8 text-indigo-300" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">QR Code Analyzer</h1>
          <p className="text-gray-400">Safely analyze QR codes before scanning with your device</p>
        </div>

        <Card className="mb-6 bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Upload QR Code Image</CardTitle>
            <CardDescription className="text-sm text-gray-400">Upload a photo of the QR code and click Analyze. Scanning simulates 3–5 seconds.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center space-x-3 cursor-pointer">
                  <Input type="file" accept="image/*" onChange={onFileChange} />
                </label>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 italic">Upload an image containing a QR code (PNG, JPG)</p>
                </div>
              </div>

              {preview && (
                <div className="border border-gray-700/40 rounded p-3 bg-gray-900/40">
                  <div className="w-full h-64 relative flex items-center justify-center overflow-hidden rounded">
                    <Image src={preview} alt="qr preview" fill style={{ objectFit: "contain" }} />
                  </div>
                </div>
              )}

              {error && <div className="text-sm text-red-400">{error}</div>}

              <div className="flex space-x-2">
                <Button onClick={analyze} disabled={isScanning} className="btn-primary">
                  {isScanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
                <Button variant={"ghost"} onClick={reset} disabled={isScanning}>
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`mb-6 border-l-4 bg-gray-800/50 border-gray-700/50 ${result.safe ? "border-l-green-500" : "border-l-red-500"}`}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                {result.safe ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                )}
                <CardTitle className="text-lg">{result.safe ? "No Malicious Indicators" : "Potential Threat Found"}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">{result.reason}</p>
                {result.extracted && (
                  <div className="text-sm bg-gray-900/40 p-3 rounded border border-gray-700/30 break-all">
                    <strong className="text-gray-200">Decoded content:</strong>
                    <div className="mt-1 text-sm text-gray-300">{result.extracted}</div>
                  </div>
                )}

                <div className="text-xs text-gray-400 bg-yellow-50/5 p-3 rounded">
                  Note: This analyzer is a heuristic demo. For production use, integrate an authoritative QR decoding and threat intelligence service. Always double-check payment QR codes before proceeding.
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
