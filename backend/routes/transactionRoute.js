import express from "express"
import { deleteTransaction, createTransaction, updateTransaction, getAllTransaction } from "../controllers/transactionController.js"
import protect from "../middlewares/auth.js";

const router = express.Router();


router.use(protect);
router.post("/create", createTransaction)
router.get("/transactions", getAllTransaction)
router.put("/:id", updateTransaction)
router.delete("/:id", deleteTransaction)
export default router;