import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../util/errorHandler.js";
import Transaction from "../model/Transaction.js";
import User from '../model/User.js'

export const getSummary = catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const result = await Transaction.aggregate([
        {
            $match: {
                user: userId,
                isDeleted: false
            }
        },
        {
            $group: {
                _id: "$transactionType",
                total: { $sum: "$amount" }
            }
        }
    ]);

    let income = 0;
    let expense = 0;

    result.forEach(item => {
        if (item._id === "income") income = item.total;
        if (item._id === "expense") expense = item.total;
    });

    res.status(200).json({
        success: true,
        income,
        expense,
        balance: income - expense
    });
});


export const getCategoryBreakdown = catchAsyncError(async (req, res) => {
    const userId = req.user._id;

    const data = await Transaction.aggregate([
        {
            $match: {
                user: userId,
                isDeleted: false,
                transactionType: "expense"
            }
        },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: { total: -1 }
        }
    ]);

    res.status(200).json({
        success: true,
        data
    });
});



export const getMonthlyTrend = catchAsyncError(async (req, res) => {
    const userId = req.user._id;

    const data = await Transaction.aggregate([
        {
            $match: {
                user: userId,
                isDeleted: false
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    type: "$transactionType"
                },
                total: { $sum: "$amount" }
            }
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1
            }
        }
    ]);

    res.status(200).json({
        success: true,
        data
    });
});


export const getRecentTransactions = catchAsyncError(async (req, res) => {
    const userId = req.user._id;

    const transactions = await Transaction.find({
        user: userId,
        isDeleted: false
    })
        .sort({ date: -1 })
        .limit(5);

    res.status(200).json({
        success: true,
        data: transactions
    });
});

// export const getTransactionSummary = catchAsyncError(async (req, res, next) => {
//   const userId = req.user._id;
//   const { period = "month" } = req.query; // month, week, year

//   let startDate;
//   const today = new Date();

//   if (period === "week") {
//     startDate = new Date(today.setDate(today.getDate() - 7));
//   } else if (period === "month") {
//     startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//   } else if (period === "year") {
//     startDate = new Date(today.getFullYear(), 0, 1);
//   }

//   const transactions = await Transaction.find({
//     user: userId,
//     date: { $gte: startDate }
//   });

//   // Calculate summary
//   const income = transactions
//     .filter(t => t.transactionType === "income")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const expenses = transactions
//     .filter(t => t.transactionType === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const net = income - expenses;

//   // Category breakdown
//   const categoryBreakdown = {};
//   transactions.forEach(t => {
//     if (!categoryBreakdown[t.category]) {
//       categoryBreakdown[t.category] = { income: 0, expense: 0 };
//     }
//     if (t.transactionType === "income") {
//       categoryBreakdown[t.category].income += t.amount;
//     } else {
//       categoryBreakdown[t.category].expense += t.amount;
//     }
//   });

//   res.status(200).json({
//     success: true,
//     summary: {
//       period,
//       income,
//       expenses,
//       net,
//       transactionCount: transactions.length,
//       categoryBreakdown
//     }
//   });
// });