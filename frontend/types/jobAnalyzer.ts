export type KeywordImportance = "high" | "medium" | "low";
export type KeywordCategory = "technical" | "soft" | "tool" | "certification";

export type ExtractedKeyword = {
  keyword: string;
  importance: KeywordImportance;
  category: KeywordCategory;
};

export type JobKeywordExtractionResult = {
  code: string;
  message: string;
  jobAnalysisId: string;
  title: string;
  keywords: ExtractedKeyword[];
  aiSummary: string;
  yearsOfExperience: string | null;
  education: string[];
  rawText: string;
};

export type ResumeKeyword = {
  keyword: string;
  matched: boolean;
  importance: KeywordImportance;
};

export type JobKeyword = {
  keyword: string;
  found: boolean;
  importance: KeywordImportance;
};

export type JobMatchResult = {
  resumeId: string;
  resumeTitle: string;
  overallScore: number;
  matchLabel: string;
  matchDescription: string;
  resumeKeywords: ResumeKeyword[];
  jobKeywords: JobKeyword[];
  missingSkills: string[];
  strongMatches: string[];
  suggestions: string[];
};

export type MatchResumeResponse = {
  code: string;
  message: string;
  matchResult: JobMatchResult;
};

export type PendingComparison = {
  _id: string;
  jobAnalysisId: string;
  jobTitle: string;
  resumeId: string;
  resumeTitle: string;
  createdAt: string;
};

export type PendingComparisonListResponse = {
  code: string;
  pending: PendingComparison[];
};

export type PendingComparisonResponse = {
  code: string;
  pending: PendingComparison;
};
