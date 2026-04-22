import jwt from "jsonwebtoken";
import ErrorHandler from "../util/errorHandler.js";
import catchAsyncError from "./catchAsyncErrors.js";
import User from '../model/User.js';

const authenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }
    next();
});
export default authenticatedUser;