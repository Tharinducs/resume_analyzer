import { JobAnalysis } from "../models/job-analysis.model.js";

export const saveJobAnalysis = async (data: any) => {
  const doc = new JobAnalysis(data);
  return await doc.save();
};

export const getJobAnalysisById = async (id: string) => {
  return await JobAnalysis.findById(id).lean();
};

export const getJobAnalysesByUserId = async (userId: string) => {
  return await JobAnalysis.find({ userId }).sort({ createdAt: -1 }).lean();
};

export const getRecentJobAnalysesByUserId = async (userId: string, limit = 5) => {
  return await JobAnalysis.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("_id title aiSummary createdAt updatedAt fileUrl")
    .lean();
};

export const saveJobMatchResult = async (jobAnalysisId: string, matchResult: any) => {
  return await JobAnalysis.findByIdAndUpdate(
    jobAnalysisId,
    {
      $push: { matchResults: matchResult },
      $set: { updatedAt: new Date() },
    },
    { new: true }
  );
};
