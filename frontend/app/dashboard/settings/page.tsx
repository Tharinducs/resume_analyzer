"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { updateUserInStore } from "@/features/auth/authSlice"
import { useUpdateMeMutation, useUploadPictureMutation } from "@/features/auth/apiSlice"
import { useLogoutAPIMutation } from "@/features/auth/apiSlice"
import { logout } from "@/features/auth/authSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft, User, Bell, Shield, Palette,
  Globe, LogOut, Save, CheckCircle, Sun, Moon, Monitor,
  Loader2, Mail, BellRing, Newspaper, Megaphone, Camera,
} from "lucide-react"
import { useRef } from "react"
import {
  isPushSupported,
  getPushPermission,
  requestPushPermission,
  sendPushNotification,
} from "@/utils/pushNotifications"

type NotificationPrefs = {
  resumeAnalysis: boolean
  jobMatch: boolean
  weeklyDigest: boolean
  marketingEmails: boolean
}

type ProfileForm = {
  name: string
  mobileNo: string
  location: string
  jobTitle: string
  bio: string
}

export default function SettingsPage() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user) as Record<string, any> | null
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [updateMe, { isLoading: isSavingProfile }] = useUpdateMeMutation()
  const [uploadPicture, { isLoading: isUploadingPicture }] = useUploadPictureMutation()
  const [logoutAPI] = useLogoutAPIMutation()
  const pictureInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState<ProfileForm>({
    name: "",
    mobileNo: "",
    location: "",
    jobTitle: "",
    bio: "",
  })

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    resumeAnalysis: true,
    jobMatch: true,
    weeklyDigest: false,
    marketingEmails: false,
  })
  const [isSavingNotifications, setIsSavingNotifications] = useState(false)
  const [pushPermission, setPushPermission] = useState<string>("default")

  // Sync form from Redux user on mount / user change
  useEffect(() => {
    if (!user) return
    setProfile({
      name: user.name ?? "",
      mobileNo: user.mobileNo ?? "",
      location: user.location ?? "",
      jobTitle: user.jobTitle ?? "",
      bio: user.bio ?? "",
    })
    setNotifications({
      resumeAnalysis: user.notifications?.resumeAnalysis ?? true,
      jobMatch: user.notifications?.jobMatch ?? true,
      weeklyDigest: user.notifications?.weeklyDigest ?? false,
      marketingEmails: user.notifications?.marketingEmails ?? false,
    })
    setPushPermission(getPushPermission())
  }, [user?._id])

  const handleSaveProfile = async () => {
    try {
      const result = await updateMe(profile).unwrap()
      dispatch(updateUserInStore(result.user))
      toast({ title: "Profile saved", description: "Your profile has been updated." })
    } catch {
      toast({ title: "Save failed", description: "Could not update profile. Please try again.", variant: "destructive" })
    }
  }

  const handleToggleNotification = async (key: keyof NotificationPrefs, value: boolean) => {
    if (key === "resumeAnalysis" || key === "jobMatch") {
      // These use browser push — request permission first when enabling
      if (value) {
        const permission = await requestPushPermission()
        setPushPermission(permission)
        if (permission !== "granted") {
          toast({
            title: "Permission required",
            description: "Please allow notifications in your browser to enable push alerts.",
            variant: "destructive",
          })
          return
        }
        sendPushNotification(
          "Notifications enabled",
          `You'll be notified when ${key === "resumeAnalysis" ? "your resume is analysed" : "a job match completes"}.`
        )
      }
    }

    const updated = { ...notifications, [key]: value }
    setNotifications(updated)
    setIsSavingNotifications(true)
    try {
      const result = await updateMe({ notifications: updated }).unwrap()
      dispatch(updateUserInStore(result.user))
    } catch {
      // Revert optimistic update
      setNotifications(notifications)
      toast({ title: "Save failed", description: "Could not save notification preference.", variant: "destructive" })
    } finally {
      setIsSavingNotifications(false)
    }
  }

  const handlePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("avatar", file)
    try {
      const result = await uploadPicture(formData).unwrap()
      dispatch(updateUserInStore(result.user))
      toast({ title: "Picture updated", description: "Your profile picture has been saved." })
    } catch {
      toast({ title: "Upload failed", description: "Could not upload image. Max size is 2 MB (JPEG, PNG, WebP).", variant: "destructive" })
    }
    // Reset input so the same file can be re-selected
    if (pictureInputRef.current) pictureInputRef.current.value = ""
  }

  const handleLogout = async () => {
    try {
      await logoutAPI(user?._id).unwrap()
    } catch { /* ignore */ }
    dispatch(logout())
    window.location.href = "/login"
  }

  const providerLabel = user?.provider === "google" ? "Google" : "Email & Password"
  const isGoogleUser = user?.provider === "google"

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" asChild>
          <a href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </a>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings, preferences, and notifications.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* ── Profile ────────────────────────────────────────────── */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your profile details</CardDescription>
                </div>
                <Badge variant="outline" className="flex items-center gap-1.5">
                  {isGoogleUser ? <Globe className="h-3 w-3 text-red-500" /> : <Shield className="h-3 w-3" />}
                  {providerLabel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar upload */}
              <div className="flex items-center gap-4 pb-2">
                <div className="relative group shrink-0">
                  <div
                    className="h-16 w-16 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center cursor-pointer"
                    onClick={() => pictureInputRef.current?.click()}
                  >
                    {user?.picture ? (
                      <img
                        src={user.picture}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-7 w-7 text-muted-foreground" />
                    )}
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {isUploadingPicture
                        ? <Loader2 className="h-5 w-5 text-white animate-spin" />
                        : <Camera className="h-5 w-5 text-white" />
                      }
                    </div>
                  </div>
                  <input
                    ref={pictureInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handlePictureUpload}
                    disabled={isUploadingPicture}
                  />
                </div>
                <div>
                  <p className="font-medium">{user?.name || user?.email}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <button
                    type="button"
                    onClick={() => pictureInputRef.current?.click()}
                    disabled={isUploadingPicture}
                    className="text-xs text-primary hover:underline mt-0.5 disabled:opacity-50"
                  >
                    {isUploadingPicture ? "Uploading…" : user?.picture ? "Change photo" : "Upload photo"}
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={user?.email ?? ""} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mobileNo">Phone Number</Label>
                  <Input
                    id="mobileNo"
                    value={profile.mobileNo}
                    onChange={(e) => setProfile({ ...profile, mobileNo: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="jobTitle">Current Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={profile.jobTitle}
                    onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                    placeholder="Senior Software Engineer"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Tell us a bit about your professional background…"
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={isSavingProfile}>
                {isSavingProfile
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
                  : <><Save className="mr-2 h-4 w-4" />Save Changes</>
                }
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session</CardTitle>
              <CardDescription>Manage your current session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <h4 className="font-medium">Sign Out</h4>
                  <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Notifications ──────────────────────────────────────── */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          {/* Push permission banner */}
          {isPushSupported() && pushPermission === "denied" && (
            <div className="flex items-start gap-3 p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
              <BellRing className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Push notifications are blocked in your browser. To receive alerts, allow notifications in your browser settings and reload.
              </p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified. Changes are saved automatically.
                {isSavingNotifications && <span className="ml-2 text-xs text-muted-foreground">Saving…</span>}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              {[
                {
                  key: "resumeAnalysis" as const,
                  icon: <BellRing className="h-4 w-4 text-blue-500" />,
                  title: "Resume Analysis Complete",
                  description: "Get a browser notification when your resume finishes processing and AI analysis is ready.",
                  badge: "Push",
                },
                {
                  key: "jobMatch" as const,
                  icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                  title: "Job Match Complete",
                  description: "Get a browser notification when a resume-to-job comparison finishes.",
                  badge: "Push",
                },
                {
                  key: "weeklyDigest" as const,
                  icon: <Newspaper className="h-4 w-4 text-purple-500" />,
                  title: "Weekly Digest",
                  description: "Receive a weekly email summary of your resume activity and job match scores.",
                  badge: "Email",
                },
                {
                  key: "marketingEmails" as const,
                  icon: <Megaphone className="h-4 w-4 text-orange-500" />,
                  title: "Product Updates & Tips",
                  description: "Hear about new features, resume tips, and improvements to the platform.",
                  badge: "Email",
                },
              ].map((item, i, arr) => (
                <div key={item.key}>
                  <div className="flex items-start justify-between gap-4 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{item.icon}</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <Badge variant="outline" className="text-xs py-0">
                            {item.badge === "Push"
                              ? <><BellRing className="mr-1 h-2.5 w-2.5" />Push</>
                              : <><Mail className="mr-1 h-2.5 w-2.5" />Email</>
                            }
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(v) => handleToggleNotification(item.key, v)}
                      disabled={isSavingNotifications}
                    />
                  </div>
                  {i < arr.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {isPushSupported() && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Browser Permission</CardTitle>
                <CardDescription>Current status of browser notifications for this device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {pushPermission === "granted" ? "Notifications allowed" :
                       pushPermission === "denied" ? "Notifications blocked" :
                       "Permission not yet requested"}
                    </span>
                  </div>
                  {pushPermission !== "denied" && pushPermission !== "granted" && (
                    <Button size="sm" variant="outline" onClick={async () => {
                      const p = await requestPushPermission()
                      setPushPermission(p)
                      if (p === "granted") {
                        sendPushNotification("Notifications enabled", "You will now receive browser notifications from Resume Analyzer.")
                      }
                    }}>
                      Enable
                    </Button>
                  )}
                  {pushPermission === "granted" && (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" />Active
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* ── Preferences ────────────────────────────────────────── */}
        <TabsContent value="preferences" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Choose your preferred theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {([
                  { value: "light", icon: <Sun className="h-4 w-4" />, label: "Light", preview: "bg-white" },
                  { value: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark", preview: "bg-slate-900" },
                  { value: "system", icon: <Monitor className="h-4 w-4" />, label: "System", preview: "bg-gradient-to-r from-white to-slate-900" },
                ] as const).map((opt) => (
                  <div
                    key={opt.value}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                      theme === opt.value ? "border-primary" : "border-border hover:border-muted-foreground/40"
                    }`}
                    onClick={() => setTheme(opt.value)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {opt.icon}
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <div className={`h-8 rounded border ${opt.preview}`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
