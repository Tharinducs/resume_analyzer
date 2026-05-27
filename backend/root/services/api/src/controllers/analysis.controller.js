import { get } from "@ra/shared";
import { API_CODES } from "../constants/apiCodes.js";
import { analyseTheResumeUsingResumeId, getAnalysisResultUsingAnalysisId  } from "../services/analysis.service.js";

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