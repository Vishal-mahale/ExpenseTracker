import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: [true, "Please provide bill title"],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, "Please provide bill amount"],
    min: [0, "Amount must be positive"]
  },
  category: {
    type: String,
    required: true,
    enum: ["Utilities", "Insurance", "Subscription", "Rent", "Loan", "Other"]
  },
  frequency: {
    type: String,
    required: true,
    enum: ["daily", "weekly", "monthly", "quarterly", "yearly"]
  },
  dueDate: {
    type: Number, // 1-31 for monthly, day of week for weekly
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "UPI"],
    default: "Bank Transfer"
  },
  status: {
    type: String,
    enum: ["Paid", "Unpaid", "Overdue"],
    default: "Unpaid"
  },
  lastPaidDate: Date,
  nextDueDate: {
    type: Date,
    required: true
  },
  reminderEnabled: {
    type: Boolean,
    default: true
  },
  reminderDaysBefore: {
    type: Number,
    default: 3 // Remind 3 days before
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

billSchema.index({ user: 1, nextDueDate: -1 });
billSchema.index({ user: 1, status: 1 });

const Bill = mongoose.model("Bill", billSchema);
export default Bill;