"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, Play, Pause, RotateCcw, Award, BookOpen } from "lucide-react"
import Link from "next/link"

const lessonData = {
  "1": {
    title: "Introduction to Phishing",
    type: "video",
    duration: "8 mins",
    content: {
      videoUrl: "/placeholder.svg?height=400&width=600&text=Phishing+Introduction+Video",
      transcript: `Welcome to our comprehensive course on phishing attack fundamentals, specifically designed for Indian users.

In this lesson, we'll explore what phishing is and why it has become one of the most dangerous cyber threats facing individuals and organizations in India today.

Phishing is a type of social engineering attack where cybercriminals impersonate legitimate organizations to steal sensitive information such as usernames, passwords, credit card details, UPI PINs, and other personal data.

The term "phishing" comes from the analogy of fishing - attackers cast out bait (fake emails, messages, or websites) hoping that victims will "bite" and provide their personal information.

In India, phishing attacks have increased by 400% in the last two years, with attackers specifically targeting:
- Banking customers of major Indian banks like SBI, HDFC, ICICI
- UPI users across platforms like PhonePe, Google Pay, Paytm
- Government service users (Aadhaar, PAN, Income Tax portals)
- E-commerce customers of Flipkart, Amazon India, etc.

Key characteristics of phishing attacks targeting Indians:
1. Deceptive communication that appears to come from trusted Indian brands
2. Urgent language about account suspension or KYC compliance
3. Requests for sensitive information like Aadhaar numbers, UPI PINs
4. Links to fake websites that mimic legitimate Indian services
5. Attachments that may contain malware designed for Indian systems

Why is phishing so effective in India?
- It exploits cultural trust in authority figures and institutions
- Many users are new to digital services and lack cybersecurity awareness
- Attackers use local languages and cultural references
- The rapid digitization has created security gaps

Common Indian phishing scenarios:
- Fake messages claiming your Aadhaar is suspended
- Fraudulent UPI transaction alerts asking for PIN verification
- Fake income tax refund notifications
- Bogus KYC update requests from banks
- Fraudulent COVID-19 vaccination certificate updates

Real-world Indian Examples:
1. SBI Phishing: "Your SBI account will be blocked due to KYC non-compliance. Update immediately: [malicious link]"
2. UPI Scam: "Your UPI transaction of ₹5,000 failed. Re-enter PIN to complete: [fake link]"
3. Aadhaar Fraud: "UIDAI Alert: Your Aadhaar is suspended. Verify details: [phishing site]"
4. Income Tax Scam: "You have a pending refund of ₹15,000. Claim now: [fraudulent portal]"

Protection Strategies:
- Always verify communications through official channels
- Never click links in suspicious messages
- Check sender email addresses carefully
- Look for spelling and grammar mistakes
- Be wary of urgent language and threats
- Use official mobile apps instead of web links
- Enable two-factor authentication on all accounts

In the next lessons, we'll dive deeper into the different types of phishing attacks specifically targeting Indian users and learn how to identify and protect ourselves from these threats.`,
      keyPoints: [
        "Phishing attacks in India have increased by 400% targeting banks, UPI, and government services",
        "Attackers exploit cultural trust in authority and use local languages and references",
        "Common targets include SBI, HDFC, PhonePe, Aadhaar, and Income Tax portals",
        "Always verify suspicious communications through official channels before taking action",
        "Enable two-factor authentication and use official mobile apps for better security",
      ],
    },
    quiz: [
      {
        question: "What is the primary goal of phishing attacks targeting Indian users?",
        options: [
          "To damage computer systems permanently",
          "To steal sensitive information like UPI PINs and Aadhaar numbers",
          "To slow down internet connections",
          "To install legitimate antivirus software",
        ],
        correct: 1,
        explanation:
          "Phishing attacks targeting Indians primarily aim to steal sensitive information like UPI PINs, Aadhaar numbers, banking credentials, and other personal data by impersonating trusted Indian organizations.",
      },
      {
        question: "Which of these is a common phishing scenario in India?",
        options: [
          "Fake messages about Aadhaar suspension requiring immediate verification",
          "Legitimate bank notifications sent through official channels",
          "Genuine UPI transaction alerts from your bank",
          "Real government communications through proper portals",
        ],
        correct: 0,
        explanation:
          "Fake messages claiming Aadhaar suspension are a very common phishing tactic in India, designed to create panic and trick users into providing personal information on fraudulent websites.",
      },
      {
        question: "Why are phishing attacks particularly effective in India?",
        options: [
          "Indians don't use the internet frequently",
          "Cultural trust in authority and rapid digitization create vulnerabilities",
          "Indian websites are inherently not secure",
          "Indians prefer phone calls over digital communication",
        ],
        correct: 1,
        explanation:
          "Phishing attacks are effective in India due to cultural trust in authority figures, rapid digitization creating security gaps, and many users being new to digital services with limited cybersecurity awareness.",
      },
    ],
  },
  "2": {
    title: "Mobile Device Security Fundamentals",
    type: "interactive",
    duration: "10 mins",
    content: {
      videoUrl: "/placeholder.svg?height=400&width=600&text=Mobile+Security+Interactive",
      transcript: `Mobile devices have become the primary gateway to digital services in India, with over 750 million smartphone users. This makes mobile security crucial for protecting your personal and financial information.

Understanding Mobile Threats in India:

1. MALICIOUS APPS
India sees over 2 million malicious app downloads monthly. These apps often:
- Mimic popular Indian apps like PhonePe, Paytm, or BHIM
- Request excessive permissions during installation
- Steal personal data, contacts, and SMS messages
- Capture UPI PINs and banking credentials

Common Malicious App Types:
- Fake UPI apps that steal transaction details
- Fraudulent loan apps that access contacts and photos
- Bogus government service apps claiming Aadhaar updates
- Counterfeit e-commerce apps mimicking Flipkart or Amazon

2. APP PERMISSIONS MANAGEMENT
Understanding what permissions apps request is crucial:

Critical Permissions to Monitor:
- SMS Access: Can read OTPs and banking messages
- Contact Access: Can steal your entire contact list
- Camera/Microphone: Can spy on you without consent
- Location: Can track your movements continuously
- Storage: Can access all files and photos
- Phone: Can make calls and access call logs

Best Practices for App Permissions:
- Only grant permissions that are necessary for app functionality
- Review permissions regularly in your phone settings
- Revoke permissions for apps you no longer use
- Be suspicious of apps requesting excessive permissions

3. UPI AND MOBILE BANKING SECURITY
With UPI transactions exceeding 8 billion monthly in India, securing mobile payments is critical:

UPI Security Best Practices:
- Use only official UPI apps from Google Play Store or App Store
- Never share your UPI PIN with anyone, including bank staff
- Set up transaction limits for added security
- Enable biometric authentication for UPI apps
- Regularly check transaction history for unauthorized payments
- Use different PINs for different UPI apps

Mobile Banking Security:
- Always use official banking apps, never web browsers on mobile
- Enable app lock with PIN, pattern, or biometric authentication
- Log out completely after each banking session
- Never save banking passwords in your browser or apps
- Use secure networks, avoid public Wi-Fi for banking

4. DEVICE SECURITY SETTINGS
Securing your device is the first line of defense:

Essential Security Settings:
- Screen Lock: Use PIN, pattern, password, or biometric locks
- Auto-lock: Set device to lock automatically after 1-2 minutes
- App Lock: Use additional locks for sensitive apps
- Find My Device: Enable location tracking for theft recovery
- Remote Wipe: Enable ability to erase data if device is stolen

Advanced Security Features:
- Secure Folder: Create encrypted space for sensitive apps and files
- App Verification: Enable Google Play Protect or similar services
- Unknown Sources: Disable installation from unknown sources
- Developer Options: Keep disabled unless specifically needed

5. PUBLIC WI-FI SAFETY
Public Wi-Fi networks in India often lack proper security:

Risks of Public Wi-Fi:
- Man-in-the-middle attacks intercepting your data
- Fake hotspots designed to steal information
- Unencrypted networks exposing your communications
- Malware distribution through compromised networks

Safe Public Wi-Fi Practices:
- Avoid accessing sensitive accounts on public Wi-Fi
- Use VPN services for encrypted connections
- Turn off auto-connect to Wi-Fi networks
- Verify network names with venue staff before connecting
- Use mobile data for banking and sensitive activities

6. SOFTWARE UPDATES AND SECURITY PATCHES
Keeping your device updated is crucial for security:

Why Updates Matter:
- Security patches fix known vulnerabilities
- Updated apps have better security features
- Operating system updates include security improvements
- Outdated software is easier for attackers to exploit

Update Best Practices:
- Enable automatic updates for operating system
- Regularly update all installed apps
- Remove apps you no longer use
- Only download apps from official app stores
- Check app reviews and ratings before installation

7. BACKUP AND RECOVERY
Protecting your data through regular backups:

What to Backup:
- Contacts and phone numbers
- Important photos and documents
- App data and settings
- SMS messages and call logs

Backup Methods:
- Cloud backup services (Google Drive, iCloud)
- Local backups to computer
- External storage devices
- Multiple backup locations for critical data

Real-world Indian Mobile Security Scenarios:

Scenario 1: Fake Loan App
You receive an SMS about instant loan approval. The app requests access to contacts, SMS, camera, and location. This is likely a malicious app designed to steal personal information and harass your contacts.

Scenario 2: Public Wi-Fi Banking
You're at a café and need to check your bank balance. The free Wi-Fi seems convenient, but using it for banking could expose your credentials to attackers monitoring the network.

Scenario 3: UPI PIN Sharing
Someone calls claiming to be from your bank and asks for your UPI PIN to "verify your account." This is a vishing attack - legitimate banks never ask for PINs over phone calls.

Remember: Your mobile device contains more personal information than your wallet. Treat its security with the same importance you would give to protecting your physical valuables.`,
      keyPoints: [
        "India has over 750 million smartphone users, making mobile security critical for digital safety",
        "Malicious apps often mimic popular Indian services like PhonePe, Paytm, and government portals",
        "Manage app permissions carefully - only grant access that's necessary for app functionality",
        "Use official UPI apps with biometric authentication and never share your UPI PIN",
        "Avoid public Wi-Fi for banking and sensitive activities - use mobile data instead",
        "Keep your device and apps updated with latest security patches and features",
      ],
    },
    quiz: [
      {
        question:
          "What should you do if an app requests access to SMS, contacts, camera, and location but only provides basic functionality?",
        options: [
          "Grant all permissions as requested",
          "Be suspicious and deny unnecessary permissions",
          "Install the app without checking permissions",
          "Share the app with friends immediately",
        ],
        correct: 1,
        explanation:
          "Be suspicious of apps requesting excessive permissions. Only grant permissions that are necessary for the app's core functionality. Excessive permission requests are often signs of malicious apps.",
      },
      {
        question: "What is the safest way to use UPI for payments in India?",
        options: [
          "Share your UPI PIN with trusted friends",
          "Use official UPI apps with biometric authentication and never share your PIN",
          "Use any UPI app available online",
          "Write down your UPI PIN for easy access",
        ],
        correct: 1,
        explanation:
          "Always use official UPI apps from legitimate app stores, enable biometric authentication, and never share your UPI PIN with anyone - not even bank staff or customer service.",
      },
      {
        question: "Why should you avoid using public Wi-Fi for mobile banking?",
        options: [
          "Public Wi-Fi is always faster than mobile data",
          "Banks don't allow public Wi-Fi usage",
          "Public Wi-Fi networks can be monitored by attackers to steal your credentials",
          "Public Wi-Fi is more expensive than mobile data",
        ],
        correct: 2,
        explanation:
          "Public Wi-Fi networks often lack proper security and can be monitored by attackers through man-in-the-middle attacks, potentially exposing your banking credentials and personal information.",
      },
    ],
  },
  "3": {
    title: "Financial Fraud Prevention in Digital India",
    type: "video",
    duration: "12 mins",
    content: {
      videoUrl: "/placeholder.svg?height=400&width=600&text=Financial+Fraud+Prevention",
      transcript: `Financial fraud has become one of the most serious cyber threats in India, with losses exceeding ₹1,200 crores annually. As digital payments and online banking become mainstream, understanding and preventing financial fraud is crucial for every Indian.

UNDERSTANDING THE FINANCIAL FRAUD LANDSCAPE IN INDIA

Current Statistics:
- Over 95,000 financial fraud cases reported annually
- Average loss per victim: ₹1.2 lakhs
- UPI fraud accounts for 40% of all digital payment frauds
- Credit card fraud increased by 300% in the last two years
- Investment scams targeting middle-class Indians are rising rapidly

Why Indians Are Targeted:
- Rapid adoption of digital payments without adequate security awareness
- Cultural trust in authority figures and institutions
- Limited understanding of digital financial security
- High smartphone penetration with low cybersecurity knowledge
- Attractive targets due to growing disposable income

TYPES OF FINANCIAL FRAUD TARGETING INDIANS

1. UPI AND DIGITAL PAYMENT FRAUD

Common UPI Scam Techniques:
a) Fake QR Code Scams
- Scammers replace legitimate QR codes with malicious ones
- Instead of receiving payment, money gets debited from your account
- Common at small shops, parking lots, and street vendors

b) Transaction Reversal Scams
- Fraudsters claim a transaction failed and ask you to re-enter PIN
- They use social engineering to create urgency
- Often target elderly users who are less tech-savvy

c) UPI Collect Request Fraud
- Scammers send fake payment requests appearing to be from known contacts
- Users accidentally approve thinking they're receiving money
- Often disguised as refunds or bill payments

d) Fake UPI Apps
- Malicious apps mimicking legitimate UPI services
- Steal UPI PINs and banking credentials
- Often distributed through unofficial app stores or links

Prevention Strategies for UPI Fraud:
- Always verify QR codes before scanning
- Double-check transaction details before confirming
- Never share your UPI PIN with anyone
- Use only official UPI apps from legitimate app stores
- Set transaction limits for added security
- Enable transaction notifications and monitor regularly

2. BANKING AND CREDIT CARD FRAUD

Online Banking Fraud Techniques:
a) Phishing Websites
- Fake banking websites that steal login credentials
- Often sent through SMS or email links
- Mimic official bank websites with slight URL differences

b) SIM Swap Fraud
- Fraudsters obtain duplicate SIM cards of victims
- Intercept OTPs and banking SMS messages
- Gain access to bank accounts and credit cards

c) ATM Skimming
- Devices attached to ATMs that steal card information
- Hidden cameras record PIN entries
- Cloned cards used for unauthorized transactions

Credit Card Fraud Methods:
- Card cloning at merchant locations
- Online shopping fraud using stolen card details
- Fake customer service calls requesting card information
- Unauthorized recurring charges on compromised cards

Banking Security Best Practices:
- Use official banking apps instead of web browsers
- Never click links in banking SMS or emails
- Regularly monitor account statements and transaction alerts
- Report suspicious activities immediately to your bank
- Use different passwords for different banking services
- Enable two-factor authentication wherever available

3. INVESTMENT AND PONZI SCHEME FRAUD

Common Investment Scams in India:
a) Cryptocurrency Ponzi Schemes
- Promise unrealistic returns on crypto investments
- Use social media and WhatsApp groups for promotion
- Target young professionals and students

b) Stock Market Manipulation
- Fake stock tips through Telegram and WhatsApp groups
- Pump and dump schemes targeting penny stocks
- Fraudulent trading platforms and apps

c) Fixed Deposit and Chit Fund Scams
- Promise higher returns than banks
- Target middle-class families and senior citizens
- Often operate through local agents and referrals

d) Multi-Level Marketing (MLM) Frauds
- Disguised as legitimate business opportunities
- Focus on recruitment rather than actual products
- Target unemployed youth and housewives

Investment Fraud Red Flags:
- Promises of guaranteed high returns (>15% annually)
- Pressure to invest immediately or "limited time offers"
- Lack of proper documentation or regulatory approvals
- Requests for cash payments or cryptocurrency
- Reluctance to provide clear information about the business model

4. LOAN AND EMI FRAUD

Instant Loan App Scams:
- Fake loan apps that steal personal information
- Charge upfront fees without providing loans
- Access contacts and harass family members
- Often target people with poor credit scores

EMI and Credit Fraud:
- Unauthorized EMI deductions from bank accounts
- Fake loan approval messages with hidden charges
- Identity theft for loan applications
- Fraudulent credit card applications

5. INSURANCE AND POLICY FRAUD

Common Insurance Scams:
- Fake insurance policies with no actual coverage
- Unauthorized premium deductions
- Fraudulent claims processing
- Fake insurance agents collecting premiums

RECOVERY AND REPORTING PROCEDURES

If You've Been Scammed:

Immediate Actions:
1. Contact your bank immediately to freeze accounts
2. File a complaint with local police (cyber crime cell)
3. Report to National Cyber Crime Reporting Portal
4. Contact your mobile service provider if SIM was compromised
5. Change all banking passwords and PINs

Reporting Channels:
- National Cyber Crime Helpline: 1930
- Cyber Crime Reporting Portal: cybercrime.gov.in
- RBI Banking Ombudsman for banking disputes
- SEBI for investment fraud complaints
- Insurance Regulatory Authority for insurance fraud

Documentation Required:
- Screenshots of fraudulent messages or websites
- Bank statements showing unauthorized transactions
- Communication records with fraudsters
- Identity documents and address proof
- FIR copy from local police station

LEGAL REMEDIES AND CONSUMER RIGHTS

Your Rights as a Consumer:
- Right to dispute unauthorized transactions
- Right to compensation for bank negligence
- Right to privacy and data protection
- Right to transparent pricing and terms

Legal Framework:
- Information Technology Act, 2000
- Consumer Protection Act, 2019
- Payment and Settlement Systems Act, 2007
- RBI Guidelines on Digital Payments

Recovery Possibilities:
- Banks liable for unauthorized transactions if reported within 3 days
- Chargeback rights for credit card fraud
- Insurance coverage for certain types of fraud
- Legal action against fraudsters and negligent institutions

BUILDING FINANCIAL SECURITY HABITS

Daily Practices:
- Check bank account balances regularly
- Review credit card statements monthly
- Monitor credit scores quarterly
- Keep software and apps updated
- Use secure networks for financial transactions

Long-term Strategies:
- Diversify investments across multiple platforms
- Maintain emergency funds in traditional savings
- Educate family members about financial fraud
- Stay informed about new fraud techniques
- Build relationships with trusted financial advisors

Remember: In the digital age, your financial security is in your hands. Stay vigilant, stay informed, and always verify before you trust.`,
      keyPoints: [
        "Financial fraud in India exceeds ₹1,200 crores annually with UPI fraud accounting for 40% of cases",
        "Common scams include fake QR codes, transaction reversal fraud, and malicious UPI apps",
        "Always verify QR codes, never share UPI PINs, and use official banking apps only",
        "Investment scams promise unrealistic returns - be wary of guarantees above 15% annually",
        "Report fraud immediately to banks, police, and National Cyber Crime Portal (1930)",
        "Banks are liable for unauthorized transactions if reported within 3 days of occurrence",
      ],
    },
    quiz: [
      {
        question: "What should you do if you suspect a QR code might be fraudulent?",
        options: [
          "Scan it quickly to check",
          "Verify with the merchant and check the payment details before confirming",
          "Ask other customers if they've used it",
          "Use it only for small amounts",
        ],
        correct: 1,
        explanation:
          "Always verify QR codes with the merchant and carefully check payment details before confirming. Fraudulent QR codes can debit money from your account instead of crediting the merchant.",
      },
      {
        question: "What is a major red flag for investment fraud?",
        options: [
          "Detailed documentation provided",
          "Promises of guaranteed returns above 15% annually",
          "Regulatory approvals clearly mentioned",
          "Transparent business model explanation",
        ],
        correct: 1,
        explanation:
          "Promises of guaranteed high returns (especially above 15% annually) are major red flags for investment fraud. Legitimate investments always carry risk and cannot guarantee returns.",
      },
      {
        question: "What should you do immediately if you become a victim of financial fraud?",
        options: [
          "Wait a few days to see if the money returns",
          "Contact bank, file police complaint, and report to National Cyber Crime Portal",
          "Only inform your family members",
          "Try to contact the fraudsters directly",
        ],
        correct: 1,
        explanation:
          "Immediately contact your bank to freeze accounts, file a police complaint, and report to the National Cyber Crime Portal (1930). Quick action increases chances of recovery and prevents further losses.",
      },
    ],
  },
}

