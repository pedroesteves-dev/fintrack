import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'

type ChartCardProps = {
  title: string
  icon: IconType
  actions?: ReactNode
  children: ReactNode
}

function ChartCard({ title, icon: Icon, actions, children }: ChartCardProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-icon">
            <Icon className="size-5" aria-hidden />
          </span>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}

export default ChartCard
