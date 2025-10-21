import { resumeParser, extractResumeData } from "../utils/resume.parser.js";
import { assessATS } from "../utils/ats.checker.js";
import { analyzeQuality } from "../utils/qulity.anlayser.js";
import { saveResume } from "../repositories/resume.repository.js";
import { AppError } from "../errors/AppError.js";
import { API_CODES } from "../constants/apiCodes.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";

export const processResume = async (parsedText, userId, jobKeywords) => {
    try {
        //   const parsedText = await parseResumeFile(file);
        const extractedData = await extractResumeData(parsedText);
        const atsReport = assessATS(parsedText, jobKeywords);
        const qualityReport = await analyzeQuality(parsedText);

        // const saved = await saveResume({
        //     userId,
        //     originalFileName: file.originalname,
        //     parsedText,
        //     extractedData,
        //     atsReport,
        //     qualityReport,
        // });

        // return saved;
    } catch (err) {

    }
};

export const parseResumeTextAndSave = async (file, userId, title, path) => {
    try {
        const parsedText = await resumeParser(file)
        const extractedData = await extractResumeData(parsedText);
        const saved = await saveResume({
            userId,
            title,
            fileUrl: path,
            parsedText,
            extractedData
        });
        return saved;
    } catch (err) {
        throw new AppError(API_CODES.RESUME.UNABLE_PARSE_THE_FILE, ERROR_MESSAGES[API_CODES.RESUME.UNABLE_PARSE_THE_FILE], 503)
    }
}
