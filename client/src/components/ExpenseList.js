import React, { useEffect, useState } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

import expenseService from "../services/expense.service";

export default function ExpenseList(props) {
    const { reloadToggle } = props;

    const [expenseList, setExpenseList] = useState([]);

    // Retrieve all expenses list
    useEffect(() => {
        expenseService.getAll()
            .then((data) => {
            if (data.data && data.data.length > 0) {
                setExpenseList(data.data);
            }
            });
        
    }, [reloadToggle]);

    // Deletes expense from db, reorganize the list, then alert user
    const handleDelete = (id) => {
        expenseService.delete(id)
            .then(()=>{
                const expenses = expenseList;
                const newList = expenses.filter(e=> e.id !== id);
                setExpenseList(newList);
            });
        alert("Expense has been successfully deleted.");
    }

    return (
        <TableContainer component={Paper} >
            <h2>Expenses</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenseList.map((ex, index) => 
                        <TableRow key={index}>
                            <TableCell>{ex.name}</TableCell>
                            <TableCell>${parseFloat(ex.cost).toFixed(2)}</TableCell>
                            <TableCell>{ex.expenseCategory ? ex.expenseCategory.name : null}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => {handleDelete(ex.id)}}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}