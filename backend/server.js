

import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser"

import { connectDB } from "./database/database.js";
import { cloudinaryConfig } from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js"
import transactionRouter from "./routes/transactionRoute.js"
import dashboardRouter from "./routes/dashboardRoute.js"
import savingRouter from "./routes/savingRouter.js"
import budgetRouter from "./routes/budgetRouter.js"
import errorMiddleware from "./middlewares/error.js"
import billRouter from "./routes/billRoute.js"

const app = express();
app.use(express.json());
app.use(cookieParser())

config({ path: "./config/config.env" });
connectDB();
cloudinaryConfig();


app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter)
app.use("/api/v1/dsahboard", dashboardRouter);
app.use("/api/v1/saving",savingRouter)
app.use("/api/v1/budget",budgetRouter)
app.use("/api/v1/bills", billRouter)

//Middleware foor error handling.
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})