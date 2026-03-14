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
import { ExtractedInfo } from "@/types/resume"
import { v4 as uuidv4 } from 'uuid'


interface ResumeEditorProps {
  initialData: ExtractedInfo
  onSave: (data: ExtractedInfo) => void
  isEditable?: boolean
}

const normalizeData = (data: ExtractedInfo) => ({
  ...data,
  workExperience: data.workExperience.map((exp, i) => ({
    ...exp,
    _uiId: exp._id || uuidv4(),
  })),
  education: data.education.map((edu, i) => ({
    ...edu,
    _uiId: edu._id || uuidv4(),
  })),
})


const stripUIIds = (data: ExtractedInfo): ExtractedInfo => ({
  ...data,
  workExperience: data.workExperience.map(({ _uiId, ...rest }) => rest),
  education: data.education.map(({ _uiId, ...rest }) => rest),
})

export function ResumeEditor({ initialData, onSave, isEditable = true }: ResumeEditorProps) {
  const [data, setData] = useState(() => normalizeData(initialData))
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")

  // ─── Save ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    onSave(stripUIIds(data)) 
    setIsEditing(false)
  }

  const handleCancel = () => {
    setData(normalizeData(initialData))
    setIsEditing(false)
  }

  // ─── Work Experience ─────────────────────────────────────────────────────
  const addExperience = () => {
    const newExp = {
      _uiId: uuidv4(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setData({ ...data, workExperience: [...data.workExperience, newExp] })
  }

  const removeExperience = (_uiId: string) => {
    setData({ ...data, workExperience: data.workExperience.filter((exp) => exp._uiId !== _uiId) })
  }

  const updateExperience = (_uiId: string, field: string, value: string) => {
    setData({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp._uiId === _uiId ? { ...exp, [field]: value } : exp
      ),
    })
  }

  // ─── Education ───────────────────────────────────────────────────────────
  const addEducation = () => {
    const newEdu = {
      _uiId: uuidv4(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
    }
    setData({ ...data, education: [...data.education, newEdu] })
  }

  const removeEducation = (_uiId: string) => {
    setData({ ...data, education: data.education.filter((edu) => edu._uiId !== _uiId) })
  }

  const updateEducation = (_uiId: string, field: string, value: string) => {
    setData({
      ...data,
      education: data.education.map((edu) =>
        edu._uiId === _uiId ? { ...edu, [field]: value } : edu
      ),
    })
  }

  // ─── Skills ──────────────────────────────────────────────────────────────
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
                <Button variant="outline" onClick={handleCancel}>
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
                onChange={(e) =>
                  setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) =>
                  setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) =>
                  setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) =>
                  setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })
                }
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
              onChange={(e) =>
                setData({ ...data, personalInfo: { ...data.personalInfo, summary: e.target.value } })
              }
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

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
          {data.workExperience.length === 0 && (
            <p className="text-sm text-muted-foreground">No work experience added yet.</p>
          )}
          {data.workExperience.map((exp, index) => (
            <div key={exp._uiId} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp._uiId, "position", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp._uiId, "company", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={exp.location}
                        onChange={(e) => updateExperience(exp._uiId, "location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp._uiId, "startDate", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp._uiId, "endDate", e.target.value)}
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
                      onChange={(e) => updateExperience(exp._uiId, "description", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp._uiId)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

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
          {data.education.length === 0 && (
            <p className="text-sm text-muted-foreground">No education added yet.</p>
          )}
          {data.education.map((edu, index) => (
            <div key={edu._uiId} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu._uiId, "degree", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>School</Label>
                      <Input
                        value={edu.school}
                        onChange={(e) => updateEducation(edu._uiId, "school", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={edu.location}
                        onChange={(e) => updateEducation(edu._uiId, "location", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Graduation Date</Label>
                      <Input
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(edu._uiId, "graduationDate", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu._uiId)}
                    className="ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Skills</span>
          </CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.skills.length === 0 && (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
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
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>Add</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}