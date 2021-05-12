// Set up Router for expense
module.exports = app => {
    const expenseCategories = require("../controllers/expenseCategory.controller");
    const expenseCategoryRouter = require("express").Router();

    // Routes
    expenseCategoryRouter.get("/", expenseCategories.getAllExpenseCategory);
    expenseCategoryRouter.post("/", expenseCategories.createExpense);

    app.use("/api/expenseCategories", expenseCategoryRouter);
}