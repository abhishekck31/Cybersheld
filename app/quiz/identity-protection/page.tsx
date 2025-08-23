"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react"
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
    question: "What is identity theft?",
    options: [
      "Stealing someone's wallet",
      "Using someone else's personal information without permission",
      "Borrowing a friend's phone",
      "Losing your ID card"
    ],
    correctAnswer: 1,
    explanation: "Identity theft is when someone uses your personal information, like your Aadhaar, PAN, or bank details, without your consent."
  },
  {
    id: 2,
    question: "Which of the following is a common method used by identity thieves?",
    options: [
      "Phishing emails",
      "Dumpster diving for documents",
      "Social engineering calls",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Identity thieves use many methods, including phishing, social engineering, and searching trash for sensitive documents."
  },
  {
    id: 3,
    question: "What should you do if you lose your PAN or Aadhaar card?",
    options: [
      "Ignore it",
      "Report it to the authorities and block/reissue the card",
      "Post about it on social media",
      "Wait for someone to return it"
    ],
    correctAnswer: 1,
    explanation: "Report lost identity documents to the authorities and request a block or reissue to prevent misuse."
  },
  {
    id: 4,
    question: "Which password is the most secure?",
    options: [
      "password123",
      "Your birthdate",
      "A random mix of letters, numbers, and symbols",
      "Your pet's name"
    ],
    correctAnswer: 2,
    explanation: "Strong passwords use a random mix of characters and are not based on personal information."
  },
  {
    id: 5,
    question: "How can you protect your identity online?",
    options: [
      "Share your personal details on social media",
      "Use public Wi-Fi for banking",
      "Enable two-factor authentication and limit sharing personal info",
      "Use the same password everywhere"
    ],
    correctAnswer: 2,
    explanation: "Enable two-factor authentication and avoid oversharing personal information online."
  },
  {
    id: 6,
    question: "You receive a call asking for your OTP to verify your account. What should you do?",
    options: [
      "Share the OTP to help them",
      "Refuse and hang up immediately",
      "Ask for their name and share the OTP",
      "Call them back later"
    ],
    correctAnswer: 1,
    explanation: "Never share OTPs with anyone. Hang up immediately if asked."
  },
  {
    id: 7,
    question: "Which of the following is NOT a safe practice?",
    options: [
      "Shredding sensitive documents",
      "Using strong, unique passwords",
      "Sharing your Aadhaar number on public forums",
      "Checking your credit report regularly"
    ],
    correctAnswer: 2,
    explanation: "Never share your Aadhaar or other sensitive details on public forums."
  },
  {
    id: 8,
    question: "What is the best way to dispose of old bank statements?",
    options: [
      "Throw them in the trash",
      "Shred them before disposal",
      "Give them to a friend",
      "Keep them forever"
    ],
    correctAnswer: 1,
    explanation: "Shred old bank statements to prevent identity theft."
  },
  {
    id: 9,
    question: "If you suspect your identity has been stolen, what should you do first?",
    options: [
      "Ignore it",
      "Report to the police and inform your bank",
      "Post about it on social media",
      "Wait for the thief to contact you"
    ],
    correctAnswer: 1,
    explanation: "Report to the police and inform your bank immediately to limit damage."
  },
  {
    id: 10,
    question: "Which of the following is a sign of identity theft?",
    options: [
      "Unexpected bank transactions",
      "Receiving bills for accounts you didn't open",
      "Getting calls from debt collectors for unknown debts",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "All these are signs your identity may have been stolen."
  }
]

export default function IdentityProtectionQuizPage() {
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
              <div className="w-20 h-20 bg-purple-900/30 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-purple-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-purple-200 mb-4" style={{textShadow:'0 0 8px #a78bfa'}}>Quiz Complete!</h1>
            <p className="text-lg text-gray-300">Here's how you performed on the Identity Theft Prevention Quiz</p>
          </div>

          <Card className="mb-8 bg-gray-900/80 border border-purple-900/40">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple-400" style={{textShadow:'0 0 6px #a78bfa'}}>{score}%</CardTitle>
              <CardDescription className="text-gray-300">Your Score</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                {score >= 90 ? (
                  <Badge className="bg-green-900/30 text-green-300 px-4 py-2 border border-green-400/30">
                    <Trophy className="mr-2 h-4 w-4" />
                    Excellent! You're an Identity Guardian
                  </Badge>
                ) : score >= 75 ? (
                  <Badge className="bg-purple-900/30 text-purple-300 px-4 py-2 border border-purple-400/30">
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
                <Button onClick={resetQuiz} variant="outline" className="bg-transparent border-purple-700 text-purple-300">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Link href="/quiz">
                  <Button className="bg-purple-600 hover:bg-purple-400 text-white font-bold">Try Another Quiz</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-200 mb-4" style={{textShadow:'0 0 6px #a78bfa'}}>Review Your Answers</h2>
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
                      <CardTitle className="text-lg text-purple-100">Question {index + 1}</CardTitle>
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
                    <div className="bg-purple-900/30 border border-purple-400/30 rounded-lg p-3">
                      <p className="text-purple-200 text-sm">
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

  function handleFinish() {
  // Allow finishing even if the last question has no selected answer (treat as incorrect)
  setShowResults(true)
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
        <Link href="/quiz" className="inline-flex items-center text-purple-400 hover:text-purple-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-200 mb-2" style={{textShadow:'0 0 6px #a78bfa'}}>Identity Theft Prevention Quiz</h1>
          <p className="text-gray-300">Test your knowledge on protecting your identity and personal data</p>
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
        <Card className="mb-8 bg-gray-900/80 border border-purple-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-100">{quizQuestions[currentQuestion].question}</CardTitle>
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
                        : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-purple-900/20"
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
              <div className="mt-4 bg-purple-900/30 border border-purple-400/30 rounded-lg p-3">
                <p className="text-purple-200 text-sm">
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
                className="bg-transparent border-purple-700 text-purple-300"
              >
                Previous
              </Button>
              <Button
                onClick={currentQuestion === quizQuestions.length - 1 ? handleFinish : handleNext}
                disabled={currentQuestion === quizQuestions.length - 1 ? false : selectedAnswers[currentQuestion] === undefined}
                className="bg-purple-600 hover:bg-purple-400 text-white font-bold"
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
