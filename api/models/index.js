const dbConfig = require("../config/db.config");

// Initialize DB ORM 
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Table
db.expenses = require("./expense.model")(sequelize, Sequelize);
db.expenseCategories = require("./expenseCategory.model")(sequelize, Sequelize);

// Add Relation
// 
// Expense - Expense Category - Many to One
db.expenseCategories.hasMany(db.expenses);
db.expenses.belongsTo(db.expenseCategories);

module.exports = db;