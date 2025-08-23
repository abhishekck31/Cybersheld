import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Shield,
  Globe,
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
  <section className="relative w-full py-16 md:py-24 bg-black border-b border-gray-900 overflow-hidden">
        {/* Subtle grid background */}
  <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#00fff733_1px,transparent_1px),linear-gradient(to_bottom,#ff00ea33_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container mx-auto max-w-3xl px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4" style={{
            background: 'linear-gradient(90deg, #00fff7 0%, #ff00ea 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            MozBackgroundClip: 'text',
          }}>CyberShield India</h1>
          <p className="text-lg md:text-2xl mb-8" style={{ color: '#00fff7', textShadow: '0 0 8px #00fff7, 0 0 16px #ff00ea' }}>
            Stay safe from cyber threats. Learn, practice, and protect yourself with India's most modern cyber security platform.
          </p>
          <Link href="/learn">
            <Button className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-[#00fff7] bg-black text-[#00fff7] hover:bg-[#00fff7] hover:text-black shadow-[0_0_16px_#00fff7] transition-all">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      {/* ...existing content below the hero section... */}
      {/* ...existing grid/statistics/arsenal content... */}
      {/* This is the rest of your hero-section.tsx file, unchanged */}
      {/* ... */}
        <div className="container mx-auto px-2">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mt-8 mb-8">
            <div className="bg-gray-900/95 border border-cyan-400/40 rounded-2xl shadow-xl hover:shadow-cyan-400/30 transition-all duration-200 w-[220px] h-[220px] flex flex-col items-center justify-center text-center mx-2">
              <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-xl bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-400/20">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">99.9%</div>
              <div className="text-sm font-semibold text-gray-200 mb-2">Threat Detection</div>
              <p className="text-gray-400 text-sm leading-snug px-3">Real-time URL checking, password breach detection, and advanced security tools</p>
            </div>
            <div className="bg-gray-900/95 border border-fuchsia-400/40 rounded-2xl shadow-xl hover:shadow-fuchsia-400/30 transition-all duration-200 w-[220px] h-[220px] flex flex-col items-center justify-center text-center mx-2">
              <div className="flex items-center justify-center mb-4 h-14 w-14 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-700/20 border border-purple-400/20">
                <Globe className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-2">5+</div>
              <div className="text-sm font-semibold text-gray-200 mb-2">Languages</div>
              <p className="text-gray-400 text-sm leading-snug px-3">Available in Hindi and regional languages for maximum accessibility across India</p>
            </div>
          </div>
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
            { icon: FileCheck,title: "File Analyzer", desc: "Document & attachment security scanning",color: "yellow"},
            { icon: Network, title: "VPN Checker", desc: "Secure connection verification", color: "indigo" },
            { icon: Zap, title: "Scam Detector", desc: "Advanced fraud pattern recognition", color: "pink" },
            { icon: Shield, title: "Identity Guard", desc: "Personal information protection", color: "teal" },
          ].map((tool, index) => (
            <div
              key={tool.title}
              className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-400 hover:border-blue-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-6 sm:p-6 text-center hover-lift group card-glow stagger-animation h-full min-h-[230px] flex flex-col justify-between"
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
          </>
        );
    }
