"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ArrowLeft, Phone, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react"
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
    question: "You receive a call from someone claiming to be your bank, asking for your OTP. What should you do?",
    options: [
      "Share the OTP since they know your details",
      "Refuse and hang up immediately",
      "Ask for their employee ID",
      "Call them back later"
    ],
    correctAnswer: 1,
    explanation: "Never share OTPs over the phone. Banks never ask for OTPs. Hang up immediately and report the call."
  },
  {
    id: 2,
    question: "Which of the following is a sign of a phone scam?",
    options: [
      "Caller threatens to block your account if you don't act fast",
      "Caller speaks politely and gives you time to decide",
      "Caller is from your local branch",
      "Caller asks you to visit the branch in person"
    ],
    correctAnswer: 0,
    explanation: "Scammers often use threats and urgency to pressure you into sharing sensitive information."
  },
  {
    id: 3,
    question: "A caller claims to be from your mobile provider and asks for your OTP to 'verify your identity.' What should you do?",
    options: [
      "Share the OTP to avoid service disruption",
      "Ignore and disconnect the call",
      "Ask for a callback number",
      "Forward the OTP to your provider"
    ],
    correctAnswer: 1,
    explanation: "Legitimate companies never ask for OTPs over the phone. Ignore and disconnect such calls."
  },
  {
    id: 4,
    question: "You get a call saying you've won a lottery, but you must share an OTP to claim the prize. What is the best response?",
    options: [
      "Share the OTP to claim your prize",
      "Ask for written confirmation",
      "Refuse and report the call as a scam",
      "Negotiate for a bigger prize"
    ],
    correctAnswer: 2,
    explanation: "This is a classic scam. Never share OTPs for prizes. Report such calls."
  },
  {
    id: 5,
    question: "What is the safest way to verify a caller's identity?",
    options: [
      "Ask for their employee ID and trust their answer",
      "Call the official customer care number yourself",
      "Ask them to send a WhatsApp message",
      "Check their number on Truecaller only"
    ],
    correctAnswer: 1,
    explanation: "Always call back using the official customer care number from the company's website."
  },
  {
    id: 6,
    question: "Which of the following should you do if you suspect a phone scam?",
    options: [
      "Share minimal information to test them",
      "Hang up and report the number to authorities",
      "Keep talking to gather more info",
      "Save the number as 'Scam' in your contacts"
    ],
    correctAnswer: 1,
    explanation: "Hang up and report the number to your bank or cybercrime authorities."
  }
]

export default function OtpPhoneScamQuizPage() {
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
              <div className="w-20 h-20 bg-orange-900/30 rounded-full flex items-center justify-center">
                <Trophy className="h-10 w-10 text-orange-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-orange-200 mb-4" style={{textShadow:'0 0 8px #ffb347'}}>Quiz Complete!</h1>
            <p className="text-lg text-gray-300">Here's how you performed on the OTP & Phone Scam Quiz</p>
          </div>

          <Card className="mb-8 bg-gray-900/80 border border-orange-900/40">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-orange-400" style={{textShadow:'0 0 6px #ffb347'}}>{score}%</CardTitle>
              <CardDescription className="text-gray-300">Your Score</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                {score >= 90 ? (
                  <Badge className="bg-green-900/30 text-green-300 px-4 py-2 border border-green-400/30">
                    <Trophy className="mr-2 h-4 w-4" />
                    Excellent! You're a Scam Call Guardian
                  </Badge>
                ) : score >= 70 ? (
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
                <Button onClick={resetQuiz} variant="outline" className="bg-transparent border-orange-700 text-orange-300">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Link href="/quiz">
                  <Button className="bg-orange-600 hover:bg-orange-400 text-white font-bold">Try Another Quiz</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-orange-200 mb-4" style={{textShadow:'0 0 6px #ffb347'}}>Review Your Answers</h2>
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
                      <CardTitle className="text-lg text-orange-100">Question {index + 1}</CardTitle>
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
                    <div className="bg-orange-900/30 border border-orange-400/30 rounded-lg p-3">
                      <p className="text-orange-200 text-sm">
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
        <Link href="/quiz" className="inline-flex items-center text-orange-400 hover:text-orange-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-orange-900/30 rounded-full flex items-center justify-center">
              <Phone className="h-8 w-8 text-orange-400" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-200 mb-2" style={{textShadow:'0 0 6px #ffb347'}}>OTP & Phone Scam Quiz</h1>
          <p className="text-gray-300">Learn to identify fraudulent calls and OTP requests</p>
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
        <Card className="mb-8 bg-gray-900/80 border border-orange-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-orange-100">{quizQuestions[currentQuestion].question}</CardTitle>
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
                        : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-orange-900/20"
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
              <div className="mt-4 bg-orange-900/30 border border-orange-400/30 rounded-lg p-3">
                <p className="text-orange-200 text-sm">
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
                className="bg-transparent border-orange-700 text-orange-300"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-orange-600 hover:bg-orange-400 text-white font-bold"
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
