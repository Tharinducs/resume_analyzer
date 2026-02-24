import { API_CODES } from "../constants/apiCodes.js";

export const ERROR_MESSAGES = {
  [API_CODES.GEN.TECHNICAL_ERR]: "There is a Technical Error.",

  [API_CODES.RESUME.UNABLE_PARSE_THE_FILE] : "File is unable to parse.",
  [API_CODES.RESUME.NO_FILE_UPLOAD] : "No file has been uploaded",
  [API_CODES.RESUME.UPLOAD_FAILED] : "File upload has been failed"
};