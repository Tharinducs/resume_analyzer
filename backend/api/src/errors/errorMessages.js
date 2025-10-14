import { API_CODES } from "../constants/apiCodes.js";

export const ERROR_MESSAGES = {
  [API_CODES.AUTH.USERNAME_PASSWORD_INCORRECT]: "Username or Password is incorrect",
  [API_CODES.AUTH.GOOGLE_LOGIN_FAILED]: "Google login failed.",
  [API_CODES.AUTH.TOKEN_EXPIRED]: "Your session has expired. Please login again.",

  [API_CODES.PROJECT.NOT_FOUND]: "Project not found.",
  [API_CODES.PROJECT.UNAUTHORIZED]: "You are not authorized to access this project.",

  [API_CODES.GEN.TECHNICAL_ERR]: "There is a Technical Error.",

  [API_CODES.AUTH.THERE_IS_A_USER_ALREADY_WITH_EMAIL]: "There is a user already with this email.",
  [API_CODES.AUTH.INVALID_USER]: "Invalid user.",
  [API_CODES.AUTH.TECHNICAL_ERR]: "There is a technical error.",
  [API_CODES.AUTH.NO_REFRESH_TOKEN]: "No refresh token provided.",
  [API_CODES.AUTH.INVALID_REFRESH_TOKEN]: "Invalid refresh token.",
  [API_CODES.AUTH.AUTH_HEADER_MISSING]: "Authorization header is missing.",
  [API_CODES.AUTH.INVALID_AUTH_HEADER]: "Invalid authorization header format.",
  [API_CODES.AUTH.USER_NOT_FOUND]: "User not found.",
};