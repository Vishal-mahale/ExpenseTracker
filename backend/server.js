

import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import multer from "multer";

import { connectDB } from "./data/database.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js"

const app = express();
app.use(express.json());

config({ path: "./config/config.env" });
connectDB();
cloudinaryConfig();

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})