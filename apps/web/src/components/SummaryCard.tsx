import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import { formatCurrency } from '../utils/format'

type SummaryCardProps = {
  type: 'income' | 'expense'
  amount: number
  isHidden: boolean
}

const variants = {
  income: {
    label: 'Entradas',
    icon: MdArrowUpward,
    cardClassName: 'bg-income-bg ring-income/10',
    iconClassName: 'bg-income',
  },
  expense: {
    label: 'Saídas',
    icon: MdArrowDownward,
    cardClassName: 'bg-expense-bg ring-expense/10',
    iconClassName: 'bg-expense',
  },
}

function SummaryCard({ type, amount, isHidden }: SummaryCardProps) {
  const { label, icon: Icon, cardClassName, iconClassName } = variants[type]

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ring-1 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${cardClassName}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex size-8 items-center justify-center rounded-full text-white ${iconClassName}`}>
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="text-sm font-medium text-slate-500">{label}</span>
      </div>
      <p className="mt-2 pl-11 text-lg font-bold text-slate-900">{isHidden ? 'R$ ••••' : formatCurrency(amount)}</p>
    </div>
  )
}

export default SummaryCard
