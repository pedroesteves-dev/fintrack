import { useState } from 'react'
import { MdDoneAll } from 'react-icons/md'
import NotificationItem from '../components/NotificationItem'
import { useNotifications } from '../hooks/useNotifications'

type Filter = 'todas' | 'nao-lidas'

const filters: { id: Filter; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'nao-lidas', label: 'Não lidas' },
]

function Notificacoes() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [filter, setFilter] = useState<Filter>('todas')

  const visibleNotifications =
    filter === 'nao-lidas' ? notifications.filter((notification) => !notification.isRead) : notifications

  return (
    <section className="max-w-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notificações</h1>
          <p className="mt-2 text-slate-600">
            {unreadCount > 0
              ? `Você tem ${unreadCount} ${unreadCount === 1 ? 'notificação não lida' : 'notificações não lidas'}.`
              : 'Você está em dia com suas notificações.'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-active transition-all duration-150 hover:bg-avatar/50 active:scale-95"
          >
            <MdDoneAll className="size-5" aria-hidden />
            Marcar todas como lidas
          </button>
        )}
      </div>

      <div className="mt-6 flex gap-2" role="tablist" aria-label="Filtrar notificações">
        {filters.map(({ id, label }) => {
          const isActive = id === filter

          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(id)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
                isActive ? 'bg-sidebar-active text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {label}
              {id === 'nao-lidas' && unreadCount > 0 && ` (${unreadCount})`}
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        {visibleNotifications.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-slate-500">
            {filter === 'nao-lidas' ? 'Nenhuma notificação não lida.' : 'Nenhuma notificação por aqui.'}
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visibleNotifications.map((notification) => (
              <li key={notification.id}>
                <NotificationItem notification={notification} onClick={() => markAsRead(notification.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Notificacoes
