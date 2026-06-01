import express from 'express';
import { JOB_ANALYZER_ROUTES } from '../constants/routes.js';
import {
  uploadJobFile,
  extractKeywords,
  matchResume,
  listPendingComparisons,
  createPendingComparison,
  deletePendingComparison,
} from '../controllers/job-analyzer.controller.js';

const router = express.Router();

router.post(JOB_ANALYZER_ROUTES.EXTRACT_KEYWORDS, uploadJobFile, extractKeywords);
router.post(JOB_ANALYZER_ROUTES.MATCH_RESUME, matchResume);
router.get(JOB_ANALYZER_ROUTES.PENDING_LIST, listPendingComparisons);
router.post(JOB_ANALYZER_ROUTES.PENDING_ADD, createPendingComparison);
router.delete(JOB_ANALYZER_ROUTES.PENDING_REMOVE, deletePendingComparison);

export default router;
