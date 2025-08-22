import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Home, Tractor, Users } from "lucide-react"
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
    id: "rural",
    title: "Rural Users",
    description: "Simple guides for digital payments, government scheme frauds, and basic online safety",
    icon: Tractor,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    id: "senior",
    title: "Seniors",
    description: "Easy-to-understand content about phone scams, fake tech support, and safe banking",
    icon: Users,
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
]

export function DemographicCards() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Choose Your Learning Path</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Get personalized cyber security guidance based on your background and needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {demographics.map((demo) => {
            const Icon = demo.icon
            return (
              <Card key={demo.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${demo.bgColor} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                  >
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${demo.color}`} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold">{demo.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="mb-4 sm:mb-6 text-sm leading-relaxed">{demo.description}</CardDescription>
                  <Link href={`/knowledge/${demo.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
