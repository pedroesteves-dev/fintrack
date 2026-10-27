import { MdCalendarToday, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { formatMonthYear } from '../utils/format'

type MonthSelectorProps = {
  value: Date
  onChange: (month: Date) => void
}

const arrowClassName =
  'flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-90'

function MonthSelector({ value, onChange }: MonthSelectorProps) {
  const changeMonth = (offset: number) => onChange(new Date(value.getFullYear(), value.getMonth() + offset, 1))

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-100">
      <button type="button" onClick={() => changeMonth(-1)} aria-label="Mês anterior" className={arrowClassName}>
        <MdChevronLeft className="size-6" aria-hidden />
      </button>

      <span className="flex min-w-40 items-center justify-center gap-2.5 text-[15px] font-semibold text-slate-900" aria-live="polite">
        <MdCalendarToday className="size-5 text-slate-700" aria-hidden />
        <span key={value.getTime()} className="animate-fade-in">
          {formatMonthYear(value)}
        </span>
      </span>

      <button type="button" onClick={() => changeMonth(1)} aria-label="Próximo mês" className={arrowClassName}>
        <MdChevronRight className="size-6" aria-hidden />
      </button>
    </div>
  )
}

export default MonthSelector
