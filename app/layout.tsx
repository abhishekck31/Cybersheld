import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "CyberShield India - Cyber Security Awareness Platform",
  description:
    "Comprehensive cyber security awareness platform for diverse Indian demographics. Learn about cyber fraud, take quizzes, and stay protected.",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#0891b2",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CyberShield India",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "CyberShield India",
    title: "CyberShield India - Cyber Security Awareness Platform",
    description: "Stay safe from cyber fraud with our comprehensive awareness platform designed for all Indians.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${manrope.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans bg-gray-900 text-gray-50">{children}</body>
    </html>
  )
}
