import moment from 'moment'
import { 
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    setEndDate, 
    setStartDate 
} from '../../actions/filters'

test('should generate set text filter action object with text value', () => {
    const text = 'This is some text'
    const action = setTextFilter(text)

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
})

test('should generate set text filter action object with default', () => {
    const action = setTextFilter()

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('should generate sort by date filter action object', () => {
    const action = sortByDate()

    expect(action).toEqual({
        type: 'SORT_BY_DATE',
    })
})

test('should generate sort by amount filter action object', () => {
    const action = sortByAmount()

    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
    })
})

test('should generate set start date filter action object', () => {
    const date = moment()
    const action = setStartDate(date)

    expect(action).toEqual({
        type: 'SET_START_DATE',
        date
    })
})

test('should generate set start date filter action object', () => {
    const date = moment()
    const action = setEndDate(date)

    expect(action).toEqual({
        type: 'SET_END_DATE',
        date
    })
})