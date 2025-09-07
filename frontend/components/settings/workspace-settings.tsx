"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, Users, Crown, Save, Plus } from "lucide-react"

export function WorkspaceSettings() {
  const [workspaceSettings, setWorkspaceSettings] = useState({
    name: "Acme Corporation",
    description: "Building the future of productivity software",
    domain: "acme-corp",
    allowPublicProjects: false,
    requireApproval: true,
    defaultRole: "member",
  })

  const handleSave = () => {
    // TODO: Implement workspace settings save
    console.log("Saving workspace settings:", workspaceSettings)
  }

  return (
    <div className="space-y-6">
      {/* Workspace Information */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Workspace Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input
                id="workspaceName"
                value={workspaceSettings.name}
                onChange={(e) => setWorkspaceSettings((prev) => ({ ...prev, name: e.target.value }))}
                className="glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workspaceDomain">Workspace URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                  taskmanager.app/
                </span>
                <Input
                  id="workspaceDomain"
                  value={workspaceSettings.domain}
                  onChange={(e) => setWorkspaceSettings((prev) => ({ ...prev, domain: e.target.value }))}
                  className="glass rounded-l-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspaceDescription">Description</Label>
            <Textarea
              id="workspaceDescription"
              value={workspaceSettings.description}
              onChange={(e) => setWorkspaceSettings((prev) => ({ ...prev, description: e.target.value }))}
              className="glass resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Member Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Member Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Public Projects</Label>
                <p className="text-sm text-muted-foreground">
                  Let members create projects visible to anyone with the link
                </p>
              </div>
              <Switch
                checked={workspaceSettings.allowPublicProjects}
                onCheckedChange={(checked) =>
                  setWorkspaceSettings((prev) => ({ ...prev, allowPublicProjects: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Admin Approval</Label>
                <p className="text-sm text-muted-foreground">New members need admin approval to join</p>
              </div>
              <Switch
                checked={workspaceSettings.requireApproval}
                onCheckedChange={(checked) => setWorkspaceSettings((prev) => ({ ...prev, requireApproval: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Default Role for New Members</Label>
              <Select
                value={workspaceSettings.defaultRole}
                onValueChange={(value) => setWorkspaceSettings((prev) => ({ ...prev, defaultRole: value }))}
              >
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing & Plan */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Billing & Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Pro Plan</h4>
                <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  Current Plan
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">$29/month • Up to 50 team members</p>
              <p className="text-xs text-muted-foreground">Next billing date: February 15, 2024</p>
            </div>
            <Button variant="outline" className="glass bg-transparent">
              Manage Billing
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Usage This Month</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Team Members</span>
                <span>24 / 50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Projects</span>
                <span>12 / Unlimited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage Used</span>
                <span>2.4 GB / 100 GB</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button variant="outline" className="glass bg-transparent">
              View All Plans
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary">
          <Save className="w-4 h-4 mr-2" />
          Save Workspace Settings
        </Button>
      </div>
    </div>
  )
}
