const express = require("express");
const cors = require("cors");
const cookieParer = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./models");

const expenseRouter = require("./routes/expense.router");
const expenseCategoryRouter = require("./routes/expenseCategory.router");

const app = express();

// Adding CORS Option to enable cross-origin 
app.use(cors({ origin: "http://localhost:3000" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParer());

// Sync to DB
(async () => {
    await db.sequelize.sync();
})().catch((error) => {
    console.error("Unable to connect to the database:", error);
});

// Set up Router
// /api/expenses/...
expenseRouter(app);
expenseCategoryRouter(app);

// Initialize server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});

module.exports = app;

