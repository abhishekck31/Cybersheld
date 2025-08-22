"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  Star,
  Download,
  MessageCircle,
  Award,
  Target,
  Brain,
} from "lucide-react"
import Link from "next/link"

const moduleData = {
  "phishing-fundamentals": {
    title: "Phishing Attack Fundamentals",
    description: "Master the basics of identifying and preventing phishing attacks with real-world Indian examples",
    difficulty: "Beginner",
    duration: "45 mins",
    lessons: 8,
    students: 12500,
    rating: 4.8,
    progress: 0,
    instructor: {
      name: "Dr. Priya Sharma",
      title: "Cyber Security Expert & Former CERT-In Analyst",
      avatar: "/placeholder.svg?height=100&width=100&text=PS",
    },
    curriculum: [
      {
        id: 1,
        title: "Introduction to Phishing",
        duration: "8 mins",
        type: "video",
        completed: false,
        description: "Understanding phishing attacks targeting Indian users",
      },
      {
        id: 2,
        title: "Types of Phishing Attacks",
        duration: "12 mins",
        type: "video",
        completed: false,
        description: "Email, SMS, voice phishing, and UPI-based attacks",
      },
      {
        id: 3,
        title: "Identifying Suspicious Emails",
        duration: "10 mins",
        type: "interactive",
        completed: false,
        description: "Hands-on practice with real Indian phishing examples",
      },
      {
        id: 4,
        title: "Knowledge Check: Email Analysis",
        duration: "5 mins",
        type: "quiz",
        completed: false,
        description: "Test your ability to spot phishing emails",
      },
      {
        id: 5,
        title: "URL and Link Safety",
        duration: "8 mins",
        type: "video",
        completed: false,
        description: "How to verify links before clicking",
      },
      {
        id: 6,
        title: "Attachment Security",
        duration: "6 mins",
        type: "video",
        completed: false,
        description: "Safe handling of email attachments",
      },
      {
        id: 7,
        title: "Reporting Phishing Attempts",
        duration: "4 mins",
        type: "video",
        completed: false,
        description: "How to report to CERT-In and other authorities",
      },
      {
        id: 8,
        title: "Final Assessment",
        duration: "15 mins",
        type: "test",
        completed: false,
        description: "Comprehensive test covering all module topics",
      },
    ],
    resources: [
      { name: "Phishing Identification Checklist", type: "PDF", size: "2.1 MB" },
      { name: "Common Indian Phishing Templates", type: "PDF", size: "5.3 MB" },
      { name: "CERT-In Reporting Guidelines", type: "PDF", size: "1.8 MB" },
    ],
  },
  "mobile-security": {
    title: "Mobile Device Security",
    description: "Comprehensive guide to securing smartphones with focus on Indian mobile banking and UPI",
    difficulty: "Intermediate",
    duration: "60 mins",
    lessons: 10,
    students: 8900,
    rating: 4.9,
    progress: 25,
    instructor: {
      name: "Rajesh Kumar",
      title: "Mobile Security Specialist & UPI Security Expert",
      avatar: "/placeholder.svg?height=100&width=100&text=RK",
    },
    curriculum: [
      {
        id: 1,
        title: "Mobile Threat Landscape in India",
        duration: "8 mins",
        type: "video",
        completed: true,
        description: "Current mobile security threats targeting Indian users",
      },
      {
        id: 2,
        title: "App Permissions & Privacy",
        duration: "10 mins",
        type: "interactive",
        completed: true,
        description: "Managing app permissions for maximum security",
      },
      {
        id: 3,
        title: "UPI Security Best Practices",
        duration: "12 mins",
        type: "video",
        completed: false,
        description: "Securing UPI transactions and avoiding scams",
      },
      {
        id: 4,
        title: "Mobile Banking Safety",
        duration: "8 mins",
        type: "video",
        completed: false,
        description: "Safe mobile banking practices",
      },
      {
        id: 5,
        title: "Malicious App Detection",
        duration: "6 mins",
        type: "interactive",
        completed: false,
        description: "Identifying and avoiding malicious apps",
      },
      {
        id: 6,
        title: "Device Lock & Biometric Security",
        duration: "5 mins",
        type: "video",
        completed: false,
        description: "Setting up secure device locks",
      },
      {
        id: 7,
        title: "Public Wi-Fi Safety on Mobile",
        duration: "7 mins",
        type: "video",
        completed: false,
        description: "Safe mobile internet usage in public",
      },
      {
        id: 8,
        title: "Mobile Privacy Settings",
        duration: "6 mins",
        type: "interactive",
        completed: false,
        description: "Configuring privacy settings across platforms",
      },
      {
        id: 9,
        title: "Knowledge Check: Mobile Security",
        duration: "8 mins",
        type: "quiz",
        completed: false,
        description: "Test your mobile security knowledge",
      },
      {
        id: 10,
        title: "Final Assessment",
        duration: "15 mins",
        type: "test",
        completed: false,
        description: "Comprehensive mobile security assessment",
      },
    ],
    resources: [
      { name: "Mobile Security Checklist", type: "PDF", size: "1.9 MB" },
      { name: "UPI Safety Guidelines", type: "PDF", size: "2.4 MB" },
      { name: "App Permission Guide", type: "PDF", size: "3.1 MB" },
    ],
  },
  "financial-fraud": {
    title: "Financial Fraud Prevention",
    description: "Protect your money from online scams targeting Indian banking and payment systems",
    difficulty: "Intermediate",
    duration: "75 mins",
    lessons: 12,
    students: 15200,
    rating: 4.7,
    progress: 60,
    instructor: {
      name: "Anita Desai",
      title: "Financial Crime Analyst & Banking Security Expert",
      avatar: "/placeholder.svg?height=100&width=100&text=AD",
    },
    curriculum: [
      {
        id: 1,
        title: "Financial Fraud Landscape in India",
        duration: "10 mins",
        type: "video",
        completed: true,
        description: "Overview of financial fraud targeting Indians",
      },
      {
        id: 2,
        title: "UPI Scams & Prevention",
        duration: "12 mins",
        type: "video",
        completed: true,
        description: "Common UPI scams and how to avoid them",
      },
      {
        id: 3,
        title: "Credit Card Fraud Detection",
        duration: "8 mins",
        type: "interactive",
        completed: true,
        description: "Identifying and preventing credit card fraud",
      },
      {
        id: 4,
        title: "Investment Scam Recognition",
        duration: "10 mins",
        type: "video",
        completed: true,
        description: "Spotting Ponzi schemes and investment fraud",
      },
      {
        id: 5,
        title: "Banking Safety Protocols",
        duration: "6 mins",
        type: "video",
        completed: true,
        description: "Safe online and mobile banking practices",
      },
      {
        id: 6,
        title: "Cryptocurrency Fraud",
        duration: "8 mins",
        type: "video",
        completed: true,
        description: "Avoiding crypto-related scams",
      },
      {
        id: 7,
        title: "Loan & EMI Scams",
        duration: "7 mins",
        type: "video",
        completed: true,
        description: "Identifying fraudulent loan offers",
      },
      {
        id: 8,
        title: "Insurance Fraud Prevention",
        duration: "5 mins",
        type: "video",
        completed: false,
        description: "Avoiding insurance-related scams",
      },
      {
        id: 9,
        title: "Recovery Procedures",
        duration: "6 mins",
        type: "interactive",
        completed: false,
        description: "What to do if you've been scammed",
      },
      {
        id: 10,
        title: "Legal Remedies & Reporting",
        duration: "4 mins",
        type: "video",
        completed: false,
        description: "Legal options and reporting procedures",
      },
      {
        id: 11,
        title: "Knowledge Check: Financial Security",
        duration: "10 mins",
        type: "quiz",
        completed: false,
        description: "Test your financial fraud prevention knowledge",
      },
      {
        id: 12,
        title: "Final Assessment",
        duration: "20 mins",
        type: "test",
        completed: false,
        description: "Comprehensive financial security assessment",
      },
    ],
    resources: [
      { name: "Financial Fraud Prevention Guide", type: "PDF", size: "4.2 MB" },
      { name: "UPI Safety Checklist", type: "PDF", size: "1.7 MB" },
      { name: "Investment Scam Red Flags", type: "PDF", size: "2.8 MB" },
      { name: "Recovery Action Plan", type: "PDF", size: "2.1 MB" },
    ],
  },
}

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const module = moduleData[params.moduleId as keyof typeof moduleData]

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Module Not Found</h1>
          <Link href="/learn">
            <Button className="btn-primary">Back to Learning</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "quiz":
        return <Brain className="h-4 w-4" />
      case "test":
        return <Award className="h-4 w-4" />
      case "interactive":
        return <Target className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30"
      case "quiz":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "test":
        return "bg-red-600/20 text-red-400 border-red-500/30"
      case "interactive":
        return "bg-purple-600/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600/20 text-green-400 border-green-500/30"
      case "Intermediate":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
      case "Advanced":
        return "bg-red-600/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 py-8 px-4 border-b border-gray-700">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/learn"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className={`${getDifficultyColor(module.difficulty)} mb-4 border`}>{module.difficulty}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">{module.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{module.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{module.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{module.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{module.rating} rating</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/learn/${params.moduleId}/lesson/1`}>
                  <Button size="lg" className="btn-primary">
                    <Play className="h-5 w-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 bg-transparent"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Resources
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-100">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{module.progress}%</div>
                    <Progress value={module.progress} className="h-3 mb-4 bg-gray-700" />
                    <p className="text-sm text-gray-400">
                      {module.progress === 0
                        ? "Ready to start"
                        : `${Math.floor(module.progress / 12.5)} of ${module.lessons} lessons completed`}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-semibold mb-3 text-gray-100">Instructor</h4>
                    <div className="flex items-center space-x-3">
                      <img
                        src={module.instructor.avatar || "/placeholder.svg"}
                        alt={module.instructor.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                      />
                      <div>
                        <div className="font-medium text-gray-100">{module.instructor.name}</div>
                        <div className="text-sm text-gray-400">{module.instructor.title}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="discussion"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Discussion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-100">What You'll Learn</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-gray-300">
                          Identify different types of cyber threats targeting Indian users
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-gray-300">Analyze suspicious communications and digital content</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-gray-300">Implement best practices for digital security</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-gray-300">Know how and where to report security incidents</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                        <span className="text-gray-300">Protect yourself and others from cyber attacks</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-100">Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">
                        This course is designed for all skill levels. Basic computer and internet usage knowledge is
                        helpful but not required. All concepts will be explained with practical Indian examples.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-100">Course Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Play className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300">HD Video Lessons</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Brain className="h-5 w-5 text-green-400" />
                        <span className="text-sm text-gray-300">Interactive Quizzes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-purple-400" />
                        <span className="text-sm text-gray-300">Downloadable Resources</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-yellow-400" />
                        <span className="text-sm text-gray-300">Certificate of Completion</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-5 w-5 text-red-400" />
                        <span className="text-sm text-gray-300">Discussion Forum</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-100">Course Curriculum</CardTitle>
                  <CardDescription className="text-gray-400">
                    {module.lessons} lessons • {module.duration} total duration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {module.curriculum.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center space-x-4 p-4 rounded-lg border border-gray-700 hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-500 flex items-center justify-center text-sm font-medium text-gray-400">
                            {index + 1}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-medium text-gray-100">{lesson.title}</h3>
                          <Badge className={`${getTypeColor(lesson.type)} border`}>
                            <span className="flex items-center space-x-1">
                              {getTypeIcon(lesson.type)}
                              <span className="capitalize">{lesson.type}</span>
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{lesson.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </span>
                        </div>
                      </div>

                      <Link href={`/learn/${params.moduleId}/lesson/${lesson.id}`}>
                        <Button
                          variant={lesson.completed ? "outline" : "default"}
                          size="sm"
                          disabled={index > 0 && !module.curriculum[index - 1].completed}
                          className={
                            lesson.completed
                              ? "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400"
                              : "btn-primary"
                          }
                        >
                          {lesson.completed
                            ? "Review"
                            : index === 0 || module.curriculum[index - 1].completed
                              ? "Start"
                              : "Locked"}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-100">Downloadable Resources</CardTitle>
                  <CardDescription className="text-gray-400">
                    Additional materials to support your learning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {module.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-700 hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Download className="h-5 w-5 text-blue-400" />
                        <div>
                          <h3 className="font-medium text-gray-100">{resource.name}</h3>
                          <p className="text-sm text-gray-400">
                            {resource.type} • {resource.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 bg-transparent"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="mt-8">
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-100">Discussion Forum</CardTitle>
                  <CardDescription className="text-gray-400">
                    Connect with other learners and ask questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-100 mb-2">Start a Discussion</h3>
                    <p className="text-gray-400 mb-4">
                      Be the first to ask a question or share your thoughts about this module
                    </p>
                    <Button className="btn-primary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      New Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
