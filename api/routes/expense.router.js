// Set up Router for expense
module.exports = app => {
    const expenses = require("../controllers/expense.controller");
    const expenseRouter = require("express").Router();

    // Routes
    expenseRouter.get("/", expenses.getAllExpense);
    expenseRouter.post("/", expenses.createExpense);

    expenseRouter.delete("/:id", expenses.deleteExpense);

    app.use("/api/expenses", expenseRouter);
}