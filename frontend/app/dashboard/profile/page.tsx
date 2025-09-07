import { UserProfile } from "@/components/team/user-profile"
import { UserSettings } from "@/components/team/user-settings"
import { UserActivity } from "@/components/team/user-activity"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UserProfile />
            <UserSettings />
          </div>
          <div>
            <UserActivity />
          </div>
        </div>
      </div>
    </div>
  )
}
