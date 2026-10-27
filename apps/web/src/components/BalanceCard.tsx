import { MdArrowDownward, MdArrowUpward, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { formatCurrency } from '../utils/format'

type BalanceCardProps = {
  balance: number
  balanceChange: number
  isHidden: boolean
  onToggleHidden: () => void
}

const HIDDEN_VALUE = 'R$ ••••••'

function BalanceCard({ balance, balanceChange, isHidden, onToggleHidden }: BalanceCardProps) {
  const ChangeIcon = balanceChange >= 0 ? MdArrowUpward : MdArrowDownward

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand via-brand to-brand-light p-6 text-white shadow-md">
      <svg
        className="pointer-events-none absolute right-0 bottom-0 h-3/4 w-full text-white"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 90 C 90 40, 180 120, 270 70 S 380 20, 400 30 L 400 120 L 0 120 Z" fill="currentColor" opacity="0.06" />
        <path d="M120 120 C 200 60, 280 110, 340 70 S 390 50, 400 55 L 400 120 Z" fill="currentColor" opacity="0.08" />
      </svg>

      <div className="relative">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Saldo do mês</h2>
          <button
            type="button"
            onClick={onToggleHidden}
            aria-label={isHidden ? 'Mostrar valores' : 'Ocultar valores'}
            aria-pressed={isHidden}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full transition-all duration-150 hover:bg-white/15 active:scale-90"
          >
            {isHidden ? <MdVisibilityOff className="size-6" aria-hidden /> : <MdVisibility className="size-6" aria-hidden />}
          </button>
        </div>

        <p className="mt-2 text-4xl font-bold tracking-tight">{isHidden ? HIDDEN_VALUE : formatCurrency(balance)}</p>

        <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/90">
          <ChangeIcon className="size-4" aria-hidden />
          {isHidden ? HIDDEN_VALUE : formatCurrency(Math.abs(balanceChange))} este mês
        </p>
      </div>
    </div>
  )
}

export default BalanceCard
