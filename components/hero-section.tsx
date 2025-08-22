import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  AlertTriangle,
  Users,
  Globe,
  Sparkles,
  Play,
  ArrowRight,
  Zap,
  Lock,
  Eye,
  Wifi,
  Brain,
  FileCheck,
  Network,
} from "lucide-react"

export function HeroSection() {
  return (
    <>
      <section className="relative w-full py-16 md:py-24 bg-gray-900 border-b border-gray-800 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#2563eb12_1px,transparent_1px),linear-gradient(to_bottom,#2563eb12_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container mx-auto max-w-3xl px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">CyberShield India</h1>
          <p className="text-lg md:text-2xl text-gray-400 mb-8">Stay safe from cyber threats. Learn, practice, and protect yourself with India's most modern cyber security platform.</p>
          <Link href="/learn">
            <Button className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      {/* ...existing content below the hero section... */}
      <div className="container mx-auto px-4">
        {/* ...existing grid/statistics/arsenal content... */}
        {/* This is the rest of your hero-section.tsx file, unchanged */}
        {/* ... */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-green-600/10 transition-all duration-400 hover:border-green-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-6 sm:p-10 text-center hover-lift group animate-fade-in card-glow"
              style={{ animationDelay: "1000ms" }}>
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="p-4 sm:p-6 bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-3xl group-hover:scale-110 transition-transform duration-300 border border-green-400/20 animate-float"
                  style={{ animationDelay: "1.5s" }}>
                  <Shield className="h-12 w-12 sm:h-16 sm:w-16 text-green-400" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-100 mb-2">99.9%</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3 sm:mb-4">Threat Detection</h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Real-time URL checking, password breach detection, and advanced security tools
              </p>
            </div>
            <div
              className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-purple-600/10 transition-all duration-400 hover:border-purple-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-6 sm:p-10 text-center hover-lift group animate-fade-in card-glow sm:col-span-2 lg:col-span-1"
              style={{ animationDelay: "1200ms" }}
            >
              <div className="flex justify-center mb-6 sm:mb-8">
                <div
                  className="p-4 sm:p-6 bg-gradient-to-br from-purple-600/20 to-purple-700/20 rounded-3xl group-hover:scale-110 transition-transform duration-300 border border-purple-400/20 animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <Globe className="h-12 w-12 sm:h-16 sm:w-16 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-gray-100 mb-2">12+</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3 sm:mb-4">Languages</h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Available in Hindi and regional languages for maximum accessibility across India
              </p>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 animate-fade-in" style={{ animationDelay: "1400ms" }}>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-4">Advanced Security Arsenal</h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0">
                Professional-grade tools to protect you from every cyber threat
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Brain,
                  title: "AI Threat Scanner",
                  desc: "Real-time malware detection with machine learning",
                  color: "blue",
                },
                { icon: Lock, title: "Password Fortress", desc: "Breach detection & strength analysis", color: "green" },
                { icon: Eye, title: "Phishing Shield", desc: "Email & link verification system", color: "purple" },
                { icon: Wifi, title: "Network Guardian", desc: "Wi-Fi & network security monitoring", color: "red" },
                {
                  icon: FileCheck,
                  title: "File Analyzer",
                  desc: "Document & attachment security scanning",
                  color: "yellow",
                },
                { icon: Network, title: "VPN Checker", desc: "Secure connection verification", color: "indigo" },
                { icon: Zap, title: "Scam Detector", desc: "Advanced fraud pattern recognition", color: "pink" },
                { icon: Shield, title: "Identity Guard", desc: "Personal information protection", color: "teal" },
              ].map((tool, index) => (
                <div
                  key={tool.title}
                  className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-400 hover:border-blue-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-4 sm:p-6 text-center hover-lift group card-glow stagger-animation"
                  style={{ animationDelay: `${1500 + index * 100}ms` }}
                >
                  <div
                    className={`p-3 sm:p-4 bg-gradient-to-br from-${tool.color}-600/20 to-${tool.color}-700/20 rounded-2xl mb-3 sm:mb-4 mx-auto w-fit border border-${tool.color}-400/20 animate-pulse-slow`}
                  >
                    <tool.icon className={`h-6 w-6 sm:h-8 sm:w-8 text-${tool.color}-400`} />
                  </div>
                  <h3 className="font-bold text-gray-200 mb-2 text-sm sm:text-base">{tool.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
