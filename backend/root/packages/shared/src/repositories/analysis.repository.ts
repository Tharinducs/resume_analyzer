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

export const getAnalysisByAnalysisId = async (analysisId: string) => {
    return await Analysis.findById(analysisId);
}

export const getFullAnalysesByResumeIds = async (resumeIds: string[]) => {
    return await Analysis.find({ resumeId: { $in: resumeIds } })
        .select('resumeId scores atsBreakdown createdAt')
        .sort({ createdAt: -1 })
        .lean();
}

export const updateAiFeedbackByAnalysisId = async (analysisId: string, aiFeedback: any[]) => {
    return await Analysis.findByIdAndUpdate(
        analysisId,
        { $set: { aiFeedback, updatedAt: new Date() } },
        { new: true }
    );
}