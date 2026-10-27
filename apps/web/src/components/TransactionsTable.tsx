import { MdChevronRight } from 'react-icons/md'
import { getCategory } from '../data/categories'
import type { Transaction } from '../data/transactions'
import { formatCurrency, formatRelativeDay } from '../utils/format'

type TransactionsTableProps = {
  transactions: Transaction[]
  isHidden?: boolean
  emptyMessage?: string
}

const typeBadges = {
  income: { label: 'Ganho', className: 'bg-brand/10 text-brand' },
  expense: { label: 'Gasto', className: 'bg-expense/10 text-red-600' },
}

function TransactionsTable({ transactions, isHidden = false, emptyMessage = 'Nenhuma movimentação.' }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return <p className="py-12 text-center text-sm text-slate-500">{emptyMessage}</p>
  }

  return (
    <div className="-mx-2 overflow-x-auto">
      <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="border-b border-slate-100 px-2 pb-3 font-medium">Descrição</th>
            <th className="border-b border-slate-100 px-2 pb-3 font-medium">Categoria</th>
            <th className="border-b border-slate-100 px-2 pb-3 font-medium">Data</th>
            <th className="border-b border-slate-100 px-2 pb-3 font-medium">Tipo</th>
            <th className="border-b border-slate-100 px-2 pb-3 font-medium">Valor</th>
            <th className="w-8 border-b border-slate-100 pb-3">
              <span className="sr-only">Detalhes</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, type, amount, categoryId, description, date, time }) => {
            const { label: categoryLabel, icon: Icon, color } = getCategory(categoryId)
            const badge = typeBadges[type]
            const sign = type === 'income' ? '+' : '-'

            return (
              <tr key={id} className="group animate-fade transition-colors duration-150 hover:bg-slate-50">
                <td className="rounded-l-xl border-b border-slate-100 px-2 py-3 group-last:border-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-150 group-hover:scale-110"
                      style={{ backgroundColor: `${color}1f`, color }}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-medium text-slate-900">{description}</span>
                  </div>
                </td>
                <td className="border-b border-slate-100 px-2 py-3 group-last:border-0">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-slate-700"
                    style={{ backgroundColor: `${color}1f` }}
                  >
                    {categoryLabel}
                  </span>
                </td>
                <td className="border-b border-slate-100 px-2 py-3 whitespace-nowrap text-slate-500 group-last:border-0">
                  {formatRelativeDay(date)} • {time}
                </td>
                <td className="border-b border-slate-100 px-2 py-3 group-last:border-0">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}>
                    {badge.label}
                  </span>
                </td>
                <td
                  className={`border-b border-slate-100 px-2 py-3 font-semibold whitespace-nowrap tabular-nums group-last:border-0 ${
                    type === 'income' ? 'text-brand' : 'text-red-600'
                  }`}
                >
                  {sign} {isHidden ? 'R$ ••••' : formatCurrency(amount)}
                </td>
                <td className="rounded-r-xl border-b border-slate-100 pr-2 text-slate-400 group-last:border-0">
                  <MdChevronRight
                    className="size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-slate-600"
                    aria-hidden
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionsTable
