"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Star,
  Play,
  CheckCircle,
  Trophy,
  Target,
  Brain,
  Shield,
  Smartphone,
  CreditCard,
  Mail,
  Globe,
  Wifi,
  Lock,
  Eye,
  Users,
  Home,
  Briefcase,
  AlertTriangle,
  Database,
  Cloud,
  Zap,
} from "lucide-react"
import Link from "next/link"

const learningModules = [
  {
    id: "phishing-fundamentals",
    title: "Phishing Attack Fundamentals",
    description: "Master the basics of identifying and preventing phishing attacks with real-world examples",
    icon: Mail,
    difficulty: "Beginner",
    duration: "45 mins",
    lessons: 8,
    students: 12500,
    rating: 4.8,
    progress: 0,
    category: "Email Security",
    color: "bg-blue-600",
    topics: ["Email Recognition", "Link Analysis", "Attachment Safety", "Reporting Methods"],
    content: {
      overview: "Learn to identify sophisticated phishing attempts targeting Indian users",
      objectives: ["Recognize phishing emails", "Analyze suspicious links", "Report threats effectively"],
      realExamples: ["Fake bank notifications", "UPI scam messages", "Government impersonation emails"],
    },
  },
  {
    id: "mobile-security",
    title: "Mobile Device Security",
    description: "Comprehensive guide to securing smartphones with focus on Indian mobile banking and UPI",
    icon: Smartphone,
    difficulty: "Intermediate",
    duration: "60 mins",
    lessons: 10,
    students: 8900,
    rating: 4.9,
    progress: 25,
    category: "Device Security",
    color: "bg-green-600",
    topics: ["App Permissions", "UPI Security", "Mobile Banking", "Privacy Settings"],
    content: {
      overview: "Secure your smartphone against the latest mobile threats in India",
      objectives: ["Configure app permissions", "Secure UPI transactions", "Protect personal data"],
      realExamples: ["Fake payment apps", "SMS OTP scams", "Malicious APK files"],
    },
  },
  {
    id: "financial-fraud",
    title: "Financial Fraud Prevention",
    description: "Protect your money from online scams targeting Indian banking and payment systems",
    icon: CreditCard,
    difficulty: "Intermediate",
    duration: "75 mins",
    lessons: 12,
    students: 15200,
    rating: 4.7,
    progress: 60,
    category: "Financial Security",
    color: "bg-red-600",
    topics: ["UPI Scams", "Credit Card Fraud", "Investment Scams", "Banking Safety"],
    content: {
      overview: "Comprehensive protection against financial fraud in digital India",
      objectives: ["Identify UPI scams", "Secure online banking", "Avoid investment fraud"],
      realExamples: ["Fake QR codes", "Ponzi schemes", "Credit card skimming"],
    },
  },
  {
    id: "social-engineering",
    title: "Social Engineering Defense",
    description: "Learn to recognize and counter psychological manipulation tactics",
    icon: Brain,
    difficulty: "Advanced",
    duration: "90 mins",
    lessons: 15,
    students: 6700,
    rating: 4.6,
    progress: 0,
    category: "Psychology",
    color: "bg-purple-600",
    topics: ["Manipulation Tactics", "Trust Building", "Information Gathering", "Defense Strategies"],
    content: {
      overview: "Understand and defend against social engineering attacks",
      objectives: [
        "Recognize manipulation tactics",
        "Build trust",
        "Gather information safely",
        "Implement defense strategies",
      ],
      realExamples: ["Phishing calls", "Baiting schemes", "Tailgating attempts"],
    },
  },
  {
    id: "password-security",
    title: "Password & Authentication Security",
    description: "Create and manage strong passwords and secure authentication",
    icon: Shield,
    difficulty: "Beginner",
    duration: "30 mins",
    lessons: 6,
    students: 18900,
    rating: 4.9,
    progress: 100,
    category: "Authentication",
    color: "bg-yellow-600",
    topics: ["Strong Passwords", "2FA Setup", "Password Managers", "Biometric Security"],
    content: {
      overview: "Secure your accounts with strong passwords and authentication methods",
      objectives: ["Create strong passwords", "Set up 2FA", "Use password managers", "Implement biometric security"],
      realExamples: ["Password cracking attempts", "Brute force attacks", "Phishing for credentials"],
    },
  },
  {
    id: "web-browsing-safety",
    title: "Safe Web Browsing",
    description: "Navigate the internet safely and avoid malicious websites",
    icon: Globe,
    difficulty: "Beginner",
    duration: "40 mins",
    lessons: 7,
    students: 11300,
    rating: 4.8,
    progress: 15,
    category: "Web Security",
    color: "bg-indigo-600",
    topics: ["URL Analysis", "Browser Security", "Download Safety", "Privacy Tools"],
    content: {
      overview: "Protect yourself online by avoiding malicious websites and using secure browsing practices",
      objectives: ["Analyze URLs", "Use secure browsers", "Avoid downloads from unknown sources", "Use privacy tools"],
      realExamples: ["Malware websites", "Phishing sites", "Spyware downloads"],
    },
  },
  {
    id: "wifi-network-security",
    title: "Wi-Fi & Network Security",
    description: "Secure your home and public network connections",
    icon: Wifi,
    difficulty: "Intermediate",
    duration: "55 mins",
    lessons: 9,
    students: 7800,
    rating: 4.7,
    progress: 0,
    category: "Network Security",
    color: "bg-cyan-600",
    topics: ["Router Security", "Public Wi-Fi Safety", "VPN Usage", "Network Monitoring"],
    content: {
      overview: "Secure your home and public network connections against cyber threats",
      objectives: ["Secure your router", "Use public Wi-Fi safely", "Use VPNs", "Monitor network activity"],
      realExamples: ["Man-in-the-middle attacks", "Public Wi-Fi hacking", "Network monitoring tools"],
    },
  },
  {
    id: "identity-theft-protection",
    title: "Identity Theft Protection",
    description: "Safeguard your personal information and digital identity",
    icon: Eye,
    difficulty: "Intermediate",
    duration: "65 mins",
    lessons: 11,
    students: 9200,
    rating: 4.8,
    progress: 0,
    category: "Privacy Protection",
    color: "bg-teal-600",
    topics: ["Personal Data Protection", "Identity Monitoring", "Recovery Procedures", "Legal Rights"],
    content: {
      overview: "Protect your personal information and digital identity from identity theft",
      objectives: ["Protect personal data", "Monitor identity", "Recover from theft", "Understand legal rights"],
      realExamples: ["Credit card theft", "Personal information leaks", "Digital identity theft"],
    },
  },
  {
    id: "social-media-privacy",
    title: "Social Media Privacy & Safety",
    description: "Protect yourself on Facebook, Instagram, WhatsApp and other platforms",
    icon: Users,
    difficulty: "Beginner",
    duration: "50 mins",
    lessons: 8,
    students: 14600,
    rating: 4.6,
    progress: 0,
    category: "Social Media",
    color: "bg-pink-600",
    topics: ["Privacy Settings", "Fake Profiles", "Cyberbullying", "Content Sharing"],
    content: {
      overview: "Protect your privacy on social media platforms",
      objectives: ["Set privacy settings", "Identify fake profiles", "Avoid cyberbullying", "Manage content sharing"],
      realExamples: ["Privacy breaches", "Fake accounts", "Cyberbullying incidents"],
    },
  },
  {
    id: "ransomware-protection",
    title: "Ransomware & Malware Defense",
    description: "Understand and protect against malicious software attacks",
    icon: AlertTriangle,
    difficulty: "Advanced",
    duration: "80 mins",
    lessons: 13,
    students: 5400,
    rating: 4.9,
    progress: 0,
    category: "Malware Protection",
    color: "bg-orange-600",
    topics: ["Ransomware Types", "Prevention Methods", "Backup Strategies", "Recovery Plans"],
    content: {
      overview: "Defend against ransomware and other malware threats",
      objectives: [
        "Identify ransomware types",
        "Implement prevention methods",
        "Create backup strategies",
        "Develop recovery plans",
      ],
      realExamples: ["Ransomware attacks", "Malware infections", "Data recovery procedures"],
    },
  },
  {
    id: "iot-device-security",
    title: "Smart Home & IoT Security",
    description: "Secure your smart devices and connected home appliances",
    icon: Home,
    difficulty: "Intermediate",
    duration: "70 mins",
    lessons: 10,
    students: 6100,
    rating: 4.5,
    progress: 0,
    category: "IoT Security",
    color: "bg-emerald-600",
    topics: ["Device Configuration", "Network Segmentation", "Firmware Updates", "Privacy Controls"],
    content: {
      overview: "Secure your smart home devices and connected appliances",
      objectives: ["Configure devices", "Segment networks", "Update firmware", "Control privacy settings"],
      realExamples: ["Smart home hacking", "IoT device vulnerabilities", "Privacy control settings"],
    },
  },
  {
    id: "workplace-cybersecurity",
    title: "Workplace Cybersecurity",
    description: "Essential security practices for professional environments",
    icon: Briefcase,
    difficulty: "Intermediate",
    duration: "85 mins",
    lessons: 14,
    students: 8700,
    rating: 4.7,
    progress: 0,
    category: "Professional Security",
    color: "bg-slate-600",
    topics: ["Email Security", "Remote Work Safety", "Data Handling", "Incident Reporting"],
    content: {
      overview: "Implement essential security practices in professional environments",
      objectives: ["Secure emails", "Ensure remote work safety", "Handle data responsibly", "Report incidents"],
      realExamples: ["Email phishing", "Remote work vulnerabilities", "Data breaches", "Incident reporting procedures"],
    },
  },
  {
    id: "cryptocurrency-security",
    title: "Cryptocurrency & Digital Wallet Security",
    description: "Safely manage and trade digital currencies",
    icon: Database,
    difficulty: "Advanced",
    duration: "95 mins",
    lessons: 16,
    students: 4200,
    rating: 4.8,
    progress: 0,
    category: "Crypto Security",
    color: "bg-amber-600",
    topics: ["Wallet Security", "Exchange Safety", "Private Keys", "Scam Recognition"],
    content: {
      overview: "Secure your digital wallets and manage cryptocurrencies safely",
      objectives: ["Secure wallets", "Ensure exchange safety", "Protect private keys", "Recognize scams"],
      realExamples: ["Wallet hacking", "Exchange fraud", "Private key theft", "Cryptocurrency scams"],
    },
  },
  {
    id: "cloud-storage-security",
    title: "Cloud Storage & Backup Security",
    description: "Secure your data in Google Drive, Dropbox, and other cloud services",
    icon: Cloud,
    difficulty: "Beginner",
    duration: "45 mins",
    lessons: 7,
    students: 10800,
    rating: 4.6,
    progress: 0,
    category: "Cloud Security",
    color: "bg-sky-600",
    topics: ["Cloud Privacy", "Encryption", "Access Controls", "Backup Strategies"],
    content: {
      overview: "Secure your data in cloud storage services",
      objectives: ["Ensure cloud privacy", "Use encryption", "Manage access controls", "Implement backup strategies"],
      realExamples: ["Cloud data breaches", "Encryption failures", "Access control issues", "Backup failures"],
    },
  },
  {
    id: "incident-response",
    title: "Cyber Incident Response",
    description: "What to do when you've been hacked or scammed",
    icon: Zap,
    difficulty: "Advanced",
    duration: "75 mins",
    lessons: 12,
    students: 3900,
    rating: 4.9,
    progress: 0,
    category: "Emergency Response",
    color: "bg-red-600",
    topics: ["Immediate Actions", "Evidence Collection", "Recovery Steps", "Prevention Planning"],
    content: {
      overview: "Respond effectively to cyber incidents and learn prevention strategies",
      objectives: ["Take immediate actions", "Collect evidence", "Recover from incidents", "Plan for prevention"],
      realExamples: ["Hacked accounts", "Data loss incidents", "Incident recovery procedures", "Prevention plans"],
    },
  },
  {
    id: "digital-privacy-fundamentals",
    title: "Digital Privacy Fundamentals",
    description: "Understand and control your digital footprint",
    icon: Lock,
    difficulty: "Beginner",
    duration: "55 mins",
    lessons: 9,
    students: 13200,
    rating: 4.7,
    progress: 0,
    category: "Privacy Protection",
    color: "bg-violet-600",
    topics: ["Data Collection", "Privacy Tools", "Anonymous Browsing", "Rights Management"],
    content: {
      overview: "Understand and control your digital footprint",
      objectives: ["Collect data responsibly", "Use privacy tools", "Browse anonymously", "Manage rights"],
      realExamples: [
        "Data collection practices",
        "Privacy tool usage",
        "Anonymous browsing techniques",
        "Rights management procedures",
      ],
    },
  },
]

