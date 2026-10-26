import { type ReactNode, useState } from 'react'
import { initialNotifications } from '../data/notifications'
import { NotificationsContext } from './NotificationsContext'

function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  const markAsRead = (id: number) =>
    setNotifications((current) =>
      current.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )

  const markAllAsRead = () =>
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })))

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
