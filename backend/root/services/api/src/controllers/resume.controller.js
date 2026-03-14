import multer from 'multer';
import * as crypto from 'node:crypto';
import { RESUME_UPLOAD_PATH } from '../constants/common.js';
import { get, API_CODES, ERROR_MESSAGES, MIME_TO_FILE_TYPE, FILE_TYPE_TO_MIME } from '@ra/shared';
import { publishToQueue } from '../utils/publish.js';
import { saveResumeWithJobId, getResumesListByUserId, getResumeDataById, deleteResumeUsingId, updateResumeWithUpdatedExtractedData } from '../services/resume.service.js';
import { formatFileSize } from '../utils/utility.js';
import path from 'node:path';
import fs from 'node:fs';

const upload = multer({ dest: RESUME_UPLOAD_PATH });

export const uploadResume = (req, res, next) => {
  const uploadSingle = upload.single('resume');
  uploadSingle(req, res, function (err) {
    if (err) {
      return res.status(400).json({ code: API_CODES.RESUME.UPLOAD_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.UPLOAD_FAILED] });
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
    console.log("Received resume upload request for userId:", userId, "with file:", req.file);
    const uniqueId = crypto.randomUUID();
    const fileSize = formatFileSize(get(req, "file.size"));
    const fileType = MIME_TO_FILE_TYPE[get(req, "file.mimetype")];
    const savedResume = await saveResumeWithJobId({ userId, title, fileUrl: path, jobId: uniqueId, size: fileSize, fileType });
    await publishToQueue({ userId, title, path, file: req.file, id: uniqueId, resumeId: get(savedResume, "_id") }, "pdfQueue");
    res.status(200).json({ code: API_CODES.RESUME.UPLOAD_SUC, message: "Resume uploaded successfully", resume: savedResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.UPLOAD_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.UPLOAD_FAILED] });
  }
}

export const getResumesListByUser = async (req, res) => {
  const userId = get(req, "params.userId")
  const page = Number.parseInt(get(req, "query.page", "1"), 10);
  const limit = Number.parseInt(get(req, "query.limit", "10"), 10);
  const status = get(req, "query.status", "all");
  const search = get(req, "query.search", "");

  try {
    const resmesList = await getResumesListByUserId(userId, page, limit, status, search)
    res.status(200).json({ code: API_CODES.RESUME.FETCH_SUC, message: "Resumes fetched successfully", ...resmesList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.FETCH_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.FETCH_FAILED] });
  }
}

export const getResumeByResumeId = async (req, res) => {
  const resumeId = get(req, "params.resumeId")

  try {
    const resumeData = await getResumeDataById(resumeId)
    res.status(200).json({ code: API_CODES.RESUME.FETCH_SUC, message: "Resume data fetched successfully", resume: resumeData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.FETCH_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.FETCH_FAILED] });
  }
}

export const downloadResumeFile = async (req, res) => {
  const resumeId = get(req, "params.resumeId")

  try {
    const resumeData = await getResumeDataById(resumeId)
    if (!resumeData || !resumeData.fileUrl) {
      return res.status(404).json({ code: API_CODES.RESUME.FETCH_FAILED, message: "Resume file not found" });
    }
    const filePath = resumeData.fileUrl;

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' })
    }
    const mimetype = FILE_TYPE_TO_MIME[resumeData.fileType] || 'application/octet-stream';
    res.setHeader('Content-Disposition', `attachment; filename="${resumeData.title || 'resume'}${path.extname(resumeData.fileUrl)}"`);
    res.setHeader('Content-Type', mimetype);
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.FETCH_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.FETCH_FAILED] });
  }
}

export const deleteResume = async (req, res) => {
  const resumeId = get(req, "params.resumeId")
  try {
    await deleteResumeUsingId(resumeId)
    res.status(200).json({ code: API_CODES.RESUME.DELETE_SUC, message: "Resume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.RESUME.DELETE_FAILED, message: ERROR_MESSAGES[API_CODES.RESUME.DELETE_FAILED] });
  }
}

export const updateResumeData = async (req, res) => {
  const resumeId = get(req, "body.resumeId")
  const resumeData = get(req, "body.resumeData")
  try {
    const updatedResumeData = await updateResumeWithUpdatedExtractedData(resumeId, resumeData)
    res.status(200).json({ code: API_CODES.RESUME.DELETE_SUC, resume: updatedResumeData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: API_CODES.GEN.TECHNICAL_ERR, message: ERROR_MESSAGES[API_CODES.GEN.TECHNICAL_ERR] });
  }
}