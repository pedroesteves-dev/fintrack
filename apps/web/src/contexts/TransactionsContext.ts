import { createContext } from 'react'
import type { MonthlySummary } from '../data/summary'
import type { NewTransaction, Transaction } from '../data/transactions'

export type TransactionsContextValue = {
  transactions: Transaction[]
  summary: MonthlySummary
  expensesByCategory: Record<string, number>
  addTransaction: (transaction: NewTransaction) => void
}

export const TransactionsContext = createContext<TransactionsContextValue | null>(null)
