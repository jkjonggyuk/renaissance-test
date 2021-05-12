const db = require("../models");
const ExpenseCategory = db.expenseCategories;

// Creates an expense category
// req.body expected to have name(required)
exports.createExpense = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name for expense category is required."
        });
        return;
    }

    const expenseCategory = {
        name: req.body.name,
    };

    ExpenseCategory.create(expenseCategory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating an expense category."
            });
        });
};

// Retrieve all expense categories
exports.getAllExpenseCategory = (req, res) => {
    ExpenseCategory.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving expense categories."
            });
        });
};

