import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../util/errorHandler.js";
import Transaction from "../model/Transaction.js";
import User from '../model/User.js'


const categoryMap = {
    "Income": ["Salary", "Odd jobs", "Pension", "Other"],
    "Food/Drinks": ["Eating out", "Bar"],
    "Shopping": ["Clothing", "Shoes", "Technology", "Gifts"],
    "Transportation": ["Car", "Fuel", "Insurance"],
    "Entertainment": ["Movies", "Games", "Books"],
    "Home": ["Rent", "Electricity", "Water", "Internet"],
    "Family": ["Children", "Education"],
    "Health/Sport": ["Health", "Sport"],
    "Pets": ["Pet Food"],
    "Travels": ["Accommodation", "Transport"],
    "Other": ["Taxes", "Cigarettes", "Debt"]
};

export const createTransaction = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id    
    const { title, amount, transactionType, category, subCategory, paymentMethod, date, description ,tags} = req.body

    if (!title || !amount || !transactionType || !category || !subCategory) {
        return next(new ErrorHandler("All required fields must be provided", 400))
    }
    if (amount < 0) {
        return next(new ErrorHandler("Amount must be greater than 0", 400))
    }
    const transaction = await Transaction.create({
        user: userId,
        title,
        amount,
        transactionType,
        category,
        subCategory,
        paymentMethod,
        date,
        description,
        tags
    })
    res.status(201).json({
        success: true,
        message: "Transaction Created suuccessfully.",
        transaction
    })
})

export const getAllTransaction = catchAsyncError(async (req, res, next) => {

    const userId = req.user._id
    const { category, transactionType, paymentMethod, startDate, endDate, page = 1, limit = 10 } = req.query

    // Building filter
    let filter = {
        user: userId,
    }
    if (category) filter.category = category
    if (transactionType) filter.transactionType = transactionType
    if (paymentMethod) filter.paymentMethod = paymentMethod
    if (startDate || endDate) {
        filter.date = {}
        if (startDate) filter.date.$gte = new Date(startDate)
        if (endDate) filter.date.$lte = new Date(endDate)
    }

    const skip = (page - 1) * limit;
    const transactions = await Transaction.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const count = await Transaction.countDocuments();
    res.status(201).json({
        success: true,
        message: "Data retrive successfully.",
        transactions,
        count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
    });
});


//Updating transation
export const updateTransaction = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    const updates = req.body;
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
        return next(new ErrorHandler("Transaction not found", 404))
    }
    if (userId.toString() !== transaction.user._id.toString()) {
        return next(new ErrorHandler("Not authorized to update this transaction", 403))
    }
    const allowedFields = ["title", "amount", "category", "subCategory", "paymentMethod", "date", "description", "tags"];

    allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
            transaction[field] = updates[field];
        }
    });
    await transaction.save();
    res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        transaction
    });
})

export const deleteTransaction = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return next(new ErrorHandler(404, "Transaction not found"));
  }
  if (transaction.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized to delete this transaction"));
  }
  await Transaction.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully"
  });
});
