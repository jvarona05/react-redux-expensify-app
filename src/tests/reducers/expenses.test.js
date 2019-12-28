import expensesReducers from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
 
test('should set default state', () => {
    const state = expensesReducers(undefined, { type: '@@INIT' })

    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }

    const state = expensesReducers(expenses, action)

    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }

    const state = expensesReducers(expenses, action)

    expect(state).toEqual(expenses)
})

test('should add and expense', () => {
    const expense = {
        id: '4',
        description: 'ball',
        note: '',
        amount: 35,
        createdAt: 0,
    }

    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducers(expenses, action)

    expect(state).toEqual([...expenses, expense])
})

test('should edit and expense', () => {
    const updates = {
        amount: 3000,
    }

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates
    }

    const state = expensesReducers(expenses, action)

    expect(state[0].amount).toBe(updates.amount)
})

test('should not edit and expense if not found', () => {
    const updates = {
        note: 'this is a note',
    }

    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    }

    const state = expensesReducers(expenses, action)

    expect(state).toEqual(expenses)
})