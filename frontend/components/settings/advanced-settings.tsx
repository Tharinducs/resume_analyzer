"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Database, Zap, Code, Download, Upload, Trash2, AlertTriangle } from "lucide-react"

export function AdvancedSettings() {
  return (
    <div className="space-y-6">
      {/* Performance Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Performance & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Caching</Label>
                <p className="text-sm text-muted-foreground">Cache data locally for faster loading times</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Preload Data</Label>
                <p className="text-sm text-muted-foreground">Preload project data in the background</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Offline Mode</Label>
                <p className="text-sm text-muted-foreground">Enable offline functionality when available</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue="realtime">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="30s">Every 30 seconds</SelectItem>
                  <SelectItem value="1m">Every minute</SelectItem>
                  <SelectItem value="5m">Every 5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-backup</Label>
                <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Data Retention Period</Label>
              <Select defaultValue="1year">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="glass flex items-center gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button variant="outline" className="glass flex items-center gap-2 bg-transparent">
                <Upload className="w-4 h-4" />
                Import Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Developer Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Developer Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Debug Mode</Label>
                <p className="text-sm text-muted-foreground">Enable detailed logging and debug information</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API Rate Limiting</Label>
                <p className="text-sm text-muted-foreground">Enable rate limiting for API requests</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>API Endpoint</Label>
              <Input
                placeholder="https://api.example.com/v1"
                className="glass"
                defaultValue="https://api.aitaskmanager.com/v1"
              />
            </div>

            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input placeholder="https://your-app.com/webhooks" className="glass" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="glass border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-red-400 mb-2">Reset All Settings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This will reset all your preferences to default values. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Reset Settings
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-red-400 mb-2">Delete All Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete all your projects, tasks, and data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete All Data
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <h4 className="font-medium text-red-400 mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}