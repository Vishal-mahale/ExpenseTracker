import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: [true, "Please provide budget amount"],
        min: [0, "Budget must be positive"]
    },
    period: {
        type: String,
        enum: ["weekly", "monthly", "yearly"],
        default: "monthly"
    },
    spent: {
        type: Number,
        default: 0
    },
    isAlert: {
        type: Boolean,
        default: false // Alert when approaching budget
    },
    alertThreshold: {
        type: Number,
        default: 80 // Alert when 80% spent
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    color: {
        type: String,
        default: "#3B82F6" // For dashboard visualization
    },
    notes: {
        type: String,
        maxlength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

budgetSchema.index({ user: 1, category: 1 });
budgetSchema.index({ user: 1, period: 1 });

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;