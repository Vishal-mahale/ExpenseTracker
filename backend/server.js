

// import express from "express";
// import { config } from 'dotenv';
// import cors from "cors";
// import multer from "multer";
// import cookieParser from "cookie-parser"
// import helmet from 'helmet'
// import rateLimit from 'express-rate-limit'

// import { connectDB } from "./database/database.js";
// import { cloudinaryConfig } from "./config/cloudinary.js";

// import userRouter from "./routes/userRoute.js"
// import transactionRouter from "./routes/transactionRoute.js"
// import dashboardRouter from "./routes/dashboardRoute.js"
// import savingRouter from "./routes/savingRouter.js"
// import budgetRouter from "./routes/budgetRouter.js"
// import billRouter from "./routes/billRoute.js"

// import errorMiddleware from "./middlewares/error.js"

// const app = express();

// //Rate Limiting: Prevents brute-force and DDoS attacks
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again after 15 minutes",
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false,
// });

// app.use(helmet({
//   contentSecurityPolicy: false,
// }));
// app.use(limiter)
// app.use(express.json());
// app.use(cookieParser())

// config({ path: "./config/config.env" });
// connectDB();
// cloudinaryConfig();


// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/transaction", transactionRouter)
// app.use("/api/v1/dsahboard", dashboardRouter);
// app.use("/api/v1/saving", savingRouter)
// app.use("/api/v1/budget", budgetRouter)
// app.use("/api/v1/bills", billRouter)

// //Middleware foor error handling.
// app.use(errorMiddleware)

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })


import express from "express";
import { config } from 'dotenv';
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser"
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from "./database/database.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js"
import transactionRouter from "./routes/transactionRoute.js"
import dashboardRouter from "./routes/dashboardRoute.js"
import savingRouter from "./routes/savingRouter.js"
import budgetRouter from "./routes/budgetRouter.js"
import billRouter from "./routes/billRoute.js"
import errorMiddleware from "./middlewares/error.js"


// config({ path: "./config/config.env" });
if (process.env.NODE_ENV !== "production") {
  config({ path: "./config/config.env" });
}

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(limiter);
app.use(express.json());
app.use(cookieParser());

// ✅ CORS — add your Vercel frontend URL here
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-name.vercel.app" // 🔁 update after frontend deploy
  ],
  credentials: true, // needed for cookies
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

connectDB();
cloudinaryConfig();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/dsahboard", dashboardRouter);
app.use("/api/v1/saving", savingRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/bills", billRouter);
app.use(errorMiddleware);

// ✅ Only listen locally, not on Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}
export default app; // ✅ Required for Vercel