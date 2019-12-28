export default (expenses) => {
    return expenses.reduce((total, expense) => {
        return total + parseFloat(expense.amount)
    }, 0)
}