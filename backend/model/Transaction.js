import mongoose from "mongoose";
import User from "./User.js"

export const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    title: {
        type: String,
        required: [true, "Title is required."],
        maxlength: [50, "Title cannot exceed 50 characters"],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required."],
        min: [0, "Amount must be positive."]
    },
    transactionType: {
        type: String,
        required: true,
        enum: ["income", "expense"],
        index: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Income",
            "Food/Drinks",
            "Shopping",
            "Transportation",
            "Entertainment",
            "Home Expense",
            "Family",
            "Health/Sport",
            "Pets",
            "Travels",
            "Other"
        ]
    },
    subCategory: {
        type: String,
        required: true,
        default: null
    },
    paymentMethod: {
        type: String,
        enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "UPI"],
        default: "Cash"
    },
    // optionalFeature:
    account: {
        type: String   // Ex. HDFC,ICICI,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
        index: true
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    isReccuring: {
        type: Boolean,
        default: false
    },
    reccuringInterval: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    isDeleted: {     // Soft Delete.Never delete data permanently.
        type: Boolean,
        default: false
    }

}, { timestamps: true })


transactionSchema.index({ user: 1, date: -1 })
transactionSchema.index({ user: 1, category: 1 })
transactionSchema.index({ user: 1, transactionType: 1 })

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction