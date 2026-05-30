import express from "express"
import { registerUser, login, logout, forgotPassword, resetPassword, updatePassword, getUserDetails } from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";
import protect from "../middlewares/auth.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Strict limiter for authentication
const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, //Only 5 login attempts per hour
    message: "Too many login attempts from this IP, please try again in an hour"
});


router.post("/register", upload.single("profilePic"), registerUser)
router.post("/login", login)
router.get("/me", protect, getUserDetails)
router.get("/logout", protect, logout)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)
router.put('/password/update', protect, updatePassword)

export default router