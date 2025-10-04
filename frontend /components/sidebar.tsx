"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  LayoutDashboard,
  FileText,
  Search,
  Briefcase,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: "Resumes",
    href: "/resumes",
    icon: FileText,
    current: false,
    badge: "3",
  },
  {
    name: "Job Analyzer",
    href: "/job-analyzer",
    icon: Search,
    current: false,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: Briefcase,
    current: false,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
    current: false,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    current: false,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("flex h-full flex-col border-r border-border bg-sidebar", className)}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="bg-sidebar-primary rounded-lg p-1.5">
            <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold text-sidebar-foreground">AI Resume Analyzer</span>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  item.current
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "px-2",
                )}
                asChild
              >
                <a href={item.href}>
                  <Icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </a>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator className="bg-sidebar-border" />

      {/* User Section */}
      <div className="p-3 space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "px-2",
          )}
        >
          <User className={cn("h-4 w-4", !collapsed && "mr-3")} />
          {!collapsed && <span className="flex-1 text-left">Profile</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "px-2",
          )}
        >
          <LogOut className={cn("h-4 w-4", !collapsed && "mr-3")} />
          {!collapsed && <span className="flex-1 text-left">Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
