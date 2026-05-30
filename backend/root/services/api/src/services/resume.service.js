import { saveResume, getResumeByUserIdWithPagination, AppError, API_CODES, ERROR_MESSAGES, getResumeById, deleteResumeById, updateResume, getAnalysesByResumeIds } from "@ra/shared";
import fs from 'node:fs'
import { RESUME_ANALYSIS_STATUS } from "../constants/common.js";

export const getResumesListByUserId = async (userId, page, limit, status, search) => {
    const skip = (page - 1) * limit;

    const filter = { userId }
    if (status && status !== 'all') filter.status = status
    if (search.trim()) filter.title = { $regex: search.trim(), $options: 'i' }

    try {
        const [resumes, total] = await getResumeByUserIdWithPagination(filter, skip, limit);

        const analyzedResumeIds = resumes
            .filter(r => r.status === RESUME_ANALYSIS_STATUS.ANALYZED && r.analysisId)
            .map(r => String(r._id));

        let scoreMap = {};
        if (analyzedResumeIds.length > 0) {
            const analyses = await getAnalysesByResumeIds(analyzedResumeIds);
            scoreMap = Object.fromEntries(
                analyses.map(a => [String(a.resumeId), a.scores?.overall ?? null])
            );
        }

        const enrichedResumes = resumes.map(r =>
            r.status === RESUME_ANALYSIS_STATUS.ANALYZED && r.analysisId
                ? { ...r, score: scoreMap[String(r._id)] ?? null }
                : r
        );

        return {
            resumes: enrichedResumes,
            pagination: {
                total,
                page: page,
                limit: limit,
                totalPages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1,
            }
        }
    } catch (err) {
        console.error("Error fetching resumes list:", err);
        throw new AppError(API_CODES.RESUME.UNABLE_FETCH_RESUMES, ERROR_MESSAGES[API_CODES.RESUME.UNABLE_FETCH_RESUMES], 503)
    }
}

export const saveResumeWithJobId = async ({ userId, title, fileUrl, jobId, size, fileType }) => {
    try {
        const savedResume = await saveResume({
            userId,
            title,
            fileUrl,
            jobId,
            status: "processing",
            size,
            fileType
        });
        return savedResume;
    } catch (err) {
        console.error("Error saving resume with job ID:", err);
        throw new AppError(API_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR], 503)
    }
}



export const getResumeDataById = async (resumeId) => {
    try {
        const resume = await getResumeById(resumeId);
        return resume;
    } catch (err) {
        console.error("Error fetching resume by ID:", err);
        throw new AppError(API_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR], 503)
    }
}

export const deleteResumeUsingId = async (resumeId) => {
    try {
        const resumeData = await getResumeById(resumeId)
        if (!resumeData) {
            return res.status(404).json({ code: API_CODES.RESUME.FETCH_FAILED, message: "Resume not found" });
        }
        const filePath = resumeData.fileUrl;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        await deleteResumeById(resumeId)
    } catch (err) {
        console.error("Error deleting resume by ID:", err);
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError(API_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR], 503)
    }
}

export const updateResumeWithUpdatedExtractedData = async (resumeId, extractedData) => {
    try {
        const updatedData = await updateResume(resumeId, {
            $set: { extractedData, updatedAt: new Date() },
        });
        return updatedData;
    } catch (err) {
        console.error("Error updating resume by ID:", err);
        throw new AppError(API_CODES.GEN.TECHNICAL_ERR, ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR], 503)
    }
}