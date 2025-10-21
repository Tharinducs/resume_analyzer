import multer from 'multer';
import { RESUME_UPLOAD_PATH } from '../constants/common.js';
import { parseResumeTextAndSave } from '../services/resume.service.js';
import { get } from '../utils/custom.lodash.js';
import { API_CODES } from '../constants/apiCodes.js';
import { ERROR_MESSAGES } from '../errors/errorMessages.js';

const upload = multer({ dest: RESUME_UPLOAD_PATH });

export const uploadResume = (req, res, next) => {
  const uploadSingle = upload.single('resume');
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ code: API_CODES.RESUME.UPLOAD_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.UPLOAD_FAILED]});
    }
    next();
  });
}

export const handleResumeUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ code: API_CODES.RESUME.NO_FILE_UPLOAD, message: ERROR_MESSAGES[API_CODES.RESUME.NO_FILE_UPLOAD] });
  }

  const userId = get(req, "body.userId")
  const title = get(req, "body.title")
  const path = get(req, "file.path")

  try {
    const extractedData = await parseResumeTextAndSave(req.file, userId, title, path)
    console.log(extractedData,"extractedData")
    res.json({ code: API_CODES.RESUME.UPLOAD_SUC ,message: "Resume uploaded successfully", resume: extractedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.UPLOAD_FAILED,message: ERROR_MESSAGES[API_CODES.RESUME.UPLOAD_FAILED]});
  }
}