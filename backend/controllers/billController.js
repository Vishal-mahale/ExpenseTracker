import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import Bill from "../model/billModel.js";
import ErrorHandler from "../util/errorHandler.js";


export const createBill = catchAsyncError(async (req, res, next) => {
  const { title, amount, category, frequency, dueDate, paymentMethod, notes, reminderDaysBefore } = req.body;
  const userId = req.user._id;

  if (!title || !amount || !category || !frequency || !dueDate) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }

  const nextDueDate = calculateNextDueDate(frequency, dueDate);

  const bill = await Bill.create({
    user: userId,
    title,
    amount,
    category,
    frequency,
    dueDate,
    paymentMethod: paymentMethod || "Bank Transfer",
    status: "Unpaid",
    nextDueDate,
    reminderDaysBefore: reminderDaysBefore || 3,
    notes
  });

  res.status(201).json({
    success: true,
    message: "Bill created successfully",
    bill
  });
});


export const getAllBills = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { status = "Unpaid" } = req.query;

  const bills = await Bill.find({ user: userId, status, isActive: true }).sort({ nextDueDate: 1 });

  res.status(200).json({
    success: true,
    count: bills.length,
    bills
  });
});

export const getUpcomingBills = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const days = parseInt(req.query.days) || 30; // Default 30 days

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  const bills = await Bill.find({
    user: userId,
    isActive: true,
    nextDueDate: { $gte: new Date(), $lte: futureDate }
  }).sort({ nextDueDate: 1 });

  const totalDue = bills.reduce((sum, b) => sum + b.amount, 0);

  res.status(200).json({
    success: true,
    upcomingDays: days,
    billCount: bills.length,
    totalDue,
    bills
  });
});


export const markBillAsPaid = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  let bill = await Bill.findById(id);

  if (!bill) {
    return next(new ErrorHandler(404, "Bill not found"));
  }

  if (bill.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized"));
  }

  bill.status = "Paid";
  bill.lastPaidDate = new Date();

  // Calculate next due date
  if (bill.isActive) {
    bill.nextDueDate = calculateNextDueDate(bill.frequency, bill.dueDate);
    bill.status = "Unpaid";
  }

  await bill.save();

  res.status(200).json({
    success: true,
    message: "Bill marked as paid",
    bill
  });
});

export const updateBill = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const updates = req.body;

  let bill = await Bill.findById(id);

  if (!bill) {
    return next(new ErrorHandler(404, "Bill not found"));
  }

  if (bill.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized"));
  }

  const allowedFields = ["title", "amount", "category", "frequency", "dueDate", "paymentMethod", "notes", "reminderDaysBefore", "reminderEnabled"];
  
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      bill[field] = updates[field];
    }
  });

  await bill.save();

  res.status(200).json({
    success: true,
    message: "Bill updated successfully",
    bill
  });
});


export const deleteBill = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const bill = await Bill.findById(id);

  if (!bill) {
    return next(new ErrorHandler(404, "Bill not found"));
  }

  if (bill.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized"));
  }

  // Soft delete
  bill.isActive = false;
  await bill.save();

  res.status(200).json({
    success: true,
    message: "Bill deleted successfully"
  });
});


function calculateNextDueDate(frequency, dueDate) {
  const today = new Date();
  let nextDate = new Date(today);

  switch (frequency) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "weekly":
      const daysUntilDueDay = (dueDate - nextDate.getDay() + 7) % 7 || 7;
      nextDate.setDate(nextDate.getDate() + daysUntilDueDay);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(dueDate);
      break;
    case "quarterly":
      nextDate.setMonth(nextDate.getMonth() + 3);
      nextDate.setDate(dueDate);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      nextDate.setDate(dueDate);
      break;
  }

  return nextDate;
}