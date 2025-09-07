"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Mail } from "lucide-react"

interface ProjectMembersProps {
  projectId: string
}

export function ProjectMembers({ projectId }: ProjectMembersProps) {
  const members = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Project Manager",
      avatar: "/diverse-woman-portrait.png",
      status: "online",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Developer",
      avatar: "/thoughtful-man.png",
      status: "away",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      role: "Designer",
      avatar: "/diverse-woman-portrait.png",
      status: "offline",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Team Members</CardTitle>
          <Button size="sm" variant="outline" className="glass bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                />
              </div>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
