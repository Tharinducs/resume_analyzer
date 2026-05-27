import { Analysis } from "../models/analysis.model.js";

export const saveAnalysis = async (anlysisData: any) => {
  const analysis = new Analysis(anlysisData);
  return await analysis.save();
};

export const getAnalysisByResumeId = async (resumeId: string) => {
    return await Analysis.findOne({ resumeId }).sort({ createdAt: -1 })
}

export const deleteAnalysisByResumeId = async (resumeId: string) => {
    return await Analysis.deleteMany({ resumeId })
}

export const getAnalysesByResumeIds = async (resumeIds: string[]) => {
    return await Analysis.find({ resumeId: { $in: resumeIds } }).select('resumeId scores').lean();
}