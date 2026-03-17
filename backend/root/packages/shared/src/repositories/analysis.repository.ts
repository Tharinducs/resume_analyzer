import { Analysis } from "../models/analysis.model.js";

export const saveAnalysis = async (anlysisData: any) => {
  const analysis = new Analysis(anlysisData);
  return await analysis.save();
};

export const getAnalysisByResumeId = async (resumeId: string) => {
    return await Analysis.findOne({ resumeId })
}