"use client"

import { useEffect, useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { ResumeEditor } from "@/components/resume-editor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Zap, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useUploadFileMutation } from "@/features/resume/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { get, isEmpty } from "lodash"
import { title } from "process"
import { hideLoader, showLoader } from "@/features/common/loaderSlice"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock resume data that would come from parsing
const mockResumeData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary:
      "Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating scalable web applications and leading development teams.",
  },
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      description:
        "Developed React-based frontend applications and Node.js APIs. Collaborated with design team to implement responsive UI components. Optimized database queries improving performance by 40%.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      graduationDate: "May 2020",
    },
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Git", "Agile"],
}

export default function ResumeUploadPage() {
  const [uploadStep, setUploadStep] = useState<"upload" | "processing" | "editing">("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [resumeData, setResumeData] = useState({} as any)
  const [title, setTitle] = useState("")
  const [titleError, setTitleError] = useState("")
  const [uploadFileApi, { isLoading, isSuccess, isError }] = useUploadFileMutation()
  const { user} = useSelector((state: RootState)=> state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(isLoading){
      setUploadStep("processing");
    }
  },[isLoading,isError])

  const handleFileUpload = async (file: File) => {
    setUploadProgress(100);
    try {
        const fileData = await uploadFileApi({
            file,
            userId: get(user, "_id"),
            title: title || "My Resume"
        }).unwrap(); // Important: use .unwrap() to get the actual response
        
        console.log(fileData, "fileData");
        const prossesdData = get(fileData,"resume.extractedData",{})
        // setUploadStep("complete");
        if(fileData && !isEmpty(prossesdData)){
           setResumeData(prossesdData)
           setUploadStep("editing")
        }else{
          setUploadStep("upload")
        }
    } catch (error) {
        console.error("Upload failed:", error);
        setUploadStep("upload")
        setUploadProgress(0);
    }
  }

  const handleFileRemove = () => {
    setUploadStep("upload")
    setUploadProgress(0)
  }

  const handleSaveResume = (data: any) => {
    setResumeData(data)
    console.log("Resume saved:", data)
    // Here you would typically save to your backend
  }

  const handleAnalyzeResume = () => {
    // Navigate to analysis results
    window.location.href = "/resumes/analysis"
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" type="button" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Upload Resume</h1>
          <p className="text-muted-foreground text-pretty">
            Upload your resume to get AI-powered analysis and improvement suggestions.
          </p>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${uploadStep === "upload" ? "bg-primary text-primary-foreground" : "bg-green-500 text-white"
                    }`}
                >
                  {uploadStep === "upload" ? "1" : <CheckCircle className="h-4 w-4" />}
                </div>
                <span className="font-medium">Upload File</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${uploadStep === "processing"
                      ? "bg-primary text-primary-foreground"
                      : uploadStep === "editing"
                        ? "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                  {uploadStep === "editing" ? <CheckCircle className="h-4 w-4" /> : "2"}
                </div>
                <span className="font-medium">Process & Parse</span>
              </div>
              <div className="flex-1 h-px bg-border mx-4"></div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${uploadStep === "editing"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  3
                </div>
                <span className="font-medium">Review & Edit</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        {uploadStep === "upload" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Title for Resume</Label>
              <Input
                id="name"
                value={title}
                onChange={(e) => {
                  if(titleError && !isEmpty(e.target.value)){
                    setTitleError("");
                  }
                  setTitle(e.target.value)
                }}
                placeholder="Enter the title for your resume"
                required
                className={titleError ? "border-red-500" : ""}
                onBlur={(e)=>{
                  if(isEmpty(e.target.value)){
                    setTitleError("Title is required");
                  }else{
                    setTitleError("");
                  }
                }}
              />
              {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
            </div>
            {title && <FileUpload onFileUpload={handleFileUpload} onFileRemove={handleFileRemove} />}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>What happens next?</span>
                </CardTitle>
                <CardDescription>Here's what our AI will analyze in your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">Content Analysis</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Extract personal information</li>
                      <li>• Parse work experience</li>
                      <li>• Identify skills and keywords</li>
                      <li>• Analyze education background</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Quality Assessment</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ATS compatibility check</li>
                      <li>• Format and structure review</li>
                      <li>• Content quality scoring</li>
                      <li>• Industry-specific feedback</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Processing Section */}
        {uploadStep === "processing" && (
          <FileUpload
            onFileUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
            isUploading={true}
            uploadProgress={uploadProgress}
          />
        )}

        {/* Editing Section */}
        {uploadStep === "editing" && (
          <div className="space-y-6">
            <ResumeEditor initialData={resumeData} onSave={handleSaveResume} />

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Ready for Analysis?</h3>
                    <p className="text-sm text-muted-foreground">
                      Your resume has been parsed and is ready for AI analysis.
                    </p>
                  </div>
                  <Button onClick={handleAnalyzeResume} size="lg">
                    <Zap className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}
