"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import Link from "next/link"
import { ArrowLeft, Mail, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react"
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
    question: "What is phishing?",
    options: [
      "A method of catching fish using the internet",
      "A cyber attack that tricks users into revealing sensitive information",
      "A way to speed up your computer",
      "A type of computer virus"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cyber attack where attackers impersonate legitimate entities to trick users into revealing sensitive information like passwords or credit card numbers."
  },
  {
    id: 2,
    question: "Which of the following is a common sign of a phishing email?",
    options: [
      "The email comes from your own domain",
      "The email contains poor grammar and spelling mistakes",
      "The email is sent from your boss",
      "The email has no links or attachments"
    ],
    correctAnswer: 1,
    explanation: "Phishing emails often contain poor grammar and spelling mistakes, which can be a sign that the message is not legitimate."
  },
  {
    id: 3,
    question: "What should you do if you receive a suspicious email asking for your password?",
    options: [
      "Reply with your password to be helpful",
      "Click any links to see where they go",
      "Ignore the email or report it to your IT department",
      "Forward it to your friends"
    ],
    correctAnswer: 2,
    explanation: "You should ignore suspicious emails or report them to your IT department. Never provide your password or click on suspicious links."
  },
  {
    id: 4,
    question: "Which URL is most likely a phishing attempt?",
    options: [
      "https://www.yourbank.com",
      "https://secure.yourbank.com",
      "https://yourbank.secure-login.com",
      "https://login.yourbank.com"
    ],
    correctAnswer: 2,
    explanation: "Phishing URLs often use subdomains or similar-looking domains to trick users. 'yourbank.secure-login.com' is not the official bank domain."
  },
  {
    id: 5,
    question: "What is the best way to verify the legitimacy of a suspicious email?",
    options: [
      "Call the sender using a phone number from the official website",
      "Reply to the email and ask if it's real",
      "Click the link to check the website",
      "Forward it to everyone in your company"
    ],
    correctAnswer: 0,
    explanation: "Always verify suspicious emails by contacting the sender using contact information from the official website, not from the email itself."
  },
  {
    id: 6,
    question: "Which of the following is NOT a recommended way to protect yourself from phishing?",
    options: [
      "Enable multi-factor authentication",
      "Keep your software updated",
      "Share your passwords with coworkers",
      "Be cautious with email attachments"
    ],
    correctAnswer: 2,
    explanation: "You should never share your passwords with anyone. The other options are good security practices."
  },
  {
    id: 7,
    question: "What is 'spear phishing'?",
    options: [
      "A phishing attack targeting a specific individual or organization",
      "A phishing attack using fake websites",
      "A phishing attack that uses malware",
      "A phishing attack sent to random people"
    ],
    correctAnswer: 0,
    explanation: "Spear phishing targets specific individuals or organizations, often using personalized information to appear more convincing."
  },
  {
    id: 8,
    question: "Why should you hover over links in emails before clicking them?",
    options: [
      "To see if the link is too long",
      "To check if the link leads to a legitimate website",
      "To make the link change color",
      "To copy the link"
    ],
    correctAnswer: 1,
    explanation: "Hovering over links lets you preview the actual URL, helping you spot suspicious or fake websites."
  }
]

