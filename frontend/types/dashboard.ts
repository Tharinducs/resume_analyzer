export type DashboardStats = {
  lastResumeScore: number | null;
  lastResumeTitle: string | null;
  totalResumes: number;
  totalResumesAnalyzed: number;
  avgJobMatchRate: number | null;
};

export type RecentActivityItem = {
  _id: string;
  title: string;
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
