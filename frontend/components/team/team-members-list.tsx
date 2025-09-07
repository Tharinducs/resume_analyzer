"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, Phone, MoreHorizontal, Edit, Trash2, Shield } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "member" | "viewer"
  department: string
  joinDate: string
  avatar: string
  status: "online" | "away" | "offline"
  tasksCount: number
  projectsCount: number
}

export function TeamMembersList() {
  const members: TeamMember[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "admin",
      department: "Engineering",
      joinDate: "2023-01-15",
      avatar: "/diverse-woman-portrait.png",
      status: "online",
      tasksCount: 8,
      projectsCount: 3,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@company.com",
      role: "manager",
      department: "Engineering",
      joinDate: "2023-02-20",
      avatar: "/thoughtful-man.png",
      status: "away",
      tasksCount: 12,
      projectsCount: 4,
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@company.com",
      role: "member",
      department: "Design",
      joinDate: "2023-03-10",
      avatar: "/diverse-woman-portrait.png",
      status: "online",
      tasksCount: 6,
      projectsCount: 2,
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@company.com",
      role: "member",
      department: "Engineering",
      joinDate: "2023-04-05",
      avatar: "/thoughtful-man.png",
      status: "offline",
      tasksCount: 9,
      projectsCount: 3,
    },
    {
      id: "5",
      name: "Eva Brown",
      email: "eva@company.com",
      role: "viewer",
      department: "Marketing",
      joinDate: "2023-05-12",
      avatar: "/diverse-woman-portrait.png",
      status: "online",
      tasksCount: 3,
      projectsCount: 1,
    },
  ]

  const getRoleColor = (role: TeamMember["role"]) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "member":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "viewer":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{member.name}</h4>
                  <Badge variant="outline" className={`text-xs ${getRoleColor(member.role)}`}>
                    {member.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </span>
                  <span>{member.department}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  <span>{member.tasksCount} tasks</span>
                  <span>{member.projectsCount} projects</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-strong">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="w-4 h-4 mr-2" />
                    Change Role
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Member
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
