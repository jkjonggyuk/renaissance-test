import React, { useEffect, useState } from "react";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

import expenseService from "../../services/expense.service";
import ExpenseForm from "../ExpenseForm";

export default function Expense() {
    const [expenseList, setExpenseList] = useState([]);

    const renderExpenseList = () => {
        expenseService.getAll()
            .then((data) => {
                if (data.data && data.data.length > 0) {
                    setExpenseList(data.data);
                }
            });
    }

    useEffect(() => {
        renderExpenseList();
    }, []);

    const deleteExpense = (id) => {
        expenseService.delete(id)
            .then(() => {
                renderExpenseList();
            });
    }

    return (
        <Container>
            <h1>Expense Tracker</h1>
            <ExpenseForm onComplete={renderExpenseList} />

            <h2>Expenses</h2>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenseList.map((ex, index) => 
                            <TableRow key={index}>
                                <TableCell>{ex.name}</TableCell>
                                <TableCell>${parseFloat(ex.cost).toFixed(2)}</TableCell>
                                <TableCell>{ex.expenseCategory ? ex.expenseCategory.name : null}</TableCell>
                                <button onClick={() => {deleteExpense(ex.id)}}>
                                    Delete
                                </button>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Container>
    )
}