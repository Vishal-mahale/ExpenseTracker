import express from "express"
import { registerUser, login } from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();
router.post("/register",upload.single("profilePic"), registerUser)
router.post("/login", login)
export default router