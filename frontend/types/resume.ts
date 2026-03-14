type Resume = {
  _id: string;
  title: string;
  updatedAt: string;
  score: number;
  status: "analyzed" | "processing" | "error";
  fileType: string;
  size: string;
  extractedData?: ExtractedInfo; // This can be further typed based on the structure of the extracted data
  fileUrl?: string; // URL to access the uploaded resume file
  createdAt?: string; // Timestamp of when the resume was uploaded
};

type ResumeTypeForList = Pick<Resume, "_id" | "title" | "updatedAt" | "score" | "status" | "fileType" | "size">;

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

type  ExtractedInfo = {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
  }
  workExperience: Array<{
    _uiId?: string
    _id?: string
    position: string
    company: string
    location: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    _uiId?: string
    _id?: string
    degree: string
    school: string
    location: string
    graduationDate: string
  }>
  skills: string[]
}

type ResumeListResponse = {
  resumes: ResumeTypeForList[];
  pagination: Pagination;
};

type ResumeListParams = {
  userId: string;
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export type { Resume, ResumeTypeForList, Pagination, ResumeListResponse, ResumeListParams, ExtractedInfo };