"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle } from "lucide-react"

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const sessions = [
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Chrome on Windows",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Password & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} className="glass pr-10" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input id="newPassword" type={showNewPassword ? "text" : "password"} className="glass pr-10" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="glass" />
            </div>

            <Button type="submit" variant="outline" className="glass bg-transparent">
              Update Password
            </Button>
          </form>

          <Separator />

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Two-Factor Authentication
                  {twoFactorEnabled ? (
                    <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Enabled
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Disabled
                    </Badge>
                  )}
                </Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>

            {!twoFactorEnabled && (
              <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Enhance your account security</p>
                    <p className="text-sm text-muted-foreground">
                      Two-factor authentication adds an extra layer of security by requiring a code from your phone in
                      addition to your password.
                    </p>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                      Set Up 2FA
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/50"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{session.device}</p>
                  {session.current && (
                    <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{session.location}</p>
                <p className="text-xs text-muted-foreground">{session.lastActive}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm" className="glass bg-transparent text-destructive">
                  Revoke
                </Button>
              )}
            </div>
          ))}

          <Button variant="outline" className="w-full glass bg-transparent text-destructive">
            Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full glass bg-transparent">
            Download My Data
          </Button>
          <Button variant="outline" className="w-full glass bg-transparent text-destructive">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
