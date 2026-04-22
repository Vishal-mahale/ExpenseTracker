

import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser"

import { connectDB } from "./database/database.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js"

import errorMiddleware from "./middlewares/error.js"

const app = express();
app.use(express.json());
app.use(cookieParser())

config({ path: "./config/config.env" });
connectDB();
cloudinaryConfig();


app.use("/api/v1/user", userRouter);

//Middleware foor error handling.
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})