import express from "express"
import { registerUser, login, logout, forgotPassword, resetPassword, updatePassword } from "../controllers/userController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticatedUser from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), registerUser)
router.post("/login", login)
router.get("/logout", authenticatedUser, logout)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword)
router.put('/password/update',authenticatedUser, updatePassword)


export default router