import express from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrend,
  getRecentTransactions
} from "../controllers/dashboardController.js";
import protect from "../middlewares/auth.js"

const router = express.Router();

router.use(protect);
router.get("/summary", getSummary);
router.get("/category-breakdown", getCategoryBreakdown);
router.get("/monthly-trend", getMonthlyTrend);
router.get("/recent", getRecentTransactions);

export default router;