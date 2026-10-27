import { useState } from 'react'
import { MdBarChart, MdTableRows } from 'react-icons/md'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { chartColors, lastSixMonths } from '../data/charts'
import { useChartTooltipMotion } from '../hooks/useChartTooltipMotion'
import { formatCurrency, formatMonthYear, formatNumber, formatShortMonth } from '../utils/format'
import ChartCard from './ChartCard'
import ChartTooltip from './ChartTooltip'

type IncomeExpenseChartProps = {
  endMonth: Date
}

const series = [
  { key: 'income', label: 'Entradas', color: chartColors.income },
  { key: 'expense', label: 'Saídas', color: chartColors.expense },
] as const

function IncomeExpenseChart({ endMonth }: IncomeExpenseChartProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart')
  const {
    containerRef: tooltipContainerRef,
    wrapperStyle: tooltipWrapperStyle,
    onMouseEnter: handleChartMouseEnter,
  } = useChartTooltipMotion()

  const data = lastSixMonths.map((values, index) => {
    const month = new Date(endMonth.getFullYear(), endMonth.getMonth() - (lastSixMonths.length - 1 - index), 1)
    return { ...values, label: formatShortMonth(month), fullLabel: formatMonthYear(month) }
  })

  return (
    <ChartCard
      title="Receitas x Despesas"
      icon={MdBarChart}
      actions={
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4 text-sm text-slate-600">
            {series.map(({ key, label, color }) => (
              <li key={key} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setView((current) => (current === 'chart' ? 'table' : 'chart'))}
            aria-label={view === 'chart' ? 'Ver como tabela' : 'Ver como gráfico'}
            title={view === 'chart' ? 'Ver como tabela' : 'Ver como gráfico'}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-90"
          >
            {view === 'chart' ? <MdTableRows className="size-5" aria-hidden /> : <MdBarChart className="size-5" aria-hidden />}
          </button>
        </div>
      }
    >
      {view === 'chart' ? (
        <div ref={tooltipContainerRef}>
          <BarChart
            responsive
            data={data}
            style={{ width: '100%', height: 240 }}
            margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
            barGap={4}
            barCategoryGap="28%"
            accessibilityLayer
            onMouseEnter={handleChartMouseEnter}
          >
            <CartesianGrid vertical={false} stroke={chartColors.grid} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 13 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: chartColors.axis, fontSize: 13 }}
              tickFormatter={formatNumber}
              width={48}
            />
            <Tooltip
              cursor={{ fill: '#f1f5f9', radius: 8 }}
              wrapperStyle={tooltipWrapperStyle}
              content={({ active, payload }) => {
                const point = payload?.[0]?.payload as (typeof data)[number] | undefined
                return (
                  <ChartTooltip
                    active={Boolean(active && point)}
                    title={point?.fullLabel}
                    rows={point ? series.map(({ key, label, color }) => ({ label, value: point[key], color })) : []}
                  />
                )
              }}
            />
            {series.map(({ key, label, color }) => (
              <Bar
                key={key}
                dataKey={key}
                name={label}
                fill={color}
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
                activeBar={{ fillOpacity: 0.8 }}
                animationDuration={600}
              />
            ))}
          </BarChart>
        </div>
      ) : (
        <table className="w-full animate-fade-in text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-2 font-medium">Mês</th>
              <th className="py-2 text-right font-medium">Entradas</th>
              <th className="py-2 text-right font-medium">Saídas</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ fullLabel, income, expense }) => (
              <tr key={fullLabel} className="border-b border-slate-100 last:border-0">
                <td className="py-2.5 text-slate-700">{fullLabel}</td>
                <td className="py-2.5 text-right font-medium text-slate-900 tabular-nums">{formatCurrency(income)}</td>
                <td className="py-2.5 text-right font-medium text-slate-900 tabular-nums">{formatCurrency(expense)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ChartCard>
  )
}

export default IncomeExpenseChart
