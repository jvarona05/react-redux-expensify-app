import React from 'react';
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import {
    setTextFilter, 
    sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate
} from '../actions/filters'

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null,
    }
    onDateChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }
    onSortChange = (e) => {
        if(e.target.value === 'date'){
            this.props.sortByDate()
        } else if((e.target.value === 'amount')){
            this.props.sortByAmount()
        }
    }
    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={this.onTextChange}
                />
                <select 
                    value={this.props.filters.sortBy} 
                    onChange={this.onSortChange}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId="range-start-date-picker-filter" 
                    endDate={this.props.filters.endDate} 
                    endDateId="ange-end-date-picker-filter" 
                    onDatesChange={this.onDateChange} 
                    focusedInput={this.state.calendarFocused} 
                    onFocusChange={calendarFocused => this.setState({ calendarFocused })}
                    numberOfMonths={1}
                    isOutsideRange={() => false} 
                    showClearDates={true}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)