import { saveAnalysis, getAnalysisByResumeId, deleteAnalysisByResumeId, getResumeById, updateResume, AppError, get, isEmpty, getAnalysisByAnalysisId, updateAiFeedbackByAnalysisId } from "@ra/shared";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";
import { API_CODES } from "../constants/apiCodes.js";
import { runGeneralAnalysis } from "../utils/qulity.anlayser.js";
import { RESUME_ANALYSIS_STATUS } from "../constants/common.js";

export const analyseTheResumeUsingResumeId = async (resumeId,userId) => {
    try {
        const resumeData = await getResumeById(resumeId)
        const extractedData = get(resumeData,"extractedData",{})
        if (isEmpty(extractedData)) {
            throw new AppError(API_CODES.ANALYSIS.NO_EXTRACTED_DATA, ERROR_MESSAGES[API_CODES.ANALYSIS.NO_EXTRACTED_DATA], 400)
        }
        const cached = await getAnalysisByResumeId(resumeId);
        if (cached) {
            const isStale = new Date(get(resumeData, "updatedAt", resumeData.createdAt)) > new Date(cached.createdAt);
            const isValid = get(cached, "scores.overall", 0) > 0;
            if (!isStale && isValid) {
                return { isCached: true, analysisId: cached._id };
            }
            await deleteAnalysisByResumeId(resumeId);
        }
        const geminiData = await runGeneralAnalysis(extractedData)

        const savedAnalysis = await saveAnalysis({
            userId,
            resumeId,
            ...geminiData
        })
        await updateResume(resumeId, { status: RESUME_ANALYSIS_STATUS.ANALYZED, analysisId: savedAnalysis._id });
        return { isCached: false, analysisId: savedAnalysis._id };
    } catch (err){
       console.log("Error:" , err)
       throw new AppError(API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING], 503)
    }
}

export const getAnalysisResultUsingAnalysisId = async (analysisId) => {
    try {
        const analysisData = await getAnalysisByAnalysisId(analysisId);
        if (!analysisData) {
            throw new AppError(API_CODES.ANALYSIS.ANALYSIS_NOT_FOUND, ERROR_MESSAGES[API_CODES.ANALYSIS.ANALYSIS_NOT_FOUND], 404)
        }
        return { analysis: analysisData };
    } catch (err){
       console.log("Error:" , err)
       throw new AppError(API_CODES.ANALYSIS.ERROR_WHILE_FETCHING_ANALYSIS, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_FETCHING_ANALYSIS], 503)
    }
}

export const saveFeedbackDecisions = async (analysisId, aiFeedback) => {
    try {
        const updated = await updateAiFeedbackByAnalysisId(analysisId, aiFeedback);
        if (!updated) {
            throw new AppError(API_CODES.ANALYSIS.ANALYSIS_NOT_FOUND, ERROR_MESSAGES[API_CODES.ANALYSIS.ANALYSIS_NOT_FOUND], 404)
        }
        return { analysis: updated };
    } catch (err) {
        console.log("Error while saving feedback decisions:", err)
        throw new AppError(API_CODES.ANALYSIS.ERROR_WHILE_UPDATING_FEEDBACK, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_UPDATING_FEEDBACK], 503)
    }
}