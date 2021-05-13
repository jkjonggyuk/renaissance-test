import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";

import expenseService from "../services/expense.service";
import expenseCategoryService from "../services/expenseCategory.service";

export default function ExpenseForm(props) {
    // re-renders expense list upon calling
    const { onComplete } = props;

    // state for new expense being created
    const [newExpense, setNewExpense] = useState({
        name: "",
        cost: "",
        expenseCategoryId: 0,
    });

    // state for new category that the user wants to create
    const [newCategory, setNewCategory] = useState("");

    // all category options already created by the user
    const [expenseCategories, setExpenseCategories] = useState([]);
    
    // retrieve cagegories 
    const reloadCategories = () => {
        expenseCategoryService.getAll()
        .then((data) => {
            if (data.data && data.data.length > 0) {
                setExpenseCategories(data.data);
            }
        });
    }
    
    useEffect(() => {
        reloadCategories();
    }, [])

    // Reset the form inputs and reload the expense list
    const resetFormAndReloadList = () => {
        setNewExpense({name: "", cost: "", expenseCategoryId: 0});
        setNewCategory("");
        onComplete();
        alert("Expense successfully added!");
    }

    // Upon submit
    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        // Validate input for cost
        if (newExpense.cost === "" || isNaN(parseFloat(newExpense.cost))) {
            alert("You need a valid cost!");
            return;
        }
        // If no option for category is chosen, but the user wants to add new category
            // add category first, then add expense
        if (newExpense.expenseCategoryId === 0 && newCategory !== "") {
            expenseCategoryService.create({name: newCategory})
                .then((createdCategory) => {
                    reloadCategories();
                    expenseService.create({name: newExpense.name, cost: parseFloat(newExpense.cost), expenseCategoryId: createdCategory.data.id})
                        .then(() => {
                            resetFormAndReloadList();
                        })
                });
        } else {
            expenseService.create({name: newExpense.name, cost: parseFloat(newExpense.cost), expenseCategoryId: newExpense.expenseCategoryId})
                .then(() => {
                    resetFormAndReloadList();
                })
        }
    }

    const handleNameChange = (e) => {
        setNewExpense({...newExpense, name: e.target.value});
    }
    const handleCostChange = (e) => {
        setNewExpense({...newExpense, cost: e.target.value});
    }
    const handleCategoryChange = (e) => {
        setNewExpense({...newExpense, expenseCategoryId: e.target.value});
    }
    const handleNewCategoryChange = (e) => {
        setNewCategory(e.target.value);
    }

    return (
        <Paper className="root" variant="outlined" elevation={3} style={{margin: 30, padding: 10}}>
            <form onSubmit={handleExpenseSubmit}>
                <div style={{margin: 10}}>
                    <label>
                        Name: 
                        <input type="text" value={newExpense.name} onChange={handleNameChange} />
                    </label>
                </div>
                
                <div style={{margin: 10}}>
                    <label>
                        Cost: 
                        <input type="text" value={newExpense.cost} onChange={handleCostChange} />
                    </label>
                </div>
                
                <div style={{margin: 10}}>
                    <label>
                        Category: 
                        <select name="category" value={newExpense.expenseCategoryId} onChange={handleCategoryChange}>
                            <option value={0}></option>
                            {expenseCategories.map(c => 
                                <option key={c.name} value={c.id}>{c.name}</option>
                            )}
                        </select>
                    </label>

                    <label>
                        Or Add a new Category
                        <input type="text" value={newCategory} onChange={handleNewCategoryChange} />
                    </label>
                </div>

                <Button type="submit" variant="contained">Add New Expense</Button>
            </form>
        </Paper>
    )
}