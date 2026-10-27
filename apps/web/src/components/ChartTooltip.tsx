import { useState } from 'react'
import { formatCurrency } from '../utils/format'

export type ChartTooltipRow = {
  label: string
  value: number
  color: string
}

type ChartTooltipContent = {
  title?: string
  rows: ChartTooltipRow[]
}

type ChartTooltipProps = ChartTooltipContent & {
  active: boolean
}

function getSignature({ title, rows }: ChartTooltipContent) {
  return JSON.stringify([title, rows.map(({ label, value }) => [label, value])])
}

function ChartTooltip({ active, title, rows }: ChartTooltipProps) {
  const [content, setContent] = useState<ChartTooltipContent | null>(null)
  const [signature, setSignature] = useState<string | null>(null)

  const isVisible = active && rows.length > 0
  if (isVisible) {
    const nextSignature = getSignature({ title, rows })
    if (nextSignature !== signature) {
      setSignature(nextSignature)
      setContent({ title, rows })
    }
  }

  if (!content) return null

  return (
    <div
      className={`min-w-40 rounded-xl border border-slate-200 bg-white px-3.5 py-3 shadow-lg transition-all duration-200 ease-out ${
        isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-1 scale-95 opacity-0'
      } starting:translate-y-1 starting:scale-95 starting:opacity-0`}
    >
      {content.title && <p className="mb-2 text-xs font-medium text-slate-500">{content.title}</p>}
      <ul className="flex flex-col gap-1.5">
        {content.rows.map(({ label, value, color }) => (
          <li key={label} className="flex items-center gap-2.5">
            <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden />
            <span className="text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(value)}</span>
            <span className="text-sm text-slate-500">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChartTooltip
