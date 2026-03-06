import { saveResume, getResumeByUserIdWithPagination, AppError, API_CODES, ERROR_MESSAGES } from "@ra/shared";

export const getResumesListByUserId = async (userId, page, limit, status, search) => {
    const skip = (page - 1) * limit;

    const filter = { userId }
    if (status && status !== 'all') filter.status = status
    if (search.trim()) filter.title = { $regex: search.trim(), $options: 'i' }

    try {
        const [resumes, total] = await getResumeByUserIdWithPagination(filter, skip, limit);
        return {
            resumes,
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