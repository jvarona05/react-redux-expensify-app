import React from 'react';
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpensesTotal from '../selectors/expenses-total'
import selectExpenses from '../selectors/expenses' 

export const ExpensesSummary = ({totalExpenses, totalAmount}) => {
    const expenseWord = totalExpenses === 1 ? 'expense' : 'expenses'
    const totalAmountFormated = numeral(totalAmount).format('$0,0.00')

    return (
        <div>
            <p>Viewing {totalExpenses} {expenseWord} totalling {totalAmountFormated}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibledExpenses = selectExpenses(state.expenses, state.filters)

    return {
        totalAmount: selectExpensesTotal(visibledExpenses),
        totalExpenses: visibledExpenses.length
    }
}

export default connect(mapStateToProps)(ExpensesSummary)