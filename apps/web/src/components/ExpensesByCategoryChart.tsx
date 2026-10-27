import { MdDonutLarge } from 'react-icons/md'
import { Pie, PieChart, type PieSectorShapeProps, Sector, Tooltip } from 'recharts'
import { expenseCategories } from '../data/categories'
import { useChartTooltipMotion } from '../hooks/useChartTooltipMotion'
import { formatCurrency, formatPercent } from '../utils/format'
import ChartCard from './ChartCard'
import ChartTooltip from './ChartTooltip'

type ExpensesByCategoryChartProps = {
  totals: Record<string, number>
  isHidden: boolean
}

function CategorySector({ isActive, outerRadius = 0, ...props }: PieSectorShapeProps) {
  return <Sector {...props} outerRadius={isActive ? outerRadius + 5 : outerRadius} />
}

function ExpensesByCategoryChart({ totals, isHidden }: ExpensesByCategoryChartProps) {
  const data = expenseCategories.map(({ id, label, color }) => ({ id, name: label, value: totals[id] ?? 0, fill: color }))
  const total = data.reduce((sum, category) => sum + category.value, 0)
  const share = (value: number) => (total > 0 ? value / total : 0)
  const {
    containerRef: tooltipContainerRef,
    wrapperStyle: tooltipWrapperStyle,
    onMouseEnter: handleChartMouseEnter,
  } = useChartTooltipMotion()

  return (
    <ChartCard title="Gastos por categoria" icon={MdDonutLarge}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
        <div ref={tooltipContainerRef} className="relative size-48 shrink-0">
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900">{isHidden ? 'R$ ••••' : formatCurrency(total)}</span>
            <span className="text-xs text-slate-500">Total de gastos</span>
          </div>
          <PieChart
            responsive
            style={{ width: '100%', height: '100%' }}
            accessibilityLayer
            onMouseEnter={handleChartMouseEnter}
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="70%"
              outerRadius="92%"
              shape={CategorySector}
              startAngle={90}
              endAngle={-270}
              stroke="#ffffff"
              strokeWidth={2}
              animationDuration={700}
            />
            <Tooltip
              wrapperStyle={tooltipWrapperStyle}
              content={({ active, payload }) => {
                const slice = payload?.[0]?.payload as (typeof data)[number] | undefined
                return (
                  <ChartTooltip
                    active={Boolean(active && slice)}
                    title={slice ? formatPercent(share(slice.value)) : undefined}
                    rows={slice ? [{ label: slice.name, value: slice.value, color: slice.fill }] : []}
                  />
                )
              }}
            />
          </PieChart>
        </div>

        <ul className="flex w-full flex-col gap-3">
          {data.map(({ id, name, value, fill }) => (
            <li key={id} className="flex items-center gap-3 text-sm">
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: fill }} aria-hidden />
              <span className="flex-1 text-slate-700">{name}</span>
              <span className="font-medium text-slate-900 tabular-nums">{formatPercent(share(value))}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}

export default ExpensesByCategoryChart
