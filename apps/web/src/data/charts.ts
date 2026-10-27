export const chartColors = {
  income: '#00653a',
  expense: '#fe4e61',
  grid: '#eef0f3',
  axis: '#64748b',
}

export type MonthComparison = {
  income: number
  expense: number
}

export const lastSixMonths: MonthComparison[] = [
  { income: 2850, expense: 2050 },
  { income: 3550, expense: 2120 },
  { income: 3420, expense: 2330 },
  { income: 3430, expense: 1720 },
  { income: 3560, expense: 2110 },
  { income: 4050, expense: 2540 },
]

export const initialExpensesByCategory: Record<string, number> = {
  alimentacao: 345,
  transporte: 150,
  lazer: 105,
  'outros-gastos': 150,
}
