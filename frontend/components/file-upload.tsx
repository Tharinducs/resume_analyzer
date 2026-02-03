"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileRemove: () => void
  isUploading?: boolean
  uploadProgress?: number
  acceptedFileTypes?: string[]
  maxFileSize?: number
  setUploadedFile: (file: File | null) => void
  uploadedFile: File | null
}

export function FileUpload({
  onFileRemove,
  isUploading = false,
  uploadProgress = 0,
  acceptedFileTypes = [".pdf", ".docx", ".doc"],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  setUploadedFile,
  uploadedFile,
}: FileUploadProps) {

  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0]
        if (rejection.errors[0]?.code === "file-too-large") {
          setError("File size must be less than 10MB")
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Please upload a PDF or Word document")
        } else {
          setError("Invalid file. Please try again.")
        }
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setUploadedFile(file)
      }
    },
    [setUploadedFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: maxFileSize,
    multiple: false,
  })

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setError(null)
    onFileRemove()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (uploadedFile && !isUploading) {
    return (
      <Card className="border-dashed border-2 border-green-500/50 bg-green-500/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-sm">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isUploading) {
    return (
      <Card className="border-dashed border-2 border-primary/50 bg-primary/5">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Processing {uploadedFile?.name}</p>
                <p className="text-xs text-muted-foreground">Analyzing resume content...</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={cn(
          "border-dashed border-2 cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5",
          isDragActive && "border-primary bg-primary/10",
          error && "border-destructive/50 bg-destructive/5",
        )}
      >
        <CardContent className="p-8">
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className={cn("p-4 rounded-full", isDragActive ? "bg-primary/20" : "bg-muted")}>
              <Upload className={cn("h-8 w-8", isDragActive ? "text-primary" : "text-muted-foreground")} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{isDragActive ? "Drop your resume here" : "Upload your resume"}</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your resume, or <span className="text-primary font-medium">click to browse</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {acceptedFileTypes.map((type) => (
                <Badge key={type} variant="secondary" className="text-xs">
                  {type.toUpperCase()}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
