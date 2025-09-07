"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", completed: 45, total: 52 },
  { month: "Feb", completed: 52, total: 61 },
  { month: "Mar", completed: 48, total: 55 },
  { month: "Apr", completed: 61, total: 67 },
  { month: "May", completed: 55, total: 63 },
  { month: "Jun", completed: 67, total: 72 },
]

const chartConfig = {
  completed: {
    label: "Completed Tasks",
    color: "hsl(var(--primary))",
  },
  total: {
    label: "Total Tasks",
    color: "hsl(var(--muted-foreground))",
  },
}

export function TaskCompletionChart() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Task Completion Trends</CardTitle>
        <CardDescription>Monthly task completion rates over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="total"
                stackId="1"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
