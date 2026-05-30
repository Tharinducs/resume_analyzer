"use client"

import { useEffect, useState } from "react"
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
  X,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { get } from "lodash"

interface SidebarProps {
  className?: string
  handleLogout: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

interface NavItemTypes {
  name: string
  href: string
  icon: any
  current: boolean
  badge?: string
  hide?: boolean
}

const navigation: NavItemTypes[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, current: true },
  { name: "Resumes", href: "/dashboard/resumes", icon: FileText, current: false },
  { name: "Resumes", href: "/dashboard/resumes/upload", icon: FileText, current: false, hide: true },
  { name: "Job Analyzer", href: "/dashboard/job-analyzer", icon: Search, current: false },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase, current: false },
  { name: "History", href: "/dashboard/history", icon: History, current: false },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, current: false },
]

function NavItems({
  collapsed,
  currentNav,
  setCurrentNav,
  onItemClick,
}: {
  collapsed: boolean
  currentNav: string
  setCurrentNav: (name: string) => void
  onItemClick?: () => void
}) {
  return (
    <nav className="space-y-1">
      {navigation.map((item, index) => {
        const Icon = item.icon
        if (item.hide) return null
        return (
          <Button
            type="button"
            key={index}
            variant={currentNav === item.name ? "default" : "ghost"}
            className={cn(
              "w-full justify-start h-10 px-3",
              currentNav === item.name
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "px-2",
            )}
            asChild
          >
            <Link
              href={item.href}
              onClick={() => {
                setCurrentNav(item.name)
                onItemClick?.()
              }}
            >
              <Icon className={cn("h-4 w-4 shrink-0", !collapsed && "mr-3")} />
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
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

function UserSection({
  collapsed,
  handleLogout,
  onItemClick,
}: {
  collapsed: boolean
  handleLogout: () => void
  onItemClick?: () => void
}) {
  return (
    <div className="p-3 space-y-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed && "px-2",
        )}
        onClick={onItemClick}
      >
        <User className={cn("h-4 w-4 shrink-0", !collapsed && "mr-3")} />
        {!collapsed && <span className="flex-1 text-left">Profile</span>}
      </Button>
      <Button
        onClick={() => { handleLogout(); onItemClick?.() }}
        variant="ghost"
        className={cn(
          "w-full justify-start h-10 px-3 text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed && "px-2",
        )}
      >
        <LogOut className={cn("h-4 w-4 shrink-0", !collapsed && "mr-3")} />
        {!collapsed && <span className="flex-1 text-left">Sign Out</span>}
      </Button>
    </div>
  )
}

const Sidebar = ({ className, handleLogout, mobileOpen = false, onMobileClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentNav, setCurrentNav] = useState("Dashboard")
  const pathName = usePathname()

  useEffect(() => {
    const pathNavItem = navigation
      .filter((item) => pathName.startsWith(item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]
    const currentNavItemName = get(pathNavItem, "name", "Dashboard")
    if (currentNavItemName !== currentNav) {
      setCurrentNav(currentNavItemName)
    }
  }, [pathName])

  const logo = (
    <div className="flex items-center space-x-2">
      <div className="bg-sidebar-primary rounded-lg p-1.5 shrink-0">
        <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
      </div>
      <span className="font-semibold text-sidebar-foreground truncate">AI Resume Analyzer</span>
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar (always in flex flow, collapsible) ── */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-full border-r border-border bg-sidebar flex-shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className,
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && logo}
          {collapsed && (
            <div className="bg-sidebar-primary rounded-lg p-1.5 mx-auto">
              <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <NavItems collapsed={collapsed} currentNav={currentNav} setCurrentNav={setCurrentNav} />
        </ScrollArea>

        <Separator className="bg-sidebar-border" />
        <UserSection collapsed={collapsed} handleLogout={handleLogout} />
      </aside>

      {/* ── Mobile sidebar (fixed overlay, slide in/out) ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col w-64 border-r border-border bg-sidebar lg:hidden",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {logo}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileClose}
            className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <NavItems
            collapsed={false}
            currentNav={currentNav}
            setCurrentNav={setCurrentNav}
            onItemClick={onMobileClose}
          />
        </ScrollArea>

        <Separator className="bg-sidebar-border" />
        <UserSection collapsed={false} handleLogout={handleLogout} onItemClick={onMobileClose} />
      </aside>
    </>
  )
}

export default React.memo(Sidebar)
