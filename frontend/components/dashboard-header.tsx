"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GlobalSearch } from "@/components/global-search"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, User, Settings, LogOut, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSelector } from "react-redux"
import { get } from "lodash";
import { RootState } from "@/store/store"

export function DashboardHeader({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const user = useSelector((state: RootState) => state.auth.user) as Record<string, any> | null

  const displayName: string = get(user, "name", "") || get(user, "email", "User")
  const email: string = get(user, "email", "")
  const picture: string = get(user, "picture", "")
  const initials = displayName
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4 md:px-6 gap-4">
        {/* Hamburger – mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search – hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 min-w-0 max-w-md">
          <GlobalSearch />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 md:gap-2 ml-auto">
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
            <Bell className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9">
                  {picture && <AvatarImage src={picture} alt={displayName} referrerPolicy="no-referrer" />}
                  <AvatarFallback className="text-sm font-medium">{initials || <User className="h-4 w-4" />}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 shrink-0">
                    {picture && <AvatarImage src={picture} alt={displayName} referrerPolicy="no-referrer" />}
                    <AvatarFallback className="text-xs">{initials || <User className="h-3 w-3" />}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1 truncate">{email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
