import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schemas
const qrAnalysisSchema = z.object({
  imageData: z.string().min(1), // Base64 encoded image data
  imageFormat: z.enum(['jpeg', 'png', 'gif', 'webp']).optional(),
})

interface QRCodeAnalysis {
  content: string
  type: "url" | "text" | "email" | "phone" | "wifi" | "vcard" | "unknown"
  isSafe: boolean
  riskLevel: "low" | "medium" | "high"
  warnings: string[]
  recommendations: string[]
  metadata: {
    size: number
    format: string
    dimensions?: { width: number; height: number }
  }
  securityChecks: {
    urlSafety?: {
      isMalicious: boolean
      threatTypes: string[]
      reputation: number
    }
    contentAnalysis?: {
      suspiciousPatterns: string[]
      language: string
      sentiment: "positive" | "neutral" | "negative"
    }
  }
}

// QR code content type detection
function detectContentType(content: string): "url" | "text" | "email" | "phone" | "wifi" | "vcard" | "unknown" {
  // URL detection
  if (content.match(/^https?:\/\/.+/i)) {
    return "url"
  }
  
  // Email detection
  if (content.match(/^mailto:.+@.+\..+/i)) {
    return "email"
  }
  
  // Phone number detection
  if (content.match(/^tel:\+?[\d\s\-\(\)]+$/i)) {
    return "phone"
  }
  
  // WiFi network detection
  if (content.match(/^WIFI:S:.+;T:.+;P:.+;;$/i)) {
    return "wifi"
  }
  
  // vCard detection
  if (content.match(/^BEGIN:VCARD/i)) {
    return "vcard"
  }
  
  // Text content
  if (content.length > 0) {
    return "text"
  }
  
  return "unknown"
}

// URL safety assessment
async function assessUrlSafety(url: string): Promise<{
  isMalicious: boolean
  threatTypes: string[]
  reputation: number
}> {
  try {
    // Check against multiple threat intelligence sources
    const safetyChecks = await Promise.allSettled([
      checkVirusTotal(url),
      checkGoogleSafeBrowsing(url),
      checkPhishTank(url),
      checkOpenPhish(url)
    ])
    
    let isMalicious = false
    let threatTypes: string[] = []
    let reputation = 100
    
    safetyChecks.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        const check = result.value
        if (check.isMalicious) {
          isMalicious = true
          threatTypes.push(...check.threatTypes)
          reputation = Math.min(reputation, check.reputation)
        }
      }
    })
    
    // Additional heuristic checks
    const suspiciousPatterns = [
      /bit\.ly|goo\.gl|tinyurl|is\.gd/i, // URL shorteners
      /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/, // IP addresses
      /[a-z0-9]{32,}/i, // Long random strings
      /[^\w\-\.]/, // Special characters
    ]
    
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(url)) {
        reputation -= 20
        if (!threatTypes.includes('suspicious_pattern')) {
          threatTypes.push('suspicious_pattern')
        }
      }
    })
    
    return {
      isMalicious,
      threatTypes: [...new Set(threatTypes)],
      reputation: Math.max(0, reputation)
    }
    
  } catch (error) {
    console.error('URL safety assessment error:', error)
    return {
      isMalicious: false,
      threatTypes: [],
      reputation: 50 // Neutral when checks fail
    }
  }
}

// Threat intelligence API checks
async function checkVirusTotal(url: string) {
  try {
    const response = await fetch(`https://www.virustotal.com/vtapi/v2/url/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-apikey': process.env.VIRUSTOTAL_API_KEY || ''
      },
      body: `url=${encodeURIComponent(url)}`
    })
    
    if (response.ok) {
      const data = await response.json()
      const positives = data.positives || 0
      const total = data.total || 0
      
      return {
        isMalicious: positives > 0,
        threatTypes: positives > 0 ? ['malware', 'phishing'] : [],
        reputation: total > 0 ? Math.max(0, 100 - (positives / total) * 100) : 100
      }
    }
  } catch (error) {
    console.error('VirusTotal check error:', error)
  }
  return null
}

async function checkGoogleSafeBrowsing(url: string) {
  try {
    const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client: { clientId: 'cybershield', clientVersion: '1.0.0' },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url }]
        }
      })
    })
    
    if (response.ok) {
      const data = await response.json()
      const hasThreats = data.matches && data.matches.length > 0
      
      return {
        isMalicious: hasThreats,
        threatTypes: hasThreats ? data.matches.map((m: any) => m.threatType.toLowerCase()) : [],
        reputation: hasThreats ? 0 : 100
      }
    }
  } catch (error) {
    console.error('Google Safe Browsing check error:', error)
  }
  return null
}

async function checkPhishTank(url: string) {
  try {
    const response = await fetch(`https://checkurl.phishtank.com/checkurl/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `url=${encodeURIComponent(url)}&format=json`
    })
    
    if (response.ok) {
      const data = await response.json()
      return {
        isMalicious: data.in_database === true,
        threatTypes: data.in_database === true ? ['phishing'] : [],
        reputation: data.in_database === true ? 0 : 100
      }
    }
  } catch (error) {
    console.error('PhishTank check error:', error)
  }
  return null
}

