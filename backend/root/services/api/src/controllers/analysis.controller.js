import { get } from "@ra/shared";
import { API_CODES } from "../constants/apiCodes.js";
import { analyseTheResumeUsingResumeId } from "../services/analysis.service.js";

export const generalAnalysis = async (req, res,next) => {
    try {
        const resumeId  =  get(req,"params.resumeId");
        const userId  = get(req,"body.userId");
        const data = await analyseTheResumeUsingResumeId(resumeId,userId)
        res.status(200).json({ code: API_CODES.ANALYSIS.ANALYSIS_SUC, message: "Your Analysis has been successfully completed!", data });
    } catch (err) {
        console.log(err,"err")
    }
}            