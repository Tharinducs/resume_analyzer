
export const API = "/api";

export const AUTH_ROUTE = `${API}/auth`;

export const AUTH_ROUTES = {
  LOGIN: `/login`,
  REGISTER: `/register`,
  PROVIDER_LOGIN: `/provider`,
  LOGOUT: `/logout`,
  REFRESH : `/refresh-token`,
  ME: `/me`,
};

export const RESUME_ROUTE = `${API}/resume`;

export const RESUME_ROUTES = {
  UPLOAD: `/upload`,
  ANALYZE: `/analyze/:resumeId`,
  GET_REPORT: `/report/:resumeId`,
  LIST: `/list`,
  DELETE: `/delete/:resumeId`,
};