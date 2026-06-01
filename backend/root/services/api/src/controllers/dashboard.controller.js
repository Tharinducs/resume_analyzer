import { get, AppError } from "@ra/shared";
import { API_CODES } from "../constants/apiCodes.js";
import { ERROR_MESSAGES } from "../errors/errorMessages.js";
import { getDashboardDataForUser, getActivityHistoryForUser } from "../services/dashboard.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = get(req, "params.userId");
    const data = await getDashboardDataForUser(userId);
    res.status(200).json({
      code: API_CODES.DASHBOARD.FETCH_SUC,
      message: "Dashboard data fetched successfully",
      ...data,
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    next(
      new AppError(
        API_CODES.DASHBOARD.FETCH_FAILED,
        ERROR_MESSAGES[API_CODES.DASHBOARD.FETCH_FAILED],
        503
      )
    );
  }
};

export const getActivityHistory = async (req, res, next) => {
  try {
    const userId = get(req, "params.userId");
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const data = await getActivityHistoryForUser(userId, page, limit);
    res.status(200).json({
      code: API_CODES.DASHBOARD.FETCH_SUC,
      message: "Activity history fetched successfully",
      ...data,
    });
  } catch (err) {
    console.error("Error fetching activity history:", err);
    next(
      new AppError(
        API_CODES.DASHBOARD.FETCH_FAILED,
        ERROR_MESSAGES[API_CODES.DASHBOARD.FETCH_FAILED],
        503
      )
    );
  }
};