export default function LessonPage({ params }: { params: { moduleId: string; lessonId: string } }) {
  const [currentStep, setCurrentStep] = useState(0) // 0: content, 1: quiz, 2: completed
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const lesson = lessonData[params.lessonId as keyof typeof lessonData]

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Lesson Not Found</h1>
          <Link href={`/learn/${params.moduleId}`}>
            <Button className="btn-primary">Back to Module</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const submitQuiz = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    lesson.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        correct++
      }
    })
    return Math.round((correct / lesson.quiz.length) * 100)
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 py-6 px-4 border-b border-gray-700">
        <div className="container mx-auto max-w-4xl">
          <Link
            href={`/learn/${params.moduleId}`}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-100">{lesson.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                <span className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{lesson.type}</span>
                </span>
                <span>{lesson.duration}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-400 mb-2">Lesson Progress</div>
              <div className="w-32">
                <Progress value={(currentStep / 2) * 100} className="h-2 bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {currentStep === 0 && (
            <div className="space-y-8">
              {/* Content Display */}
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative bg-gray-900 rounded-t-lg">
                    <img
                      src={lesson.content.videoUrl || "/placeholder.svg"}
                      alt="Lesson content"
                      className="w-full h-64 md:h-96 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="lg"
                        className="bg-blue-600/80 hover:bg-blue-600 text-white border-blue-500/30"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-100">Lesson Content</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 bg-transparent"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                    </div>
                    <div className="prose max-w-none text-gray-300 leading-relaxed">
                      {lesson.content.transcript.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-100">Key Learning Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lesson.content.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-100">Knowledge Check</CardTitle>
                  <CardDescription className="text-gray-400">
                    Test your understanding of the lesson content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {lesson.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="space-y-4">
                      <h3 className="font-semibold text-lg text-gray-100">
                        Question {qIndex + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:bg-gray-700/30 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              onChange={() => handleQuizAnswer(qIndex, oIndex)}
                              className="text-blue-600"
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                      {showResults && (
                        <div
                          className={`p-4 rounded-lg border ${
                            quizAnswers[qIndex] === question.correct
                              ? "bg-green-600/20 border-green-500/30"
                              : "bg-red-600/20 border-red-500/30"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle
                              className={`h-5 w-5 ${
                                quizAnswers[qIndex] === question.correct ? "text-green-400" : "text-red-400"
                              }`}
                            />
                            <span className="font-medium text-gray-100">
                              {quizAnswers[qIndex] === question.correct ? "Correct!" : "Incorrect"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {!showResults && (
                    <Button
                      onClick={submitQuiz}
                      disabled={quizAnswers.length !== lesson.quiz.length}
                      className="w-full btn-primary"
                    >
                      Submit Quiz
                    </Button>
                  )}

                  {showResults && (
                    <div className="text-center p-6 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                      <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-100 mb-2">Quiz Complete!</h3>
                      <p className="text-lg text-gray-300 mb-4">Your Score: {calculateScore()}%</p>
                      <p className="text-gray-400">
                        {calculateScore() >= 80
                          ? "Excellent work! You've mastered this lesson."
                          : "Good effort! Consider reviewing the lesson content to improve your understanding."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-100 mb-4">Lesson Complete!</h2>
              <p className="text-lg text-gray-400 mb-8">
                Great job completing "{lesson.title}". You're ready for the next lesson.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/learn/${params.moduleId}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 bg-transparent"
                  >
                    Back to Module
                  </Button>
                </Link>
                <Link href={`/learn/${params.moduleId}/lesson/${Number.parseInt(params.lessonId) + 1}`}>
                  <Button size="lg" className="btn-primary">
                    Next Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 2 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button onClick={nextStep} disabled={currentStep === 1 && !showResults} className="btn-primary">
                {currentStep === 0 ? "Take Quiz" : "Complete Lesson"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
