import express from "express"
import { createBill, getAllBills, updateBill, deleteBill, getUpcomingBills, markBillAsPaid } from "../controllers/billController.js"
import protect from "../middlewares/auth.js"

const router = express.Router()

router.use(protect)
router.post("/create", createBill)
router.get("/bills", getAllBills)
router.put("/:id", updateBill)
router.delete("/:id", deleteBill)
router.get("/upcoming", getUpcomingBills)
router.put("/:id/pay", markBillAsPaid)

export default router