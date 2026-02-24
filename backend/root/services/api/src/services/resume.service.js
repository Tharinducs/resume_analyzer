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