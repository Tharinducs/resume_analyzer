export const ENVIRONMENTS = {
    PRODUCTION : "production",
    DEVELOPMENT : "development"
}

export const COOKIE_SETTINGS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

export const RESUME_UPLOAD_PATH = "uploads/resumes/";

export const ALLOWED_RESUME_FILE_TYPES = [".pdf", ".doc", ".docx"];

export const MAX_RESUME_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const TASK_STATUS = {
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    FAILED: "Failed"
}

export const RESUME_ANALYSIS_STATUS = {
    PROCESSING: "Processing",
    ANALYZED: "Analyzed",
    FAILED: "Failed"
}