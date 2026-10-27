import type { IconType } from 'react-icons'
import {
  MdCardGiftcard,
  MdDirectionsCar,
  MdMoreHoriz,
  MdRestaurant,
  MdShowChart,
  MdSportsEsports,
  MdWork,
} from 'react-icons/md'
import type { TransactionType } from './transactions'

export type Category = {
  id: string
  label: string
  icon: IconType
  color: string
}

export const expenseCategories: Category[] = [
  { id: 'alimentacao', label: 'Alimentação', icon: MdRestaurant, color: '#1baf7a' },
  { id: 'transporte', label: 'Transporte', icon: MdDirectionsCar, color: '#eb6834' },
  { id: 'lazer', label: 'Lazer', icon: MdSportsEsports, color: '#2a78d6' },
  { id: 'outros-gastos', label: 'Outros', icon: MdMoreHoriz, color: '#eda100' },
]

export const incomeCategories: Category[] = [
  { id: 'trabalho', label: 'Trabalho', icon: MdWork, color: '#007755' },
  { id: 'investimentos', label: 'Investimentos', icon: MdShowChart, color: '#007755' },
  { id: 'presentes', label: 'Presentes', icon: MdCardGiftcard, color: '#007755' },
  { id: 'outros-ganhos', label: 'Outros', icon: MdMoreHoriz, color: '#007755' },
]

export const categoriesByType: Record<TransactionType, Category[]> = {
  income: incomeCategories,
  expense: expenseCategories,
}

const allCategories = [...expenseCategories, ...incomeCategories]

export function getCategory(id: string) {
  return allCategories.find((category) => category.id === id) ?? expenseCategories[expenseCategories.length - 1]
}
