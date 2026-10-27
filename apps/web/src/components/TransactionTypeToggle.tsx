import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'
import type { TransactionType } from '../data/transactions'

type TransactionTypeToggleProps = {
  value: TransactionType
  onChange: (type: TransactionType) => void
}

const options = [
  { type: 'income', label: 'Ganho', icon: MdArrowUpward },
  { type: 'expense', label: 'Gasto', icon: MdArrowDownward },
] as const

function TransactionTypeToggle({ value, onChange }: TransactionTypeToggleProps) {
  const isIncome = value === 'income'

  return (
    <div className="relative grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="radiogroup" aria-label="Tipo de movimentação">
      <span
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isIncome ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden
      >
        <span
          className={`absolute inset-0 bg-linear-to-r from-brand to-brand-light transition-opacity duration-300 ${
            isIncome ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <span
          className={`absolute inset-0 bg-expense transition-opacity duration-300 ${isIncome ? 'opacity-0' : 'opacity-100'}`}
        />
      </span>

      {options.map(({ type, label, icon: Icon }) => {
        const isActive = type === value

        return (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(type)}
            className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-[15px] font-semibold transition-all duration-300 active:scale-[0.97] ${
              isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon
              className={`size-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
              aria-hidden
            />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default TransactionTypeToggle
