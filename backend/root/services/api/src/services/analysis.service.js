import { saveAnalysis, getAnalysisByResumeId, getResumeById, AppError, get, isEmpty } from "@ra/shared";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";
import { API_CODES } from "../constants/apiCodes.js";
import { runGeneralAnalysis } from "../utils/qulity.anlayser.js";

export const analyseTheResumeUsingResumeId = async (resumeId,userId) => {
    try {
        const resumeData = await getResumeById(resumeId)
        const extractedData = get(resumeData,"extractedData",{})
        if (isEmpty(extractedData)) {
            throw new AppError(API_CODES.ANALYSIS.NO_EXTRACTED_DATA, ERROR_MESSAGES[API_CODES.ANALYSIS.NO_EXTRACTED_DATA], 400)
        }
        const cached = await getAnalysisByResumeId(resumeId);
        if (cached) {
            //return { data: cached, isCached: true, analysisId: cached._id };
        }
        const geminiData = await runGeneralAnalysis(extractedData)

        const savedAnalysis = await saveAnalysis({
            userId,
            resumeId,
            ...geminiData
        })
        return { data: savedAnalysis, isCached: false, analysisId: savedAnalysis._id };
    } catch (err){
       console.log("Error:" , err)
       throw new AppError(API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING, ERROR_MESSAGES[API_CODES.ANALYSIS.ERROR_WHILE_ANALYSING], 503)
    }
}