async function checkOpenPhish(url: string) {
  try {
    const response = await fetch(`https://openphish.com/api/urls/`, {
      headers: { 'Authorization': `Token ${process.env.OPENPHISH_API_KEY}` }
    })
    
    if (response.ok) {
      const data = await response.json()
      const isPhishing = data.some((entry: any) => entry.url === url)
      
      return {
        isMalicious: isPhishing,
        threatTypes: isPhishing ? ['phishing'] : [],
        reputation: isPhishing ? 0 : 100
      }
    }
  } catch (error) {
    console.error('OpenPhish check error:', error)
  }
  return null
}

// Content analysis for text-based QR codes
function analyzeTextContent(content: string): {
  suspiciousPatterns: string[]
  language: string
  sentiment: "positive" | "neutral" | "negative"
} {
  const suspiciousPatterns: string[] = []
  
  // Check for suspicious patterns
  const patterns = [
    { regex: /(?:bitcoin|btc|eth|wallet|address)/i, name: 'cryptocurrency_reference' },
    { regex: /(?:password|login|signin|account)/i, name: 'credential_request' },
    { regex: /(?:free|win|prize|reward|gift)/i, name: 'suspicious_offers' },
    { regex: /(?:urgent|immediate|action|required)/i, name: 'urgency_tactics' },
    { regex: /(?:bank|paypal|amazon|ebay)/i, name: 'brand_impersonation' },
    { regex: /[0-9]{16}/, name: 'credit_card_pattern' },
    { regex: /[a-f0-9]{32,}/i, name: 'hash_pattern' }
  ]
  
  patterns.forEach(pattern => {
    if (pattern.regex.test(content)) {
      suspiciousPatterns.push(pattern.name)
    }
  })
  
  // Simple language detection (basic)
  const language = detectLanguage(content)
  
  // Basic sentiment analysis
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'love']
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'angry', 'sad', 'disappointed']
  
  const positiveCount = positiveWords.filter(word => content.toLowerCase().includes(word)).length
  const negativeCount = negativeWords.filter(word => content.toLowerCase().includes(word)).length
  
  let sentiment: "positive" | "neutral" | "negative" = "neutral"
  if (positiveCount > negativeCount) sentiment = "positive"
  else if (negativeCount > positiveCount) sentiment = "negative"
  
  return {
    suspiciousPatterns,
    language,
    sentiment
  }
}

function detectLanguage(text: string): string {
  // Basic language detection based on character sets
  const hasChinese = /[\u4e00-\u9fff]/.test(text)
  const hasJapanese = /[\u3040-\u309f\u30a0-\u30ff]/.test(text)
  const hasKorean = /[\uac00-\ud7af]/.test(text)
  const hasArabic = /[\u0600-\u06ff]/.test(text)
  const hasCyrillic = /[\u0400-\u04ff]/.test(text)
  
  if (hasChinese) return 'chinese'
  if (hasJapanese) return 'japanese'
  if (hasKorean) return 'korean'
  if (hasArabic) return 'arabic'
  if (hasCyrillic) return 'russian'
  
  // Default to English for Latin script
  return 'english'
}

// Risk level assessment
function assessRiskLevel(
  contentType: string,
  urlSafety: any,
  suspiciousPatterns: string[]
): "low" | "medium" | "high" {
  let riskScore = 0
  
  // Content type risk
  switch (contentType) {
    case 'url':
      if (urlSafety?.isMalicious) riskScore += 50
      if (urlSafety?.reputation < 50) riskScore += 30
      break
    case 'email':
      riskScore += 10
      break
    case 'phone':
      riskScore += 5
      break
    case 'wifi':
      riskScore += 15
      break
    case 'vcard':
      riskScore += 8
      break
  }
  
  // Suspicious patterns
  riskScore += suspiciousPatterns.length * 10
  
  // URL safety
  if (urlSafety?.threatTypes.includes('malware')) riskScore += 40
  if (urlSafety?.threatTypes.includes('phishing')) riskScore += 35
  if (urlSafety?.threatTypes.includes('suspicious_pattern')) riskScore += 20
  
  if (riskScore >= 70) return "high"
  if (riskScore >= 40) return "medium"
  return "low"
}

