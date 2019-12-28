import uuid from 'uuid'
import moment from 'moment'
import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

test('should setup add expense action object with provided values', () => {
    const expense = {
        description: 'Rent',
        note: '',
        amount: 250,
        createdAt: moment().valueOf()
    }

    const action = addExpense(expense)

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String) // esto es para los valores dinamicos
        }
    })
})

test('should setup add expense action object with default values', () => {
    const action = addExpense()

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String) ,
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
        }
    })
})

test('should setup remove expense action object', () => {
    const id = 1023
    const action = removeExpense(id)

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: id
    })
})

test('should setup edit expense action object(all fields)', () => {
    const expense = {
        id: uuid(),
        description: 'Rent',
        note: '',
        amount: 250,
        createdAt: moment().valueOf()
    }

    const action = editExpense(expense.id, expense)

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: expense.id,
        updates: expense
    })
})

test('should setup edit expense action object with just 2 values)', () => {
    const id = uuid()
    const updatedData = {
        description: 'Rent',
        note: ''
    }

    const action = editExpense(id, updatedData)

    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updatedData
    })
})