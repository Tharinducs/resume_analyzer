export type DashboardStats = {
  lastResumeScore: number | null;
  lastResumeTitle: string | null;
  totalResumes: number;
  totalResumesAnalyzed: number;
  totalJobsAnalyzed: number;
  avgJobMatchRate: number | null;
};

export type RecentActivityItem = {
  _id: string;
  title: string;
  type: "resume" | "job";
  status: "processing" | "analyzed" | "failed" | "processed";
  score: number | null;
  analysisId: string | null;
  updatedAt: string;
};

export type ResumeImprovement = {
  atsScore: number;
  jobMatchScore: number;
  overallScore: number;
  resumeTitle: string | null;
} | null;

export type DashboardResponse = {
  code: string;
  message: string;
  stats: DashboardStats;
  recentActivity: RecentActivityItem[];
  resumeImprovement: ResumeImprovement;
};

export type ActivityHistoryResponse = {
  code: string;
  message: string;
  items: RecentActivityItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

export type SearchResumeResult = {
  _id: string;
  title: string;
  status: string;
  updatedAt: string;
};

export type SearchAnalysisResult = {
  _id: string;       // analysisId
  resumeId: string;
  title: string;     // resume title
  updatedAt: string;
};

export type SearchJobResult = {
  _id: string;
  title: string;
  updatedAt: string;
};

export type SearchPendingResult = {
  _id: string;
  jobTitle: string;
  resumeTitle: string;
  jobAnalysisId: string;
  resumeId: string;
  createdAt: string;
};

export type SearchResponse = {
  code: string;
  resumes: SearchResumeResult[];
  analyses: SearchAnalysisResult[];
  jobs: SearchJobResult[];
  pending: SearchPendingResult[];
};