const achievements = [
  {
    name: "First Steps",
    description: "Complete your first cybersecurity lesson and begin your learning journey",
    icon: Target,
    earned: true,
    points: 100,
    rarity: "Common",
  },
  {
    name: "Quiz Master",
    description: "Demonstrate expertise by scoring 90%+ on 5 different security quizzes",
    icon: Brain,
    earned: true,
    points: 250,
    rarity: "Uncommon",
  },
  {
    name: "Security Expert",
    description: "Master advanced cybersecurity concepts by completing 3 expert-level modules",
    icon: Shield,
    earned: false,
    points: 500,
    rarity: "Rare",
  },
  {
    name: "Perfect Score",
    description: "Achieve 100% accuracy on any module assessment",
    icon: Trophy,
    earned: true,
    points: 300,
    rarity: "Uncommon",
  },
  {
    name: "Privacy Guardian",
    description: "Complete all privacy protection modules and become a digital privacy expert",
    icon: Eye,
    earned: false,
    points: 400,
    rarity: "Rare",
  },
  {
    name: "Network Defender",
    description: "Master network and Wi-Fi security to protect your digital infrastructure",
    icon: Wifi,
    earned: false,
    points: 350,
    rarity: "Rare",
  },
  {
    name: "Incident Handler",
    description: "Complete emergency response training and learn to handle cyber incidents",
    icon: Zap,
    earned: false,
    points: 600,
    rarity: "Epic",
  },
  {
    name: "Digital Native",
    description: "Demonstrate comprehensive knowledge by completing 10 different security modules",
    icon: Globe,
    earned: false,
    points: 750,
    rarity: "Epic",
  },
]

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    "all",
    "Email Security",
    "Device Security",
    "Financial Security",
    "Psychology",
    "Authentication",
    "Web Security",
    "Network Security",
    "Privacy Protection",
    "Social Media",
    "Malware Protection",
    "IoT Security",
    "Professional Security",
    "Crypto Security",
    "Cloud Security",
    "Emergency Response",
  ]

  const filteredModules =
    selectedCategory === "all"
      ? learningModules
      : learningModules.filter((module) => module.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressStatus = (progress: number) => {
    if (progress === 0) return { status: "Not Started", color: "text-gray-500" }
    if (progress === 100) return { status: "Completed", color: "text-green-600" }
    return { status: "In Progress", color: "text-blue-600" }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      {/* Navigation to Home */}
      <div className="container mx-auto max-w-6xl px-4 pt-6 flex justify-start">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Home
          </Button>
        </Link>
      </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center space-x-2 glass-effect-light rounded-full px-4 py-2 mb-6 shadow-sm animate-bounce-in">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Interactive Learning Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100 mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Master Cyber Security
            </span>
          </h1>
          <p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            Comprehensive learning modules with interactive lessons, quizzes, and real-world scenarios to build your
            cyber security expertise
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in"
            style={{ animationDelay: "400ms" }}
          >
            <Button className="btn-primary">
              <Play className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
            <Button className="btn-outline">View Progress</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800 border border-gray-700">
              <TabsTrigger value="modules" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Learning Modules
              </TabsTrigger>
              <TabsTrigger value="progress" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                My Progress
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                    }`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module, index) => {
                  const Icon = module.icon
                  const progressStatus = getProgressStatus(module.progress)

                  return (
                    <Card
                      key={module.id}
                      className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-lg ${module.color}/20 border border-gray-600/30`}>
                            <Icon className={`h-6 w-6 text-blue-400`} />
                          </div>
                          <Badge className={`${getDifficultyColor(module.difficulty)} border-0`}>
                            {module.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-semibold group-hover:text-blue-400 transition-colors text-gray-100">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{module.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className={progressStatus.color}>{progressStatus.status}</span>
                            <span className="text-gray-500">{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2 bg-gray-700" />
                        </div>

                        {/* Module Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{module.lessons} lessons</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{module.rating}</span>
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-1">
                          {module.topics.slice(0, 2).map((topic) => (
                            <Badge key={topic} className="bg-gray-700/50 text-gray-300 border-gray-600/50 text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {module.topics.length > 2 && (
                            <Badge className="bg-gray-700/50 text-gray-300 border-gray-600/50 text-xs">
                              +{module.topics.length - 2} more
                            </Badge>
                          )}
                        </div>

                        {/* Action Button */}
                        <Link href={`/learn/${module.id}`}>
                          <Button
                            className={`w-full mt-4 transition-all duration-300 ${
                              module.progress > 0 ? "btn-primary" : "btn-outline"
                            }`}
                          >
                            {module.progress === 0 && <Play className="h-4 w-4 mr-2" />}
                            {module.progress === 100 && <CheckCircle className="h-4 w-4 mr-2" />}
                            {module.progress > 0 && module.progress < 100 && <BookOpen className="h-4 w-4 mr-2" />}
                            {module.progress === 0 ? "Start Module" : module.progress === 100 ? "Review" : "Continue"}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                    <div className="text-sm text-gray-400">Modules Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">87%</div>
                    <div className="text-sm text-gray-400">Average Quiz Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">24h</div>
                    <div className="text-sm text-gray-400">Total Learning Time</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in">
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">16</div>
                    <div className="text-sm text-gray-400">Available Modules</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your progress across all modules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningModules.map((module) => (
                    <div key={module.id} className="flex items-center space-x-4">
                      <div className={`p-2 rounded ${module.color}/20 border border-gray-600/30`}>
                        <module.icon className={`h-4 w-4 text-blue-400`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-100">{module.title}</span>
                          <span className="text-sm text-gray-400">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2 bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={achievement.name}
                      className={`bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group backdrop-blur-sm card-glow animate-fade-in ${
                        achievement.earned ? "border-yellow-200 bg-yellow-50" : ""
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-full ${achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-400"}`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold flex items-center space-x-2 text-gray-100">
                              <span>{achievement.name}</span>
                              {achievement.earned && <CheckCircle className="h-4 w-4 text-green-600" />}
                            </h3>
                            <p className="text-sm text-gray-400">{achievement.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
