"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, CreditCard, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which is the safest way to access your bank's UPI app?",
    options: [
      "Download from a random website",
      "Download from the official app store",
      "Click a link in an SMS",
      "Use a friend's APK file"
    ],
    correctAnswer: 1,
    explanation: "Always download UPI apps from the official app store to avoid malware and fake apps."
  },
  {
    id: 2,
    question: "You receive a payment request from an unknown number on your UPI app. What should you do?",
    options: [
      "Approve the request to see what happens",
      "Ignore or decline the request",
      "Call the number and ask",
      "Forward the request to your bank"
    ],
    correctAnswer: 1,
    explanation: "Never approve payment requests from unknown sources. Ignore or decline them."
  },
  {
    id: 3,
    question: "Which of the following is a sign of a UPI scam?",
    options: [
      "You are asked to scan a QR code to receive money",
      "You are asked to enter your UPI PIN to get cashback",
      "You get a call asking for your OTP",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All these are common UPI scam tactics. Never share your PIN/OTP or scan unknown QR codes."
  },
  {
    id: 4,
    question: "What should you do if you suspect a fraudulent transaction on your UPI app?",
    options: [
      "Ignore it",
      "Report it to your bank and block your account immediately",
      "Wait for the bank to call you",
      "Share your PIN to reverse the transaction"
    ],
    correctAnswer: 1,
    explanation: "Report and block your account immediately to prevent further loss."
  },
  {
    id: 5,
    question: "Which is a good practice for UPI PIN security?",
    options: [
      "Share your PIN with family",
      "Write your PIN on your phone",
      "Change your PIN regularly and keep it secret",
      "Use your birthdate as PIN"
    ],
    correctAnswer: 2,
    explanation: "Change your PIN regularly and never share it with anyone."
  },
  {
    id: 6,
    question: "A merchant asks you to scan a QR code to receive a refund. What should you do?",
    options: [
      "Scan the code and enter your PIN",
      "Refuse and ask for a bank transfer instead",
      "Share your UPI ID only",
      "Give your phone to the merchant"
    ],
    correctAnswer: 1,
    explanation: "Never scan QR codes from unknown sources. Ask for a direct bank transfer."
  },
  {
    id: 7,
    question: "What is the best way to check if a UPI app is genuine?",
    options: [
      "Check reviews and download count on the app store",
      "Download from a forwarded link",
      "Ask a friend",
      "Use any app with 'UPI' in the name"
    ],
    correctAnswer: 0,
    explanation: "Check reviews and download only from the official app store."
  },
  {
    id: 8,
    question: "If you accidentally shared your UPI PIN, what should you do immediately?",
    options: [
      "Wait and see if anything happens",
      "Change your PIN and inform your bank",
      "Delete the app",
      "Ignore it"
    ],
    correctAnswer: 1,
    explanation: "Change your PIN immediately and inform your bank to secure your account."
  },
  {
    id: 9,
    question: "Which of the following is NOT safe for UPI transactions?",
    options: [
      "Using public Wi-Fi",
      "Using your own mobile data",
      "Using a secure home Wi-Fi",
      "Using a VPN"
    ],
    correctAnswer: 0,
    explanation: "Avoid using public Wi-Fi for financial transactions."
  },
  {
    id: 10,
    question: "What should you do if you receive a suspicious SMS about your UPI account?",
    options: [
      "Click the link in the SMS",
      "Ignore or report the SMS",
      "Reply to the SMS",
      "Share the SMS with friends"
    ],
    correctAnswer: 1,
    explanation: "Ignore or report suspicious SMS messages. Never click on links or reply."
  }
]

export default function PaymentSecurityQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const calculateScore = () => {
    let correct = 0
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / quizQuestions.length) * 100)
  }

  const score = calculateScore()

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Navigation />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-blue-200 mb-4" style={{textShadow:'0 0 8px #38bdf8'}}>Quiz Complete!</h1>
            <p className="text-lg text-gray-300">Here's how you performed on the UPI & Payment Security Quiz</p>
          </div>

          <Card className="mb-8 bg-gray-900/80 border border-blue-900/40">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-400" style={{textShadow:'0 0 6px #38bdf8'}}>{score}%</CardTitle>
              <CardDescription className="text-gray-300">Your Score</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                {score >= 90 ? (
                  <Badge className="bg-green-900/30 text-green-300 px-4 py-2 border border-green-400/30">
                    <Trophy className="mr-2 h-4 w-4" />
                    Excellent! You're a Payment Pro
                  </Badge>
                ) : score >= 75 ? (
                  <Badge className="bg-blue-900/30 text-blue-300 px-4 py-2 border border-blue-400/30">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Good Job! You're getting there
                  </Badge>
                ) : (
                  <Badge className="bg-orange-900/30 text-orange-300 px-4 py-2 border border-orange-400/30">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Keep Learning! Try again
                  </Badge>
                )}
              </div>
              <p className="text-gray-300 mb-6">
                You answered{' '}
                {selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswer).length} out of{' '}
                {quizQuestions.length} questions correctly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline" className="bg-transparent border-blue-700 text-blue-300">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Link href="/quiz">
                  <Button className="bg-blue-600 hover:bg-blue-400 text-white font-bold">Try Another Quiz</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-200 mb-4" style={{textShadow:'0 0 6px #38bdf8'}}>Review Your Answers</h2>
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === question.correctAnswer
              return (
                <Card
                  key={question.id}
                  className={`border-l-4 ${isCorrect ? "border-l-green-400" : "border-l-red-400"} bg-gray-900/80`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-blue-100">Question {index + 1}</CardTitle>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-400" />
                      )}
                    </div>
                    <CardDescription className="text-gray-300">{question.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-900/30 border border-green-400/30 text-green-200"
                              : optionIndex === userAnswer && !isCorrect
                                ? "bg-red-900/30 border border-red-400/30 text-red-200"
                                : "bg-gray-800 text-gray-200"
                          }`}
                        >
                          <span className="text-sm">
                            {optionIndex === question.correctAnswer && "\u2713 "}
                            {optionIndex === userAnswer && optionIndex !== question.correctAnswer && "\u2717 "}
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-900/30 border border-blue-400/30 rounded-lg p-3">
                      <p className="text-blue-200 text-sm">
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

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  function handleAnswerSelect(answerIndex: number) {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  function handleNext() {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Back Button */}
        <Link href="/quiz" className="inline-flex items-center text-blue-400 hover:text-blue-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-200 mb-2" style={{textShadow:'0 0 6px #38bdf8'}}>UPI & Payment Security Quiz</h1>
          <p className="text-gray-300">Master safe digital payment practices and spot payment frauds</p>
        </div>
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        {/* Question */}
        <Card className="mb-8 bg-gray-900/80 border border-blue-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-100">{quizQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left px-4 py-3 rounded border transition-colors
                    ${
                      selectedAnswers[currentQuestion] === index
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? "bg-green-900/30 border-green-400/30 text-green-200"
                          : "bg-red-900/30 border-red-400/30 text-red-200"
                        : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-blue-900/20"
                    }
                  `}
                  disabled={selectedAnswers[currentQuestion] !== undefined}
                >
                  {option}
                </button>
              ))}
            </div>
            {/* Show explanation if answered */}
            {selectedAnswers[currentQuestion] !== undefined && (
              <div className="mt-4 bg-blue-900/30 border border-blue-400/30 rounded-lg p-3">
                <p className="text-blue-200 text-sm">
                  <strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
                </p>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="bg-transparent border-blue-700 text-blue-300"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-blue-600 hover:bg-blue-400 text-white font-bold"
              >
                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
