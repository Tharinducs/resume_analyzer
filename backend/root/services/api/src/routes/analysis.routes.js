import express from "express";
import { ANALYSIS_ROUTES } from "../constants/routes.js";
import { generalAnalysis } from "../controllers/analysis.controller.js";
import { newAnalysisValidator } from "../validators/analysis.validator.js";

const router = express.Router();

router.post(ANALYSIS_ROUTES.ANALYZE, newAnalysisValidator, generalAnalysis)

export default router;