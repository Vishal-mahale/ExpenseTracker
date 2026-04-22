
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ExpenseTracker"
        })
        console.log(`MongoDB Connected: ${connection.host}`);
    } catch (error) {
        console.log("Error connecting to the mongoDB");
        process.exit(1);
    }
}