const db = require("../models");
const Expense = db.expenses;
const Op = db.Sequelize.Op;

// Creates an expense
// req.body expected to have cost(required), name, and category.
exports.createExpense = (req, res) => {
    if (!req.body.cost) {
        res.status(400).send({
            message: "Cost for expense is required."
        });
        return;
    }

    const expense = {
        name: req.body.name ? req.body.name : "",
        cost: req.body.cost,
        category: req.body.category ? req.body.category : "",
    };

    Expense.create(expense)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while creating an expense."
            });
        });
};

// Retrieve all expenses 
exports.getAllExpense = (req, res) => {
    Expense.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving expenses."
            });
        });
};

// Delete the expense given the id of the expense 
exports.deleteExpense = (req, res) => {
    const id = req.params.id;

    Expense.destroy({
        where: { id: id }
    })
        .then(n => {
            if (n === 1) {
                res.send({
                    message: "Expense deleted successfully."
                });
            } else {
                res.send({
                    message: "Cannot delete the expense."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error occurred while deleting the expense."
            });
        });
};