import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary totalExpenses={1} totalAmount={255} />)

    expect(wrapper).toMatchSnapshot()
})

test('should correctly render ExpensesSummary with multiples expenses', () => {
    const wrapper = shallow(<ExpensesSummary totalExpenses={4} totalAmount={4500} />)

    expect(wrapper).toMatchSnapshot()
})