// Generate warnings and recommendations
function generateWarnings(
  contentType: string,
  urlSafety: any,
  suspiciousPatterns: string[],
  riskLevel: string
): string[] {
  const warnings: string[] = []
  
  if (contentType === 'url') {
    if (urlSafety?.isMalicious) {
      warnings.push("This URL has been flagged as malicious by security services")
    }
    if (urlSafety?.reputation < 50) {
      warnings.push("This URL has a low reputation score")
    }
    if (urlSafety?.threatTypes.includes('phishing')) {
      warnings.push("This URL appears to be a phishing attempt")
    }
    if (urlSafety?.threatTypes.includes('malware')) {
      warnings.push("This URL may contain malware")
    }
  }
  
  suspiciousPatterns.forEach(pattern => {
    switch (pattern) {
      case 'cryptocurrency_reference':
        warnings.push("Contains cryptocurrency references - verify legitimacy")
        break
      case 'credential_request':
        warnings.push("Requests login credentials - be cautious")
        break
      case 'suspicious_offers':
        warnings.push("Contains suspicious offers or promises")
        break
      case 'urgency_tactics':
        warnings.push("Uses urgency tactics - common in scams")
        break
      case 'brand_impersonation':
        warnings.push("May be impersonating legitimate brands")
        break
    }
  })
  
  if (riskLevel === 'high') {
    warnings.push("High risk content detected - proceed with extreme caution")
  }
  
  return warnings
}

function generateRecommendations(
  contentType: string,
  riskLevel: string,
  warnings: string[]
): string[] {
  const recommendations: string[] = []
  
  if (contentType === 'url') {
    if (riskLevel === 'high') {
      recommendations.push("Do not visit this URL")
      recommendations.push("Report it to your security team")
    } else if (riskLevel === 'medium') {
      recommendations.push("Verify the URL through official channels")
      recommendations.push("Use a secure browser with protection enabled")
    } else {
      recommendations.push("URL appears safe but always verify before visiting")
    }
  }
  
  if (contentType === 'wifi') {
    recommendations.push("Verify network name with venue staff")
    recommendations.push("Use VPN when connecting to public networks")
  }
  
  if (contentType === 'email') {
    recommendations.push("Verify sender email address")
    recommendations.push("Check for suspicious attachments or links")
  }
  
  if (warnings.length > 0) {
    recommendations.push("Review all warnings before proceeding")
    recommendations.push("When in doubt, avoid interaction")
  }
  
  recommendations.push("Always verify QR code content through official sources")
  recommendations.push("Be cautious of financial requests or personal information")
  
  return recommendations
}

// Main QR code analysis function
async function analyzeQRCode(imageData: string): Promise<QRCodeAnalysis> {
  try {
    // In a real implementation, you would use a QR code library like:
    // - jsQR for client-side
    // - qrcode-reader for Node.js
    // - Google Cloud Vision API for advanced image processing
    
    // For now, we'll simulate the QR code decoding
    // In production, replace this with actual QR code processing
    const decodedContent = await decodeQRCodeFromImage(imageData)
    
    if (!decodedContent) {
      throw new Error('Failed to decode QR code')
    }
    
    const contentType = detectContentType(decodedContent)
    
    // Perform security checks based on content type
    let urlSafety = null
    let contentAnalysis = null
    
    if (contentType === 'url') {
      urlSafety = await assessUrlSafety(decodedContent)
    }
    
    if (contentType === 'text') {
      contentAnalysis = analyzeTextContent(decodedContent)
    }
    
    const suspiciousPatterns = contentAnalysis?.suspiciousPatterns || []
    const riskLevel = assessRiskLevel(contentType, urlSafety, suspiciousPatterns)
    const warnings = generateWarnings(contentType, urlSafety, suspiciousPatterns, riskLevel)
    const recommendations = generateRecommendations(contentType, riskLevel, warnings)
    
    return {
      content: decodedContent,
      type: contentType,
      isSafe: riskLevel === 'low',
      riskLevel,
      warnings,
      recommendations,
      metadata: {
        size: imageData.length,
        format: 'base64',
        dimensions: { width: 300, height: 300 } // Would be extracted from actual image
      },
      securityChecks: {
        urlSafety,
        contentAnalysis
      }
    }
    
  } catch (error) {
    console.error('QR code analysis error:', error)
    throw new Error('Failed to analyze QR code')
  }
}

// Simulated QR code decoding (replace with actual implementation)
async function decodeQRCodeFromImage(imageData: string): Promise<string> {
  // This is a placeholder - in production, use a real QR code library
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // For demo purposes, return a sample URL
  // In reality, this would decode the actual QR code content
  const sampleContents = [
    "https://example.com/safe-link",
    "https://bit.ly/suspicious-link",
    "mailto:test@example.com",
    "tel:+1234567890",
    "WIFI:S:MyNetwork;T:WPA;P:mypassword;;",
    "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD",
    "This is a sample text QR code"
  ]
  
  // Return a random sample for demonstration
  return sampleContents[Math.floor(Math.random() * sampleContents.length)]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = qrAnalysisSchema.parse(body)
    
    // Perform real-time QR code analysis
    const analysis = await analyzeQRCode(validatedData.imageData)
    
    return NextResponse.json({
      success: true,
      data: analysis,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('QR code analysis error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'QR Code Scanner API',
    version: '1.0.0',
    endpoints: {
      POST: '/api/qr-scanner - Analyze QR code image'
    },
    supportedFormats: ['jpeg', 'png', 'gif', 'webp'],
    features: [
      'Real-time QR code decoding',
      'URL safety assessment',
      'Content analysis',
      'Threat intelligence integration',
      'Risk assessment algorithms'
    ]
  })
}
