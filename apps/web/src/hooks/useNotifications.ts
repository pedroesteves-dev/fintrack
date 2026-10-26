import { useContext } from 'react'
import { NotificationsContext } from '../contexts/NotificationsContext'

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) throw new Error('useNotifications precisa estar dentro de <NotificationsProvider>')
  return context
}
