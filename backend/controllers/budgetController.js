import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../util/errorHandler.js";
import Transaction from "../model/Transaction.js";
import Budget from "../model/budgetModel.js"

export const createBudget = catchAsyncError(async (req, res, next) => {
    const { category, amount, period, alertThreshold, startDate, endDate, notes, color } = req.body;
    const userId = req.user._id;
    if (!category || !amount) {
        return next(new ErrorHandler(400, "Please provide category and amount"));
    }
    const budget = await Budget.create({
        user: userId,
        category,
        amount,
        period: period || "monthly",
        alertThreshold: alertThreshold || 80,
        startDate: startDate || Date.now(),
        endDate: endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)),
        notes,
        color
    });

    res.status(201).json({
        success: true,
        message: "Budget created successfully",
        budget
    });
});

export const getAllBudgets = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    const budgets = await Budget.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: budgets.length,
        budgets
    });
});

export const getBudgetWithSpending = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    const budgets = await Budget.find({ user: userId });
    const budgetsWithSpending = await Promise.all(
        budgets.map(async (budget) => {
            const spent = await Transaction.aggregate([
                {
                    $match: {
                        user: userId,
                        category: budget.category,
                        transactionType: "expense",
                        date: {
                            $gte: budget.startDate,
                            $lte: budget.endDate
                        }
                    }
                },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);

            const spentAmount = spent[0]?.total || 0;
            const percentageSpent = (spentAmount / budget.amount) * 100;
            const remaining = budget.amount - spentAmount;

            return {
                ...budget.toObject(),
                spent: spentAmount,
                remaining,
                percentageSpent,
                isExceeded: spentAmount > budget.amount,
                isAlert: percentageSpent >= budget.alertThreshold
            };
        })
    );

    res.status(200).json({
        success: true,
        budgets: budgetsWithSpending
    });
});


export const updateBudget = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    let budget = await Budget.findById(id);

    if (!budget) {
        return next(new ErrorHandler(404, "Budget not found"));
    }

    if (budget.user.toString() !== userId.toString()) {
        return next(new ErrorHandler(403, "Not authorized"));
    }

    const allowedFields = ["amount", "period", "alertThreshold", "endDate", "notes", "color", "isAlert"];

    allowedFields.forEach(field => {
        if (updates[field] !== undefined) {
            budget[field] = updates[field];
        }
    });
    await budget.save();
    res.status(200).json({
        success: true,
        message: "Budget updated successfully",
        budget
    });
});

export const deleteBudget = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;
    const budget = await Budget.findById(id);
    if (!budget) {
        return next(new ErrorHandler(404, "Budget not found"));
    }
    if (budget.user.toString() !== userId.toString()) {
        return next(new ErrorHandler(403, "Not authorized"));
    }

    await Budget.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Budget deleted successfully"
    });
});

export const getBudgetAlerts = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id;
    const budgets = await Budget.find({ user: userId });
    const alerts = await Promise.all(
        budgets.map(async (budget) => {
            const spent = await Transaction.aggregate([
                {
                    $match: {
                        user: userId,
                        category: budget.category,
                        transactionType: "expense",
                        date: {
                            $gte: budget.startDate,
                            $lte: budget.endDate
                        }
                    }
                },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            const spentAmount = spent[0]?.total || 0;
            const percentageSpent = (spentAmount / budget.amount) * 100;
            if (percentageSpent >= budget.alertThreshold || spentAmount > budget.amount) {
                return {
                    budgetId: budget._id,
                    category: budget.category,
                    limit: budget.amount,
                    spent: spentAmount,
                    percentageSpent,
                    severity: spentAmount > budget.amount ? "critical" : "warning"
                };
            }
            return null;
        })
    );
    const activeAlerts = alerts.filter(a => a !== null);
    res.status(200).json({
        success: true,
        alertCount: activeAlerts.length,
        alerts: activeAlerts
    });
});