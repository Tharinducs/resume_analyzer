import express from "express";
import { ANALYSIS_ROUTE } from "../constants/routes.js";
import { generalAnalysisRoutes } from "../controllers/analysis.controller.js";

const router = express.Router();

router.post(ANALYSIS_ROUTE,generalAnalysisRoutes)

export default router;