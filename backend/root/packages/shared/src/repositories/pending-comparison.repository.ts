import { PendingComparison } from "../models/pending-comparison.model.js";

export const addPendingComparison = async (data: {
  userId: string;
  jobAnalysisId: string;
  jobTitle: string;
  resumeId: string;
  resumeTitle: string;
}) => {
  return await new PendingComparison(data).save();
};

export const getPendingComparisonsByUserId = async (userId: string) => {
  return await PendingComparison.find({ userId }).sort({ createdAt: -1 }).lean();
};

export const removePendingComparison = async (id: string, userId: string) => {
  return await PendingComparison.findOneAndDelete({ _id: id, userId });
};

export const removePendingComparisonByResumeAndJob = async (
  userId: string,
  resumeId: string,
  jobAnalysisId: string
) => {
  return await PendingComparison.findOneAndDelete({ userId, resumeId, jobAnalysisId });
};
