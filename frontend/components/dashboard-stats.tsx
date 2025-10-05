import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FileText, Target, Award } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Last Resume Score",
      value: "87%",
      description: "Software Engineer Resume",
      icon: Award,
      trend: "+5%",
      color: "text-green-500",
    },
    {
      title: "Resumes Analyzed",
      value: "12",
      description: "This month",
      icon: FileText,
      trend: "+3",
      color: "text-blue-500",
    },
    {
      title: "Job Match Rate",
      value: "73%",
      description: "Average compatibility",
      icon: Target,
      trend: "+12%",
      color: "text-purple-500",
    },
    {
      title: "Improvement Score",
      value: "94%",
      description: "Based on suggestions",
      icon: TrendingUp,
      trend: "+8%",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
              {stat.title === "Last Resume Score" && <Progress value={87} className="mt-3 h-2" />}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
