// Expense model has name, cost, and category
module.exports = (sequelize, Sequelize) => {
    const ExpenseCategory = sequelize.define("expenseCategory", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    return ExpenseCategory;
};