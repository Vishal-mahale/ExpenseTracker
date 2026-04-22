
const errorMiddleware = (err, req, res, next) => {

    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // 1. Wrong MongoDB ID Error (CastError)
    if (err.name === "CastError") {
        err.message = `Resource not found. Invalid: ${err.path}`;
        err.statusCode = 400;
    }

    // 2. Mongoose Duplicate Key Error (e.g., Email already exists)
    if (err.code === 11000) {
        err.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.statusCode = 400;
    }

    // 3. Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        err.message = `Json Web Token is invalid, Try again`;
        err.statusCode = 400;
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

};
export default errorMiddleware