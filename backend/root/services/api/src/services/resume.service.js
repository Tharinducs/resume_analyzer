import { saveResume, getResumesListByUserId as getResumesListByUserIdService, AppError,API_CODES, ERROR_MESSAGES} from "@ra/shared";

export const getResumesListByUserId = async (userId) => {
    try {
        const resumesList = await getResumesListByUserIdService(userId);
        return resumesList;
    } catch (err) {
        console.error("Error fetching resumes list:", err);
        throw new AppError(API_CODES.RESUME.UNABLE_FETCH_RESUMES, ERROR_MESSAGES[API_CODES.RESUME.UNABLE_FETCH_RESUMES], 503)
    }
}

export const saveResumeWithJobId = async ({ userId, title, fileUrl,jobId, size, fileType }) => {
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