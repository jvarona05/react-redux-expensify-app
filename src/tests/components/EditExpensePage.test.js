import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense, removeExpense, history, wrapper, expense

//para setear esto cada vez que se corra un test...para no duplicar codigo
beforeEach(() => {
    expense = expenses[0]
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = { push: jest.fn() }
    wrapper = shallow(<EditExpensePage 
        expense={expense}
        editExpense={editExpense} 
        removeExpense={removeExpense} 
        history={history} 
    />)
})

test('should render EditExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense)

    expect(history.push).toHaveBeenLastCalledWith('/')

    expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click')

    expect(history.push).toHaveBeenLastCalledWith('/')

    expect(removeExpense).toHaveBeenLastCalledWith(expense.id)
})