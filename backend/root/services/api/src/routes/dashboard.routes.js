import express from "express";
import { DASHBOARD_ROUTES } from "../constants/routes.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(DASHBOARD_ROUTES.GET_STATS, getDashboardStats);

export default router;
