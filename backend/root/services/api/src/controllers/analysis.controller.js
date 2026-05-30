import { get,AppError } from "@ra/shared";
import { API_CODES } from "../constants/apiCodes.js";
import { analyseTheResumeUsingResumeId, getAnalysisResultUsingAnalysisId, saveFeedbackDecisions } from "../services/analysis.service.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";

export const generalAnalysis = async (req, res,next) => {
    try {
        const resumeId  =  get(req,"params.resumeId");
        const userId  = get(req,"body.userId");
        const data = await analyseTheResumeUsingResumeId(resumeId,userId)
        res.status(200).json({ code: API_CODES.ANALYSIS.ANALYSIS_SUC, message: "Your Analysis has been successfully completed!", ...data });
    } catch (err) {
        console.log("Error While Analysing:", err)
        next(new AppError(API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING], 503))
    }
}            

export const getAnalysisResult = async (req, res,next) => {
    try {
        const analysisId  =  get(req,"params.analysisId");
        const data = await getAnalysisResultUsingAnalysisId(analysisId)
        res.status(200).json({ code: API_CODES.ANALYSIS.ANALYSIS_SUC, message: "Your Analysis has been successfully completed!", ...data });
    } catch (err) {
        console.log("Error While Fetching Analysis Result:", err)
        next(new AppError(API_CODES.ANALYSIS.ERROR_WHILE_FETCHING_ANALYSIS, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_FETCHING_ANALYSIS], 503))
    }
}

export const updateFeedback = async (req, res, next) => {
    try {
        const analysisId = get(req, "params.analysisId");
        const aiFeedback = get(req, "body.aiFeedback");
        const data = await saveFeedbackDecisions(analysisId, aiFeedback);
        res.status(200).json({ code: API_CODES.ANALYSIS.FEEDBACK_UPDATED_SUC, message: "Feedback decisions saved successfully!", ...data });
    } catch (err) {
        console.log("Error While Updating Feedback:", err)
        next(new AppError(API_CODES.ANALYSIS.ERROR_WHILE_UPDATING_FEEDBACK, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_UPDATING_FEEDBACK], 503))
    }
}