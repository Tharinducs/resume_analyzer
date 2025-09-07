import { ERROR_CODES } from "./errorCodes";

export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH.USERNAME_PASSWORD_INCORRECT]: "Username or Password is incorrect",
  [ERROR_CODES.AUTH.GOOGLE_LOGIN_FAILED]: "Google login failed.",
  [ERROR_CODES.AUTH.TOKEN_EXPIRED]: "Your session has expired. Please login again.",

  [ERROR_CODES.PROJECT.NOT_FOUND]: "Project not found.",
  [ERROR_CODES.PROJECT.UNAUTHORIZED]: "You are not authorized to access this project.",
};