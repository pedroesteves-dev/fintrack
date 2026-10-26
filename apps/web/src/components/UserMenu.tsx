import type { IconType } from 'react-icons'
import { MdKeyboardArrowDown, MdLogout, MdPerson, MdSettings } from 'react-icons/md'
import { Link } from 'react-router'
import Dropdown from './Dropdown'

type UserMenuProps = {
  userName: string
  onLogout: () => void
}

type MenuLink = {
  to: string
  label: string
  icon: IconType
}

const menuLinks: MenuLink[] = [
  { to: '/perfil', label: 'Meu perfil', icon: MdPerson },
  { to: '/configuracoes', label: 'Configurações', icon: MdSettings },
]

const optionClassName =
  'group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 active:scale-[0.97]'

const optionIconClassName = 'size-5 shrink-0 transition-transform duration-150 group-hover:scale-110'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

function UserMenu({ userName, onLogout }: UserMenuProps) {
  return (
    <Dropdown
      panelClassName="w-56 p-1.5"
      trigger={({ isOpen, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="flex cursor-pointer items-center gap-2.5 rounded-full py-1 pr-3 pl-1 transition-all duration-150 hover:bg-slate-200/60 active:scale-95"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-avatar text-sm font-semibold text-avatar-text">
            {getInitials(userName)}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[15px] font-medium text-slate-900">{userName}</span>
            <MdKeyboardArrowDown
              className={`size-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </span>
        </button>
      )}
    >
      {(close) => (
        <>
          {menuLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={close}
              className={`${optionClassName} text-slate-700 hover:bg-slate-100 hover:text-slate-900`}
            >
              <Icon className={`${optionIconClassName} text-slate-500 group-hover:text-sidebar-active`} aria-hidden />
              {label}
            </Link>
          ))}

          <div className="my-1.5 h-px bg-slate-200" />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              close()
              onLogout()
            }}
            className={`${optionClassName} text-red-600 hover:bg-red-50`}
          >
            <MdLogout className={optionIconClassName} aria-hidden />
            Sair
          </button>
        </>
      )}
    </Dropdown>
  )
}

export default UserMenu
