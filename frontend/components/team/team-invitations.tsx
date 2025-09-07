"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Send, Clock, CheckCircle, X } from "lucide-react"

interface PendingInvitation {
  id: string
  email: string
  role: string
  invitedBy: string
  invitedAt: string
  status: "pending" | "accepted" | "expired"
}

export function TeamInvitations() {
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("")

  const pendingInvitations: PendingInvitation[] = [
    {
      id: "1",
      email: "john@company.com",
      role: "member",
      invitedBy: "Alice Johnson",
      invitedAt: "2024-01-20",
      status: "pending",
    },
    {
      id: "2",
      email: "sarah@company.com",
      role: "viewer",
      invitedBy: "Bob Smith",
      invitedAt: "2024-01-18",
      status: "pending",
    },
    {
      id: "3",
      email: "mike@company.com",
      role: "member",
      invitedBy: "Alice Johnson",
      invitedAt: "2024-01-15",
      status: "expired",
    },
  ]

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteEmail && inviteRole) {
      // TODO: Implement invitation logic
      console.log("Sending invite to:", inviteEmail, "as", inviteRole)
      setInviteEmail("")
      setInviteRole("")
    }
  }

  const getStatusIcon = (status: PendingInvitation["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 text-orange-500" />
      case "accepted":
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case "expired":
        return <X className="w-3 h-3 text-red-500" />
    }
  }

  const getStatusColor = (status: PendingInvitation["status"]) => {
    switch (status) {
      case "pending":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "accepted":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "expired":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Team Invitations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invite Form */}
        <form onSubmit={handleSendInvite} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="glass"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={inviteRole} onValueChange={setInviteRole} required>
              <SelectTrigger className="glass">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="glass-strong">
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
            <Send className="w-4 h-4 mr-2" />
            Send Invitation
          </Button>
        </form>

        {/* Pending Invitations */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Pending Invitations</h4>
          {pendingInvitations.map((invitation) => (
            <div key={invitation.id} className="p-3 rounded-lg bg-muted/20 border border-border/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{invitation.email}</span>
                <Badge variant="outline" className={`text-xs ${getStatusColor(invitation.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(invitation.status)}
                    {invitation.status}
                  </div>
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Role: {invitation.role}</span>
                <span>Invited {new Date(invitation.invitedAt).toLocaleDateString()}</span>
              </div>
              <div className="text-xs text-muted-foreground">by {invitation.invitedBy}</div>
              {invitation.status === "pending" && (
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs glass bg-transparent">
                    Resend
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs glass bg-transparent text-destructive">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
