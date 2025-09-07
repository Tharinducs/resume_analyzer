"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, Award } from "lucide-react"

export function TeamOverview() {
  const stats = [
    {
      title: "Total Members",
      value: "24",
      change: "+3 this month",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Members",
      value: "22",
      change: "91% active rate",
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      title: "Avg. Experience",
      value: "3.2 years",
      change: "Senior level team",
      icon: Award,
      color: "text-primary",
    },
    {
      title: "Response Time",
      value: "2.4 hours",
      change: "15% faster",
      icon: Clock,
      color: "text-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
