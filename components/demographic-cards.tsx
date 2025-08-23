import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Home, Tractor, Users, User2Icon } from "lucide-react"
import Link from "next/link"

const demographics = [
  {
    id: "student",
    title: "Students",
    description: "Learn about online safety, social media scams, and academic fraud protection",
    icon: GraduationCap,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    id: "professional",
    title: "Professionals",
    description: "Protect sensitive work data, avoid business email scams, and secure digital transactions",
    icon: Briefcase,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    id: "homemaker",
    title: "Homemakers",
    description: "Stay safe from online shopping scams, fake offers, and family-targeted frauds",
    icon: Home,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    id: "farmer",
    title: "Farmers",
    description: "Guard against agricultural equipment fraud, loan scams, and rural cyber threats",
    icon: Tractor,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    id: "senior",
    title: "Seniors",
    description: "Avoid phishing, pension fraud, and scams targeting the elderly",
    icon: Users,
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
  },
  {
    id: "general",
    title: "General Public",
    description: "Get tips for safe browsing, secure payments, and protecting personal information",
    icon: User2Icon,
    color: "text-gray-400",
    bgColor: "bg-gray-500/20",
  },
]
// ...existing code...

export default function DemographicCards() {
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {demographics.map((demo) => {
        const Icon = demo.icon
        return (
          <Card
            key={demo.id}
            className="bg-gray-900/60 border border-gray-700/50 rounded-2xl shadow-md hover:shadow-blue-600/10 transition-all duration-300 hover:scale-105 group card-glow flex flex-col h-full min-h-[260px]"
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-gray-700/40" style={{ background: demo.bgColor }}>
                <Icon className={`h-6 w-6 ${demo.color}`} />
              </div>
              <CardTitle className="text-xl font-bold text-gray-100 mb-1">{demo.title}</CardTitle>
              <CardDescription className="text-gray-400 text-base mb-2">{demo.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1" />
            <CardFooter className="mt-auto px-6 pb-6">
              <Link href={"/learn?demo=" + demo.id} className="w-full block">
                  <Button className="w-full border-2 border-blue-500 text-blue-400 bg-transparent hover:bg-blue-900/20 hover:text-blue-300 transition-colors">
                    Start Learning
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
