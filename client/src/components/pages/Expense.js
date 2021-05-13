import React, { useState } from "react";
import { Container } from "@material-ui/core";
import ExpenseForm from "../ExpenseForm";
import ExpenseList from "../ExpenseList";

export default function Expense() {
    // Communication state variable to let form to re-render list when submitted.
    const [reloadToggle, setReloadToggle] = useState(false);

    // Re-render ExpenseList
    const renderExpenseList = () => {
        setReloadToggle(!reloadToggle)
    }

    return (
        <Container>
            <h1>Expense Tracker</h1>
            <ExpenseForm onComplete={renderExpenseList} />

            <ExpenseList reloadToggle={reloadToggle} />
            
        </Container>
    )
}