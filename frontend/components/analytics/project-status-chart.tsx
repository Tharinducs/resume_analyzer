"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const data = [
  { name: "Active", value: 8, color: "hsl(var(--primary))" },
  { name: "In Review", value: 3, color: "hsl(var(--secondary))" },
  { name: "Planning", value: 2, color: "hsl(var(--muted-foreground))" },
  { name: "Completed", value: 12, color: "hsl(142 76% 36%)" },
]

const chartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--primary))",
  },
  review: {
    label: "In Review",
    color: "hsl(var(--secondary))",
  },
  planning: {
    label: "Planning",
    color: "hsl(var(--muted-foreground))",
  },
  completed: {
    label: "Completed",
    color: "hsl(142 76% 36%)",
  },
}

export function ProjectStatusChart() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Project Status Overview</CardTitle>
        <CardDescription>Distribution of projects by current status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-muted-foreground">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