export default function PhishingQuizPage() {
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

  // Only keep the correct resetQuiz and if (showResults) block (already present below)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  // Remove duplicate and incomplete resetQuiz and misplaced code
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  // Remove duplicate if (showResults) block below
  // (No replacement needed; just remove the duplicate and incomplete code block)

  // Add handleNext and handlePrevious functions
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
        <Link href="/quiz" className="inline-flex items-center text-cyan-400 hover:text-cyan-200 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quizzes
        </Link>

        {/* Learning Section */}
        <section className="mb-10">
          <div className="bg-cyan-950/80 border border-cyan-800/40 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-200 mb-2" style={{textShadow:'0 0 6px #00fff7'}}>Phishing Attacks</h2>
            <p className="text-cyan-100 mb-4">Learn to identify and protect yourself from fake emails, messages, and websites designed to steal your information</p>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">What is Phishing?</h3>
            <p className="text-gray-200 mb-4">Phishing is a cyber attack where criminals pretend to be trustworthy organizations to steal your personal information like passwords, credit card numbers, or bank details.</p>
            <div className="mb-4">
              <span className="block text-yellow-300 font-semibold">Remember:</span>
              <span className="block text-gray-200">Legitimate banks, government agencies, and companies will never ask for sensitive information via email, SMS, or phone calls.</span>
            </div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">Common Phishing Examples</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-900/60 rounded-lg p-4 border border-cyan-900/30">
                <span className="block text-cyan-400 font-bold mb-1">Email</span>
                <span className="block text-gray-100">Fake Bank Email</span>
                <span className="block text-gray-300 text-sm">Urgent account verification required</span>
                <span className="block text-red-400 text-xs mt-2">Warning: Banks never ask for passwords via email</span>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-4 border border-cyan-900/30">
                <span className="block text-cyan-400 font-bold mb-1">SMS</span>
                <span className="block text-gray-100">Prize Winner Message</span>
                <span className="block text-gray-300 text-sm">Congratulations! You've won ₹50,000. Click link to claim.</span>
                <span className="block text-red-400 text-xs mt-2">Warning: Legitimate contests don't ask for personal details via SMS</span>
              </div>
              <div className="bg-gray-900/60 rounded-lg p-4 border border-cyan-900/30">
                <span className="block text-cyan-400 font-bold mb-1">Website</span>
                <span className="block text-gray-100">Fake Government Portal</span>
                <span className="block text-gray-300 text-sm">Update your Aadhaar details immediately</span>
                <span className="block text-red-400 text-xs mt-2">Warning: Always verify URLs - look for https:// and official domains</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">How to Protect Yourself</h3>
            <ul className="list-disc list-inside text-gray-200 mb-4 space-y-1">
              <li><span className="text-cyan-200 font-semibold">Check the Sender:</span> Verify email addresses and phone numbers. Banks use official domains.</li>
              <li><span className="text-cyan-200 font-semibold">Don't Click Suspicious Links:</span> Hover over links to see the actual URL before clicking.</li>
              <li><span className="text-cyan-200 font-semibold">Never Share Personal Info:</span> Legitimate organizations won't ask for passwords or OTPs via email/SMS.</li>
              <li><span className="text-cyan-200 font-semibold">Use Official Channels:</span> Always log in through official websites or apps, not through email links.</li>
            </ul>
            <h3 className="text-xl font-semibold text-cyan-300 mb-2">If You Think You've Been Phished</h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-1">
              <li>Don't panic. Change your passwords immediately for affected accounts.</li>
              <li>Contact your bank if financial information was shared.</li>
              <li>Report the incident to <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline text-cyan-400">cybercrime.gov.in</a> or call <span className="font-bold">1930</span>.</li>
              <li>Monitor your accounts for any suspicious activity.</li>
            </ol>
          </div>
        </section>

        {/* Cyber Crime Victim Info Box */}
        <section className="mb-10">
          <div className="bg-[#101928] border border-cyan-800/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-3">
              <span className="mr-2 text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white" style={{textShadow:'0 0 6px #00fff7'}}>If You're a Victim of Cyber Crime</h2>
            </div>
            <p className="text-gray-200 mb-6">Don't be embarrassed or scared to report cyber crimes. <span className="text-cyan-300 font-semibold">Quick action can help prevent further damage.</span></p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/95 rounded-lg p-5 flex flex-col justify-between shadow border-2 border-cyan-700/20">
                <span className="block text-lg font-bold text-black mb-1">National Cyber Crime Helpline</span>
                <span className="block text-3xl font-extrabold text-black mb-1">1930</span>
                <span className="block text-black text-sm">24/7 helpline for reporting cyber crimes</span>
              </div>
              <div className="bg-white/95 rounded-lg p-5 flex flex-col justify-between shadow border-2 border-cyan-700/20">
                <span className="block text-lg font-bold text-black mb-1">Online Reporting</span>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="block text-2xl font-extrabold text-black underline mb-1">cybercrime.gov.in</a>
                <span className="block text-black text-sm">File complaints online with evidence</span>
              </div>
            </div>
          </div>
        </section>

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
        <Card className="mb-8 bg-gray-900/80 border border-cyan-900/40">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-cyan-100">{quizQuestions[currentQuestion].question}</CardTitle>
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
                      : "bg-gray-800 border-gray-700 text-gray-200 hover:bg-cyan-900/20"
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
              <div className="mt-4 bg-cyan-900/30 border border-cyan-400/30 rounded-lg p-3">
                <p className="text-cyan-200 text-sm">
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
                className="bg-transparent border-cyan-700 text-cyan-300"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-cyan-600 hover:bg-cyan-400 text-white font-bold"
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
