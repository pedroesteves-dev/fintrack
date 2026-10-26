import type { Notification } from '../data/notifications'

type NotificationItemProps = {
  notification: Notification
  onClick: () => void
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const { title, description, time, icon: Icon, isRead } = notification

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full cursor-pointer items-start gap-3 rounded-lg px-3 py-3 text-left transition-all duration-150 hover:bg-slate-100 active:scale-[0.98]"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-avatar text-avatar-text transition-transform duration-150 group-hover:scale-110">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block text-sm ${isRead ? 'font-medium text-slate-600' : 'font-semibold text-slate-900'}`}>
          {title}
        </span>
        <span className="mt-0.5 block text-sm text-slate-500">{description}</span>
        <span className="mt-1 block text-xs text-slate-400">{time}</span>
      </span>
      {!isRead && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-red-500" aria-label="Não lida" />}
    </button>
  )
}

export default NotificationItem
