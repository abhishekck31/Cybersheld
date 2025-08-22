"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, CheckCircle, Clock, BookOpen, Award, ChevronRight, Star, Download } from "lucide-react"

interface Lesson {
  id: string
  title: string
  duration: string
  isCompleted: boolean
  isLocked: boolean
  type: "video" | "reading" | "interactive" | "quiz"
}

export default function ModulePage() {
  const params = useParams()
  const moduleId = params.moduleId as string

  const [currentLesson, setCurrentLesson] = useState(0)
  const [moduleProgress, setModuleProgress] = useState(75)

  // Mock data - in real app, this would come from API
  const moduleData = {
    "phishing-mastery": {
      title: "Phishing Detection Mastery",
      description:
        "Master the art of identifying and avoiding phishing attacks through comprehensive lessons and practical exercises.",
      duration: "2 hours",
      difficulty: "Beginner",
      rating: 4.8,
      enrolledUsers: 12500,
      instructor: "Dr. Priya Sharma",
      lessons: [
        {
          id: "1",
          title: "Introduction to Phishing",
          duration: "15 min",
          isCompleted: true,
          isLocked: false,
          type: "video" as const,
        },
        {
          id: "2",
          title: "Types of Phishing Attacks",
          duration: "20 min",
          isCompleted: true,
          isLocked: false,
          type: "reading" as const,
        },
        {
          id: "3",
          title: "Email Phishing Identification",
          duration: "25 min",
          isCompleted: true,
          isLocked: false,
          type: "interactive" as const,
        },
        {
          id: "4",
          title: "SMS Phishing (Smishing)",
          duration: "18 min",
          isCompleted: true,
          isLocked: false,
          type: "video" as const,
        },
        {
          id: "5",
          title: "Website Phishing Detection",
          duration: "22 min",
          isCompleted: true,
          isLocked: false,
          type: "interactive" as const,
        },
        {
          id: "6",
          title: "Social Media Phishing",
          duration: "16 min",
          isCompleted: true,
          isLocked: false,
          type: "reading" as const,
        },
        {
          id: "7",
          title: "Practical Exercise: Spot the Phish",
          duration: "30 min",
          isCompleted: false,
          isLocked: false,
          type: "quiz" as const,
        },
        {
          id: "8",
          title: "Final Assessment",
          duration: "20 min",
          isCompleted: false,
          isLocked: false,
          type: "quiz" as const,
        },
      ],
    },
  }

  const module = moduleData[moduleId as keyof typeof moduleData]

  if (!module) {
    return <div>Module not found</div>
  }

  const completedLessons = module.lessons.filter((lesson) => lesson.isCompleted).length
  const totalLessons = module.lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  const getLessonIcon = (type: string, isCompleted: boolean) => {
    if (isCompleted) return <CheckCircle className="h-5 w-5 text-green-600" />

    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-primary" />
      case "reading":
        return <BookOpen className="h-5 w-5 text-primary" />
      case "interactive":
        return <Star className="h-5 w-5 text-secondary" />
      case "quiz":
        return <Award className="h-5 w-5 text-accent" />
      default:
        return <BookOpen className="h-5 w-5 text-primary" />
    }
  }

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/study" className="hover:text-primary transition-colors">
            Study Modules
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{module.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Module Header */}
            <div className="card-modern p-8 mb-8 animate-fade-in">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                  <h1 className="text-4xl font-bold mt-4 mb-4">{module.title}</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">{module.description}</p>
                </div>
              </div>

              {/* Module Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{module.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{totalLessons}</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{module.rating}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{module.enrolledUsers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-semibold text-primary">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="text-sm text-muted-foreground mt-2">
                  {completedLessons} of {totalLessons} lessons completed
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary flex-1">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Continue Learning
                </Button>
                <Button variant="outline" className="hover-lift bg-transparent">
                  <Download className="h-5 w-5 mr-2" />
                  Download Resources
                </Button>
              </div>
            </div>

            {/* Lesson Content Tabs */}
            <Tabs defaultValue="lessons" className="animate-slide-up">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lessons">Lessons</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="mt-6">
                <div className="card-modern p-6">
                  <h3 className="text-xl font-bold mb-6">Course Curriculum</h3>
                  <div className="space-y-4">
                    {module.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                          lesson.isCompleted
                            ? "bg-green-50 border-green-200"
                            : "bg-background border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">{getLessonIcon(lesson.type, lesson.isCompleted)}</div>
                          <div>
                            <h4 className="font-semibold text-foreground">{lesson.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.duration}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {lesson.type}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant={lesson.isCompleted ? "outline" : "default"}
                          size="sm"
                          className={lesson.isCompleted ? "" : "btn-primary"}
                        >
                          {lesson.isCompleted ? "Review" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <div className="card-modern p-6">
                  <h3 className="text-xl font-bold mb-6">Additional Resources</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Phishing Detection Checklist</h4>
                        <p className="text-sm text-muted-foreground">
                          Quick reference guide for identifying phishing attempts
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Real Phishing Examples</h4>
                        <p className="text-sm text-muted-foreground">
                          Collection of actual phishing emails and websites
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6">
                <div className="card-modern p-6">
                  <h3 className="text-xl font-bold mb-6">Discussion Forum</h3>
                  <p className="text-muted-foreground">Connect with other learners and share your experiences.</p>
                  <Button className="btn-primary mt-4">Join Discussion</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Info */}
            <div className="card-modern p-6 animate-fade-in">
              <h3 className="font-bold text-lg mb-4">Your Instructor</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  PS
                </div>
                <div>
                  <div className="font-semibold">{module.instructor}</div>
                  <div className="text-sm text-muted-foreground">Cyber Security Expert</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                15+ years experience in cybersecurity, former CERT-In analyst, and author of multiple security
                publications.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="card-modern p-6 animate-fade-in animation-delay-200">
              <h3 className="font-bold text-lg mb-4">Module Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Score</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>
            </div>

            {/* Related Modules */}
            <div className="card-modern p-6 animate-fade-in animation-delay-400">
              <h3 className="font-bold text-lg mb-4">Related Modules</h3>
              <div className="space-y-3">
                <Link
                  href="/study/mobile-security"
                  className="block p-3 border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-sm">Mobile Security Fundamentals</div>
                  <div className="text-xs text-muted-foreground">1.5 hours • Beginner</div>
                </Link>
                <Link
                  href="/study/financial-fraud"
                  className="block p-3 border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-sm">Financial Fraud Prevention</div>
                  <div className="text-xs text-muted-foreground">3 hours • Intermediate</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}
