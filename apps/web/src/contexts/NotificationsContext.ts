import { createContext } from 'react'
import type { Notification } from '../data/notifications'

export type NotificationsContextValue = {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: number) => void
  markAllAsRead: () => void
}

export const NotificationsContext = createContext<NotificationsContextValue | null>(null)
