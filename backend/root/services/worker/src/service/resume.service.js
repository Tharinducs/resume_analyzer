import { resumeParser, extractResumeData } from "../utils/resume.parser.js";
// import { assessATS } from "../utils/ats.checker.js";
// import { analyzeQuality } from "../utils/qulity.anlayser.js";
import { updateResume, AppError, API_CODES, ERROR_MESSAGES } from "@ra/shared";
import moment from "moment";

// export const processResume = async (parsedText, userId, jobKeywords) => {
//     try {
//         //   const parsedText = await parseResumeFile(file);
//         const extractedData = await extractResumeData(parsedText);
//         const atsReport = assessATS(parsedText, jobKeywords);
//         const qualityReport = await analyzeQuality(parsedText);

//         // const saved = await saveResume({
//         //     userId,
//         //     originalFileName: file.originalname,
//         //     parsedText,
//         //     extractedData,
//         //     atsReport,
//         //     qualityReport,
//         // });

//         // return saved;
//     } catch (err) {

//     }
// };

export const parseResumeTextAndSave = async ({ file, userId, title, path,resumeId }) => {
    try {
        const parsedText = await resumeParser(file)
        const extractedData = await extractResumeData(parsedText);
        await updateResume(resumeId, {
            userId,
            title,
            fileUrl: path,
            parsedText,
            extractedData,
            updatedAt: moment().toISOString(),
        });
    } catch (err) {
        console.error("Error parsing resume file:", err);
        throw new AppError(API_CODES.RESUME.UNABLE_PARSE_THE_FILE, ERROR_MESSAGES[API_CODES.RESUME.UNABLE_PARSE_THE_FILE], 503)
    }
}