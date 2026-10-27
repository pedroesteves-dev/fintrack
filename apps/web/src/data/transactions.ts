import { toISODate } from '../utils/format'

export type TransactionType = 'income' | 'expense'

export type NewTransaction = {
  type: TransactionType
  amount: number
  categoryId: string
  description: string
  date: string
}

export type Transaction = NewTransaction & {
  id: number
  time: string
}

export function sortByMostRecent(transactions: Transaction[]) {
  return [...transactions].sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
}

function daysAgo(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return toISODate(date)
}

export const initialTransactions: Transaction[] = [
  { id: 1, type: 'income', amount: 4000, categoryId: 'trabalho', description: 'Salário', date: daysAgo(0), time: '08:30' },
  { id: 2, type: 'expense', amount: 35, categoryId: 'alimentacao', description: 'Almoço', date: daysAgo(0), time: '12:30' },
  { id: 3, type: 'expense', amount: 15, categoryId: 'transporte', description: 'Transporte', date: daysAgo(0), time: '08:15' },
  { id: 4, type: 'expense', amount: 80, categoryId: 'alimentacao', description: 'Mercado', date: daysAgo(1), time: '16:45' },
  { id: 5, type: 'income', amount: 500, categoryId: 'trabalho', description: 'Freelance', date: daysAgo(1), time: '10:20' },
  { id: 6, type: 'expense', amount: 120, categoryId: 'lazer', description: 'Cinema e jantar', date: daysAgo(3), time: '20:10' },
  { id: 7, type: 'expense', amount: 60, categoryId: 'outros-gastos', description: 'Farmácia', date: daysAgo(4), time: '18:05' },
  { id: 8, type: 'expense', amount: 230, categoryId: 'alimentacao', description: 'Supermercado', date: daysAgo(6), time: '11:40' },
  { id: 9, type: 'income', amount: 150, categoryId: 'investimentos', description: 'Rendimentos', date: daysAgo(8), time: '09:00' },
  { id: 10, type: 'expense', amount: 135, categoryId: 'transporte', description: 'Combustível', date: daysAgo(9), time: '07:50' },
]
