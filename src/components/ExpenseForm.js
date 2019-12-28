import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? props.expense.amount : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({description}))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({note}))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^[0-9]+(\.[0-9]{1,2})?$/)) {
            this.setState(() => ({amount}))
        }
    }
    onSubmit = (e) => {
        e.preventDefault()
        
        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({error: 'Please provide description and amount'}))
        } else {
            this.setState(() => ({error: ''}))
            this.props.onSubmit({
                description: this.state.description,
                amount: this.state.amount,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()//unix milleseconds
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="number"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <textarea 
                        placeholder="Add a note"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    ></textarea>
                    <SingleDatePicker
                        date={this.state.createdAt} // momentPropTypes.momentObj or null
                        onDateChange={date => this.setState({ createdAt: date })} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ calendarFocused: focused })}// PropTypes.func.isRequired
                        id="calendar-picker" // PropTypes.string.isRequired,
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <button type="submit">Add expense</button>
                </form>
            </div>
        )
    }
}