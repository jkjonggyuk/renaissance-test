// Expense model has name, cost, and category
module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        name: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        cost: {
            type: Sequelize.DECIMAL(13, 4),
            allowNull: false,
        },
        category: {
            type: Sequelize.STRING,
        }
    });
    return Expense;
};