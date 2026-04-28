import express from "express"
import { createSavingsGoal, getAllSavingsGoals, updateSavingsGoal, getSavingsSummary, deleteSavingsGoal } from "../controllers/savingController.js"
import protect from "../middlewares/auth.js";

const router = express.Router()

router.use(protect)

router.post("/create", createSavingsGoal)
router.get("/savings", getAllSavingsGoals)
router.put("/:id", updateSavingsGoal)
router.delete("/:id", deleteSavingsGoal)
router.get("/summary", getSavingsSummary)

export default router