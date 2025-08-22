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
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb12_1px,transparent_1px),linear-gradient(to_bottom,#2563eb12_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float" />
      <div
        className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full filter blur-3xl animate-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center space-y-6 sm:space-y-10">
          <div className="flex justify-center mb-6 sm:mb-8 animate-bounce-in">
            <div className="flex items-center space-x-2 sm:space-x-3 glass-effect-light px-4 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-blue-600/25 transition-all duration-300 hover:scale-105 border border-blue-400/20">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
              <span className="text-sm sm:text-base font-bold text-gray-100">Protecting India from Cyber Fraud</span>
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
              <span className="text-gray-100 block">Stay Safe from</span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent block animate-glow">
                Cyber Threats
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Learn, Practice, and Protect yourself with India's most comprehensive
              <span className="text-blue-400 font-bold"> cyber security platform</span>
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 animate-fade-in px-4 sm:px-0"
            style={{ animationDelay: "400ms" }}
          >
            <Link href="/learn">
              <Button className="btn-primary text-lg sm:text-xl font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-2xl group w-full sm:w-auto">
                Start Learning Now
                <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="btn-outline text-lg sm:text-xl font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-2xl group w-full sm:w-auto">
                <Play className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                Test Your Knowledge
              </Button>
            </Link>
          </div>

          <div
            className="bg-red-600/20 border border-red-500/50 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto shadow-2xl hover:shadow-red-600/25 transition-all duration-300 mt-8 sm:mt-12 animate-scale-in backdrop-blur-sm mx-4 sm:mx-auto"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3">
              <div className="p-3 sm:p-4 bg-red-600/20 rounded-full border border-red-400/30 animate-pulse-slow">
                <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-red-400">1930</div>
                <div className="text-base sm:text-lg font-bold text-gray-300">Emergency Helpline</div>
              </div>
            </div>
            <p className="text-gray-400 font-semibold text-base sm:text-lg">
              Report cyber crimes immediately - 24/7 support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24">
          <div
            className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-400 hover:border-blue-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-6 sm:p-10 text-center hover-lift group animate-fade-in card-glow"
            style={{ animationDelay: "800ms" }}
          >
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-3xl group-hover:scale-110 transition-transform duration-300 border border-blue-400/20 animate-float">
                <Users className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-gray-100 mb-2">50,000+</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-200 mb-3 sm:mb-4">Users Protected</h3>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              Tailored content for students, professionals, homemakers, rural users, and seniors across India
            </p>
          </div>

          <div
            className="bg-gray-800/50 text-gray-50 rounded-2xl border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-green-600/10 transition-all duration-400 hover:border-green-500/30 hover:bg-gray-800/70 backdrop-blur-sm p-6 sm:p-10 text-center hover-lift group animate-fade-in card-glow"
            style={{ animationDelay: "1000ms" }}
          >
            <div className="flex justify-center mb-6 sm:mb-8">
              <div
                className="p-4 sm:p-6 bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-3xl group-hover:scale-110 transition-transform duration-300 border border-green-400/20 animate-float"
                style={{ animationDelay: "1s" }}
              >
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
    </section>
  )
}
