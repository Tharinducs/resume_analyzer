"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Alice Johnson", tasks: 8, capacity: 10 },
  { name: "Bob Smith", tasks: 12, capacity: 10 },
  { name: "Carol Davis", tasks: 6, capacity: 10 },
  { name: "David Wilson", tasks: 9, capacity: 10 },
  { name: "Eva Brown", tasks: 7, capacity: 10 },
]

const chartConfig = {
  tasks: {
    label: "Current Tasks",
    color: "hsl(var(--primary))",
  },
  capacity: {
    label: "Capacity",
    color: "hsl(var(--muted-foreground))",
  },
}

export function WorkloadDistributionChart() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Team Workload Distribution</CardTitle>
        <CardDescription>Current task assignments vs capacity for each team member</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="horizontal">
              <XAxis type="number" domain={[0, 15]} />
              <YAxis dataKey="name" type="category" width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="capacity" fill="hsl(var(--muted-foreground))" fillOpacity={0.3} />
              <Bar dataKey="tasks" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
