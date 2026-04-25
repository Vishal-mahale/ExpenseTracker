
import express from "express"
import { createBudget, getAllBudgets, updateBudget, deleteBudget, getBudgetAlerts } from "../controllers/budgetController.js"
import protect from "../middlewares/auth.js"

const router = express.Router()

router.use(protect)
router.post("/create", createBudget)
router.get("/budgets", getAllBudgets)
router.put("/:id", updateBudget)
router.delete("/:id", deleteBudget)
router.get("/alerts", getBudgetAlerts)

export default router