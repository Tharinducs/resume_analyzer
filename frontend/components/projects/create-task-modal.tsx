"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Sparkles, X } from "lucide-react"

interface Task {
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
}

interface CreateTaskModalProps {
  onCreateTask: (task: Task) => void
}

export function CreateTaskModal({ onCreateTask }: CreateTaskModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    assigneeId: "",
    dueDate: "",
    tags: [] as string[],
    newTag: "",
  })

  // Mock team members - in real app this would come from API
  const teamMembers = [
    { id: "1", name: "Alice Johnson", avatar: "/diverse-woman-portrait.png" },
    { id: "2", name: "Bob Smith", avatar: "/thoughtful-man.png" },
    { id: "3", name: "Carol Davis", avatar: "/diverse-woman-portrait.png" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const assignee = teamMembers.find((member) => member.id === formData.assigneeId)
    if (!assignee) return

    const task: Task = {
      title: formData.title,
      description: formData.description,
      status: "todo",
      priority: formData.priority,
      assignee,
      dueDate: formData.dueDate,
      tags: formData.tags,
    }

    onCreateTask(task)
    setOpen(false)
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      assigneeId: "",
      dueDate: "",
      tags: [],
      newTag: "",
    })
  }

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const generateAISuggestions = () => {
    // Mock AI suggestions - in real app this would call AI API
    const suggestions = [
      "Break this into smaller subtasks for better tracking",
      "Consider adding a code review step",
      "Estimated completion time: 3-5 days",
      "Similar tasks usually require frontend and backend work",
    ]

    // For demo, just show an alert
    alert(`AI Suggestions:\n\n${suggestions.join("\n")}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Create New Task
          </DialogTitle>
          <DialogDescription>
            Add a new task to your project. AI will help suggest improvements and breakdowns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="glass"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the task requirements and objectives"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                className="glass resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={formData.assigneeId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, assigneeId: value }))}
              >
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent className="glass-strong">
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="glass"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add tag and press Enter"
                  value={formData.newTag}
                  onChange={(e) => setFormData((prev) => ({ ...prev, newTag: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  className="glass"
                />
                <Button type="button" onClick={addTag} variant="outline" className="glass bg-transparent">
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
            <Sparkles className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">AI Assistant</p>
              <p className="text-xs text-muted-foreground">Get AI suggestions for task breakdown and timeline</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateAISuggestions}
              className="glass bg-transparent"
            >
              Get Suggestions
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="glass bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
