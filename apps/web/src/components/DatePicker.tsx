import { useState } from 'react'
import { MdCalendarToday, MdChevronLeft, MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md'
import { formatDate, formatMonthYear, getTodayISODate, parseISODate, toISODate } from '../utils/format'
import Dropdown from './Dropdown'

type DatePickerProps = {
  value: string
  onChange: (isoDate: string) => void
  label: string
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const navButtonClassName =
  'flex size-8 cursor-pointer items-center justify-center rounded-full text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-90'

function getMonthStart(isoDate: string) {
  const date = parseISODate(isoDate)
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getCalendarDays(month: Date) {
  const firstWeekDay = month.getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const blanks = Array.from({ length: firstWeekDay }, () => null)
  const days = Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))
  return [...blanks, ...days]
}

function DatePicker({ value, onChange, label }: DatePickerProps) {
  const [viewMonth, setViewMonth] = useState(() => getMonthStart(value))
  const today = getTodayISODate()

  const changeMonth = (offset: number) =>
    setViewMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1))

  return (
    <Dropdown
      role="dialog"
      label={label}
      placement="top-start"
      panelClassName="w-80 p-4"
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          onClick={() => {
            if (!isOpen) setViewMonth(getMonthStart(value))
            toggle()
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`${label}: ${formatDate(value)}`}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left text-[15px] text-slate-900 transition-all duration-150 outline-none hover:border-slate-300 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10 ${
            isOpen ? 'border-brand ring-4 ring-brand/10' : 'border-slate-200'
          }`}
        >
          <MdCalendarToday className="size-5 text-slate-600" aria-hidden />
          <span className="flex-1">{formatDate(value)}</span>
          <MdKeyboardArrowDown
            className={`size-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      )}
    >
      {(close) => {
        const select = (isoDate: string) => {
          onChange(isoDate)
          close()
        }

        return (
          <>
            <div className="mb-3 flex items-center justify-between">
              <button type="button" onClick={() => changeMonth(-1)} aria-label="Mês anterior" className={navButtonClassName}>
                <MdChevronLeft className="size-5" aria-hidden />
              </button>
              <span key={viewMonth.getTime()} className="animate-fade-in text-sm font-semibold text-slate-900">
                {formatMonthYear(viewMonth)}
              </span>
              <button type="button" onClick={() => changeMonth(1)} aria-label="Próximo mês" className={navButtonClassName}>
                <MdChevronRight className="size-5" aria-hidden />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400">
              {weekDays.map((day, index) => (
                <span key={index} className="py-1.5">
                  {day}
                </span>
              ))}
            </div>

            <div key={viewMonth.getTime()} className="grid animate-fade-in grid-cols-7 gap-y-1">
              {getCalendarDays(viewMonth).map((day, index) => {
                if (!day) return <span key={`blank-${index}`} />

                const isoDate = toISODate(day)
                const isSelected = isoDate === value
                const isToday = isoDate === today

                return (
                  <button
                    key={isoDate}
                    type="button"
                    onClick={() => select(isoDate)}
                    aria-pressed={isSelected}
                    aria-label={formatDate(isoDate)}
                    className={`mx-auto flex size-9 cursor-pointer items-center justify-center rounded-full text-sm transition-all duration-150 active:scale-90 ${
                      isSelected
                        ? 'bg-linear-to-br from-brand to-brand-light font-semibold text-white shadow-md'
                        : isToday
                          ? 'font-semibold text-brand ring-1 ring-brand/40 hover:bg-avatar/50'
                          : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>

            <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => select(today)}
                className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-brand transition-all duration-150 hover:bg-avatar/50 active:scale-95"
              >
                Hoje
              </button>
            </div>
          </>
        )
      }}
    </Dropdown>
  )
}

export default DatePicker
