import { MdArrowForward, MdNotificationsNone } from 'react-icons/md'
import { Link } from 'react-router'
import { useNotifications } from '../hooks/useNotifications'
import Dropdown from './Dropdown'
import NotificationItem from './NotificationItem'

const PREVIEW_LIMIT = 3

function NotificationsMenu() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const recentNotifications = notifications.slice(0, PREVIEW_LIMIT)

  return (
    <Dropdown
      role="dialog"
      label="Notificações"
      panelClassName="w-96"
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={unreadCount > 0 ? `Notificações (${unreadCount} não lidas)` : 'Notificações'}
          className="group relative flex size-10 cursor-pointer items-center justify-center rounded-full text-icon transition-all duration-150 hover:bg-slate-200/60 active:scale-90"
        >
          <MdNotificationsNone className="size-6 origin-top group-hover:animate-ring" aria-hidden />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2.5 size-2 rounded-full bg-red-500 ring-2 ring-page" aria-hidden />
          )}
        </button>
      )}
    >
      {(close) => (
        <>
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Notificações
              {unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-avatar px-2 py-0.5 text-xs font-semibold text-avatar-text">
                  {unreadCount}
                </span>
              )}
            </h2>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-sidebar-active transition-all duration-150 hover:bg-avatar/50 active:scale-95"
              >
                Marcar todas como lidas
              </button>
            )}
          </div>

          {recentNotifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-slate-500">Nenhuma notificação por aqui.</p>
          ) : (
            <ul className="p-1.5">
              {recentNotifications.map((notification) => (
                <li key={notification.id}>
                  <NotificationItem notification={notification} onClick={() => markAsRead(notification.id)} />
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-slate-200 p-1.5">
            <Link
              to="/notificacoes"
              onClick={close}
              className="group flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-active transition-all duration-150 hover:bg-avatar/40 active:scale-[0.98]"
            >
              Ver todas as notificações
              <MdArrowForward className="size-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </>
      )}
    </Dropdown>
  )
}

export default NotificationsMenu
