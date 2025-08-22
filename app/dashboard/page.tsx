"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Target,
  BookOpen,
  Brain,
  Shield,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  BarChart3,
  Activity,
  Medal,
  Flame,
  Download,
} from "lucide-react"

interface UserProgress {
  totalScore: number
  level: number
  experiencePoints: number
  nextLevelXP: number
  currentStreak: number
  longestStreak: number
  joinDate: string
  lastActive: string
}

interface ModuleProgress {
  id: string
  title: string
  category: string
  progress: number
  completed: boolean
  score?: number
  timeSpent: string
  lastAccessed: string
}

interface QuizResult {
  id: string
  title: string
  score: number
  maxScore: number
  percentage: number
  completedAt: string
  attempts: number
  badge?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  unlockedAt?: string
  progress: number
  maxProgress: number
  category: string
  points: number
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

export default function DashboardPage() {
  const [userProgress] = useState<UserProgress>({
    totalScore: 2450,
    level: 8,
    experiencePoints: 2450,
    nextLevelXP: 3000,
    currentStreak: 12,
    longestStreak: 28,
    joinDate: "2024-01-01",
    lastActive: "2024-01-15",
  })

  const [moduleProgress] = useState<ModuleProgress[]>([
    {
      id: "phishing-mastery",
      title: "Phishing Detection Mastery",
      category: "Email Security",
      progress: 100,
      completed: true,
      score: 92,
      timeSpent: "2h 15m",
      lastAccessed: "2024-01-14",
    },
    {
      id: "mobile-security",
      title: "Mobile Security Fundamentals",
      category: "Mobile Security",
      progress: 100,
      completed: true,
      score: 88,
      timeSpent: "1h 45m",
      lastAccessed: "2024-01-12",
    },
    {
      id: "financial-fraud",
      title: "Financial Fraud Prevention",
      category: "Financial Security",
      progress: 75,
      completed: false,
      timeSpent: "2h 30m",
      lastAccessed: "2024-01-15",
    },
    {
      id: "social-engineering",
      title: "Social Engineering Defense",
      category: "Psychology",
      progress: 40,
      completed: false,
      timeSpent: "1h 10m",
      lastAccessed: "2024-01-13",
    },
  ])

  const [quizResults] = useState<QuizResult[]>([
    {
      id: "phishing-basics",
      title: "Phishing Detection Quiz",
      score: 92,
      maxScore: 100,
      percentage: 92,
      completedAt: "2024-01-14",
      attempts: 1,
      badge: "Email Expert",
    },
    {
      id: "mobile-security",
      title: "Mobile Security Quiz",
      score: 88,
      maxScore: 100,
      percentage: 88,
      completedAt: "2024-01-12",
      attempts: 2,
      badge: "Mobile Guardian",
    },
    {
      id: "payment-security",
      title: "UPI & Payment Security Quiz",
      score: 85,
      maxScore: 100,
      percentage: 85,
      completedAt: "2024-01-10",
      attempts: 1,
      badge: "Payment Pro",
    },
  ])

  const [achievements] = useState<Achievement[]>([
    {
      id: "first-steps",
      name: "First Steps",
      description: "Complete your first quiz",
      icon: Target,
      unlockedAt: "2024-01-10",
      progress: 1,
      maxProgress: 1,
      category: "Getting Started",
      points: 50,
      rarity: "Common",
    },
    {
      id: "scam-spotter",
      name: "Scam Spotter",
      description: "Score 80% or higher on any quiz",
      icon: Brain,
      unlockedAt: "2024-01-10",
      progress: 3,
      maxProgress: 1,
      category: "Quiz Master",
      points: 100,
      rarity: "Rare",
    },
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: Flame,
      unlockedAt: "2024-01-12",
      progress: 12,
      maxProgress: 7,
      category: "Consistency",
      points: 200,
      rarity: "Epic",
    },
    {
      id: "module-master",
      name: "Module Master",
      description: "Complete 3 study modules",
      icon: BookOpen,
      progress: 2,
      maxProgress: 3,
      category: "Learning",
      points: 300,
      rarity: "Epic",
    },
    {
      id: "cyber-expert",
      name: "Cyber Expert",
      description: "Reach level 10",
      icon: Shield,
      progress: 8,
      maxProgress: 10,
      category: "Mastery",
      points: 500,
      rarity: "Legendary",
    },
  ])

  const completedModules = moduleProgress.filter((m) => m.completed).length
  const totalModules = moduleProgress.length
  const averageQuizScore = Math.round(quizResults.reduce((sum, quiz) => sum + quiz.percentage, 0) / quizResults.length)
  const unlockedAchievements = achievements.filter((a) => a.unlockedAt).length
  const totalAchievements = achievements.length

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-100 text-gray-800"
      case "Rare":
        return "bg-blue-100 text-blue-800"
      case "Epic":
        return "bg-purple-100 text-purple-800"
      case "Legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const progressToNextLevel = ((userProgress.experiencePoints % 1000) / 1000) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">Your Dashboard</span>
              </h1>
              <p className="text-xl text-muted-foreground">Track your cyber security learning journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">Level {userProgress.level}</div>
              <div className="text-sm text-muted-foreground">Cyber Security Learner</div>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="glass-effect border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {userProgress.level}
                  </div>
                  <div>
                    <div className="font-bold text-lg">Level {userProgress.level}</div>
                    <div className="text-sm text-muted-foreground">
                      {userProgress.experiencePoints} / {userProgress.nextLevelXP} XP
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary">{userProgress.currentStreak}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Flame className="h-4 w-4 mr-1 text-orange-500" />
                    Day Streak
                  </div>
                </div>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
              <div className="text-sm text-muted-foreground mt-2">
                {userProgress.nextLevelXP - userProgress.experiencePoints} XP to next level
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <Card className="card-modern text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {completedModules}/{totalModules}
              </div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </CardContent>
          </Card>

