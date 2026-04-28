import mongoose from "mongoose";

const savingsGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: [true, "Please provide a goal title"],
    trim: true
  },
  description: String,
  targetAmount: {
    type: Number,
    required: [true, "Please provide target amount"],
    min: [0, "Target must be positive"]
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ["Vacation", "Car", "House", "Education", "Wedding", "Emergency", "Other"],
    default: "Other"
  },
  targetDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  icon: {
    type: String,
    default: "piggy-bank" // emoji or icon name
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Paused"],
    default: "Active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

savingsGoalSchema.index({ user: 1, status: 1 });
savingsGoalSchema.index({ user: 1, targetDate: -1 });

const SavingsGoal = mongoose.model("SavingsGoal", savingsGoalSchema);
export default SavingsGoal;