"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  Lock,
  Star,
  Trophy,
  Shield,
  Smartphone,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

interface StudyModule {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  isCompleted: boolean
  isLocked: boolean
  lessons: number
  icon: any
  category: string
  rating: number
  enrolledUsers: number
}

export default function StudyModulesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const studyModules: StudyModule[] = [
    {
      id: "phishing-mastery",
      title: "Phishing Detection Mastery",
      description: "Learn to identify and avoid phishing attacks through email, SMS, and websites.",
      duration: "2 hours",
      difficulty: "Beginner",
      progress: 75,
      isCompleted: false,
      isLocked: false,
      lessons: 8,
      icon: Mail,
      category: "Email Security",
      rating: 4.8,
      enrolledUsers: 12500,
    },
    {
      id: "mobile-security",
      title: "Mobile Security Fundamentals",
      description: "Protect your smartphone from malware, fake apps, and mobile-specific threats.",
      duration: "1.5 hours",
      difficulty: "Beginner",
      progress: 100,
      isCompleted: true,
      isLocked: false,
      lessons: 6,
      icon: Smartphone,
      category: "Mobile Security",
      rating: 4.9,
      enrolledUsers: 8900,
    },
    {
      id: "financial-fraud",
      title: "Financial Fraud Prevention",
      description: "Understand UPI scams, fake payment requests, and banking security best practices.",
      duration: "3 hours",
      difficulty: "Intermediate",
      progress: 30,
      isCompleted: false,
      isLocked: false,
      lessons: 12,
      icon: CreditCard,
      category: "Financial Security",
      rating: 4.7,
      enrolledUsers: 15200,
    },
    {
      id: "social-engineering",
      title: "Social Engineering Defense",
      description: "Recognize manipulation tactics used by cybercriminals to steal information.",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      lessons: 10,
      icon: Users,
      category: "Psychology",
      rating: 4.6,
      enrolledUsers: 6700,
    },
    {
      id: "otp-scams",
      title: "OTP & Call Scam Prevention",
      description: "Learn about fake OTP calls, vishing attacks, and phone-based fraud prevention.",
      duration: "1 hour",
      difficulty: "Beginner",
      progress: 0,
      isCompleted: false,
      isLocked: false,
      lessons: 5,
      icon: Phone,
      category: "Phone Security",
      rating: 4.5,
      enrolledUsers: 9800,
    },
    {
      id: "advanced-threats",
      title: "Advanced Cyber Threats",
      description: "Deep dive into ransomware, advanced persistent threats, and enterprise security.",
      duration: "4 hours",
      difficulty: "Advanced",
      progress: 0,
      isCompleted: false,
      isLocked: true,
      lessons: 15,
      icon: Shield,
      category: "Advanced Security",
      rating: 4.9,
      enrolledUsers: 3200,
    },
  ]

  const categories = [
    "all",
    "Email Security",
    "Mobile Security",
    "Financial Security",
    "Psychology",
    "Phone Security",
    "Advanced Security",
  ]

  const filteredModules =
    selectedCategory === "all" ? studyModules : studyModules.filter((module) => module.category === selectedCategory)

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

  return ( 
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 glass-effect px-6 py-3 rounded-full">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Structured Learning Path</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Study Modules</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Master cyber security through our comprehensive, interactive study modules. Each module includes lessons,
            quizzes, and practical exercises.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Active Modules</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">56</div>
            <div className="text-sm text-muted-foreground">Total Lessons</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="card-modern p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.7</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center animate-fade-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`capitalize ${selectedCategory === category ? "btn-primary" : "hover-lift"}`}
            >
              {category === "all" ? "All Modules" : category}
            </Button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module, index) => {
            const Icon = module.icon
            return (
              <div
                key={module.id}
                className={`card-modern p-6 hover-lift animate-fade-in ${module.isLocked ? "opacity-60" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${module.isCompleted ? "bg-green-100" : "bg-primary/10"}`}>
                      {module.isCompleted ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : module.isLocked ? (
                        <Lock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    </div>
                  </div>

                  {module.isCompleted && <Trophy className="h-6 w-6 text-yellow-500" />}
                </div>

                {/* Module Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">{module.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{module.description}</p>

                {/* Module Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{module.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{module.rating}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {!module.isLocked && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                )}

                {/* Action Button */}
                <Link href={module.isLocked ? "#" : `/study/${module.id}`}>
                  <Button
                    className={`w-full ${module.isLocked ? "opacity-50 cursor-not-allowed" : module.isCompleted ? "btn-secondary" : "btn-primary"}`}
                    disabled={module.isLocked}
                  >
                    {module.isLocked ? (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    ) : module.isCompleted ? (
                      <>
                        <Trophy className="h-4 w-4 mr-2" />
                        Review Module
                      </>
                    ) : module.progress > 0 ? (
                      "Continue Learning"
                    ) : (
                      "Start Module"
                    )}
                  </Button>
                </Link>

                {/* Enrollment Count */}
                <div className="text-center mt-3 text-xs text-muted-foreground">
                  {module.enrolledUsers.toLocaleString()} students enrolled
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievement Section */}
        <div className="mt-16 text-center animate-fade-in">
          <h2 className="text-3xl font-bold mb-8">Your Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-modern p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold text-lg mb-2">Cyber Security Novice</h3>
              <p className="text-muted-foreground text-sm">Complete your first module</p>
            </div>
            <div className="card-modern p-6 opacity-60">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2">Security Guardian</h3>
              <p className="text-muted-foreground text-sm">Complete 3 modules</p>
            </div>
            <div className="card-modern p-6 opacity-60">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Cyber Expert</h3>
              <p className="text-muted-foreground text-sm">Complete all modules</p>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
      </div>
    </ProtectedRoute>
  )
}
