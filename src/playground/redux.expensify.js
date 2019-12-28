import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates  
})

//SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
})

//SORT_BY_DATE
const sortByDate = (text = '') => ({
    type: 'SORT_BY_DATE',
})

//SORT_BY_AMOUNT
const sortByAmount = (text = '') => ({
    type: 'SORT_BY_AMOUNT',
})

//SET_START_DATE
const setStartDate = (date = 0) => ({
    type: 'SET_START_DATE',
    date
})

//SET_END_DATE
const setEndtDate = (date = 0) => ({
    type: 'SET_END_DATE',
    date
})

// Expenses reducers
const expensesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id != action.id)
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                console.log(expense.id, action.id)
                if(expense.id === action.id) {
                    console.log('2')
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default: return state
    }
}

// Filter Reducers

const filterReducerDefaultState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
                return {
                    ...state,
                    sortBy: 'date'
                }
        case 'SORT_BY_AMOUNT':
                return {
                    ...state,
                    sortBy: 'amount'
                }
        case 'SET_START_DATE':
                return {
                    ...state,
                    startDate: action.date
                }
        case 'SET_END_DATE':
                return {
                    ...state,
                    endDate: action.date
                }
        default: return state
    }
}

// Store

const store = new createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
)

// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof startDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()) 

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const {expense: expense1} = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 80}))
const {expense: expense2} = store.dispatch(addExpense({description: 'Car', amount: 80, createdAt: 90}))

// store.dispatch(removeExpense({id: expense1.id}))

// store.dispatch(editExpense(expense2.id, {amount: 40}))

// store.dispatch(setTextFilter('rent'))

store.dispatch(sortByDate())
store.dispatch(sortByAmount())

// store.dispatch(setStartDate(-8))
// store.dispatch(setEndtDate(250))

