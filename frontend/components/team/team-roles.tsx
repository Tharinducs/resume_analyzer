"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Eye, Settings } from "lucide-react"

interface Role {
  name: string
  description: string
  permissions: string[]
  memberCount: number
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export function TeamRoles() {
  const roles: Role[] = [
    {
      name: "Admin",
      description: "Full access to all features and settings",
      permissions: ["Manage team", "Delete projects", "Billing access", "Security settings"],
      memberCount: 2,
      icon: Shield,
      color: "text-red-500",
    },
    {
      name: "Manager",
      description: "Can manage projects and team members",
      permissions: ["Create projects", "Assign tasks", "Invite members", "View analytics"],
      memberCount: 4,
      icon: Users,
      color: "text-blue-500",
    },
    {
      name: "Member",
      description: "Can create and manage own tasks",
      permissions: ["Create tasks", "Edit own tasks", "Comment on tasks", "View projects"],
      memberCount: 16,
      icon: Users,
      color: "text-green-500",
    },
    {
      name: "Viewer",
      description: "Read-only access to assigned projects",
      permissions: ["View tasks", "View projects", "Add comments"],
      memberCount: 2,
      icon: Eye,
      color: "text-gray-500",
    },
  ]

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Roles & Permissions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {roles.map((role, index) => (
          <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <role.icon className={`w-4 h-4 ${role.color}`} />
                <h4 className="font-semibold text-sm">{role.name}</h4>
              </div>
              <Badge variant="secondary" className="text-xs">
                {role.memberCount} members
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground text-pretty">{role.description}</p>

            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission, permIndex) => (
                  <Badge key={permIndex} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
