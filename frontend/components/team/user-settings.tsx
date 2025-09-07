"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, Palette } from "lucide-react"

export function UserSettings() {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <h4 className="font-medium">Notifications</h4>
          </div>
          <div className="space-y-3 pl-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm">
                Email notifications
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="text-sm">
                Push notifications
              </Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-reminders" className="text-sm">
                Task reminders
              </Label>
              <Switch id="task-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-digest" className="text-sm">
                Weekly digest
              </Label>
              <Switch id="weekly-digest" />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <h4 className="font-medium">Appearance</h4>
          </div>
          <div className="space-y-3 pl-6">
            <div className="space-y-2">
              <Label className="text-sm">Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <h4 className="font-medium">Security</h4>
          </div>
          <div className="space-y-3 pl-6">
            <Button variant="outline" className="w-full glass bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" className="w-full glass bg-transparent">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full glass bg-transparent">
              Download Account Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
