import multer from 'multer';
import * as crypto from 'node:crypto';
import { RESUME_UPLOAD_PATH } from '../constants/common.js';
import { get, API_CODES, ERROR_MESSAGES, saveResume } from '@ra/shared';
import { publishToQueue } from '../utils/publish.js';

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const handleResumeUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ code: API_CODES.RESUME.NO_FILE_UPLOAD, message: ERROR_MESSAGES[API_CODES.RESUME.NO_FILE_UPLOAD] });
  }

  const userId = get(req, "body.userId")
  const title = get(req, "body.title")
  const path = get(req, "file.path")

  try {
    const uniqueId = crypto.randomUUID();
    const savedResume = await saveResume({ userId, title, fileUrl: path, jobId: uniqueId,});
    console.log("Resume metadata saved successfully:", savedResume);
    await publishToQueue({ userId, title, path, file: req.file,id:uniqueId, resumeId: get(savedResume,"_id") }, "pdfQueue");
    res.status(200).json({ code: API_CODES.RESUME.UPLOAD_SUC ,message: "Resume uploaded successfully", resume: savedResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.UPLOAD_FAILED,message: ERROR_MESSAGES[API_CODES.RESUME.UPLOAD_FAILED]});
  }
}

export const getResumesListByUser = async (req, res) => {
  const userId = get(req, "params.userId")

  try {
    const resumesList = await getResumesListByUserId(userId)
    res.status(200).json({ code: API_CODES.RESUME.FETCH_SUC ,message: "Resumes fetched successfully", resumes: resumesList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.FETCH_FAILED,message: ERROR_MESSAGES[API_CODES.RESUME.FETCH_FAILED]});
  }
}