"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Trophy,
  Target,
  Clock,
  Mail,
  Phone,
  CreditCard,
  UserX,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Medal,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

const quizzes = [
  {
    id: "phishing-basics",
    title: "Phishing Detection Quiz",
    description: "Test your ability to spot fake emails, messages, and websites",
    icon: Mail,
    difficulty: "Beginner",
    questions: 8,
    timeEstimate: "5 min",
    color: "text-red-600",
    bgColor: "bg-red-50",
    badge: "Email Expert",
    maxScore: 100,
    passingScore: 70,
    attempts: 1250,
    averageScore: 85,
    completionRate: 92,
  },
  {
    id: "otp-scams",
    title: "OTP & Phone Scam Quiz",
    description: "Learn to identify fraudulent calls and OTP requests",
    icon: Phone,
    difficulty: "Beginner",
    questions: 6,
    timeEstimate: "4 min",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    badge: "Call Guardian",
    maxScore: 100,
    passingScore: 70,
    attempts: 980,
    averageScore: 78,
    completionRate: 88,
  },
  {
    id: "payment-security",
    title: "UPI & Payment Security Quiz",
    description: "Master safe digital payment practices and spot payment frauds",
    icon: CreditCard,
    difficulty: "Intermediate",
    questions: 10,
    timeEstimate: "7 min",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    badge: "Payment Pro",
    maxScore: 100,
    passingScore: 75,
    attempts: 750,
    averageScore: 82,
    completionRate: 85,
  },
  {
    id: "identity-protection",
    title: "Identity Theft Prevention",
    description: "Protect your personal information from identity thieves",
    icon: UserX,
    difficulty: "Advanced",
    questions: 12,
    timeEstimate: "8 min",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    badge: "Privacy Guardian",
    maxScore: 100,
    passingScore: 80,
    attempts: 420,
    averageScore: 76,
    completionRate: 79,
  },
]

const achievements = [
  {
    name: "First Steps",
    description: "Complete your first quiz",
    icon: Target,
    progress: 100,
    unlocked: true,
    points: 50,
  },
  {
    name: "Scam Spotter",
    description: "Score 80% or higher on any quiz",
    icon: Brain,
    progress: 75,
    unlocked: true,
    points: 100,
  },
  {
    name: "Cyber Smart",
    description: "Complete all beginner quizzes",
    icon: Trophy,
    progress: 50,
    unlocked: false,
    points: 200,
  },
  {
    name: "Security Expert",
    description: "Complete all quizzes with 90%+ scores",
    icon: Medal,
    progress: 25,
    unlocked: false,
    points: 500,
  },
]

const leaderboard = [
  { rank: 1, name: "Priya S.", score: 2450, badges: 8, avatar: "PS" },
  { rank: 2, name: "Rahul K.", score: 2380, badges: 7, avatar: "RK" },
  { rank: 3, name: "Anita M.", score: 2290, badges: 6, avatar: "AM" },
  { rank: 4, name: "Vikram T.", score: 2150, badges: 6, avatar: "VT" },
  { rank: 5, name: "Sneha R.", score: 2080, badges: 5, avatar: "SR" },
]

