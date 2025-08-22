import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Shield, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Cyber Crimes Reported",
    value: "1.4M+",
    description: "Cases reported in India (2023)",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Financial Loss",
    value: "₹10,000 Cr",
    description: "Lost to cyber fraud annually",
    icon: TrendingUp,
    color: "text-orange-600",
  },
  {
    title: "People Protected",
    value: "50K+",
    description: "Users educated through awareness",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Success Rate",
    value: "85%",
    description: "Users avoid scams after training",
    icon: Shield,
    color: "text-blue-600",
  },
]

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Reality of Cyber Crime in India
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Understanding the scale of the problem helps us build better defenses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6 pb-6">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1 text-sm sm:text-base">{stat.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
