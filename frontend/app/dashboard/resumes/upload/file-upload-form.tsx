import React from "react"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { isEmpty } from "lodash"
import { FileUpload } from "@/components/file-upload"

type FileUploadFormProps = {
    uploadedFile: File | null;
    title: string;
    setTitle: (title: string) => void;
    titleError: string;
    setTitleError: (error: string) => void;
    setUploadedFile: (file: File | null) => void;
    handleFileUpload: () => void;
    handleFileRemove: () => void;
}

const FileUploadForm = ({ uploadedFile, title, setTitle, titleError, setTitleError, setUploadedFile, handleFileUpload,handleFileRemove }: FileUploadFormProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Title for Resume</Label>
                <Input
                    id="name"
                    value={title}
                    onChange={(e) => {
                        if (titleError && !isEmpty(e.target.value)) {
                            setTitleError("");
                        }
                        setTitle(e.target.value)
                    }}
                    placeholder="Enter the title for your resume"
                    required
                    className={titleError ? "border-red-500" : ""}
                    onBlur={(e) => {
                        if (isEmpty(e.target.value)) {
                            setTitleError("Title is required");
                        } else {
                            setTitleError("");
                        }
                    }}
                />
                {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
            </div>
            <FileUpload setUploadedFile={setUploadedFile} uploadedFile={uploadedFile} onFileRemove={handleFileRemove} />
            <Button className="" onClick={handleFileUpload} disabled={!uploadedFile || !title || !isEmpty(titleError)} size="lg">
                Upload
            </Button>
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
    );
}

export default FileUploadForm;