export default function QuizPage() {
  const [userStats, setUserStats] = useState({
    totalScore: 1850,
    quizzesCompleted: 3,
    averageScore: 87,
    rank: 12,
    badges: 4,
  })

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 glass-effect px-6 py-3 rounded-full">
              <Brain className="h-5 w-5 text-cyan-600 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-600">Interactive Quiz System</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Test Your Knowledge</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take interactive quizzes to test your ability to spot scams and protect yourself from cyber threats
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{userStats.totalScore}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.quizzesCompleted}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
            <div className="card-modern p-4 text-center">
              <div className="text-2xl font-bold text-green-600">#{userStats.rank}</div>
              <div className="text-sm text-gray-600">Rank</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="quizzes" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="achievements">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Quizzes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {quizzes.map((quiz, index) => {
                  const Icon = quiz.icon
                  return (
                    <Card
                      key={quiz.id}
                      className="card-modern hover-lift animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-14 h-14 ${quiz.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`h-7 w-7 ${quiz.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-xl font-bold">{quiz.title}</CardTitle>
                              <Badge
                                className={
                                  quiz.difficulty === "Beginner"
                                    ? "bg-green-100 text-green-800"
                                    : quiz.difficulty === "Intermediate"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {quiz.difficulty}
                              </Badge>
                            </div>
                            <CardDescription className="text-sm leading-relaxed">{quiz.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-gray-600" />
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span>{quiz.timeEstimate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-gray-600" />
                            <span>{quiz.attempts} attempts</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-gray-600" />
                            <span>{quiz.averageScore}% avg</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Completion Rate</span>
                            <span className="font-semibold text-cyan-600">{quiz.completionRate}%</span>
                          </div>
                          <Progress value={quiz.completionRate} className="h-2" />
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center space-x-2">
                            <Trophy className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-semibold text-gray-900">Earn Badge: {quiz.badge}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Passing Score: {quiz.passingScore}% • Max Score: {quiz.maxScore} points
                          </div>
                        </div>

                        <Link href={`/quiz/${quiz.id}`}>
                          <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white group">
                            Start Quiz
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="achievements">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Achievements & Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={index}
                      className={`card-modern hover-lift animate-fade-in ${achievement.unlocked ? "border-yellow-200 bg-yellow-50/50" : "opacity-75"}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${achievement.unlocked ? "bg-yellow-100" : "bg-gray-100"}`}
                          >
                            <Icon className={`h-8 w-8 ${achievement.unlocked ? "text-yellow-600" : "text-gray-400"}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <CardTitle className="text-lg font-bold">{achievement.name}</CardTitle>
                              {achievement.unlocked && (
                                <Badge className="bg-yellow-100 text-yellow-800">Unlocked</Badge>
                              )}
                            </div>
                            <CardDescription className="text-sm leading-relaxed">
                              {achievement.description}
                            </CardDescription>
                            <div className="text-xs text-gray-600 mt-2">+{achievement.points} points</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold text-cyan-600">{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="leaderboard">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Performers</h2>
              <div className="max-w-2xl mx-auto">
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle className="text-center">Global Leaderboard</CardTitle>
                    <CardDescription className="text-center">Top cyber security quiz champions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((user, index) => (
                        <div
                          key={user.rank}
                          className={`flex items-center space-x-4 p-4 rounded-lg ${user.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200" : "bg-gray-50"}`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${user.rank === 1 ? "bg-yellow-500" : user.rank === 2 ? "bg-gray-400" : user.rank === 3 ? "bg-orange-500" : "bg-cyan-600"}`}
                          >
                            {user.rank <= 3 ? <Medal className="h-5 w-5" /> : user.rank}
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.badges} badges earned</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-cyan-600">{user.score}</div>
                            <div className="text-xs text-gray-600">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="progress">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle>Quiz Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quizzes.slice(0, 3).map((quiz) => (
                        <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <quiz.icon className={`h-5 w-5 ${quiz.color}`} />
                            <div>
                              <div className="font-semibold text-sm">{quiz.title}</div>
                              <div className="text-xs text-gray-600">Last attempt: 92%</div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-modern">
                  <CardHeader>
                    <CardTitle>Learning Path</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">75%</div>
                        <div className="text-sm text-gray-600">Overall Progress</div>
                        <Progress value={75} className="mt-2" />
                      </div>
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span>Beginner Level</span>
                          <span className="text-green-600 font-semibold">Complete</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Intermediate Level</span>
                          <span className="text-yellow-600 font-semibold">In Progress</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Advanced Level</span>
                          <span className="text-gray-400">Locked</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <Card className="glass-effect border-2 border-cyan-200 max-w-3xl mx-auto animate-fade-in">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Level Up?</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Based on your progress, we recommend starting with the Payment Security Quiz to earn your next badge!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quiz/payment-security">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg px-8 py-3">
                    <Star className="h-5 w-5 mr-2" />
                    Recommended Quiz
                  </Button>
                </Link>
                <Link href="/study">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-3">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Study Modules
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
