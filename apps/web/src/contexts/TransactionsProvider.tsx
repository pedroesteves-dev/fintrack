import { type ReactNode, useState } from 'react'
import { getCategory } from '../data/categories'
import { initialExpensesByCategory } from '../data/charts'
import { monthlySummary } from '../data/summary'
import { initialTransactions, type NewTransaction } from '../data/transactions'
import { getCurrentTime } from '../utils/format'
import { TransactionsContext } from './TransactionsContext'

function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [summary, setSummary] = useState(monthlySummary)
  const [expensesByCategory, setExpensesByCategory] = useState(initialExpensesByCategory)

  const addTransaction = (transaction: NewTransaction) => {
    const { type, amount, categoryId, description } = transaction

    setTransactions((current) => [
      {
        ...transaction,
        id: Date.now(),
        description: description || getCategory(categoryId).label,
        time: getCurrentTime(),
      },
      ...current,
    ])
    setSummary((current) => ({
      ...current,
      balance: current.balance + (type === 'income' ? amount : -amount),
      income: type === 'income' ? current.income + amount : current.income,
      expense: type === 'expense' ? current.expense + amount : current.expense,
    }))
    if (type === 'expense') {
      setExpensesByCategory((current) => ({ ...current, [categoryId]: (current[categoryId] ?? 0) + amount }))
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, summary, expensesByCategory, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsProvider
