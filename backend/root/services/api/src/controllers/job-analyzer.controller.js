import multer from 'multer';
import { API_CODES } from '../constants/apiCodes.js';
import { extractKeywordsFromJobDescription, matchResumeWithJobKeywords } from '../services/job-analyzer.service.js';
import { RESUME_UPLOAD_PATH } from '../constants/common.js';
import { get, addPendingComparison, getPendingComparisonsByUserId, removePendingComparison, removePendingComparisonByResumeAndJob } from '@ra/shared';

const upload = multer({ dest: RESUME_UPLOAD_PATH });

export const uploadJobFile = (req, res, next) => {
  const uploadSingle = upload.single('file');
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ code: API_CODES.JOB_ANALYZER.EXTRACT_FAILED, message: 'File upload failed.' });
    next();
  });
};

export const extractKeywords = async (req, res) => {
  const text = req.body?.text || null;
  const filePath = req.file?.path || null;
  const userId = get(req, 'user.id', null);

  if (!text && !filePath) {
    return res.status(400).json({ code: API_CODES.JOB_ANALYZER.NO_INPUT, message: 'Provide job description text or upload a PDF.' });
  }

  try {
    const result = await extractKeywordsFromJobDescription({ userId, text, filePath });

    return res.status(200).json({
      code: API_CODES.JOB_ANALYZER.EXTRACT_SUC,
      message: 'Keywords extracted successfully.',
      ...result,
    });
  } catch (err) {
    const status = err.statusCode || 503;
    return res.status(status).json({ code: err.code || API_CODES.JOB_ANALYZER.EXTRACT_FAILED, message: err.message });
  }
};

export const matchResume = async (req, res) => {
  const { jobAnalysisId, resumeId } = req.body || {};
  const userId = get(req, 'user.id', null);

  if (!jobAnalysisId || !resumeId) {
    return res.status(400).json({ code: API_CODES.JOB_ANALYZER.MATCH_FAILED, message: 'jobAnalysisId and resumeId are required.' });
  }

  try {
    const result = await matchResumeWithJobKeywords({ jobAnalysisId, resumeId });
    // Clean up any pending comparison for this pair
    if (userId) {
      await removePendingComparisonByResumeAndJob(userId, resumeId, jobAnalysisId).catch(() => {});
    }
    return res.status(200).json({
      code: API_CODES.JOB_ANALYZER.MATCH_SUC,
      message: 'Resume matched successfully.',
      matchResult: result,
    });
  } catch (err) {
    const status = err.statusCode || 503;
    return res.status(status).json({ code: err.code || API_CODES.JOB_ANALYZER.MATCH_FAILED, message: err.message });
  }
};

export const listPendingComparisons = async (req, res) => {
  const userId = get(req, 'user.id', null);
  try {
    const items = await getPendingComparisonsByUserId(userId);
    return res.status(200).json({ code: API_CODES.JOB_ANALYZER.PENDING_LIST_SUC, pending: items });
  } catch (err) {
    return res.status(500).json({ code: API_CODES.JOB_ANALYZER.MATCH_FAILED, message: err.message });
  }
};

export const createPendingComparison = async (req, res) => {
  const userId = get(req, 'user.id', null);
  const { jobAnalysisId, jobTitle, resumeId, resumeTitle } = req.body || {};

  if (!jobAnalysisId || !resumeId || !jobTitle || !resumeTitle) {
    return res.status(400).json({ code: API_CODES.JOB_ANALYZER.MATCH_FAILED, message: 'jobAnalysisId, jobTitle, resumeId and resumeTitle are required.' });
  }

  try {
    const item = await addPendingComparison({ userId, jobAnalysisId, jobTitle, resumeId, resumeTitle });
    return res.status(201).json({ code: API_CODES.JOB_ANALYZER.PENDING_ADD_SUC, pending: item });
  } catch (err) {
    return res.status(500).json({ code: API_CODES.JOB_ANALYZER.MATCH_FAILED, message: err.message });
  }
};

export const deletePendingComparison = async (req, res) => {
  const userId = get(req, 'user.id', null);
  const { id } = req.params;

  try {
    const deleted = await removePendingComparison(id, userId);
    if (!deleted) {
      return res.status(404).json({ code: API_CODES.JOB_ANALYZER.PENDING_NOT_FOUND, message: 'Pending comparison not found.' });
    }
    return res.status(200).json({ code: API_CODES.JOB_ANALYZER.PENDING_REMOVE_SUC, message: 'Removed.' });
  } catch (err) {
    return res.status(500).json({ code: API_CODES.JOB_ANALYZER.MATCH_FAILED, message: err.message });
  }
};
