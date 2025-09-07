"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plug, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  connected: boolean
  enabled: boolean
  lastSync?: string
}

export function IntegrationSettings() {
  const integrations: Integration[] = [
    {
      id: "slack",
      name: "Slack",
      description: "Get notifications and updates in your Slack workspace",
      icon: "💬",
      connected: true,
      enabled: true,
      lastSync: "2 minutes ago",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Sync issues and pull requests with your tasks",
      icon: "🐙",
      connected: true,
      enabled: false,
      lastSync: "1 hour ago",
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Sync deadlines and meetings with your calendar",
      icon: "📅",
      connected: false,
      enabled: false,
    },
    {
      id: "jira",
      name: "Jira",
      description: "Import and sync Jira issues with your projects",
      icon: "🔷",
      connected: false,
      enabled: false,
    },
    {
      id: "figma",
      name: "Figma",
      description: "Link design files to your tasks and projects",
      icon: "🎨",
      connected: true,
      enabled: true,
      lastSync: "30 minutes ago",
    },
    {
      id: "notion",
      name: "Notion",
      description: "Sync pages and databases with your workspace",
      icon: "📝",
      connected: false,
      enabled: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Connected Integrations */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="w-5 h-5" />
            Connected Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations
            .filter((integration) => integration.connected)
            .map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{integration.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${integration.id}-enabled`} className="text-sm">
                      Enabled
                    </Label>
                    <Switch id={`${integration.id}-enabled`} checked={integration.enabled} />
                  </div>
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    Configure
                  </Button>
                  <Button variant="outline" size="sm" className="glass bg-transparent text-destructive">
                    Disconnect
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Available Integrations */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {integrations
            .filter((integration) => !integration.connected)
            .map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{integration.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{integration.name}</h4>
                      <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/20">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Not Connected
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="glass bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                    Connect
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Webhook Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Webhooks & API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="space-y-2">
              <h4 className="font-medium">API Access</h4>
              <p className="text-sm text-muted-foreground">
                Generate API keys to integrate AI Task Manager with your custom applications
              </p>
              <Button variant="outline" size="sm" className="glass bg-transparent">
                Manage API Keys
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="space-y-2">
              <h4 className="font-medium">Webhooks</h4>
              <p className="text-sm text-muted-foreground">
                Set up webhooks to receive real-time notifications about project and task updates
              </p>
              <Button variant="outline" size="sm" className="glass bg-transparent">
                Configure Webhooks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
