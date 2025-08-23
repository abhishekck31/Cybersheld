"use client"

import { useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  QrCode, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Link as LinkIcon,
  Shield,
  Info,
  Download,
  Camera,
  Mail,
  Phone,
  Wifi
} from "lucide-react"
import Image from "next/image"

interface QRCodeAnalysis {
  content: string
  type: "url" | "text" | "email" | "phone" | "wifi" | "unknown"
  isSafe: boolean
  riskLevel: "low" | "medium" | "high"
  warnings: string[]
  recommendations: string[]
}

export default function QRCodeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<QRCodeAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = error => reject(error)
    })
  }

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setError(null)
    setAnalysis(null)
    
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const analyzeQRCode = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      // Convert file to base64
      const base64Data = await fileToBase64(selectedFile)
      
      // Real-time API call
      const response = await fetch('/api/qr-scanner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: base64Data,
          imageFormat: selectedFile.type.split('/')[1] as 'jpeg' | 'png' | 'gif' | 'webp'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze QR code')
      }

      const result = await response.json()
      setAnalysis(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze QR code. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setAnalysis(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url': return <LinkIcon className="h-4 w-4" />
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'wifi': return <Wifi className="h-4 w-4" />
      default: return <QrCode className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600/20 rounded-full mb-4">
            <QrCode className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">QR Code Analyzer</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Safely analyze QR codes before scanning with your device. Upload an image to detect potential security risks and malicious content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gray-800/50 border border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-100">
                <Upload className="mr-2 h-5 w-5 text-indigo-400" />
                Upload QR Code
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload an image containing a QR code for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-indigo-400 bg-indigo-400/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative mx-auto w-48 h-48">
                      <Image
                        src={previewUrl}
                        alt="QR Code Preview"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-400">QR Code uploaded successfully</p>
                    <Button 
                      variant="outline" 
                      onClick={resetAnalysis}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-gray-300 font-medium">Drop your QR code image here</p>
                      <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />

              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              {selectedFile && (
                <Button
                  onClick={analyzeQRCode}
                  disabled={isAnalyzing}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze QR Code
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysis && (
              <Card className="bg-gray-800/50 border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-gray-100">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-400" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Content Type:</span>
                      <Badge variant="outline" className="border-gray-600">
                        <div className="flex items-center">
                          {getTypeIcon(analysis.type)}
                          <span className="ml-1 capitalize">{analysis.type}</span>
                        </div>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Risk Level:</span>
                      <Badge className={getRiskLevelColor(analysis.riskLevel)}>
                        {analysis.riskLevel.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Safety Status:</span>
                      <Badge className={analysis.isSafe ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                        {analysis.isSafe ? 'SAFE' : 'UNSAFE'}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />

                  <div>
                    <Label className="text-gray-300 font-medium">Content:</Label>
                    <div className="mt-2 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
                      <p className="text-sm text-gray-200 break-all">{analysis.content}</p>
                    </div>
                  </div>

                  {analysis.warnings.length > 0 && (
                    <div>
                      <Label className="text-gray-300 font-medium flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-yellow-400" />
                        Warnings:
                      </Label>
                      <ul className="mt-2 space-y-1">
                        {analysis.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-yellow-300 flex items-start">
                            <span className="mr-2">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <Label className="text-gray-300 font-medium flex items-center">
                      <Info className="mr-2 h-4 w-4 text-blue-400" />
                      Recommendations:
                    </Label>
                    <ul className="mt-2 space-y-1">
                      {analysis.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <span className="mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Tips */}
            <Card className="bg-gray-800/50 border border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-gray-100">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Always verify QR codes before scanning, especially in public places</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Be cautious of QR codes that promise rewards or seem too good to be true</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-400">Use this tool to preview QR code content before scanning with your device</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
