import express from "express"
import { deleteTransaction, createTransaction, updateTransaction, getAllTransaction } from "../controllers/transactionController.js"
import authenticatedUser from "../middlewares/auth.js";

const router = express.Router();



router.post("/create", authenticatedUser, createTransaction)
router.get("/transactions", authenticatedUser, getAllTransaction)
router.put("/:id", authenticatedUser, updateTransaction)
router.delete("/:id", authenticatedUser, deleteTransaction)
export default router;