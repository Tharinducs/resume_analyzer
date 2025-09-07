"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, Smartphone, Save } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      enabled: true,
      taskAssigned: true,
      taskCompleted: true,
      projectUpdates: true,
      teamInvites: true,
      weeklyDigest: false,
      frequency: "immediate",
    },
    push: {
      enabled: true,
      taskReminders: true,
      deadlineAlerts: true,
      mentions: true,
      projectActivity: false,
    },
    inApp: {
      enabled: true,
      soundEnabled: true,
      desktopNotifications: true,
      quietHours: true,
      quietStart: "22:00",
      quietEnd: "08:00",
    },
  })

  const handleSave = () => {
    // TODO: Implement notification settings save
    console.log("Saving notification settings:", notifications)
  }

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              checked={notifications.email.enabled}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  email: { ...prev.email, enabled: checked },
                }))
              }
            />
          </div>

          {notifications.email.enabled && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Task Assigned to Me</Label>
                  <Switch
                    checked={notifications.email.taskAssigned}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, taskAssigned: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Task Completed</Label>
                  <Switch
                    checked={notifications.email.taskCompleted}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, taskCompleted: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Project Updates</Label>
                  <Switch
                    checked={notifications.email.projectUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, projectUpdates: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Team Invitations</Label>
                  <Switch
                    checked={notifications.email.teamInvites}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, teamInvites: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Weekly Digest</Label>
                  <Switch
                    checked={notifications.email.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, weeklyDigest: checked },
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Frequency</Label>
                  <Select
                    value={notifications.email.frequency}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({
                        ...prev,
                        email: { ...prev.email, frequency: value },
                      }))
                    }
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong">
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch
              checked={notifications.push.enabled}
              onCheckedChange={(checked) =>
                setNotifications((prev) => ({
                  ...prev,
                  push: { ...prev.push, enabled: checked },
                }))
              }
            />
          </div>

          {notifications.push.enabled && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Task Reminders</Label>
                  <Switch
                    checked={notifications.push.taskReminders}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        push: { ...prev.push, taskReminders: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Deadline Alerts</Label>
                  <Switch
                    checked={notifications.push.deadlineAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        push: { ...prev.push, deadlineAlerts: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Mentions & Comments</Label>
                  <Switch
                    checked={notifications.push.mentions}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        push: { ...prev.push, mentions: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Project Activity</Label>
                  <Switch
                    checked={notifications.push.projectActivity}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        push: { ...prev.push, projectActivity: checked },
                      }))
                    }
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* In-App Notifications */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            In-App Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Sound Notifications</Label>
              <Switch
                checked={notifications.inApp.soundEnabled}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    inApp: { ...prev.inApp, soundEnabled: checked },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>Desktop Notifications</Label>
              <Switch
                checked={notifications.inApp.desktopNotifications}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    inApp: { ...prev.inApp, desktopNotifications: checked },
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Quiet Hours</Label>
                <p className="text-sm text-muted-foreground">Disable notifications during specified hours</p>
              </div>
              <Switch
                checked={notifications.inApp.quietHours}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    inApp: { ...prev.inApp, quietHours: checked },
                  }))
                }
              />
            </div>

            {notifications.inApp.quietHours && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Select
                    value={notifications.inApp.quietStart}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({
                        ...prev,
                        inApp: { ...prev.inApp, quietStart: value },
                      }))
                    }
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong">
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0")
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Select
                    value={notifications.inApp.quietEnd}
                    onValueChange={(value) =>
                      setNotifications((prev) => ({
                        ...prev,
                        inApp: { ...prev.inApp, quietEnd: value },
                      }))
                    }
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong">
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, "0")
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-secondary">
          <Save className="w-4 h-4 mr-2" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  )
}
