
export const API = "/api";

export const AUTH_ROUTE = `${API}/auth`;

export const AUTH_ROUTES = {
  LOGIN: `/login`,
  REGISTER: `/register`,
  PROVIDER_LOGIN: `/provider`,
  LOGOUT: `/logout`,
  REFRESH : `/refresh-token`,
  ME: `/me`,
  UPDATE_ME: `/me`,
  UPLOAD_PICTURE: `/me/picture`,
};

export const RESUME_ROUTE = `${API}/resume`;

export const RESUME_ROUTES = {
  UPLOAD: `/upload`,
  GET_REPORT: `/report/:resumeId`,
  LIST: `/list`,
  LIST_BY_USER: `/list/:userId`,
  DELETE: `/delete/:resumeId`,
  DOWNLOAD: `/download/:resumeId`,
  GET_BY_ID: `/:resumeId`,
  UPDATE_RESUME: `/update/:resumeId`
};

export const DASHBOARD_ROUTE = `${API}/dashboard`;

export const DASHBOARD_ROUTES = {
  GET_STATS: `/:userId`,
  GET_ACTIVITY: `/:userId/activity`,
};

export const ANALYSIS_ROUTE = `${API}/analyze`;

export const ANALYSIS_ROUTES = {
ANALYZE: `/:resumeId`,
GET_ANALYSIS_RESULT: `/result/:analysisId`,
UPDATE_FEEDBACK: `/:analysisId/feedback`
}

export const JOB_ANALYZER_ROUTE = `${API}/job-analyze`;

export const JOB_ANALYZER_ROUTES = {
  EXTRACT_KEYWORDS: `/extract-keywords`,
  MATCH_RESUME: `/match-resume`,
  PENDING_LIST: `/pending-comparisons`,
  PENDING_ADD: `/pending-comparisons`,
  PENDING_REMOVE: `/pending-comparisons/:id`,
};