import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux'
import { addExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
    onSubmit=(expense) => {
        this.props.addExpense(expense)
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

//mapeamos el dispatch para poder testearlo de forma mas facil
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)