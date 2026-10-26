import NotificationsMenu from './NotificationsMenu'
import UserMenu from './UserMenu'

type HeaderProps = {
  userName: string
  onLogout: () => void
}

function Header({ userName, onLogout }: HeaderProps) {
  return (
    <header className="flex items-center justify-end gap-3 px-8 py-4">
      <NotificationsMenu />

      <div className="h-6 w-px bg-slate-200" aria-hidden />

      <UserMenu userName={userName} onLogout={onLogout} />
    </header>
  )
}

export default Header
