"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
  assignee: {
    id: string
    name: string
    avatar: string
  }
  dueDate: string
  tags: string[]
  createdAt: string
}

interface Filters {
  priority: string
  assignee: string
  tags: string
}

interface TaskFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  tasks: Task[]
}

export function TaskFilters({ filters, onFiltersChange, tasks }: TaskFiltersProps) {
  const uniqueAssignees = Array.from(new Set(tasks.map((task) => task.assignee.id)))
    .map((id) => tasks.find((task) => task.assignee.id === id)?.assignee)
    .filter(Boolean)

  const uniqueTags = Array.from(new Set(tasks.flatMap((task) => task.tags)))

  const activeFiltersCount = Object.values(filters).filter((value) => value !== "all").length

  const clearFilters = () => {
    onFiltersChange({
      priority: "all",
      assignee: "all",
      tags: "all",
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="glass bg-transparent relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="glass-strong w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Filter Tasks</h4>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
                <X className="w-3 h-3 mr-1" />
                Clear
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Priority</label>
              <Select
                value={filters.priority}
                onValueChange={(value) => onFiltersChange({ ...filters, priority: value })}
              >
                <SelectTrigger className="glass h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Assignee</label>
              <Select
                value={filters.assignee}
                onValueChange={(value) => onFiltersChange({ ...filters, assignee: value })}
              >
                <SelectTrigger className="glass h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="all">All Assignees</SelectItem>
                  {uniqueAssignees.map((assignee) => (
                    <SelectItem key={assignee!.id} value={assignee!.id}>
                      {assignee!.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tags</label>
              <Select value={filters.tags} onValueChange={(value) => onFiltersChange({ ...filters, tags: value })}>
                <SelectTrigger className="glass h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="all">All Tags</SelectItem>
                  {uniqueTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} applied
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
