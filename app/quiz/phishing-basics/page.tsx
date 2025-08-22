"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react"
import Link from "next/link"

const quizQuestions = [
  {
    id: 1,
    question:
      "You receive an email from 'support@sbi-bank.com' asking you to verify your account details. What should you do?",
    options: [
      "Click the link and enter your details immediately",
      "Check if the email address is from the official SBI domain",
      "Call the bank using the official number to verify",
      "Ignore the email completely",
    ],
    correctAnswer: 2,
    explanation:
      "Always verify suspicious emails by calling the bank directly using their official number. Legitimate banks use official domains and won't ask for sensitive details via email.",
  },
  {
    id: 2,
    question: "Which of these email addresses is most likely to be legitimate for HDFC Bank?",
    options: ["noreply@hdfcbank.com", "support@hdfc-bank.co.in", "alerts@hdfcbank.net", "security@hdfc.bank.com"],
    correctAnswer: 0,
    explanation:
      "Official bank emails typically come from their main domain. HDFC Bank's official domain is hdfcbank.com. Be wary of variations with extra words or different extensions.",
  },
  {
    id: 3,
    question:
      "You get an SMS saying 'Congratulations! You've won ₹50,000 in KBC lottery. Click here to claim.' What's the red flag?",
    options: [
      "The amount is too small",
      "You never participated in any lottery",
      "SMS should come from official KBC number",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "All these are red flags! Legitimate lotteries require participation, use official communication channels, and don't ask for personal details via SMS links.",
  },
  {
    id: 4,
    question: "A website URL shows 'https://www.amazon.co.in.secure-login.com'. Is this legitimate?",
    options: [
      "Yes, it has HTTPS so it's secure",
      "Yes, it mentions amazon.co.in",
      "No, the actual domain is 'secure-login.com'",
      "Maybe, need to check further",
    ],
    correctAnswer: 2,
    explanation:
      "The real domain here is 'secure-login.com', not Amazon. Scammers often use legitimate company names as subdomains to trick users. Always check what comes after the last dot.",
  },
  {
    id: 5,
    question: "What's the safest way to access your bank account online?",
    options: [
      "Click links in bank emails",
      "Google search and click first result",
      "Type the bank's official URL directly",
      "Use bookmarks you've saved",
    ],
    correctAnswer: 3,
    explanation:
      "Using saved bookmarks is safest as you've verified the URL before. Typing directly is also good, but bookmarks prevent typos that could lead to fake sites.",
  },
  {
    id: 6,
    question:
      "You receive a call claiming to be from your bank asking for your debit card CVV for 'verification'. What should you do?",
    options: [
      "Provide the CVV since they called you",
      "Ask for their employee ID first",
      "Hang up and call the bank directly",
      "Give partial information to test them",
    ],
    correctAnswer: 2,
    explanation:
      "Banks never ask for CVV, PIN, or passwords over phone calls. Always hang up and call the bank using their official number to verify any requests.",
  },
  {
    id: 7,
    question: "Which of these is a common sign of a phishing email?",
    options: [
      "Urgent language like 'Act now or account will be closed'",
      "Generic greetings like 'Dear Customer'",
      "Spelling and grammar mistakes",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "Phishing emails often use urgency to pressure quick action, generic greetings because they don't have your real name, and contain errors because they're hastily created.",
  },
  {
    id: 8,
    question: "What should you do if you accidentally clicked a suspicious link?",
    options: [
      "Nothing, just close the browser",
      "Change passwords for important accounts",
      "Run antivirus scan on your device",
      "Both B and C",
    ],
    correctAnswer: 3,
    explanation:
      "If you clicked a suspicious link, immediately change passwords for important accounts and run a security scan. The link might have installed malware or compromised your information.",
  },
]

export default function PhishingQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quizQuestions.length) * 100)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setQuizCompleted(false)
  }

  const score = calculateScore()
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-cyan-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
            <p className="text-lg text-gray-600">Here's how you performed on the Phishing Detection Quiz</p>
          </div>

          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-cyan-600">{score}%</CardTitle>
              <CardDescription>Your Score</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                {score >= 90 ? (
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    <Trophy className="mr-2 h-4 w-4" />
                    Excellent! You're a Phishing Expert
                  </Badge>
                ) : score >= 70 ? (
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Good Job! You're getting there
                  </Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Keep Learning! Try again
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-6">
                You answered{" "}
                {selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length} out of{" "}
                {quizQuestions.length} questions correctly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline" className="bg-transparent">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Link href="/quiz">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Try Another Quiz</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Answers</h2>
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer
              return (
                <Card
                  key={question.id}
                  className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <CardDescription>{question.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-50 border border-green-200"
                              : optionIndex === userAnswer && !isCorrect
                                ? "bg-red-50 border border-red-200"
                                : "bg-gray-50"
                          }`}
                        >
                          <span className="text-sm">
                            {optionIndex === question.correctAnswer && "✓ "}
                            {optionIndex === userAnswer && optionIndex !== question.correctAnswer && "✗ "}
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-800 text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link href="/quiz" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Phishing Detection Quiz</h1>
          <p className="text-gray-600">Test your ability to spot fake emails and websites</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{quizQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                      : "border-gray-200 hover:border-cyan-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-transparent"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </main>
    </div>
  )
}
