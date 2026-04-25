import User from "../model/User.js"
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcrypt'
import ErrorHandler from "../util/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import jwtToken from "jsonwebtoken"
import sendToken from "../util/getJwtToken.js"
import sendEmail from "../util/sendMail.js"
import crypto from "crypto"

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return next(new ErrorHandler("All fields (name,email,password) are required.", 400))
    }

    if (name.length < 2) {
        return next(new ErrorHandler("Name must be at least 2 characters.", 400))
    }

    if (!isValidEmail(email)) {
        return next(new ErrorHandler("Invalid email", 400))
    }

    if (password.length < 6) {
        return next(new ErrorHandler("Password must be at least 6 characters.", 400))
    }

    const user = await User.findOne({ email })
    if (user) {
        return next(new ErrorHandler("User with this email already exists", 400))
    }

    let profilePic = {
        url: "",
        punlic_id: ""
    }
    const image = await cloudinary.uploader.upload("E:/Expense Tracker/avatar.png", {
        folder: "finance_users"
    })
    profilePic = {
        url: image.secure_url,
        public_id: image.public_id
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        profilePic: profilePic
    })
    sendToken(res, 200, userData, "User registered successfully");
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email or password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Please enter valid email or password", 401))
    }
    const isPassMatch = await user.comparePassword(password)
    if (!isPassMatch) {
        return next(new ErrorHandler("Please enter valid email or password", 401));
    }
    sendToken(res, 200, user, "Logged in successfully");
})

export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    })
})


export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }
    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetToken}`;
    const message = `Click on the link to reset your password: ${resetUrl}`;
    try {
        await sendEmail({
            email: user.email,
            subject: "Reset Password",
            message,
        });
        res.status(200).json({
            success: true,
            message: "Reset link sent successfully",
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExperies = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExperies: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Invalid or expired token", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExperies = undefined;
    await user.save();
    sendToken(res, 200, user, "Password reset successfully");
})


export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Please enter valid password', 401))
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler('Old and new password does not matched', 401))
    }
    user.password = req.body.newPassword
    await user.save()
    sendToken(res, 200, user, "Password changed successfully");
})


export const getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
})
