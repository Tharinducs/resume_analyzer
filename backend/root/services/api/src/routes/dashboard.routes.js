import express from "express";
import { DASHBOARD_ROUTES } from "../constants/routes.js";
import { getDashboardStats, getActivityHistory } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(DASHBOARD_ROUTES.GET_STATS, getDashboardStats);
router.get(DASHBOARD_ROUTES.GET_ACTIVITY, getActivityHistory);

export default router;
