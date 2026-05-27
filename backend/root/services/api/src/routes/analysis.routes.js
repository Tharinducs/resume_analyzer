import express from "express";
import { ANALYSIS_ROUTES } from "../constants/routes.js";
import { generalAnalysis , getAnalysisResult} from "../controllers/analysis.controller.js";
import { newAnalysisValidator } from "../validators/analysis.validator.js";

const router = express.Router();

router.post(ANALYSIS_ROUTES.ANALYZE, newAnalysisValidator, generalAnalysis)
router.get(ANALYSIS_ROUTES.GET_ANALYSIS_RESULT, getAnalysisResult)

export default router;