          <Card className="card-modern text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">{averageQuizScore}%</div>
              <div className="text-sm text-muted-foreground">Avg Quiz Score</div>
            </CardContent>
          </Card>

          <Card className="card-modern text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">
                {unlockedAchievements}/{totalAchievements}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>

          <Card className="card-modern text-center hover-lift">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-orange-500 mb-1">{userProgress.longestStreak}</div>
              <div className="text-sm text-muted-foreground">Longest Streak</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Completed Phishing Detection Quiz</div>
                        <div className="text-xs text-muted-foreground">Scored 92% • 2 days ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Started Financial Fraud Module</div>
                        <div className="text-xs text-muted-foreground">75% complete • 1 day ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Earned Streak Master Badge</div>
                        <div className="text-xs text-muted-foreground">12-day learning streak • 3 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Goals */}
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Learning Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Complete 3 Study Modules</span>
                        <span className="font-semibold text-primary">2/3</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Maintain 30-day Streak</span>
                        <span className="font-semibold text-primary">12/30</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Score 90%+ on All Quizzes</span>
                        <span className="font-semibold text-primary">1/4</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Reach Level 10</span>
                        <span className="font-semibold text-primary">8/10</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <Card className="glass-effect border-2 border-secondary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Continue Your Learning Journey</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="btn-primary h-auto p-4 flex flex-col items-center space-y-2">
                      <BookOpen className="h-6 w-6" />
                      <span>Continue Module</span>
                      <span className="text-xs opacity-80">Financial Fraud Prevention</span>
                    </Button>
                    <Button className="btn-secondary h-auto p-4 flex flex-col items-center space-y-2">
                      <Brain className="h-6 w-6" />
                      <span>Take Quiz</span>
                      <span className="text-xs opacity-80">Test your knowledge</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover-lift bg-transparent"
                    >
                      <Star className="h-6 w-6" />
                      <span>Read Articles</span>
                      <span className="text-xs opacity-80">Latest security tips</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules">
            <div className="space-y-6">
              {moduleProgress.map((module, index) => (
                <Card
                  key={module.id}
                  className="card-modern hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.category}</p>
                      </div>
                      <div className="text-right">
                        {module.completed ? (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-semibold text-primary">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{module.timeSpent}</span>
                        </div>
                        {module.score && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{module.score}%</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Last: {new Date(module.lastAccessed).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        {module.completed ? "Review" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quizzes">
            <div className="space-y-6">
              {quizResults.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  className="card-modern hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{quiz.title}</h3>
                        <div className="flex items-center space-x-2">
                          {quiz.badge && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Trophy className="h-3 w-3 mr-1" />
                              {quiz.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{quiz.percentage}%</div>
                        <div className="text-sm text-muted-foreground">
                          {quiz.score}/{quiz.maxScore} points
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>
                            {quiz.attempts} attempt{quiz.attempts > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover-lift bg-transparent">
                        Retake Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                const isUnlocked = !!achievement.unlockedAt
                return (
                  <Card
                    key={achievement.id}
                    className={`card-modern hover-lift animate-fade-in ${isUnlocked ? "border-yellow-200 bg-yellow-50/30" : "opacity-75"}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${isUnlocked ? "bg-yellow-100" : "bg-gray-100"}`}
                        >
                          <Icon className={`h-8 w-8 ${isUnlocked ? "text-yellow-600" : "text-gray-400"}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-bold text-lg">{achievement.name}</h3>
                            <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                            {isUnlocked && <Badge className="bg-green-100 text-green-800">Unlocked</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress
                            value={(achievement.progress / achievement.maxProgress) * 100}
                            className="h-2 mb-2"
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">+{achievement.points} XP</span>
                            {isUnlocked && (
                              <span className="text-xs text-green-600">
                                Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Learning Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Total Study Time</span>
                        <span className="font-semibold">8h 40m</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Session</span>
                        <span className="font-semibold">25 minutes</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Days Active</span>
                        <span className="font-semibold">15 days</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Knowledge Retention</span>
                        <span className="font-semibold text-green-600">87%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-modern">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">Improving</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your quiz scores have improved by 15% over the last month. Keep up the great work!
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-blue-800">Consistent</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        You've maintained a learning streak for 12 days. Try to reach 30 days for the next achievement!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Certificate Section */}
            <div className="mt-8">
              <Card className="glass-effect border-2 border-accent/20">
                <CardContent className="p-8 text-center">
                  <Medal className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Earn Your Certificate</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Complete all study modules and maintain a 90% average quiz score to earn your CyberShield India
                    Cyber Security Awareness Certificate.
                  </p>
                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Certificate Progress</div>
                    <Progress value={75} className="h-3 max-w-md mx-auto" />
                    <div className="text-sm text-muted-foreground mt-2">75% Complete</div>
                  </div>
                  <Button className="btn-primary" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Certificate Available Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <FooterSection />
    </div>
  )
}
