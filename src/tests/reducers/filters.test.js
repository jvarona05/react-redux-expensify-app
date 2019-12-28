import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' })

    expect(state).toEqual({
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month'),
    })
})

test('should setup sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })

    expect(state.sortBy).toBe('amount')
})

test('should setup sortBy to date', () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined,
    }    

    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' })

    expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
    const text = 'this is some text'

    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }    

    const state = filtersReducer(undefined, action)

    expect(state.text).toBe(text)
})

test('should set start date filter', () => {
    const date = moment(0)

    const action = {
        type: 'SET_START_DATE',
        date
    }    

    const state = filtersReducer(undefined, action)

    expect(state.startDate).toBe(date)
})

test('should set end date filter', () => {
    const date = moment(0)

    const action = {
        type: 'SET_END_DATE',
        date
    }    

    const state = filtersReducer(undefined, action)

    expect(state.endDate).toBe(date)
})