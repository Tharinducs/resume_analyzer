import { TeamOverview } from "@/components/team/team-overview"
import { TeamMembersList } from "@/components/team/team-members-list"
import { TeamInvitations } from "@/components/team/team-invitations"
import { TeamRoles } from "@/components/team/team-roles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Filter } from "lucide-react"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Team Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage team members, roles, and permissions</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Team Overview */}
        <TeamOverview />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-10 glass" />
          </div>
          <Button variant="outline" className="glass bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Role
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TeamMembersList />
          </div>
          <div className="space-y-6">
            <TeamInvitations />
            <TeamRoles />
          </div>
        </div>
      </div>
    </div>
  )
}
