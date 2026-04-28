import SavingsGoal from "../model/savingsGoalModel.js";
import Transaction from "../model/Transaction.js";
import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../util/errorHandler.js";

export const createSavingsGoal = catchAsyncError(async (req, res, next) => {
  const { title, description, targetAmount, category, targetDate, priority, icon } = req.body;
  const userId = req.user._id;

  if (!title || !targetAmount || !targetDate) {
    return next(new ErrorHandler(400, "Please provide all required fields"));
  }
  const goal = await SavingsGoal.create({
    user: userId,
    title,
    description,
    targetAmount,
    category: category || "Other",
    targetDate: new Date(targetDate),
    priority: priority || "Medium",
    icon: icon || "piggy-bank"
  });

  res.status(201).json({
    success: true,
    message: "Savings goal created successfully",
    goal
  });
});


export const getAllSavingsGoals = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const { status = "Active" } = req.query;

  const goals = await SavingsGoal.find({ user: userId, status }).sort({ targetDate: 1 });

  // Calculate progress for each goal
  const goalsWithProgress = goals.map(goal => {
    const percentage = (goal.currentAmount / goal.targetAmount) * 100;
    const daysRemaining = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 3600 * 24));
    
    return {
      ...goal.toObject(),
      percentage,
      daysRemaining,
      isCompleted: goal.currentAmount >= goal.targetAmount
    };
  });

  res.status(200).json({
    success: true,
    count: goalsWithProgress.length,
    goals: goalsWithProgress
  });
});


export const updateSavingsGoal = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { currentAmount, status, title, description, targetAmount, targetDate } = req.body;

  let goal = await SavingsGoal.findById(id);

  if (!goal) {
    return next(new ErrorHandler(404, "Savings goal not found"));
  }

  if (goal.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized"));
  }

  if (currentAmount !== undefined) goal.currentAmount = currentAmount;
  if (status) goal.status = status;
  if (title) goal.title = title;
  if (description !== undefined) goal.description = description;
  if (targetAmount) goal.targetAmount = targetAmount;
  if (targetDate) goal.targetDate = new Date(targetDate);

  // Auto-complete if target reached
  if (goal.currentAmount >= goal.targetAmount && goal.status === "Active") {
    goal.status = "Completed";
  }

  await goal.save();

  res.status(200).json({
    success: true,
    message: "Savings goal updated successfully",
    goal
  });
});


export const deleteSavingsGoal = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const goal = await SavingsGoal.findById(id);
  if (!goal) {
    return next(new ErrorHandler(404, "Savings goal not found"));
  }

  if (goal.user.toString() !== userId.toString()) {
    return next(new ErrorHandler(403, "Not authorized"));
  }
  await SavingsGoal.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Savings goal deleted successfully"
  });
});


export const getSavingsSummary = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const goals = await SavingsGoal.find({ user: userId, status: "Active" });
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallPercentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  const goalsNearCompletion = goals.filter(g => {
    const percentage = (g.currentAmount / g.targetAmount) * 100;
    return percentage >= 80;
  });

  res.status(200).json({
    success: true,
    summary: {
      totalGoals: goals.length,
      totalTargetAmount: totalTarget,
      totalSavedAmount: totalCurrent,
      overallPercentage,
      completionEstimate: goalsNearCompletion.length,
      goals: goals.map(g => ({
        id: g._id,
        title: g.title,
        targetAmount: g.targetAmount,
        currentAmount: g.currentAmount,
        percentage: (g.currentAmount / g.targetAmount) * 100,
        daysRemaining: Math.ceil((new Date(g.targetDate) - new Date()) / (1000 * 3600 * 24))
      }))
    }
  });
});
