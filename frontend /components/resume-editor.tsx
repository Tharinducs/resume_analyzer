"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Edit3, Save, User, Briefcase, GraduationCap, Award } from "lucide-react"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    school: string
    location: string
    graduationDate: string
  }>
  skills: string[]
}

interface ResumeEditorProps {
  initialData: ResumeData
  onSave: (data: ResumeData) => void
  isEditable?: boolean
}

export function ResumeEditor({ initialData, onSave, isEditable = true }: ResumeEditorProps) {
  const [data, setData] = useState<ResumeData>(initialData)
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  const handleSave = () => {
    onSave(data)
    setIsEditing(false)
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setData({ ...data, experience: [...data.experience, newExp] })
  }

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter((exp) => exp.id !== id) })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setData({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
    }
    setData({ ...data, education: [...data.education, newEdu] })
  }

  const removeEducation = (id: string) => {
    setData({ ...data, education: data.education.filter((edu) => edu.id !== id) })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      setData({ ...data, skills: [...data.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setData({ ...data, skills: data.skills.filter((s) => s !== skill) })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resume Content</h2>
          <p className="text-muted-foreground">Review and edit your parsed resume information</p>
        </div>
        {isEditable && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit Resume
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={data.personalInfo.name}
                onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              rows={4}
              value={data.personalInfo.summary}
              onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, summary: e.target.value } })}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Work Experience</span>
            </CardTitle>
            {isEditing && (
              <Button variant="outline" size="sm" onClick={addExperience}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Education</span>
            </CardTitle>
            {isEditing && (
              <Button variant="outline" size="sm" onClick={addEducation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>School</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Date</Label>
                      <Input
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} className="ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Skills</span>
          </CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm">
                {skill}
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>Add</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
